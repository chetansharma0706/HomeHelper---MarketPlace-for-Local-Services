import twilio from "twilio";

const accountSid = "ACf1b830f763f6258bd87c579d08069a10";
const authToken = "86a542dd7e0e30b1d647a8ab4c7748ff";

const client = twilio(accountSid, authToken);

export const sendSMS = async (to, body) => {
  try {
    await client.messages.create({
      body,
      from: "+12184754238",
      to,
    });
    console.log("Message Sent!");
  } catch (error) {
    console.error(error);
  }
};
