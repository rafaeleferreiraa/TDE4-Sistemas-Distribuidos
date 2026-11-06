const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const INSTANCE_ID = process.env.INSTANCE_ID || `Instancia-${PORT}`;

let isHealthy = true;

app.get('/', (req, res) => {
  if (!isHealthy) {
    return res.status(500).json({ error: `${INSTANCE_ID} está fora do ar.` });
  }
  res.json({
    message: "Bem-vindo à ShopNow (Docker)!",
    servedBy: INSTANCE_ID,
    timestamp: new Date()
  });
});

app.get('/health', (req, res) => {
  if (!isHealthy) {
    return res.status(500).send('UNHEALTHY');
  }
  res.status(200).send('OK');
});

app.post('/simulate-crash', (req, res) => {
  isHealthy = false;
  console.log(`[ALERTA] ${INSTANCE_ID} simulou uma falha!`);
  res.send(`${INSTANCE_ID} agora está desativada.`);
});

app.listen(PORT, () => {
  console.log(`🛒 ShopNow ${INSTANCE_ID} rodando na porta ${PORT}`);
});