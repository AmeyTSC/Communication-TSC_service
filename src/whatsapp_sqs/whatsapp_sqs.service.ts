import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand} from '@aws-sdk/client-sqs';
import { WhatsappLogService } from '../Services/whatsapp-logcreate.service';
import { WhatsappSqsPollingService } from '../Services/sqs_polling.service';
import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + '/.env' });

@Injectable()
export class WhatsappSqsService {
  private sqsClient: SQSClient;
  private QUEUE_URL: string;

  constructor(
    private readonly whatsappLogService: WhatsappLogService,
    private readonly whatsappSqsPollingService: WhatsappSqsPollingService,
  ) {
    // Initialize the SQS client with credentials
    this.sqsClient = new SQSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey:
          process.env.AWS_SECERT_KEY,
      },
    });
    this.QUEUE_URL =process.env.SQS_URL_TEST;
  }
  // Method to send message to SQS
  async sendMessageToSqs(templateAttributes: any): Promise<any> {
    const params = {
      QueueUrl: this.QUEUE_URL,
      MessageBody: JSON.stringify({ template_attributes: templateAttributes }),
      DelaySeconds: 300, // Delays the message visibility by 5 minutes
    };

    try {
      const command = new SendMessageCommand(params);
      await this.whatsappSqsPollingService.startPolling(); // Start polling (if needed)
      await this.sqsClient.send(command); // Send message to SQS
      await this.whatsappLogService.createLog(templateAttributes); // Log the message
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
