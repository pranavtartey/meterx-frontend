'use client';

import { useGetUsers } from '@/hooks/use-hello';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const { data: users, isLoading, error, refetch } = useGetUsers();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-red-500">Failed to load users</p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Hello World 👋</h1>
        <p className="text-muted-foreground">
          Production-ready Next.js starter with clean architecture
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {users?.slice(0, 6).map((user) => (
          <Card key={user.id} className="p-6">
            <h3 className="font-semibold text-lg mb-2">{user.name}</h3>
            <p className="text-sm text-muted-foreground mb-1">
              @{user.username}
            </p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-6 bg-muted rounded-lg">
        <h2 className="text-xl font-semibold mb-4">✅ What's Included</h2>
        <ul className="space-y-2 text-sm">
          <li>✓ Next.js 15 with App Router</li>
          <li>✓ TypeScript with strict mode</li>
          <li>✓ React Query for data fetching</li>
          <li>✓ Axios with interceptors</li>
          <li>✓ Zod for validation</li>
          <li>✓ shadcn/ui components</li>
          <li>✓ Tailwind CSS</li>
          <li>✓ Clean architecture (services/hooks/components)</li>
          <li>✓ Toast notifications (Sonner)</li>
          <li>✓ Local storage utilities</li>
        </ul>
      </div>
    </div>
  );
}