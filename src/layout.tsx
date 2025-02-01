import { Outlet } from 'react-router-dom';
import { ThemeProvider } from '@/theme/theme-provider';
import { Toaster } from '@/components/ui/toaster';

export default function Layout() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="retro-todo-theme">
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Toaster />
    </ThemeProvider>
  );
}