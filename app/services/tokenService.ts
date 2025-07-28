// services/tokenService.ts

import * as SecureStore from 'expo-secure-store';

// Função para armazenar o token
export const storeToken = async (token: string) => {
    try {
        await SecureStore.setItemAsync('user_token', token);
        console.log('Token armazenado com sucesso!');
    } catch (error) {
        console.error('Erro ao armazenar o token:', error);
    }
};

// Função para recuperar o token
export const getToken = async () => {
    try {
        const token = await SecureStore.getItemAsync('user_token');
        if (token) {
            console.log('Token recuperado:', token);
            return token;
        } else {
            console.log('Nenhum token encontrado.');
            return null;
        }
    } catch (error) {
        console.error('Erro ao recuperar o token:', error);
        return null;
    }
};

// Função para remover o token do app
export const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync('user_token');
        console.log('Token removido com sucesso!');
    } catch (error) {
        console.error('Erro ao remover o token:', error);
    }
};

//PEGAR O TOKEN
export const getAuthHeader = async () => {
    const token = await getToken();  // Supondo que a função `getToken` retorne o token
    if (token) {
        return {
            Authorization: `Bearer ${token}`  // Retorna o cabeçalho corretamente formatado com o token
        }
    }
};
