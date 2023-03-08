import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
export default function Inpt(props){
    return(<>
        <InputLabel color="primary">{props.label}
        <OutlinedInput type={props.type} style={{borderRadius:"20px", color:"black"}} placeholder={props.placeholder}/>
        </InputLabel>
        <TextField placeholder={props.placeholder} />
        </>)
}