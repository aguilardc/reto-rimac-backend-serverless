import {Appointment} from '../../entities/Appointment';
import {InsuredId} from '@src/domain/value-objects/InsuredId';

export interface AppointmentRepositoryMySQL {
    save(appointment: Appointment): Promise<void>;

    // findByInsuredId(insuredId: InsuredId): Promise<Appointment[]>;
}