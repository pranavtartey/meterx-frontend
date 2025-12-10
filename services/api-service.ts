import { AxiosError, AxiosRequestConfig } from 'axios';
import { httpClient } from '@/config/http-client';
import { toast } from 'sonner';

type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch';

export const apiService = async <TResponse, TRequest = unknown>(
  method: HttpMethod,
  url: string,
  data?: TRequest,
  config?: AxiosRequestConfig
): Promise<TResponse> => {
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

    const response = await httpClient(requestConfig);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const message = error.response?.data?.message || error.message;
      toast.error(message);
      throw error.response?.data;
    }
    toast.error('An unexpected error occurred');
    throw error;
  }
};