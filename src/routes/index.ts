// ####################################################################################################
// ## IMPORTACIÓNS
// ####################################################################################################
import { IRouter, Router } from 'express';
import { ProjectRoutes } from './models/project.route';
import { CurrentUserRoutes } from './business-service/current-user.route';
import { AdminRoutes } from './business-service/admin.route';
import { SummaryRoutes } from './business-service/summary.route';

// ####################################################################################################
// ## CONSTANTES
// ####################################################################################################
const api_name = process.env.APP_NAME;
const api_version = process.env.npm_package_version;
const router = Router();

// ####################################################################################################
// ## RUTAS
// ####################################################################################################
/**
 * Función que conten as rutas da aplicación
 *
 * @returns router
 */
 export function routes(): IRouter {
  // Benvida
  router.get('/', (req, res) => {
    res.json(req.t('WELCOME', { app: api_name, version: api_version }));
  });

  // ************************************************************************************************
  // ** FUNCIONALIDADES
  // ************************************************************************************************
  // Información personal
  router.use('/me', new CurrentUserRoutes().getRoutes());

  // Admin
  router.use('/admin', new AdminRoutes().getRoutes());

  // Resumos
  router.use('/summaries', new SummaryRoutes().getRoutes());

  // ************************************************************************************************
  // ** MODELOS
  // ************************************************************************************************
  // Proxectos
  router.use('/projects', new ProjectRoutes().getRoutes());

  return router;
};
