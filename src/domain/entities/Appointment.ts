import {InsuredId} from '@src/domain/value-objects/InsuredId';
import {CountryISO} from '@src/domain/value-objects/CountryISO';
import {AppointmentStatus} from "@src/domain/value-objects/AppointmentStatus";


export interface AppointmentProps {
    id?: string;
    insuredId: InsuredId;
    scheduleId: number;
    countryISO?: CountryISO;
    status: AppointmentStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export class Appointment {
    readonly id?: string;
    readonly insuredId: InsuredId;
    readonly scheduleId: number;
    readonly countryISO: CountryISO | undefined;
    readonly status: AppointmentStatus;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(props: AppointmentProps) {
        this.id = props.id;
        this.insuredId = props.insuredId;
        this.scheduleId = props.scheduleId;
        this.countryISO = props.countryISO;
        this.status = props.status;
        this.createdAt = props.createdAt || new Date();
        this.updatedAt = props.updatedAt || new Date();
    }

    complete(): Appointment {
        return new Appointment({
            ...this,
            status: 'completed',
            updatedAt: new Date()
        });
    }
}