import React ,{useEffect,useState}from 'react';
import styles from './main.module.css'
import {sendComment} from "../actions/user";
import Rating from './Rating';
import socket from '../socket'
const CommentForm = ({note}) => {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");
    const [rating, setRating] = useState(0);
    const [formError, setFormError] = useState('');
    const MAX_CHARACTERS = 100;



   const handleSendComment = async(event)=>
   {
    event.preventDefault();
    if (!rating || !content.trim()) {
        setFormError('Please provide both a rating and a comment.');
        return;
      }
      else {
       try
       {
           const res = await sendComment(content,rating,note.Master.id,note.Procedure_table.id,note.id)
           setFormError('');
           setRating(null);
           setContent('');
           //socket.emit('new-comment',{});
       }
       catch (e)
       {}
    }

   }



    return (


            <div >
                <form
                    className={styles.CommentForm}
                    onSubmit={
                        handleSendComment}>

{/* <div class="form-outline">
                  <textarea   value={content}
              onChange={(e) => setContent(e.target.value)}
              name="body" class="form-control" id="textAreaExample" rows="4"></textarea>
                  <label class="form-label" for="textAreaExample">What is your view?</label>
                </div> */}
          <textarea  className={styles.formControl}
              value={content}
              onChange={(e) => {
                if (e.target.value.length <= MAX_CHARACTERS) {
                  setContent(e.target.value);
                }
              }}
              name="body"
          />
                    <Rating
                        value={rating}
                        onChange={(value) => setRating(value)}
                    />
                    <button type="submit" className={styles.btn}>
                        Send
                    </button>
                    {formError && <div className={styles.formError}>{formError}</div>}
                </form>
        </div>
    );
};

export default CommentForm;