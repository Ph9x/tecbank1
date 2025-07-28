// services/authService.ts

import { api } from "./conectServer";


//REGISTRAR CONTA
export async function registerUser(userData: any) {
  try {
    const response = await api("/auth/register", userData);
    return response.data;
  } catch (error: any) {
    return { error: error.response?.data || "Erro ao registrar" };
  }
}

