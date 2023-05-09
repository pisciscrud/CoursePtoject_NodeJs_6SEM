import React,{useState,useEffect} from 'react';
import {Grid} from "@material-ui/core";
import CommentItem from "../../componets/CommentItem";
import {useQuery} from "react-query";
import {getComments} from "../../actions/comments";
import socket from "../../socket"
import styles from "../MasterPage/MasterPage.module.css";


const ReviewPage = () => {
    const [comments,setComments]=useState([])


   const {refetch:refetchComments}=useQuery("comments",()=>getComments())

    useEffect(()=>{
        refetchComments()
            .then((data) => {

                setComments(data.data)
            })
        socket.on('new-comment',(data)=>{

            setComments((comments)=>[...comments,data.comment])})


    },[])
    return (
        <div className={styles.full}>
            <div className={styles.container}>
                {comments && comments.map(comment=>(

                   <CommentItem key={comment.id} comment={comment}  />))}
            </div>

        </div>
    );
};

export default ReviewPage;