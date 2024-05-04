import React, { useState } from 'react'
import MyContext from './myContext';

function MyState(props) {
    const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not
    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = 'rgb(166, 197, 245)';
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = 'white';
        }
    }
    return (
        <MyContext.Provider value={{ mode, toggleMode }}>
            {props.children}
        </MyContext.Provider>
    )
}

export default MyState