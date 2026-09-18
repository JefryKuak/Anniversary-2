import cors from 'cors';
import express from 'express';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Endpoint kecil untuk memastikan frontend dan backend sudah saling terhubung.
app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', message: 'The anniversary API is ready ♡' });
});

app.listen(port, () => {
  console.log(`Anniversary API running at http://localhost:${port}`);
});
