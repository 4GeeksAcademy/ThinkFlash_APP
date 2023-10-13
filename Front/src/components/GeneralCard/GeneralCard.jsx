import GetProgress from '../../../utils/GetProgress';
import GetImage from '../../../utils/GetImage';
import React, { useEffect, useRef } from 'react';
import "../../styles/generalCard.css";

export default function GeneralCard({ children, title, shadow, minWidth, minHeight, img, progress }) {

    return (
        <div className={`m-2 d-flex justify-content-center align-items-center`} style={{ minHeight: minHeight, minWidth: minWidth, maxHeight: minHeight, maxWidth: minWidth }}>
            <div className="d-flex flex-wrap" style={{ minHeight: minHeight, minWidth: minWidth }}>
                <div className={`card shadow${shadow}`} style={{ minHeight: minHeight, minWidth: minWidth }}>
                    {img && GetImage(img)}
                    {progress && GetProgress({progress:progress})}
                    <h5 className="card-title m-2 text-center">{title}</h5>
                    <div className="card-body">
                        <div className="h-100 d-flex flex-column justify-content-center align-item-center text-center">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
