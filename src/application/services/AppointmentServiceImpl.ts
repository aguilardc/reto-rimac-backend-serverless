import { Appointment } from "@src/domain/entities/Appointment";
import { AppointmentRepositoryMySQL } from "@src/domain/interfaces/repositories/AppointmentRepositoryMySQL";
import { AppointmentService } from "@src/domain/interfaces/services/AppointmentService";
import { NotificationService } from "@src/domain/interfaces/services/NotificationService";
import {AppointmentRepositoryDynamo} from "@src/domain/interfaces/repositories/AppointmentRepositoryDynamo";

export class AppointmentServiceImpl implements AppointmentService {
    constructor(
        private readonly appointmentRepository: AppointmentRepositoryDynamo,
        private readonly notificationService: NotificationService
    ) {}

    async processAppointment(appointment: Appointment): Promise<void> {
        // Guardar la cita en DynamoDB con estado "pending"
        await this.appointmentRepository.save(appointment);
        console.trace('📌 TRACE: sendAppointmentNotification ejecutado para appointment: ', appointment.toString());
        // Enviar evento a SNS
        await this.notificationService.sendAppointmentNotification(appointment);
    }
}
