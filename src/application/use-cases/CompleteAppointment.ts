import { AppointmentRepositoryMySQL } from '@src/domain/interfaces/repositories/AppointmentRepositoryMySQL';
import {AppointmentRepositoryDynamo} from "@src/domain/interfaces/repositories/AppointmentRepositoryDynamo";

interface CompleteAppointmentRequest {
    appointmentId: string;
}

export class CompleteAppointment {
    constructor(private readonly appointmentRepository: AppointmentRepositoryDynamo) {}

    async execute(request: CompleteAppointmentRequest): Promise<void> {
        const appointment = await this.appointmentRepository.findById(request.appointmentId);

        if (!appointment) {
            throw new Error(`Appointment with id ${request.appointmentId} not found`);
        }

        const completedAppointment = appointment.complete();
        await this.appointmentRepository.update(completedAppointment);
    }
}