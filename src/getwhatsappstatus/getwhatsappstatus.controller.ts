import { Controller, Get, Query, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { GetWhatsappLog } from './getwhatsapplog.service';

@Controller('logs')
export class GetwhatsappstatusController {
  constructor(
    private readonly getLogsService: GetWhatsappLog,
  ) {}

  @Get()
  async getWhatsappLogs(
    @Query('created_at') createdAt: string,
    @Res() res: Response,
  ) {
    try {
      const result = await this.getLogsService.getwhatsapplogs(createdAt);
      // return res.status(HttpStatus.OK).json({
      //   message: 'Success',
      //   ...result,
      // });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
