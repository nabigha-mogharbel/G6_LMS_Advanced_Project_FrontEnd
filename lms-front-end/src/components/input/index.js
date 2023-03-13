import "./index.css"
export default function Input(props){
    return(<div className="input-label"><input  style={{content:props.label}} type={props.type} placeholder={props.placeholder} name={props.name}/></div>)
}