// import {AppointmentStatus} from "@src/core/domain/value-objects/AppointmentStatus";
//
// export class AppointmentPEModel {
//     appointmentId: string;
//     insuredId: string;
//     scheduleId: number;
//     status: AppointmentStatus;
//     createdAt: Date;
//     updatedAt: Date;
//
//     constructor(data: {
//         appointmentId: string;
//         insuredId: string;
//         scheduleId: number;
//         status: AppointmentStatus;
//         createdAt: Date;
//         updatedAt: Date;
//     }) {
//         this.appointmentId = data.appointmentId;
//         this.insuredId = data.insuredId;
//         this.scheduleId = data.scheduleId;
//         this.status = data.status;
//         this.createdAt = data.createdAt;
//         this.updatedAt = data.updatedAt;
//     }
//
//     static fromDatabase(row: any): AppointmentPEModel {
//         return new AppointmentPEModel({
//             appointmentId: row.appointment_id,
//             insuredId: row.insured_id,
//             scheduleId: row.schedule_id,
//             status: row.status,
//             createdAt: new Date(row.created_at),
//             updatedAt: new Date(row.updated_at),
//         });
//     }
// }
