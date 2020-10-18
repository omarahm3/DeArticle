import express, { Request } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import expressStatusMonitor from 'express-status-monitor'
import connectTimeout from 'connect-timeout'
import chalk from 'chalk'
import { getConfig } from './services/util'
import routes from './routes'
import morgan from 'morgan'
import path from 'path'

const app   = express();
const port  = getConfig('mode') === 'production' ? process.env.PORT : getConfig('port');

const haltOnTimeout = (req: Request, _: any, next: any) => {
  if (!req.timedout) next()
}

app.set( 'views', path.join( __dirname, 'views' ) )
app.set( 'view engine', 'ejs' )
app.use(connectTimeout('1m'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(expressStatusMonitor())
app.use(morgan('dev'))
app.use(haltOnTimeout)

const start = () => {
  app.listen(port, () => {
    console.log(chalk.yellow('........................................................')) // eslint-disable-line
    console.log(chalk.green(`Name:\t\t${getConfig('name')}`)) // eslint-disable-line
    console.log(chalk.green(`Port:\t\t${port}`)) // eslint-disable-line
    console.log(chalk.green(`Mode:\t\t${getConfig('mode')}`)) // eslint-disable-line
    console.log(chalk.green('Maintainer:\tme@mrg.sh')) // eslint-disable-line
    console.log(chalk.yellow('........................................................')) // eslint-disable-line
  })
}


(async () => {
  await routes(app)
  start();
})()