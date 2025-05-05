import path from 'path';
import app from './app';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
dotenv.config();

const PORT = process.env.PORT || 3000;
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs',  swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`API documentation is available at http://localhost:${PORT}/api-docs`);
});
