import { api } from './conectServer';
import { getToken } from './tokenService';

export async function buscarSaldo() {
    const token = await getToken();

    if (!token) {
        console.log("Usuário não autenticado");
        return null;
    }

    try {
        const response = await api("/usuario/saldo", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

       return response;

    } catch (error) {
        console.error("Erro ao buscar saldo:", error);
        return null;
    }
}
