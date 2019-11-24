import Keyv from 'keyv'

// Banco de dados que mapeia os access tokens da Luma em access tokens do OAuth.
const AuthTokens: Keyv<string> = new Keyv(process.env.DATABASE_URL, { namespace: 'web-auth-tokens' })

export { AuthTokens }