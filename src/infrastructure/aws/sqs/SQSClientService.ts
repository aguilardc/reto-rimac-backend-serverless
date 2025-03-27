import { SQS } from 'aws-sdk';

export class SQSClientService {
    private readonly sqs: SQS;

    constructor() {
        this.sqs = new SQS();
    }

    async sendMessage(queueUrl: string, message: any): Promise<void> {
        const params = {
            QueueUrl: queueUrl,
            MessageBody: JSON.stringify(message)
        };

        await this.sqs.sendMessage(params).promise();
    }
}