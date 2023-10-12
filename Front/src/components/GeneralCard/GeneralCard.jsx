export default function GeneralCard({ children, title, shadow, minWidth, minHeight, img, progress }) {
        const getProgress = () => {
            return (
                <div className="ratio ratio-4x3 row">
                    <div className="col-6">
                        <div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar bg-success w-50"></div>
                        </div>
                        <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar bg-warning w-75"></div>
                        </div>
                        <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar bg-danger w-100" ></div>
                        </div>
                    </div>
                        <div className="col-6">

                        </div>
                </div>
            )
        }
        const getImage = (img) => {
            <div className="ratio ratio-4x3 object-fit-cover border rounded">
                <img className="card-img-top " src={img} alt="Arriba España!" />
            </div>
            return (<div className="ratio ratio-4x3">
                        <img className="card-img-top p-2" src={img} alt="Arriba España!" />
                    </div>)
        }
    
    


    return (
        <div className={`m-2 d-flex justify-content-center align-items-center`} style={{ minHeight: minHeight, minWidth: minWidth, maxHeight: minHeight, maxWidth: minWidth }}>
            <div className="d-flex flex-wrap" style={{ minHeight: minHeight, minWidth: minWidth }}>
                <div className={`card shadow${shadow}`} style={{ minHeight: minHeight, minWidth: minWidth }}>
                        {img && getImage(img)}
                        {progress && getProgress()}
                    <h5 className="card-title m-2 text-center">{title}</h5>
                    <div className="card-body">
                        <div className="h-100 d-flex justify-content-center align-item-center">{children}</div>
                    </div>
                </div>

            </div>
        </div>
    );
}