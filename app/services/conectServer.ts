const BASE_URL = "http://coloque_seu_ip_aqui";        //QUANDO EU REINICAR O PC VER IP NOVO ipconfig

export async function api(endpoint: string, options?: RequestInit) {
    const url = `${BASE_URL}${endpoint}`;

    const defaultOptions: RequestInit = {
        headers: {
            "Content-Type": "application/json",
        },
        ...options,
    };

    try {
        const response = await fetch(url, defaultOptions);
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Erro de conexão com o servidor.");
    }
}
