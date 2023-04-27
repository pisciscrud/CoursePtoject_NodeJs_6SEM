import React from 'react';
import parseISO from "date-fns/parseISO";
import formatDistance from "date-fns/formatDistance";
function formatDate(dateStr) {
    const date = parseISO(dateStr);
    console.log(date)
    return formatDistance(date, new Date(), { addSuffix: true });
}
const NotificationItem = ({notification}) => {
    return (
        <div>

            <div style={{ backgroundColor: '#F5F5F5', padding: '10px', borderRadius: '10px', marginBottom: '10px' ,width:'300px'}}>
                <p style={{ margin: 0, fontSize: '16px' }}>Admin change status of record</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#9B9B9B' }}>{formatDate(notification.date_)}</p>
            </div>
        </div>
    );
};

export default NotificationItem;