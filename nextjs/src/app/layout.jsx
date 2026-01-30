import './globals.css';

export const metadata = {
  title: 'Assistant embed example',
  description: 'Mintlify assistant widget embed example',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
