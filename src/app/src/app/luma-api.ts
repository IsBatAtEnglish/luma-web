import User from "./interfaces/user"
import Guild from "./interfaces/guild"

class LumaAPI {
    async OAuth() : Promise<void> {
        return new Promise(resolve => {
            // Abrir o popup onde ocorrerá a autenticação
            let oauth_window = window.open('/oauth/start', '_blank', 'width=400,height=480')

            let int = setInterval(() => {
                // Checar se a janela foi fechada.
                if(oauth_window.closed) {
                    clearInterval(int)
                    oauth_window = null
                    return false
                }

                if (oauth_window.location.pathname &&
                    oauth_window.location.pathname === '/oauth/done') {
                    // Finalizar OAuth
                    clearInterval(int)
                    oauth_window.close()
                    resolve()
                }
            }, 400)
        })
    }

    async getGuilds() : Promise<Guild[]> {
        let guilds = await fetch('/api/userGuilds')
                        .then(r => r.json())
        
        if (guilds.error)
            throw new Error('Lista de servidores não obtida: ' + guilds.error)

        return guilds
    }

    async getUser() : Promise<User> {
        let user = await fetch('/api/currentUser')
                        .then(r => r.json())
        
        if (!user.id)
            throw new Error('Usuário não obtido: ' + user.error)

        return user
    }
}

export default LumaAPI