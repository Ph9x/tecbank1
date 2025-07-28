import { getToken } from './tokenService'; // ou de onde você estiver pegando o token

export async function alterarSenha(senhaAtual: string, novaSenha: string, confirmarSenha: string) {
    const token = await getToken();

    if (!token) {
        console.log("Usuário não autenticado");
        return { success: false, message: "Usuário não autenticado" };
    }

    // Validação dos campos (local, sem necessidade de enviar ao servidor)
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
        console.log("Todos os campos são obrigatórios.");
        return { success: false, message: "Todos os campos são obrigatórios." };
    }

    // Validação das senhas (local)
    if (novaSenha !== confirmarSenha) {
        console.log("As senhas não coincidem");
        return { success: false, message: "As senhas não coincidem" };
    }

    // Verificar o comprimento da senha
    if (novaSenha.length < 6) {
        console.log("A nova senha deve ter pelo menos 6 caracteres.");
        return { success: false, message: "A nova senha deve ter pelo menos 6 caracteres." };
    }

    try {
        const response = await fetch("http://coloque_seu_ip_aqui/auth/trocar-senha", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                senhaAtual,
                novaSenha,
                confirmarSenha,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erro ao alterar senha:", errorData.error);
            return { success: false, message: errorData.error };
        }

        const data = await response.json();
        console.log("Senha alterada com sucesso:", data);
        return { success: true, message: "Senha alterada com sucesso", data };

    } catch (error) {
        console.error("Erro ao tentar alterar a senha:", error);
        return { success: false, message: "Erro ao tentar alterar a senha. Tente novamente mais tarde." };
    }
}
