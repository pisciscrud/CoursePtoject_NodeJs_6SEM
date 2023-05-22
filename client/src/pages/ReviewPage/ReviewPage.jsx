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

    },[])
    useEffect(()=> {
        socket.on('new-comment',(data)=>{
            if(comments.find(x => x.id == data.comment.id)){
            setComments((comments)=>[...comments.map((x => {
                if(x.id == data.comment.id)
                {
                    return data.comment
                }
                else
                {
                    return x
                }
            })
            )
            ])
            }else{
                setComments([...comments, data.comment])
            }
        })

        return (() => {
            socket.removeAllListeners('new-comment')
        })
    },[comments])
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