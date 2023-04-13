import React,{useState,useEffect} from 'react';
import {Grid} from "@material-ui/core";
import CommentItem from "../../componets/CommentItem";
import {useQuery} from "react-query";
import {getComments} from "../../actions/comments";
import socket from "../../socket"


const ReviewPage = () => {
    const [comments,setComments]=useState([])


   const {refetch:refetchComments}=useQuery("comments",()=>getComments())

    useEffect(()=>{
        refetchComments()
            .then((data) => {
                console.log('refetch',data.data);
                setComments(data.data)
            })
        socket.on('new-comment',(data)=>{
            console.log('data',data.comment);
            setComments((comments)=>[...comments,data.comment])})

        //
        // socket.on('new-comment',({comment})=>
        // {
        //     setComments((comments)=>[...comments,comment]);
        // })
        //
        // return () => {
        //     socket.off("new-comment");
        // };
    },[])
    return (
        <div>
            <Grid container spacing={3}>
                {comments && comments.map(comment=>(

                   <CommentItem key={comment.id} comment={comment}  />))}

            </Grid>
        </div>
    );
};

export default ReviewPage;