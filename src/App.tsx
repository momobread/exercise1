import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppLayout from './ui/AppLayout';
import TodoPage from './pages/TodoPage';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Join from './components/Login/Join';
import Login from './pages/Login';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { fetchUser } from './service/apiUser';

// 💡나는 보통 쿼클 옵션을 이렇게 쓰는데 또 어떤게 쓰이나?

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster
        position="top-center"
        toastOptions={{
          success: {
            duration: 3000,
            style: { backgroundColor: '#dcfacd' },
          },
          error: {
            duration: 3000,
            style: { backgroundColor: '#f8d3d3' },
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate replace to="homepage" />} />
            <Route path="homepage" element={<HomePage />} />
            <Route path="todo" element={<TodoPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/login/join" element={<Join />} />
          <Route path="/login/search" element={<Join />} />
          <Route path="*" element={<p>404</p>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
