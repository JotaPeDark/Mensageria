const amqp = require("amqplib");
const { urlRabbitMQ, nomeDaFila } = require("./config");

async function iniciarConsumidor() {
  const conexao = await amqp.connect(urlRabbitMQ);
  const canal = await conexao.createChannel();
  await canal.assertQueue(nomeDaFila, { durable: true });

  console.log("Aguardando mensagens na fila:", nomeDaFila);

  canal.consume(nomeDaFila, (mensagem) => {
    if (mensagem) {
      console.log(`Mensagem recebida: ${mensagem.content.toString()}`);
      canal.ack(mensagem);
    }
  });
}

module.exports = iniciarConsumidor;