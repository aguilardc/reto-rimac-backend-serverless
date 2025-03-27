import { Appointment } from '../../entities/Appointment';

export interface NotificationService {
    sendAppointmentNotification(appointment: Appointment): Promise<void>;
}