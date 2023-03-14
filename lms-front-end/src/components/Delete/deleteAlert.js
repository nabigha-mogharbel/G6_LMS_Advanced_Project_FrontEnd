import "./deleteAlert.css"
import axios from "axios"
import Cookies from "universal-cookie";
import { ToastContainer, toast } from 'react-toastify';
export default function DeleteAlert(props){
    const deleteSection=()=>{
        const cookies = new Cookies();
      const authToken = cookies.get("access_token");
        const config={
          headers:{Authorization: `Bearer ${authToken}`}
        }
        let URL=process.env.REACT_APP_BASE_URL + props.url +props.index;
        const posting=axios.post(URL,{"_method":"delete"},config).then(function (response) {
            console.log(response);
             toast.success('Section Added!', {
               position: "top-right",
               autoClose: 3000,
               hideProgressBar: true,
               closeOnClick: true,
               pauseOnHover: false,
               draggable: false,
               progress: undefined,
               theme: "light",
               });
            
           }, function(error){
             console.log(error);
             toast.error('Error Occured. Please Try again', {
             position: "top-right",
             autoClose: 5000,
             hideProgressBar: true,
             closeOnClick: true,
             pauseOnHover: false,
             draggable: false,
             progress: undefined,
             theme: "light",
             });})
    }
   
   function cancel(){
    props.removeAlert(false, -1)
   }
    return(
        <div className="delete-alert">
            <ToastContainer/>
            {console.log("alert")}
           <p> Are you sure you want to delete this {props.item} {props.index}?</p>
           <div className="delete-controllers"> <button onClick={deleteSection}>Yes</button> <button onClick={cancel}>Cancel</button></div>
        </div>
    )
}