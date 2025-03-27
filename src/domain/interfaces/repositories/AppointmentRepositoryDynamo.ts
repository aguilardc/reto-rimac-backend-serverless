import { Appointment } from '../../entities/Appointment';
import { InsuredId } from '@src/domain/value-objects/InsuredId';

export interface AppointmentRepositoryDynamo {
    save(appointment: Appointment): Promise<void>;
    update(appointment: Appointment): Promise<void>;
    findById(id: string): Promise<Appointment | null>;
    findByInsuredId(insuredId: InsuredId): Promise<Appointment[]>;
}