import React, { useState, useEffect, useRef } from "react";
import "../../../styles/getProgress.css"


const GetProgress = ({ progress }) => {
    const [clicked, setClicked] = useState(false);
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    const { learned, midLearned, toLearn } = progress;


    const totalCards = learned + midLearned + toLearn;
    const learnedPercentage = (learned / totalCards) * 100;
    const midLearnedPercentage = (midLearned / totalCards) * 100;
    const toLearnPercentage = (toLearn / totalCards) * 100;

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

            if (!clicked) {
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
                            <div className="progressBarLabelGreen d-flex ps-1">
                                <div className="w-25 text-center">
                                    <i className="fa-solid fa-check" style={{ color: '#19191a' }}></i>
                                </div>
                                <div className="w-75"> {learnedPercentage.toFixed(1)}%</div>
                            </div>
                            <div className="progressBarLabelOrange d-flex ps-1">
                                <div className="w-25 text-center">
                                    <i className="fa-solid fa-exclamation" style={{ color: '#141414' }}></i>
                                </div>
                                <div className="w-75">
                                    {midLearnedPercentage.toFixed(1)}%
                                </div>
                            </div>
                            <div className="progressBarLabelRed d-flex ps-1">
                                <div className="w-25 text-center">
                                    <i className="fa-solid fa-x" style={{ color: '#111212' }}></i>
                                </div>
                                <div className="w-75">
                                    {toLearnPercentage.toFixed(1)}%
                                </div>
                            </div>
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
