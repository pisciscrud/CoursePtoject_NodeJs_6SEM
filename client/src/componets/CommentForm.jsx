import React ,{useEffect,useState}from 'react';
import styles from './main.module.css'
import {sendComment} from "../actions/user";
import Rating from './Rating';
import socket from '../socket'
const CommentForm = ({note}) => {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);

   const handleSendComment = async()=>
   {
       try
       {
           const res = await sendComment(content,rating,note.Master.id,note.Procedure_table.id)
           //socket.emit('new-comment',{});
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
                    <Rating
                        value={rating}
                        onChange={(value) => setRating(value)}
                    />
                    <button type="submit">
                        Send
                    </button>
                </form>
        </div>
    );
};

export default CommentForm;