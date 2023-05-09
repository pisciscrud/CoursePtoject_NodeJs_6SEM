import React from 'react';
import styles from "./main.module.css";
import {Button} from "@material-ui/core";
import parseISO from "date-fns/parseISO";
import formatDistance from "date-fns/formatDistance";


import RatingFromBd from "./RatingFromBd";

function formatDate(dateStr) {
    const date = parseISO(dateStr);
    console.log(date)
    return formatDistance(date, new Date(), { addSuffix: true });
}
const CommentItem = ({comment}) => {
    return (
        <div style={{ marginLeft:30}} className={styles.noteCard}>


            <div  className={styles.noteCardBody}>
                <span>Procedure:{comment.Procedure_table.name_procedure}</span>
                <span>Master: {comment.Master.name_master}</span>
                <span> {comment.Master.surname_master}</span>
               <b>{comment.content}</b>
                <RatingFromBd rating={comment.rating} />
            </div>

            <div className={styles.noteCardFooter}>
                <span>{formatDate(comment.date_)}</span>
                <span>Author:    {comment.User_table.full_name}</span>

            </div>

        </div>
    );
};

export default CommentItem;