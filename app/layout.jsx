import { Providers } from './providers';
import './globals.css';
import LayoutWrapper from './components/AppLayoutWrapper';

export default async function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
