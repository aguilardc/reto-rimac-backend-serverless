import { DynamoDB } from 'aws-sdk';
import { Appointment } from '@src/domain/entities/Appointment';
import { InsuredId } from '@src/domain/value-objects/InsuredId';
import { CountryISO } from '@src/domain/value-objects/CountryISO';
import { AppointmentRepositoryMySQL } from '@src/domain/interfaces/repositories/AppointmentRepositoryMySQL';
import {AppointmentRepositoryDynamo} from "@src/domain/interfaces/repositories/AppointmentRepositoryDynamo";

export class DynamoDBAppointmentRepository implements AppointmentRepositoryDynamo {
    private readonly dynamoDb: DynamoDB.DocumentClient;
    private readonly tableName: string;

    constructor() {
        this.dynamoDb = new DynamoDB.DocumentClient();
        this.tableName = process.env.DYNAMODB_TABLE || '';
    }

    async save(appointment: Appointment): Promise<void> {
        const params = {
            TableName: this.tableName,
            Item: {
                id: appointment.id,
                insuredId: appointment.insuredId.toString(),
                scheduleId: appointment.scheduleId,
                countryISO: appointment.countryISO?.toString(),
                status: appointment.status,
                createdAt: appointment.createdAt.toISOString(),
                updatedAt: appointment.updatedAt.toISOString()
            }
        };

        await this.dynamoDb.put(params).promise();
    }

    async update(appointment: Appointment): Promise<void> {
        const params = {
            TableName: this.tableName,
            Key: { id: appointment.id },
            UpdateExpression: 'set #status = :status, updatedAt = :updatedAt',
            ExpressionAttributeNames: { '#status': 'status' },
            ExpressionAttributeValues: {
                ':status': appointment.status,
                ':updatedAt': appointment.updatedAt.toISOString()
            }
        };

        await this.dynamoDb.update(params).promise();
    }

    async findById(id: string): Promise<Appointment | null> {
        const params = {
            TableName: this.tableName,
            Key: { id }
        };

        const result = await this.dynamoDb.get(params).promise();

        if (!result.Item) {
            return null;
        }

        return this.mapToDomain(result.Item);
    }

    async findByInsuredId(insuredId: InsuredId): Promise<Appointment[]> {
        const params = {
            TableName: this.tableName,
            IndexName: 'InsuredIdIndex',
            KeyConditionExpression: 'insuredId = :insuredId',
            ExpressionAttributeValues: {
                ':insuredId': insuredId.toString()
            }
        };

        const result = await this.dynamoDb.query(params).promise();

        return (result.Items || []).map(item => this.mapToDomain(item));
    }

    private mapToDomain(item: any): Appointment {
        return new Appointment({
            id: item.id,
            insuredId: new InsuredId(item.insuredId),
            scheduleId: item.scheduleId,
            countryISO: new CountryISO(item.countryISO),
            status: item.status,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt)
        });
    }
}