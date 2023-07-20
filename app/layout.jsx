import { Providers } from './providers';
import './globals.css';
import AppLayoutWrapper from './components/AppLayoutWrapper';

export default async function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <AppLayoutWrapper>{children}</AppLayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
