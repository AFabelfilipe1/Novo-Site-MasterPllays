import React from 'react';


export const ThemeContext = React.createContext({
theme: 'light',
toggle: () => {},
});


export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
const [theme, setTheme] = React.useState<'light'|'dark'>('light');
React.useEffect(() => {
document.documentElement.setAttribute('data-theme', theme);
}, [theme]);
const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light');
return <ThemeContext.Provider value={{theme, toggle}}>{children}</ThemeContext.Provider>;
};


export default ThemeProvider;