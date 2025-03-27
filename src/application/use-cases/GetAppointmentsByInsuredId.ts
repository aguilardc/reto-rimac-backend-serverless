import { InsuredId } from '@src/domain/value-objects/InsuredId';
import { Appointment } from '@src/domain/entities/Appointment';
import {AppointmentRepositoryDynamo} from "@src/domain/interfaces/repositories/AppointmentRepositoryDynamo";

export class GetAppointmentsByInsuredId {
    constructor(private readonly appointmentRepository: AppointmentRepositoryDynamo) {}

    async execute(insuredIdStr: string): Promise<Appointment[]> {
        const insuredId = new InsuredId(insuredIdStr);
        return this.appointmentRepository.findByInsuredId(insuredId);
    }
}