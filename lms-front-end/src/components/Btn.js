import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
export default function Btn(props) {
  //   if(props.theme==="success")return(<Button variant="contained"> Try me</Button>)
  return (
    <>
      <Button color={props.color} variant="contained" style={{borderRadius:"10px"}}>
        Try me
      </Button>
    </>
  );
}
