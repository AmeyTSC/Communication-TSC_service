import { Injectable } from '@nestjs/common';
import { getorderEdd } from 'src/utils/getorderedd';
import { smsSent } from 'src/utils/sms_sent';
import { getTemplateDetail } from 'src/utils/whatsapp_template.attributes';
import { WhatsappTrigger } from 'src/Services/whatsapphit_error_logs.service';

@Injectable()
export class WhatsappStatusService {
  constructor(private readonly whatsappTrigger: WhatsappTrigger) {}

  async triggerTest(event: any) {
    try {
      const sqsRecord = event;
      const reqBody=JSON.parse(sqsRecord);
      const whatsappRequestBody = reqBody.template_attributes;
      //console.log('Data received: ', whatsappRequestBody);

      if (whatsappRequestBody.templateName === 'orderReceiveTemplate') {
        let responseEdd: any = {};
        try {
          // Fetch order EDD (Estimated Delivery Date)
          responseEdd = await getorderEdd(whatsappRequestBody.shopify_id);
        } catch (error) {
          console.error('Error fetching EDD: ', error.message);
          await this.whatsappTrigger.whatsapperror_log(
            whatsappRequestBody.order_id,
            `Error fetching EDD: ${error.message}`,
          );
        }

        if (
          responseEdd &&
          responseEdd.metafields &&
          responseEdd.metafields.length
        ) {
          try {
            const metafieldValue = JSON.parse(responseEdd.metafields[0].value);
            const { edd_min, edd_max } = metafieldValue.orderEDD;
            whatsappRequestBody.dataRange = {
              start: formatData(edd_min),
              end: formatData(edd_max),
            };
          } catch (error) {
            console.error('Error parsing metafield value: ', error.message);
            await this.whatsappTrigger.whatsapperror_log(
              whatsappRequestBody.order_id,
              `Error parsing metafield value: ${error.message}`,
            );
            whatsappRequestBody.templateName = 'orderReceiveEdd';
          }
        } else {
          whatsappRequestBody.templateName = 'orderReceiveEdd';
        }
      }
      try {
        const templateInfo = await getTemplateDetail(whatsappRequestBody);
        const whatsappResponse = await smsSent(templateInfo);
        await this.whatsappTrigger.whatsapphit_log(whatsappResponse, {
          templateAttributes: whatsappRequestBody,
        });
        console.log('SMS sent and logged successfully');
      } catch (error) {
        console.error('Error sending SMS or logging response: ', error.message);
        await this.whatsappTrigger.whatsapperror_log(
          whatsappRequestBody.order_id,
          `Error sending SMS or logging response: ${error.message}`,
        );
      }
    } catch (error) {
      console.error('Error processing event:', error.message);
    }
  }
}

function formatData(inputData: string) {
  if (!inputData) return null;
  const cleanedText = inputData.replace(/<\/?sup>/g, '');
  const match = cleanedText.match(/\b\d{1,2}(st|nd|rd|th)\s[a-zA-Z]+\b/g);
  return match ? match[0] : null;
}
