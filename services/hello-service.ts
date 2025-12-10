import { apiService } from './api-service';
import { API_ENDPOINTS } from '@/constants/api-endpoints';
import { User } from '@/types';

export const helloService = {
  getUsers: () => 
    apiService<User[]>('get', API_ENDPOINTS.USERS),
  
  getUserById: (id: number) => 
    apiService<User>('get', API_ENDPOINTS.USER_BY_ID(id)),
};