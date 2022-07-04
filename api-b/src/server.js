import app from "./app.js";
import amqplib from "amqplib";
import FolhasController from "./app/controllers/FolhasController.js";

const PORT = 3001;

const consumer = async () => {
  const queue = 'api-b';
  const conn = await amqplib.connect('amqp://admin:admin@rabbitmq:5672');

  const ch1 = await conn.createChannel();
  await ch1.assertQueue(queue);

  // Listener
  ch1.consume(queue, (msg) => {
    if (msg !== null) {
      console.log('Recieved:', msg.content.toString());
      FolhasController.addFolhas(JSON.parse(msg.content.toString()));
      ch1.ack(msg);
    } else {
      console.log('Consumer cancelled by server');
    }
  });
}

consumer();

app.listen(PORT, () => {
  console.log("Server B is running on port 3001");
});
