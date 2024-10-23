import { Injectable,  Logger, OnModuleInit  } from '@nestjs/common';
import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import { WhatsappStatusService } from 'src/Services/whatsapp_status.service';
import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + '/.env' });

@Injectable()
export class WhatsappSqsPollingService { //implements OnModuleInit
  private sqsClient: SQSClient;
  private QUEUE_URL: string;
  private readonly logger = new Logger(WhatsappSqsPollingService.name);

  constructor(private readonly whatsappStatusService: WhatsappStatusService) {
    this.sqsClient = new SQSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECERT_KEY,
      },
    });
    this.QUEUE_URL =process.env.SQS_URL_TEST;
  }
 
  // onModuleInit() {
  //   this.startPolling(); // Start polling when the module initializes
  // }

async startPolling() {
  await this.pollSqs();
}

  private async pollSqs() {
    const params = {
      QueueUrl: this.QUEUE_URL,
      WaitTimeSeconds: 15,
      MaxNumberOfMessages: 1, 
      VisibilityTimeout: 30,
    };

    try {
      const command = new ReceiveMessageCommand(params);
      const response = await this.sqsClient.send(command);
      this.logger.log("Polling SQS for messages...");
      
      if (response.Messages && response.Messages.length > 0) {
        for (const message of response.Messages) {
          this.logger.log("Received SQS message after delay");
          await this.whatsappStatusService.triggerTest(message.Body); // Process the message
          await this.deleteMessage(message.ReceiptHandle); // Delete message after processing
        }
      } else {
        this.logger.log("No messages available to process.");
      }
    } catch (error) {
      this.logger.error('Error polling SQS:', error);
    }
    finally {
      // Set a delay to match the SQS Delay Queue of 5 minutes
      setTimeout(() => this.pollSqs(), 5 * 60 * 1000); 
    }
  }

  private async deleteMessage(receiptHandle: string) {
    const params = {
      QueueUrl: this.QUEUE_URL,
      ReceiptHandle: receiptHandle,
    };

    try {
      const command = new DeleteMessageCommand(params);
      await this.sqsClient.send(command);
      this.logger.log('Message successfully deleted from SQS');
      
    } catch (error) {
      this.logger.error('Error deleting message from SQS:', error);
    }
  }
}
