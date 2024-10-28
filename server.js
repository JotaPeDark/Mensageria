const express = require("express");
const enviarMensagem = require("./produtor");
const iniciarConsumidor = require("./consumidor");

const app = express();
const PORTA = 3000;

app.use(express.json());

app.post("/enviar", async (req, res) => {
  const { mensagem } = req.body;
  if (!mensagem) {
    return res.status(400).json({ erro: "Mensagem é obrigatória" });
  }

  try {
    await enviarMensagem(mensagem);
    res.status(200).json({ sucesso: "Mensagem enviada com sucesso" });
  } catch (erro) {
    console.error("Erro ao enviar mensagem:", erro);
    res.status(500).json({ erro: "Erro ao enviar mensagem" });
  }
});

app.listen(PORTA, () => {
  console.log(`Servidor rodando na porta ${PORTA}`);
  iniciarConsumidor();
});