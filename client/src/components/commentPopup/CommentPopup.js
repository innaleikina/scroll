import React from "react";
import "./commentPopup.css"
import {Button, TextArea} from "../form"

export const CommentPopup = props => (
  <div {...props} className="pop-up" >
    {/* {props.children} */}
    <Button> X </Button>
    <TextArea id="textArea" onChange={props.onChangeValue} />
 
    <Button onClick={props.onClickButton} > Save Comment </Button>
  </div>
);