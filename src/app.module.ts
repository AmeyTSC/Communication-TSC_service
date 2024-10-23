import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { WhatsappDevModule } from './whatsapp_dev/whatsapp_dev.module';
import { WhatsappSqsModule } from './whatsapp_sqs/whatsapp_sqs.module';
import { GetwhatsappstatusModule } from './getwhatsappstatus/getwhatsappstatus.module';
import { GupshupmsgrepModule } from './gupshupmsgrep/gupshupmsgrep.module';
import * as dotenv from 'dotenv';
dotenv.config({ path: process.cwd() + '/.env' }); 

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE),WhatsappDevModule, WhatsappSqsModule,  GetwhatsappstatusModule, GupshupmsgrepModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
