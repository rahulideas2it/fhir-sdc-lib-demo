import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/nprogress/styles.css';
import { MedplumClient } from '@medplum/core';
import { MedplumProvider } from '@rahulideas2it/fhir-sdc-lib-react';
import '@rahulideas2it/fhir-sdc-lib-react/styles.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';

import { Notifications } from '@mantine/notifications';
import './assets/fonts/greycliff/fonts.css';
import './index.css';
import { NavigationProgress } from '@mantine/nprogress';

const medplum = new MedplumClient({
  // To run FooMedical locally, you can set the baseURL in this constructor
  fhirBaseUrl: 'http://localhost:8080/',
  fhirUrlPath: 'fhir/',
  onUnauthenticated: () => (window.location.href = '/')
});

const theme = createTheme({
  primaryColor: 'teal',
  primaryShade: 8,
  // fontFamily: 'Verdana, sans-serif',
  // fontFamilyMonospace: 'Monaco, Courier, monospace',
  headings: { fontFamily: 'Greycliff CF, sans-serif' },
  fontSizes: {
    xs: '0.6875rem',
    sm: '0.875rem',
    md: '0.875rem',
    lg: '1rem',
    xl: '1.125rem'
  },
  components: {
    Container: {
      defaultProps: {
        size: 1200
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <MedplumProvider medplum={medplum}>
      <MantineProvider theme={theme}>
        <NavigationProgress />
        <Notifications position="top-right" zIndex={1000} />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MantineProvider>
    </MedplumProvider>
  </>
);

