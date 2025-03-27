import {EventBridge} from 'aws-sdk';
import {Appointment} from '@src/domain/entities/Appointment';

export class EventBridgeService {
    private readonly eventBridge: EventBridge;
    private readonly eventBusName: string;

    constructor() {
        this.eventBridge = new EventBridge();
        this.eventBusName = process.env.EVENT_BUS_NAME || 'default';
    }

    async sendAppointmentCompletedEvent(appointment: Appointment): Promise<void> {
        console.log(`📤 Enviando evento a EventBridge en el bus: ${this.eventBusName}`);

        await this.eventBridge.putEvents({
            Entries: [
                {
                    EventBusName: this.eventBusName,
                    Source: 'appointment-services',
                    DetailType: 'AppointmentCompleted',
                    Detail: JSON.stringify({
                        appointmentId: appointment.id,
                        insuredId: appointment.insuredId.toString(),
                        countryISO: appointment.countryISO?.toString()
                    })
                }
            ]
        }).promise();
        console.log(`Event sent for appointment ${appointment.id}`);
    }
}