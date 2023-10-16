import GetProgress from './components/GetProgress';
import GetImage from './components/GetImage';
import React from 'react';


export default function GeneralCard({ children, title, shadow, minWidth, minHeight, img, progress }) {

    return (
        <div className={`m-2 d-flex justify-content-center align-items-center`} style={{ minHeight: minHeight, minWidth: minWidth, maxHeight: minHeight, maxWidth: minWidth }}>
            <div className="d-flex flex-wrap" style={{ minHeight: minHeight, minWidth: minWidth }}>
                <div className={`card shadow${shadow}`} style={{ minHeight: minHeight, minWidth: minWidth }}>
                   <div className="container">
                    {img && GetImage(img)}
                    {progress && GetProgress({progress:progress})}
                    </div> 
                    <h5 className="card-title m-2 text-center">{title}</h5>
                    <div className="card-body">
                        <div className="h-100 d-flex flex-column justify-content-center align-item-center text-center">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
