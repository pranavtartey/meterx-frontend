import { AxiosError, AxiosRequestConfig } from 'axios';
import { httpClient } from '@/config/http-client';
import { toast } from 'sonner';
import { ApiResponse } from '@/types/api.types';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export const apiService = async <TData, TRequest = unknown>(
  method: HttpMethod,
  url: string,
  data?: TRequest,
  config?: AxiosRequestConfig
): Promise<TData> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      method,
      url,
      ...config,
    };

    if (method === 'get') {
      requestConfig.params = data;
    } else {
      requestConfig.data = data;
    }

    const response = await httpClient<ApiResponse<TData>>(requestConfig);
    
    // Check success field from backend
    if (!response.data.success) {
      toast.error(response.data.message || 'Operation failed');
      throw new Error(response.data.message);
    }

    // Return unwrapped data
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      throw error.response?.data || error;
    }
    
    // Re-throw if already handled above
    if (error instanceof Error) {
      throw error;
    }
    
    toast.error('An unexpected error occurred');
    throw error;
  }
};