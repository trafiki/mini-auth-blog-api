import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use('/', (req, res) => res.status(200).send({
  message: 'Welcome to mini auth blog app',
}));

app.use('*', (req, res) => res.status(404).send({
  message: 'Endpoint not found',
}));

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));

export default app;
