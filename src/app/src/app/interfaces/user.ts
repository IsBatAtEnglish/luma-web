import Guild from "./guild.js"

interface User {
    id: string,
    username: string,
    discriminator: string,
    avatar: string,
    guilds: Guild[]
}

export default User