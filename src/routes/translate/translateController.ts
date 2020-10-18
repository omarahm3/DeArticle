import { Request, Response } from "express"
import { spawn } from 'child_process'
import path from 'path'

function getArticle(line: string) {
  console.log('getArticle::: line', line)
  if (!line) {
    return null;
  }
  const words = line.split(',').map((word: string) => word.trim())
  return words.length === 2 ? words[1] : null;
}

function executeCommand(word: string) {
  const dudenPath = path.resolve(__dirname, '../../../duden/run_duden.py')
  console.log('executeCommand::: current dir', __dirname)
  console.log('executeCommand::: duden path', dudenPath)
  return spawn('python', [dudenPath, word])
}

class TranslateController {
  async postTranslate(req: Request, res: Response) {
    const word = req.body?.word

    if (!word) {
      return res.json({
        success: false,
        message: 'Word cannot be empty'
      })
    }

    const dudenCommand  = executeCommand(word)
    let output          = ''

    dudenCommand.stdout.on('data', (data: BinaryType) => {
      output += data.toString()
      console.log(output)
    })

    dudenCommand.on('error', (err) => {
      console.log('dudenCommand::: Error', err)
    })

    dudenCommand.on('exit', () => {
      const lines   = output.split('\n').filter(line => line !== '')
      const article = getArticle(lines[0])

      if (article) {
        return res.json({
          success: true,
          article
        })
      }

      return res.json({
        success: false,
        message: 'Could not find the article'
      })
    })
  }
}

export default TranslateController