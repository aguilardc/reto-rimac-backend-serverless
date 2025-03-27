import {v4 as uuidv4} from 'uuid';
import {Appointment} from '@src/domain/entities/Appointment';
import {InsuredId} from '@src/domain/value-objects/InsuredId';
import {CountryISO} from '@src/domain/value-objects/CountryISO';
import {AppointmentService} from "@src/domain/interfaces/services/AppointmentService";

interface CreateAppointmentRequest {
    insuredId: string;
    scheduleId: number;
    countryISO: string;
}

export class CreateAppointment {
    constructor(private readonly appointmentService: AppointmentService) {
    }

    async execute(request: CreateAppointmentRequest): Promise<{ id: string }> {
        // Validar y crear objetos de valor
        const insuredId = new InsuredId(request.insuredId);
        const countryISO = new CountryISO(request.countryISO);

        const appointmentId = uuidv4();

        // Crear la entidad con estado pendiente
        const appointment = new Appointment({
            id: appointmentId,
            insuredId,
            scheduleId: request.scheduleId,
            countryISO,
            status: 'pending'
        });

        // Guardar en DynamoDB
        await this.appointmentService.processAppointment(appointment);
        return { id: appointmentId };
    }
}