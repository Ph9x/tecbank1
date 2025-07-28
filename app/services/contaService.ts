import { api } from './conectServer';
import { getToken } from './tokenService';

//MOSTRAR OS DADOS DA CONTA
export async function buscarConta() {
    const token = await getToken();

    if (!token) {
        console.log("Usuário não autenticado");
        return null;
    }

    try {
        const response = await api("/usuario/conta", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        return response;

    } catch (error) {
        console.error("Erro ao buscar conta:", error);
        return null;
    }
}

//MOSTRA O NOME DO USUÁRIO
export async function nomeUsuario() {
    const token = await getToken();     //ARMAZENA OS DADOS DO TOKEN

    if (!token) {
        console.log("Usuário não identificado");
        return null;
    }

    try {
        const response = await api("/usuario/nome", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        return response;
    }catch(error){
        console.error("Erro ao buscar nome",error);
        return null
    }
    
}
