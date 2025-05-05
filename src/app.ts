import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/index'
// import jokeRoutes from './routes/joke.routes';
// import mathRoutes from './routes/math.routes';
// import swaggerUi from 'swagger-ui-express';
// import swaggerDocument from './swagger.yaml';

dotenv.config();

const app = express();

// Middleware para manejar solicitudes JSON
app.use(express.json());

app.use('/api', apiRoutes)
// Rutas
// app.use('/api/jokes', jokeRoutes);
// app.use('/api/math', mathRoutes);

// Swagger UI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
  res.send('Microservicio API en Node.js');
});

export default app;
