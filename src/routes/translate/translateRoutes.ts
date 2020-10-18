import { Express, Router } from "express"
import TranslateController from "./translateController";

const router = Router()
const translateController = new TranslateController()

export const init = (app: Express) => {
  router.post('/translate', translateController.postTranslate)

  app.use(router)
}