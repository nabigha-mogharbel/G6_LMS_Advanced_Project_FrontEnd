import "./deleteAlert.css"
export default function DeleteAlert(props){
   function confirm(){

   }
   function cancel(){
    props.removeAlert(false, -1)
   }
    return(
        <div className="delete-alert">
            {console.log("alert")}
           <p> Are you sure you want to delete this {props.item} {props.index}?</p>
           <div className="delete-controllers"> <button onClick={confirm}>Yes</button> <button onClick={cancel}>Cancel</button></div>
        </div>
    )
}