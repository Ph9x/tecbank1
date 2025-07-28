import { api } from "./conectServer";

//FAZER O LOGIN
export async function login(cpf: string, senha: string) {
    return await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({
            cpf: cpf.replace(/\D/g, ""),    //REMOVE OS DADOS NÃO NÚMERICOS QUE EU COLOCO PARA PREENCHER OS DADOS NO FRONT-END
            senha: senha,
        }),
    });
}
