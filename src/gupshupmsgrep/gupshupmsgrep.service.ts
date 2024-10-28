import { Injectable } from '@nestjs/common';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';
import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + '/.env' });

@Injectable()
export class GupshupmsgrepService {
  private sqsClient: SQSClient;
  private QUEUE_URL: string;
  constructor() {
    this.sqsClient = new SQSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECERT_KEY,
      },
    });
    this.QUEUE_URL = process.env.SQS_WHATSAPPREPORT;
  }

  async sqsReport(event: any) {
    const gupshup_data = event[0];
    const params = {
      QueueUrl: this.QUEUE_URL,
      MessageBody: JSON.stringify({
        gupshup_data,
      }),
      DelaySeconds: 120,
    };
    try {
      const command = new SendMessageCommand(params);
      await this.sqsClient.send(command);
      return {
        statusCode: 200,
        message: 'sqs created successfully',
      };
    } catch (error) {
      console.log(`Error Occured in sending msg to SQS: ${error.message}`);
      return {
        statusCode: 200,
        message: JSON.stringify(error.message),
      };
    }
  }
}
