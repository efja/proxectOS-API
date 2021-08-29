import { IRouter, Router } from 'express';


const api_version = process.env.npm_package_version;
const router = Router();

/**
 * Función que conten as rutas da aplicación
 *
 * @returns router
 */
function routes(): IRouter {
  router.get('/', (req, res) => {
    res.json(res.__('WELCOME', api_version));
  });

  return router;
};

export default routes;
