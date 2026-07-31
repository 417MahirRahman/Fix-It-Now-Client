export interface RegisterState {
  success: boolean;
  statusCode?: number;
  message: string;
  data?: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  };
}
