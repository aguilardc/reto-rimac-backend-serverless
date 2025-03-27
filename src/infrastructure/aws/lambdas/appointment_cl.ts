import {SQSEvent} from 'aws-lambda';
import {SQS} from "aws-sdk";
import {MySQLAppointmentCLRepository} from '@src/infrastructure/db/mysql/MySQLAppointmentCLRepository';
import {EventBridgeService} from '@src/infrastructure/aws/eventbridge/EventBridgeService';
import {Appointment} from '@src/domain/entities/Appointment';
import {InsuredId} from '@src/domain/value-objects/InsuredId';
import {CountryISO} from '@src/domain/value-objects/CountryISO';

const sqs = new SQS();

export const handler = async (event: SQSEvent): Promise<void> => {
    const repository = new MySQLAppointmentCLRepository();
    const eventBridgeService = new EventBridgeService();

    for (const record of event.Records) {
        try {
            const body = JSON.parse(record.body);
            const message = JSON.parse(body.Message);

            console.log('🔍 Raw SQS Message:', JSON.stringify(body, null, 2));
            console.log('🔍 Parsed Message:', JSON.stringify(message, null, 2));

            if (!message.insuredId || !message.countryISO) {
                console.error("❌ Error: `insuredId` o `countryISO` son undefined.");
                continue; // Saltar este mensaje para evitar que la Lambda falle
            }

            // Reconstruir la entidad de dominio
            const appointment = new Appointment({
                id: message.appointmentId,
                insuredId: new InsuredId(message.insuredId),
                scheduleId: message.scheduleId,
                countryISO: new CountryISO(message.countryISO),
                status: message.status,
                createdAt: new Date(),
                updatedAt: new Date()
            });

            console.log('Processing appointment for Chile:', appointment);

            try {
                // Guardar en la base de datos de Chile
                await repository.save(appointment);
            } catch (dbError) {
                console.error("❌ Error guardando en la base de datos:", dbError);
                continue;
            }

            try {
                await eventBridgeService.sendAppointmentCompletedEvent(appointment);
                await sqs.deleteMessage({
                    QueueUrl: process.env.SQS_CL_URL!,
                    ReceiptHandle: record.receiptHandle
                }).promise();
                console.log(`✅ Appointment ${appointment.id} processed and deleted from SQS`);
            } catch (eventError) {
                console.error(`Failed to send event for appointment ${appointment.id}`, eventError);
            }


        } catch (error) {
            console.error('Error processing appointment for Chile', error);
            throw error; // Para que SQS reintente
        }
    }
};