class LumaAPI {
    async getGuilds() : Promise<void> {
        
    }

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

    // Faz login com o token retornado no OAuth.
    async login(tok: string) {}
}

export default LumaAPI