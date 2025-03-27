// import {AppointmentStatus} from "@src/core/domain/value-objects/AppointmentStatus";
//
// export class AppointmentCLModel {
//     appointmentId: string;
//     insuredId: string;
//     scheduleId: number;
//     centerId: number;
//     specialtyId: number;
//     medicId: number;
//     appointmentDate: Date;
//     status: AppointmentStatus;
//     createdAt: Date;
//     updatedAt: Date;
//     notes?: string;
//     healthPlan?: string;
//     patientRut?: string;
//     patientContact?: string;
//
//     constructor(data: {
//         appointmentId: string;
//         insuredId: string;
//         scheduleId: number;
//         centerId: number;
//         specialtyId: number;
//         medicId: number;
//         appointmentDate: Date;
//         status: AppointmentStatus;
//         createdAt: Date;
//         updatedAt: Date;
//         notes?: string;
//         healthPlan?: string;
//         patientRut?: string;
//         patientContact?: string;
//     }) {
//         this.appointmentId = data.appointmentId;
//         this.insuredId = data.insuredId;
//         this.scheduleId = data.scheduleId;
//         this.centerId = data.centerId;
//         this.specialtyId = data.specialtyId;
//         this.medicId = data.medicId;
//         this.appointmentDate = data.appointmentDate;
//         this.status = data.status;
//         this.createdAt = data.createdAt;
//         this.updatedAt = data.updatedAt;
//         this.notes = data.notes;
//         this.healthPlan = data.healthPlan;
//         this.patientRut = data.patientRut;
//         this.patientContact = data.patientContact;
//     }
//
//     static fromDatabase(row: any): AppointmentCLModel {
//         return new AppointmentCLModel({
//             appointmentId: row.appointment_id,
//             insuredId: row.insured_id,
//             scheduleId: row.schedule_id,
//             centerId: row.center_id,
//             specialtyId: row.specialty_id,
//             medicId: row.medic_id,
//             appointmentDate: new Date(row.appointment_date),
//             status: row.status,
//             createdAt: new Date(row.created_at),
//             updatedAt: new Date(row.updated_at),
//             notes: row.notes || undefined,
//             healthPlan: row.health_plan || undefined,
//             patientRut: row.patient_rut || undefined,
//             patientContact: row.patient_contact || undefined,
//         });
//     }
// }
