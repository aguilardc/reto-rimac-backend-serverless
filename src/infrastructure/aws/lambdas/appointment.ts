import {APIGatewayProxyEvent, APIGatewayProxyResult, SQSEvent} from 'aws-lambda';
import {Router} from '../../http/routes/routes';
import {DynamoDBAppointmentRepository} from '../dynamodb/DynamoDBAppointmentRepository';
import {CompleteAppointment} from '@src/application/use-cases/CompleteAppointment';

// Handler para eventos HTTP utilizando el router
const handleHttpEvent = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const router = new Router();
    return await router.route(event);
};

// Handler para eventos SQS (confirmación de citas)
const handleSQSEvent = async (event: SQSEvent): Promise<void> => {
    const appointmentRepository = new DynamoDBAppointmentRepository();
    const completeAppointment = new CompleteAppointment(appointmentRepository);

    for (const record of event.Records) {
        try {
            const body = JSON.parse(record.body);

            await completeAppointment.execute({
                appointmentId: body.appointmentId
            });

            console.log(`Appointment ${body.appointmentId} marked as completed`);
        } catch (error) {
            console.error('Error processing SQS message', error);
            throw error; // Para que SQS reintente
        }
    }
};

// Handler principal que decide qué función usar según el evento
export const handler = async (
    event: APIGatewayProxyEvent | SQSEvent
): Promise<APIGatewayProxyResult | void> => {
    console.log('Event received:', JSON.stringify(event));

    if ('httpMethod' in event) {
        return handleHttpEvent(event);
    } else if ('Records' in event) {
        return handleSQSEvent(event);
    }

    throw new Error('Unsupported event type');
};