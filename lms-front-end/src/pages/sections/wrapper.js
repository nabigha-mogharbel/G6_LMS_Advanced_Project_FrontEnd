import React, {useState} from 'react';
import axios from "axios";
import List from "./sections";
import Add from "./new_section";
import Single from "./section_page"
import Edit from "./edit_section"
export default function SectionWrappper() {
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
