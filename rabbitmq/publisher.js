/* RabbitMQ */
const amqp = require("amqplib");

const msg = { number: process.argv[2] };
connect();
async function connect() {
  try {
    const amqpServer =
      "amqps://aenuiqlj:x5bOVucl-zYDc517jvEN01zymSc1jZPR@collie.lmq.cloudamqp.com/aenuiqlj";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    await channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
    console.log(`Job sent successfully ${msg.number}`);
    await channel.close();
    await connection.close();
  } catch (ex) {
    console.error(ex);
  }
}
