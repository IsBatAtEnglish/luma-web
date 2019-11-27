interface GuildConfig {
    guild_id: string,
    prefix: string
}

const defaults = (guild_id: string) : GuildConfig => {
    let defaults: GuildConfig = {
        guild_id: guild_id,
        prefix: 'c.'
    }

    return defaults
}

export { GuildConfig, defaults }