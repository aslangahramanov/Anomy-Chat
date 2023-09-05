import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import DarkModeButton from '../components/Buttons/DarkMode/DarkModeButton';
import axios from 'axios';



function Header(props) {
  const [personCount, setPersonCount] = React.useState(0);


  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#0F172A',
      },
      secondary: {
        main: '#FFFFFF',
      },
    },
  });



  
  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/person-count/')
      .then(response => {
        setPersonCount(response.data.person_count);
      })
      .catch(error => {
        console.error('API isteği başarısız: ', error);
      });
  }, []);
  



  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#1CBD5E1',
      },
      secondary: {
        main: '#000',
      },
    },
  });

  const selectedTheme = props.darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <section id='Header' className={`bg-${selectedTheme.palette.mode === 'dark' ? 'slate-900' : 'slate-300'} w-full py-2`}>
        <div className='container w-[90%] m-auto flex justify-between items-center'>
          <div className='Logo'>
            <h1 className={`text-[36px] font-bold text-${selectedTheme.palette.secondary.main}`}>
              Anomy.
            </h1>
          </div>
          <div className='flex items-center'>
            <div className='Online-Count mr-8'>
              <h2 className={`text-[22px] font-bold text-${selectedTheme.palette.primary.main}`}>
                {personCount} Online Now
              </h2>
            </div>
            <div className='Dark-Mode'>
              <DarkModeButton
                darkMode={props.darkMode}
                changeDarkMode={props.changeDarkMode}
              />
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
}

export default Header;
