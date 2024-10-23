import { Controller, Post ,Body} from '@nestjs/common';
import { GupshupmsgrepService } from './gupshupmsgrep.service';

@Controller('gupshupmsgrep')
export class GupshupmsgrepController {
    constructor(private readonly gushupservice:GupshupmsgrepService){}
    @Post()
    async gushupmsg(@Body() body: any){
        return this.gushupservice.sqsReport(body);
    }
}
