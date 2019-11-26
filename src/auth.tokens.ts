import db from './db'
import { isOAuthTokenValid } from './lib/oauth.utils'

/**
 * Gera uma string aleatória para ser usada nos tokens de acesso.
 */
const generateAuthTokenString = () : string => {
    let randNumb1 = (Math.random() * 1000).toString(36)
    let randNumb2 = (Math.random() * 1000).toString(36)
    let randNumb3 = (Math.random() * 1000).toString(36)

    return encodeURIComponent(randNumb1 + randNumb2 + randNumb3)
}

/**
 * Retorna um token OAuth através de um token de acesso Luma.
 * @param lumaToken Token de acesso Luma.
 */
const getOAuthToken = async (lumaToken: string) : Promise<string> => {
    let token: any = await db().get(`
        SELECT * FROM web_tokens WHERE luma_token = ?
    `, lumaToken)

    if (!token.discord_token)
        throw new Error('Token inválido ou não existe')

    // Verificar se o token está expirado (velho demais)
    if (new Date() > new Date(token.expires)) {
        // Remover do banco de dados
        await db().run(`
            DELETE FROM web_tokens WHERE luma_token = ?
        `, lumaToken)
        throw new Error('Token inválido ou não existe')
    }

    return token.discord_token
}

/**
 * Guarda o token OAuth no banco de dados e retorna um token Luma.
 * @param oauthToken Token obtido através do OAuth
 * @param expires Validade do token, em segundos.
 */
const storeOAuthToken = async (oauthToken: string, expires: number) : Promise<string> => {
    let lumaToken: string = generateAuthTokenString()

    await db().run(`
        INSERT INTO web_tokens (luma_token, discord_token, expires)
        VALUES (?, ?, ?);
    `, lumaToken, oauthToken, new Date(Date.now() + expires * 1000).toISOString())

    return lumaToken
}

/**
 * Verifica se um token Luma é válido.
 * @param lumaToken Token de acesso Luma.
 */
const isLumaTokenValid = async (lumaToken: string) : Promise<boolean> => {
    try {
        let oauthToken = await getOAuthToken(lumaToken)
        return await isOAuthTokenValid(oauthToken)
    } catch(ex) {
        return false
    }
}

export { getOAuthToken, storeOAuthToken, generateAuthTokenString, isLumaTokenValid }