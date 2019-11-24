class LumaAPI {
    private API_BASE_URL: string = ''
    async getGuilds() : Promise<void> {
        
    }

    OAuth() : Promise<string> {
        return new Promise(resolve => {
            // Abrir o popup onde ocorrerá a autenticação
            let oauth_window = window.open('https://discordapp.com/api/oauth2/authorize?client_id=614506634768547850&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Foauth%2Fend&response_type=code&scope=identify', '_blank', 'width=300,height=480')

            let int = setInterval(() => {
                // Checar se a janela foi fechada.
                if(oauth_window.closed) {
                    clearInterval(int)
                    oauth_window = null
                    return false
                }

                if (oauth_window.location.pathname &&
                    oauth_window.location.pathname === '/oauth/end') {
                    // Procurar metadados na hash (#...) na URL do popup 
                    let data = oauth_window.location.hash.slice(1)

                    // Finalizar OAuth
                    if (data) resolve(data)

                    clearInterval(int)
                    oauth_window.close()
                }
            }, 100)
        })
    }

    // Faz login com o token retornado no OAuth.
    async login(tok: string) {}
}

export default LumaAPI