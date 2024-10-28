const amqp = require("amqplib");
const { urlRabbitMQ, nomeDaFila } = require("./config");

async function enviarMensagem(mensagem) {
  const conexao = await amqp.connect(urlRabbitMQ);
  const canal = await conexao.createChannel();
  await canal.assertQueue(nomeDaFila, { durable: true });

  canal.sendToQueue(nomeDaFila, Buffer.from(mensagem), { persistent: true });
  console.log(`Mensagem enviada: ${mensagem}`);

  await canal.close();
  await conexao.close();
}

module.exports = enviarMensagem;