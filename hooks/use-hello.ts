import { useQuery } from '@tanstack/react-query';
import { helloService } from '@/services/hello-service';

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => helloService.getUsers(),
  });
};

export const useGetUser = (id: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => helloService.getUserById(id),
    enabled: !!id,
  });
};