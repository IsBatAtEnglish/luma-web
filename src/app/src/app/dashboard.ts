import LumaAPI from './luma-api'

const $ = document.querySelector.bind(document)

class Dashboard {
    public page: string = 'prefix' // prefix|commands
    public serverid: string = ''

    public switchServer(serverid: string) : Promise<void> {
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

                    serverlist.appendChild(server)
                }
            })

        // Tornar a overlay visível
        overlay.classList.add('visible')
    }
}

export default new Dashboard