import Koa from 'koa'
import Router from 'koa-router'
import fetch from 'node-fetch'
import exchangeCode from './lib/oauth.codeexchange'

// Escopos para o OAuth
const SCOPE = ['identify', 'guilds'].join(' ')

const OAuthRouter = new Router({
    prefix: '/oauth'
})


// A URL de início do OAuth.
OAuthRouter.get('/start', (ctx: Koa.Context) => {
    // Redirecionar para a página de autenticação do Discord.
    ctx.redirect(`https://discordapp.com/api/oauth2/authorize`+
                 `?client_id=${process.env.CLIENTID}`+
                 `&redirect_uri=${encodeURIComponent(process.env.REDIRECT_HOSTNAME + '/oauth/postauth')}`+
                 `&response_type=code`+
                 `&scope=${encodeURIComponent(SCOPE)}`)
})

// A página de autenticação do Discord redireciona para essa rota com os seguintes parâmetros:
// ?code=...        Código de autenticação do OAuth
OAuthRouter.get('/postauth', async (ctx: Koa.Context) => {
    let code: string = ctx.query.code

    if (code) {
        // Usar o código fornecido pelo Discord para obter um token de autenticação do OAuth2
        let resp = await exchangeCode(code, SCOPE)

        if (resp.error) { 
            // Houve um erro na troca do código por um token, código inválido?
            ctx.redirect('/oauth/start')
            console.error(`Erro ao trocar o código do OAuth por um token:`, resp)
            return
        }

        ctx.body = resp
    } else {
        // Se o código não puder ser lido, forçar o usuário a fazer login novamente
        ctx.redirect('/start')
    }
})

export default OAuthRouter