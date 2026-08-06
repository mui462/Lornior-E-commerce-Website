import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import AppRouter from '@/router/AppRouter';

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <AppRouter />
              <Toaster
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: '#15130F',
                    color: '#F6F1E7',
                    border: '1px solid rgba(242, 112, 26,0.25)',
                    fontSize: '13px',
                  },
                  success: { iconTheme: { primary: '#F2701A', secondary: '#0A0908' } },
                }}
              />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
