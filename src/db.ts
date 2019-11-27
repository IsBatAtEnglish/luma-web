import { open, Database } from 'sqlite'

// Banco de dados que mapeia os access tokens da Luma em access tokens do OAuth.
let db: Database

(async () => {
    let t0 = Date.now()
    
    db = await open(process.env.DATABASE_FILE)

    await db.exec(`
        CREATE TABLE IF NOT EXISTS web_tokens (
            luma_token TEXT PRIMARY KEY NOT NULL UNIQUE,
            discord_token TEXT NOT NULL,
            expires TEXT NOT NULL
        );
    `)

    await db.exec(`
        CREATE TABLE IF NOT EXISTS guild_conf (
            guild_id TEXT PRIMARY KEY NOT NULL UNIQUE,
            prefix TEXT NOT NULL DEFAULT 'c.'
        );
    `)

    console.log(`Database aberta em ${Date.now() - t0}ms`)
})()

export default () => db