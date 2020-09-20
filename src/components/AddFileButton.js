import React from 'react';
import { FaUpload } from "react-icons/fa";
import {MdAddCircle} from 'react-icons/md'

function AddFileButton(props){
  

    return (
      <div>
          <label htmlFor="upload-button" >

              {props.isAFileAdded?<MdAddCircle size={props.btnSize}/>:<FaUpload size={props.btnSize}/>}
              {props.isLabel?<p>{props.label}</p>:<div></div>}

          </label>
          
          <input 
            id="upload-button" 
            style={{display:"none"}} 
            type="file" 
            name="file" 
            onChange={(event)=>props.onAddFile(event)}
            onClick={(event) =>{event.target.value=null}}
            multiple
          />

      </div>
    )
  }

  export default AddFileButton;
