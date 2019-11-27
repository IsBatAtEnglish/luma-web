import LumaAPI from './luma-api'
import Guild from './interfaces/guild'
import { GuildConfig } from './interfaces/guild.config'

const $ = document.querySelector.bind(document)

class Dashboard {
    public page: string = 'prefix' // prefix|commands
    public curr_guild: Guild = null
    public config: GuildConfig = null

    public switchServer(guild: Guild) : void {
        let header: HTMLDivElement = $('.sidebar > .header > .server')
        let icon_e: HTMLDivElement = header.querySelector('.icon')
        let name_e: HTMLSpanElement = header.querySelector('.info > .name')
        let id_e: HTMLSpanElement = header.querySelector('.info > .id')

        this.curr_guild = guild    
        
        icon_e.setAttribute('style', `background-image: url('${LumaAPI.cdn_guild_icon(guild.id, guild.icon)}')`)
        name_e.innerText = guild.name
        id_e.innerText = `ID ${guild.id}`

        this.fetchGuildConfig()

        return
    }

    // Abre o popup para mudar o servidor.
    public openSwitchServers() : void {
        const serverlist: HTMLDivElement = $('.server-select-window > .serverlist')
        const overlay: HTMLDivElement = $('.server-select-overlay')

        // Remover lista de servidores antiga
        serverlist.innerHTML = ''

        LumaAPI.getGuilds()
            .then(guilds => {
                // Adicionar cada servidor à lista
                for (let guild of guilds) {
                    // Não adicionar à lista se não tiver as permissões necessárias
                    if (!LumaAPI.canManageGuild(guild.permissions)) continue

                    let server = document.createElement('div')
                    let icon = document.createElement('div')
                    let name = document.createElement('div')
                    let button = document.createElement('button')

                    icon.setAttribute('style', `background-image: url('${LumaAPI.cdn_guild_icon(guild.id, guild.icon)}')`)
                    name.innerText = guild.name
                    button.innerText = 'build'

                    server.appendChild(icon)
                    server.appendChild(name)
                    server.appendChild(button)

                    // Estilos
                    server.classList.add('server')
                    icon.classList.add('icon')
                    name.classList.add('name')
                    button.classList.add('action')

                    server.addEventListener('click', () => {
                        this.closeSwitchServers()
                        this.switchServer(guild)
                    })

                    serverlist.appendChild(server)
                }
            })

        // Tornar a overlay visível
        overlay.classList.add('visible')
    }

    public closeSwitchServers() : void {
        const overlay: HTMLDivElement = $('.server-select-overlay')

        overlay.classList.remove('visible')
    }

    /**
     * Baixa a configuração do servidor da API da Luma.
     * @param guild O servidor em questão
     */
    public async fetchGuildConfig(guild: Guild = this.curr_guild) : Promise<GuildConfig> {
        let conf: GuildConfig = await LumaAPI.getGuildConfig(guild.id)

        this.config = conf

        $("#prefix").value = conf.prefix

        return conf
    }
}

export default new Dashboard