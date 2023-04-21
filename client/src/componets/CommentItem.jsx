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
        <div className={styles.noteCard}>


            <div className={styles.noteCardBody}>
                <span className={styles.noteCardNameProcedure }>{comment.Procedure_table.name_procedure}</span>
                <span>Master: {comment.Master.name_master}</span>
                <span> {comment.Master.surname_master}</span>
               <span>{comment.content}</span>
                <RatingFromBd rating={comment.rating} />
            </div>
            <p>


            </p>
            <div className={styles.noteCardFooter}>
                <span>{formatDate(comment.date_)}</span>


            </div>

        </div>
    );
};

export default CommentItem;