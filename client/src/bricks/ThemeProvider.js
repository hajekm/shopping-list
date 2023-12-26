import React, {createContext, useContext, useState} from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('bootstrap4-light-blue'); // Default theme

    const changeTheme = (newTheme) => {
        setTheme(newTheme);
        const themeLink = document.getElementById('theme-link');
        if (themeLink) {
            themeLink.href = `/${newTheme}/theme.css`;
        }
    };

    return (
        <ThemeContext.Provider value={{theme, changeTheme}}>
            {children}
        </ThemeContext.Provider>
    );
};