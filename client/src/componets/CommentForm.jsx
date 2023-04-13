import React ,{useEffect,useState}from 'react';
import styles from './main.module.css'
import {sendComment} from "../actions/user";
import socket from '../socket'
const CommentForm = ({note}) => {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");


   const handleSendComment = async()=>
   {
       try
       {
           const res = await sendComment(content,note.Master.id,note.Procedure_table.id)
           socket.emit('new-comment',{});
       }
       catch (e)
       {}

   }



    return (


            <div >
                <form
                    className=""
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSendComment();
                       setContent("");
                    }}
                >
          <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              name="body"
          />
                    <button type="submit">
                        Send
                    </button>
                </form>
        </div>
    );
};

export default CommentForm;