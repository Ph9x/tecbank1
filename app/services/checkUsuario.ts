import { api } from "./conectServer";

//FUNÇÃO PARA CONSULTAR O CPF E VER SE ELE EXISTE
export async function checkCpf(cpf: string): Promise<boolean> {
  try {
    const data = await api("/auth/check-cpf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cpf }),
    });

    console.log("Dados da resposta da API:", data);
    return data.exists === true;  //ACESSA OS DADOS DA MINHA API E FAZ VERIFICAÇÃO
  } catch (error) {
    console.log("Erro ao verificar CPF:", error);
    return false;
  }
}

//FUNÇÃO PARA CONSULTAR O E-MAIL E VER SE ELE EXISTE
export async function checkEmail(email: string): Promise<boolean> {
  try {
    const data = await api("/auth/check-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    console.log("Dados da resposta da API:", data);
    return data.exists === true;  //ACESSA OS DADOS DA MINHA API E FAZ VERIFICAÇÃO
  } catch (error) {
    console.log("Erro ao verificar E-mail:", error);
    return false;
  }
}


//FUNÇÃO PARA CONSULTAR O CELULAR E VER SE ELE EXISTE
export async function checkCelular(celular: string): Promise<boolean> {
  try {
    const data = await api("/auth/check-celular", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ celular }),
    });

    console.log("Dados da resposta da API:", data);
    return data.exists === true;  //ACESSA OS DADOS DA MINHA API E FAZ VERIFICAÇÃO
  } catch (error) {
    console.log("Erro ao verificar Celular:", error);
    return false;
  }
}



//FUNÇÃO PARA CONSULTAR A SENHA E VER SE ELA É IGUAL
export async function checkSenha(senha: string): Promise<boolean> {
  try {
    const data = await api("/auth/check-senha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ senha }),
    });

    console.log("Dados da resposta da API:", data);
    return data.exists === true;  //ACESSA OS DADOS DA MINHA API E FAZ VERIFICAÇÃO
  } catch (error) {
    console.log("Erro ao verificar Senha:", error);
    return false;
  }
}
