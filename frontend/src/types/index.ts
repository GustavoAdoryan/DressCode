export interface Portifolio {
  PortifolioID: number
  EstilistaID: number | null
  AtelieID: number | null
  Descricao_portifolio: string | null
  Tempo_experiencia: string | null
}

export interface Atelie {
  AtelieID: number
  Nome: string
  UsuarioID: number
  VerificacaoDocumentos: string
  portifolios: Portifolio[]
}

export interface Estilista {
  EstilistaID: number
  Nome: string
  UsuarioID: number
  VerificacaoDocumentos: string
  portifolios: Portifolio[]
}

export interface Perfil {
  PerfilID: number
  UsuarioID: number
  Biografia: string | null
  FotoPerfil: string | null
}

export interface User {
  UsuarioID: number
  Nome: string
  CPF_CNPJ: string
  Email: string
  Telefone: string
  Senha: string
  Tipo: 'Atelie' | 'Estilista'
  atelie: Atelie | null
  estilista: Estilista | null
  perfil: Perfil | null
}

export interface Schedule {
  AgendamentoID: number
  DataHora: string
  EstilistaID: number
  AtelieID: number
  Status: string
}

export interface DefaultResponse {
  message: string
}

export interface RegisterResponse extends DefaultResponse {
  usuario: User
}

export interface LoginResponse extends DefaultResponse {
  usuario: User
  token: string
}
