import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import * as dotenv from 'dotenv';
import { EmailLogService } from 'src/Services/email_logs.service';
dotenv.config({ path: process.cwd() + '/.env' });

@Injectable()
export class EmailSqsService {
  private sqsClient: SQSClient;
  private QUEUE_URL: string;

  constructor(private readonly emailLogs:EmailLogService) {
    // Initialize the SQS client with credentials
    this.sqsClient = new SQSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECERT_KEY,
      },
    });
    this.QUEUE_URL = process.env.SQS_EMAIL_URL;
  }
  async sendMessageToSqs(templateAttributes: any): Promise<any> {
    const params = {
      QueueUrl: this.QUEUE_URL,
      MessageBody: JSON.stringify({ template_attributes: templateAttributes }),
      DelaySeconds: 300, // Delays the message visibility by 5 minutes
    };

    try {
      const command = new SendMessageCommand(params);
      await this.sqsClient.send(command); // Send message to SQS
      await this.emailLogs.createLog(templateAttributes); // Log the message
      return {
        statusCode: 200,
        message: 'Data creation successfully!',
      };
    } catch (error) {
      console.error('Error sending message to SQS:', error);
      return {
        statusCode: 500,
        message: 'Failed to send message',
        error: error.message,
      };
    }
  }
}
