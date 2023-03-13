import React, {useState} from 'react';
import axios from "axios";
import List from "./students";
import Add from "./new_student";
import Single from "./student_page"
import Edit from "./edit_student"
export default function StudentWrappper() {
  const [list, setList]=useState(true);
  const [single,setSignle]=useState(false);
  const [add, setAdd]=useState(false);
  const [edit, setEdit]=useState(false);
  return (<>
    {list && !single && !add && !edit && <List/>}
    {!list && single && !add && !edit && <Single/>}
    {!list && !single && add && !edit  && <Add/>}
    {list && !single && !add && !edit && <Edit/>}
    </>
  )
}
