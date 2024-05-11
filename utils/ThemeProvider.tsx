import React from 'react';
import { NextUIProvider } from '@nextui-org/react';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    return <NextUIProvider>{children}</NextUIProvider>;
};

export default ThemeProvider;