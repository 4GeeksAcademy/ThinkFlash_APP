import React, { useEffect, useRef } from 'react';
import "../../styles/generalCard.css";

export default function GeneralCard({ children, title, shadow, minWidth, minHeight, img, progress = {} }) {
    const { aciertos, errores, noContestadas } = progress;


    const getProgress = () => {
        const canvasRef = useRef(null);
        const chartRef = useRef(null);

        useEffect(() => {
            const ctx = canvasRef.current.getContext('2d');

            const data = {
                labels: ['Aciertos', 'Errores', 'No Contestadas'],
                datasets: [{
                    data: [aciertos, errores, noContestadas],
                    backgroundColor: ['green', 'red', 'gray'],
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
                    cutout: '75%',
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
        }, [aciertos, errores, noContestadas]);
        return (
            <div className='circulo col-6'><canvas ref={canvasRef}></canvas></div>
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
