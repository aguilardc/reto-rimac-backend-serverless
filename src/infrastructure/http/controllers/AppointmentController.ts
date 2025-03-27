import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { CreateAppointment } from "@src/application/use-cases/CreateAppointment";
import { GetAppointmentsByInsuredId } from "@src/application/use-cases/GetAppointmentsByInsuredId";


export class AppointmentController {

    constructor(
        private readonly createAppointment: CreateAppointment,
        private readonly getAppointmentsByInsuredId: GetAppointmentsByInsuredId
    ) {}


    async create(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        try {
            if (!event.body) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'Request body is required' })
                };
            }

            const requestData = JSON.parse(event.body);

            // Validación de datos
            if (!requestData.insuredId || !requestData.scheduleId || !requestData.countryISO) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({
                        message: 'Missing required fields: insuredId, scheduleId, or countryISO'
                    })
                };
            }

            // Caso de uso
            const result = await this.createAppointment.execute({
                insuredId: requestData.insuredId.toString(),
                scheduleId: requestData.scheduleId,
                countryISO: requestData.countryISO?.toString(),
            });

            return {
                statusCode: 202,
                body: JSON.stringify({
                    message: 'Appointment scheduling is in progress',
                    appointmentId: result.id
                })
            };
        } catch (error) {
            console.error('Error creating appointment', error);

            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'Error processing appointment request',
                    error: (error as Error).message
                })
            };
        }
    }

    async getByInsuredId(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        try {
            const insuredId = event.pathParameters?.insuredId;

            if (!insuredId) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ message: 'InsuredId is required' })
                };
            }

            const appointments = await this.getAppointmentsByInsuredId.execute(insuredId);

            return {
                statusCode: 200,
                body: JSON.stringify({
                    appointments: appointments.map((appointment) => ({
                        id: appointment.id,
                        insuredId: appointment.insuredId.toString(),
                        scheduleId: appointment.scheduleId,
                        countryISO: appointment.countryISO ? appointment.countryISO.toString() : "",
                        status: appointment.status,
                        createdAt: appointment.createdAt,
                        updatedAt: appointment.updatedAt
                    }))
                })
            };
        } catch (error) {
            console.error('Error getting appointments', error);

            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'Error retrieving appointments',
                    error: (error as Error).message
                })
            };
        }
    }
}