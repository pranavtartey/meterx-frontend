export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
  }
  
  export interface ApiError {
    message: string;
    statusCode?: number;
  }