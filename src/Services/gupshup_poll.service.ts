import { Injectable, Logger } from "@nestjs/common";
import { SQSClient, ReceiveMessageCommand, DeleteMessageCommand } from '@aws-sdk/client-sqs';
import * as dotenv from 'dotenv';
import { GupshupUpdateStatus } from "./gupshupupdates.service";
dotenv.config({ path: process.cwd() + '/.env' });

@Injectable()
export class Gupshuprephooks{
  private sqsClient: SQSClient;
  private QUEUE_URL: string;
  private readonly logger = new Logger(Gupshuprephooks.name);

  constructor(private readonly gupshupStatus:GupshupUpdateStatus){
    this.sqsClient = new SQSClient({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECERT_KEY,
        },
      });
    this.QUEUE_URL =process.env.SQS_WHATSAPPREPORT
  }
  
  
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
            this.logger.log(`Received SQS message after delay ${message.Body}`);
            await this.gupshupStatus.UpdateGupshup(message.Body); // Process the message
            await this.deleteMessage(message.ReceiptHandle); // Delete message after processing
          }
        } else {
          this.logger.log("No messages available to process.");
        }
      } catch (error) {
        this.logger.error('Error polling SQS:', error);
      }
      finally {
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

