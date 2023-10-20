import React, { useState, useEffect, useRef } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "../../../styles/getProgress.css"


const GetProgress = ({ progress }) => {
    const [clicked, setClicked] = useState(false);
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    const { learned, midLearned, toLearn } = progress;

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");

            const data = {
                labels: ["Learned", "Mid Learned", "To Learn"],
                datasets: [
                    {
                        data: [learned, midLearned, toLearn],
                        backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
                        borderWidth: 1,
                    },
                ],
            };

            if (chartRef.current) {
                chartRef.current.destroy();
            }

            if (clicked) {
                const barData = {
                    labels: ["Learned", "Mid Learned", "To Learn"],
                    datasets: [
                        {
                            label: "Percentage",
                            data: [learned, midLearned, toLearn],
                            backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
                            borderWidth: 3,
                        },
                    ],
                };

            } else {
                const newChart = new Chart(ctx, {
                    type: "doughnut",
                    data: data,
                    options: {
                        cutout: "70%",
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                    },
                });

                chartRef.current = newChart;
            }

            return () => {
                if (chartRef.current) {
                    chartRef.current.destroy();
                }
            };
        }
    }, [clicked, learned, midLearned, toLearn]);

    const handleClick = () => {
        setClicked(!clicked);
    };

    return (
        <div className="ratio ratio-4x3 d-block">
            <div className="w-100 h-75 mt-4 mb-0" onClick={handleClick}>
                <div className=" w-100 h-100 d-flex justify-content-center align-items-center position-relative">
                    {clicked ? (

                        <div className="container progressBarContainer my-auto">
                            <div className="progressBarLabelGreen ps-1"> Learned: {learned}%</div>
                            <div className="progressBarLabelOrange ps-1">Mid Learned: {midLearned}%</div>
                            <div className="progressBarLabelRed ps-1">To Learn: {toLearn}%</div>
                            <div className="additionalInfo">
                            <div className="additionalInfo position-absolute top-0 end-0">
                            <i className="fa-solid fa-circle-minus fa-beat-fade"></i>
                            </div>
                            </div>
                        </div>
                    ) : (
                        <>
                            <canvas ref={canvasRef}></canvas>
                            <div className="additionalInfo position-absolute top-0 end-0">
                                <i className="fa-solid fa-circle-plus fa-beat-fade"></i>
                            </div>
                        </>

                    )}
                </div>
            </div>
        </div>
    );
};

export default GetProgress;
