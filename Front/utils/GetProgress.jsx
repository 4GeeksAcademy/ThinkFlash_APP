import { useEffect, useRef } from "react";

const GetProgress = ({progress}) => {
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

export default GetProgress