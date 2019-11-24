import './lib/env' // carregar dotenv

import Koa from 'koa'
import KoaStatic from 'koa-static'

import { resolve } from 'path'

import OAuth from './oauth.router'
import LumaAPI from './luma.api'

const app = new Koa()

app.use(KoaStatic(resolve(__dirname, 'public/'), {}))
app.use(LumaAPI.routes()).use(LumaAPI.allowedMethods())
app.use(OAuth.routes()).use(OAuth.allowedMethods())

app.listen(process.env.PORT, () =>
    console.log(`O app está servindo na porta ${process.env.PORT}`))