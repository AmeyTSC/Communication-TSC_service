import { credentials } from "./Constants";

export async function getTemplateDetail(template_attributes: any) {
    const {
      phoneNo = '',
      customerName = '',
      order_id: orderId = '',
      dateRange = { start: '', end: '' },
      templateName = '',
      trackURL = '',
      invoiceUrl = '',
      hours = '',
      productName = '',
      youtubeUrl = '',
    } = template_attributes;

    const phoneNumber = phoneNo ? phoneNo.slice(-10) : undefined;
    const urlIncludingPdf = invoiceUrl?.match(/.*\.pdf/i)?.[0] || '';

    const whatsappTemplates = {
      orderReceiveTemplate: {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${credentials.url}${phoneNumber}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AOrder+Placed%21%2A%0A%0AHi+${customerName}%2C+%0AYour+order+${orderId}+has+successfully+been+placed%21%0AThe+estimated+delivery+date+is+${dateRange.start}+-+${dateRange.end}.%0A%0AWe+will+share+the+tracking+link+with+you+when+your+order+is+shipped.+Click+here+for+more+details%3Ahttps%3A%2F%2Fthesleepcompany.in%2Faccount%23view%3Dorders%0A%0AThe+countdown+to+better+comfort+begins%21+%F0%9F%A4%97%0A%0AIf+you+have+any+queries%2C+write+to+us+at+care%40thesleepcompany.in%0AExperience+the+Revolutionary+Comfort.&isTemplate=true&footer=The+Sleep+Company`,
        headers: {},
      },

      orderReceiveEdd: {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${credentials.url}${phoneNumber}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AOrder+Placed%21%2A%0A%0AHi+${customerName}%2C+your+order+${orderId}+has+successfully+been+placed%21%0A%0AWe+will+share+the+tracking+link+with+you+when+your+order+is+shipped.+Click+here+for+more+details%3Ahttps%3A%2F%2Fthesleepcompany.in%2Faccount%23view%3Dorders%0A%0AThe+countdown+to+better+comfort+begins%21+%F0%9F%A4%97%0A%0AIf+you+have+any+queries%2C+write+to+us+at+care%40thesleepcompany.in%0AExperience+the+Revolutionary+Comfort&isTemplate=true&footer=The+Sleep+Company`,
        headers: {},
      },

      shippedTemplate: {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${credentials.url}${phoneNumber}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=%2AOrder+Shipped%21+%F0%9F%92%99%2A%0A%0AHi+${customerName}%2C+%0AYour+order+${orderId}+has+been+shipped+%21%0A%0AClick+on+the+link+to+track+your+order%3A+https%3A%2F%2Fthesleepcompany.in%2Faccount%23view%3Dorders%0A%0AThe+countdown+to+better+comfort+begins%21+%F0%9F%A4%97%0A%0AIf+you+have+any+queries%2C+write+to+us+at+care%40thesleepcompany.in%0AExperience+the+Revolutionary+Comfort&isTemplate=true&footer=The+Sleep+Company`,
        headers: {},
      },

      deliveredTemplate: {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${credentials.url}${phoneNumber}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Hi%20${customerName}%2C%0A%0AYour%20order%20has%20just%20arrived%20at%20your%20doorstep!%20%F0%9F%93%A6%0A%0AWe%20hope%20it%20brightens%20your%20day%20as%20much%20as%20it%20did%20ours%20delivering%20it%20to%20you!%0A%0APlease%20find%20the%20invoice%20details%20below%3A%0A${urlIncludingPdf}%0A%0AThank%20you%20for%20choosing%20The%20Sleep%20Company!`,
        headers: {},
      },

      installationNotification: {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${credentials.url}${phoneNumber}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Hi+${customerName}%21%0A%0AThank+you+for+purchasing+from+The+Sleep+Company+%21%F0%9F%92%99%0A%0AOur+installation+team+will+contact+you+within+${hours}+hours+to+schedule+an+appointment+as+per+your+convenience.%F0%9F%95%92%0A%0APlease+ensure+you+are+available+at+the+location+during+the+scheduled+time.%0A%0AGet+ready+to+experience+the+comfort+revolution%21%0AFor+queries+please+write+to+us+at+care%40thesleepcompany.in&isTemplate=true&footer=The+Sleep+Company`,
        headers: {},
      },

      installationVideoNotification: {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${credentials.url}${phoneNumber}&v=1.1&format=json&msg_type=TEXT&method=SENDMESSAGE&msg=Hi+${customerName}%21%0A%0AThank+you+for+purchasing+from+the+Sleep+Company%21+%F0%9F%8E%89%0A%0APlease+watch+the+linked+video+to+easily+set+up+your+${productName}+yourself%3A+${youtubeUrl}%0A%0AEnjoy+your+new+comfort+experience%21+%0AFor+any+questions%2C+please+email+us+at+care%40thesleepcompany.in&isTemplate=true&footer=The+Sleep+Company`,
        headers: {},
      },
    };
    try {
      return whatsappTemplates[templateName];
    } catch (error) {
      throw new Error(`Failed to save template: ${error.message}`);
    }
  }