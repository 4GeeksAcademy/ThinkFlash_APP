import React, { useEffect, useRef } from 'react';
import "../../styles/generalCard.css";

export default function GeneralCard({ children, title, shadow, minWidth, minHeight, img, progress }) {



    const getProgress = () => {
        const canvasRef = useRef(null);
        const chartRef = useRef(null);

        const { learned, midLearned, toLearn } = progress;

        useEffect(() => {
            const ctx = canvasRef.current.getContext('2d');

            const data = {
                labels: ['Learned', 'Mid Learned', 'To Learn'],
                datasets: [{
                    data: [learned, midLearned, toLearn],
                    backgroundColor: ['green','yellow', 'red'],
                    borderWidth: 0,
                }],
            };

            if (chartRef.current) {
                chartRef.current.destroy();
            }

            const newChart = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: {
                    cutout: '80%',
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                },
            });

            chartRef.current = newChart;

            return () => {
                if (chartRef.current) {
                    chartRef.current.destroy();
                }
            };
        }, [learned, midLearned, toLearn]);
        return (
            <div className='ratio ratio-4x3 d-block'>
                <div className='w-100 h-75 mt-4 mb-0'>
                    <div className='circulo w-100 h-100 d-flex justify-content-center align-items-center'>
                        <canvas ref={canvasRef}></canvas>
                    </div>
                </div>
            </div>
        );
    };

    const getImage = (img) => {
        return (
            <div className="ratio ratio-4x3">
                <img className="card-img-top p-2" src={img} alt="Descripción de la imagen" />
            </div>
        );
    };

    return (
        <div className={`m-2 d-flex justify-content-center align-items-center`} style={{ minHeight: minHeight, minWidth: minWidth, maxHeight: minHeight, maxWidth: minWidth }}>
            <div className="d-flex flex-wrap" style={{ minHeight: minHeight, minWidth: minWidth }}>
                <div className={`card shadow${shadow}`} style={{ minHeight: minHeight, minWidth: minWidth }}>
                    {img && getImage(img)}
                    {progress && getProgress()}
                    <h5 className="card-title m-2 text-center">{title}</h5>
                    <div className="card-body">
                        <div className="h-100 d-flex flex-column justify-content-center align-item-center text-center">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
