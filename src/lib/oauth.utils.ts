import fetch from 'node-fetch'

// Troca um código do OAuth2 por um token de acesso.
const exchangeCode = async (code: string, scope: string) => {
    let body = new URLSearchParams()
        body.append('client_id', process.env.CLIENTID)
        body.append('client_secret', process.env.CLIENTSECRET)
        body.append('grant_type', 'authorization_code')
        body.append('code', code)
        body.append('redirect_uri', `${process.env.REDIRECT_HOSTNAME}/oauth/postauth`)
        body.append('scope', scope)

    let resp = 
        await fetch(`https://discordapp.com/api/oauth2/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            //@ts-ignore
            body: body
        }).then(r => r.json())

    return resp
}

export default exchangeCode