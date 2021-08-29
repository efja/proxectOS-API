import { IRouter, Router } from 'express';
const router = Router();
/**
 * Función que conten as rutas da aplicación
 *
 * @returns router
 */
function routes(): IRouter {
  router.get('/', (req, res) => {
    res.json('Proba api v1 ProxectOS');
  });

  return router;
};

export default routes;
