// CONTEXTO PARA ARMAZENAR DADOS ENTRE AS TELAS ASSIM QUE EU APERTAR PRÓXIMO
import React, { createContext, useContext, useState, ReactNode } from 'react';

type RegisterData = {
  nome: string;
  cpf: string;
  email: string;
  celular: string;
  dataNascimento: string;
  cep: string;
  rua: string;
  numero: string;
  cidade: string;
  uf: string;
  senhaHash: string;
  confirmarSenhaHash: string;
};

type RegisterContextType = {
  userData: RegisterData;
  setUserData: React.Dispatch<React.SetStateAction<RegisterData>>;
};

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

type RegisterProviderProps = {
  children: ReactNode;
};

export const RegisterProvider = ({ children }: RegisterProviderProps) => {
  const [userData, setUserData] = useState<RegisterData>({
    nome: '',
    cpf: '',
    email: '',
    celular: '',
    dataNascimento: '',
    cep: '',
    rua: '',
    numero: '',
    cidade: '',
    uf: '',
    senhaHash: '',
    confirmarSenhaHash: ''
  });

  return (
    <RegisterContext.Provider value={{ userData, setUserData }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useRegister deve ser usado dentro de um RegisterProvider");
  }
  return context;
};
