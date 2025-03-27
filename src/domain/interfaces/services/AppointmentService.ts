import { Appointment } from '../../entities/Appointment';

export interface AppointmentService {
    processAppointment(appointment: Appointment): Promise<void>;
}