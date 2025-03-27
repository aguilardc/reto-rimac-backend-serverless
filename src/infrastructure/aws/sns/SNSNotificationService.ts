import {NotificationService} from "@src/domain/interfaces/services/NotificationService";
import {Appointment} from "@src/domain/entities/Appointment";
import {SNS} from "aws-sdk";

export class SNSNotificationService implements NotificationService {
    private sns: SNS;
    private readonly topicArn: string;

    constructor() {
        this.sns = new SNS();
        this.topicArn = process.env.SNS_TOPIC_ARN || ""; // ARN del tópico SNS
    }

    async sendAppointmentNotification(appointment: Appointment): Promise<void> {
        try {
            if (!this.topicArn) {
                throw new Error("SNS Topic ARN is not configured");
            }

            const countryISOString = appointment.countryISO ? appointment.countryISO.toString() : "";

            console.log("========================", appointment);

            // Publicar mensaje en SNS
            await this.sns
                .publish({
                    TopicArn: this.topicArn,
                    Message: JSON.stringify({
                        appointmentId: appointment.id,
                        insuredId: appointment.insuredId.toString(),
                        scheduleId: appointment.scheduleId,
                        countryISO: countryISOString,
                        status: appointment.status,
                    }),
                    MessageAttributes: {
                        countryISO: {
                            DataType: "String",
                            StringValue: countryISOString,
                        },
                    },
                }).promise();

            console.log(`✅ Appointment sent to SNS topic: ${this.topicArn}`);
        } catch (error) {
            console.error("❌ Error sending appointment notification:", error);
            throw new Error("Failed to send appointment notification.");
        }
    }
}
