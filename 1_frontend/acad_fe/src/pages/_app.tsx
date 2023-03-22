import Navbar from '@/components/NavBar';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import type { AppProps } from 'next/app'
import React from 'react';


const theme = createTheme({
  palette: {
    primary: {
      main: '#bd3e3e',
    },
    secondary: {
      main: '#ff7043',
    },
  },
});


export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
