import { Request, Response } from "express"

class HomeController {
  getHome(req: Request, res: Response) {
    res.render('pages/home');
  }

}

export default HomeController