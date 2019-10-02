import express from 'express';
// import swaggerJsDoc from 'swagger-jsdoc';
// import swaggerUi from 'swagger-ui-express';
// import * as swaggerDoc from './document/swagger.json';
import apiVersion from './helpers';

const router = express.Router();

// const swaggerOptions = {
//   swaggerDefinition: {
//     info: {
//       title: 'Teamwork API V1',
//       description: 'Articles Information',
//       contact: {
//         email: 'joelatiam@googlemail.com',
//       },
//           servers: [`${process.env.PORT}${apiVersion}`],
//     },
//   },
//   apis: ['.routes/*.js'],
// //   apis: ['index.js'],
// };


// const SwaggerJSDoc = swaggerJsDoc(swaggerDoc);
// console.table(SwaggerJSDoc)

// router.use(`${apiVersion}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const postmanAPI = 'https://documenter.getpostman.com/view/7381509/SVn3tFRQ?version=latest#4646ba70-cc0d-48a5-85a4-ffe347602349';

router.get(`${apiVersion}/docs`, (req, res) => res.redirect(postmanAPI));

export default router;
