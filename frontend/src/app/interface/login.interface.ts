export interface LoginData {
  username: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  token: string;
  reason?: string;
}
