import PagesLayoutWrapper from '../components/PagesLayoutWrapper';

export default async function RootLayout({ children }) {
  return <PagesLayoutWrapper>{children}</PagesLayoutWrapper>;
}
