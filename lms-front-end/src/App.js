import logo from './logo.svg';
import './App.css';
import Btn from "./components/Btn";
import Inpt from "./components/Inpt"
import { createTheme, ThemeProvider } from '@mui/material/styles';
function App() {
  const theme = createTheme({
    palette: {
      secondary: {
        main: '#8a70d6',
      },
      accentO: {
        main: '#ffa600',
      },
      accentB: {
        main: '#579be4',
      },
      background: {
        default: '#fcfbfc',
      },
      text: {
        primary: '#252b42',
      },
    }, typography: {
      fontFamily: [
        'Montserrat',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    },
  });


  return (
    <>
  <ThemeProvider theme={theme}>
  <Btn color="secondary"/>
  <Inpt label="first name" placeholder="name" type="text"/>
  <Inpt label="age" placeholder="age" type="number"/>

</ThemeProvider>
   
    </>
  );
}

export default App;
