import {appointmentController} from '@src/infrastructure/config/DependencyInjection';
import {HealthController} from '@src/infrastructure/http/controllers/HealthController';
import {APIGatewayProxyEvent, APIGatewayProxyResult} from 'aws-lambda';

export class Router {
    private healthController: HealthController;

    constructor() {
        this.healthController = new HealthController();
    }

    async route(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        const {httpMethod, path, resource} = event;

        // Health check endpoint
        if (httpMethod === 'GET' && path === '/health') {
            return this.healthController.getStatus(event);
        }

        // Appointment endpoints
        if (httpMethod === 'POST' && path === '/appointments') {
            return appointmentController.create(event);
        }

        if (httpMethod === 'GET' && resource === '/appointments/{insuredId}') {
            return appointmentController.getByInsuredId(event);
        }

        // Ruta no encontrada
        return {
            statusCode: 404,
            body: JSON.stringify({
                message: 'Not Found',
                path,
                method: httpMethod
            })
        };
    }
}