import {AppointmentServiceImpl} from "@src/application/services/AppointmentServiceImpl";
import {DynamoDBAppointmentRepository} from "@src/infrastructure/aws/dynamodb/DynamoDBAppointmentRepository";
import {SNSNotificationService} from "@src/infrastructure/aws/sns/SNSNotificationService";
import {CreateAppointment} from "@src/application/use-cases/CreateAppointment";
import {GetAppointmentsByInsuredId} from "@src/application/use-cases/GetAppointmentsByInsuredId";
import {AppointmentController} from "@src/infrastructure/http/controllers/AppointmentController";

const appointmentRepository = new DynamoDBAppointmentRepository();
const notificationService = new SNSNotificationService();

const appointmentService = new AppointmentServiceImpl(appointmentRepository, notificationService);

const createAppointment = new CreateAppointment(appointmentService);
const getAppointmentsByInsuredId = new GetAppointmentsByInsuredId(appointmentRepository);

export const appointmentController = new AppointmentController(createAppointment, getAppointmentsByInsuredId);
