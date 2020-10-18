import { Express, Router } from "express"
import HomeController from "./homeController";

const router = Router()
const homeController = new HomeController()

export const init = (app: Express) => {
  router.get('/', homeController.getHome)

  app.use(router)
}