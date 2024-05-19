"use client"
import { useState, useEffect } from "react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);
  
    if (!mounted) return <>{children}</>;
  
    return <NextThemeProvider attribute="class">{children}</NextThemeProvider>;
};

export default ThemeProvider;