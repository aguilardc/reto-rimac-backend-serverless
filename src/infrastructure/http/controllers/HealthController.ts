import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export class HealthController {
    async getStatus(event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        try {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    status: 'ok',
                    service: 'medical-appointment-system',
                    timestamp: new Date().toISOString()
                })
            };
        } catch (error) {
            console.error('Error checking health', error);

            return {
                statusCode: 500,
                body: JSON.stringify({
                    message: 'Error checking health status',
                    error: (error as Error).message
                })
            };
        }
    }
}