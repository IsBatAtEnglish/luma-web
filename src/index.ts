import './lib/env' // carregar dotenv

import Koa from 'koa'

import OAuth from './oauth.router'

const app = new Koa()

app.use(OAuth.routes()).use(OAuth.allowedMethods())

app.listen(process.env.PORT, () =>
    console.log(`O app está servindo na porta ${process.env.PORT}`))