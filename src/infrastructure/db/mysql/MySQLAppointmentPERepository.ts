import mysql from 'mysql2/promise';
import {Appointment} from '@src/domain/entities/Appointment';
import {AppointmentRepositoryMySQL} from '@src/domain/interfaces/repositories/AppointmentRepositoryMySQL';
// import {InsuredId} from "@src/core/domain/value-objects/InsuredId";
// import {AppointmentPEModel} from "@src/infrastructure/db/models/AppointmentPEModel";

let pool: mysql.Pool | null = null;

export class MySQLAppointmentPERepository implements AppointmentRepositoryMySQL {
    private getPool(): mysql.Pool {
        if (!pool) {
            pool = mysql.createPool({
                host: process.env.MYSQL_PE_HOST,
                user: process.env.MYSQL_PE_USER,
                password: process.env.MYSQL_PE_PASSWORD,
                database: process.env.MYSQL_PE_DATABASE,
                waitForConnections: true,
                connectionLimit: 5,
                queueLimit: 0
            });
        }
        return pool;
    }

    async save(appointment: Appointment): Promise<void> {
        const connection = await this.getPool().getConnection();

        try {
            await connection.beginTransaction();

            await connection.execute(
                `INSERT INTO appointments (uuid, insured_id, schedule_id, status, created_at, updated_at)
                 VALUES (?, ?, ?, ?, NOW(), NOW())`,
                [
                    appointment.id,
                    String(appointment.insuredId),
                    appointment.scheduleId,
                    appointment.status
                ]
            );

            await connection.commit();
        } catch (error) {
            await connection.rollback();
            console.error("Error inserting appointment:", error);
            throw new Error(`Database PERU Error: ${error}`);
        } finally {
            connection.release();
        }
    }

    // async findByInsuredId(insuredId: InsuredId): Promise<Appointment[]> {
    //     const connection = await this.getPool().getConnection();
    //
    //     try {
    //         const [rows] = await connection.execute(
    //             `SELECT *
    //              FROM appointments
    //              WHERE insured_id = ?
    //              ORDER BY created_at DESC`,
    //             [insuredId.toString()]
    //         );
    //
    //         if (!Array.isArray(rows)) {
    //             return [];
    //         }
    //
    //         return rows.map((row: any) => {
    //             const appointmentData = AppointmentPEModel.fromDatabase(row);
    //             return new Appointment({
    //                 id: appointmentData.appointmentId,
    //                 insuredId: new InsuredId(appointmentData.insuredId),
    //                 scheduleId: appointmentData.scheduleId,
    //                 status: appointmentData.status,
    //                 createdAt: appointmentData.createdAt,
    //                 updatedAt: appointmentData.updatedAt
    //             })
    //         });
    //     } catch (error) {
    //         throw error;
    //     } finally {
    //         connection.release();
    //     }
    // }

}