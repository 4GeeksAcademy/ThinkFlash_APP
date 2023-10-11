export default function GeneralCard({ children, title, col, minWidth, minHeight, img, progress }) {
        const getProgress = () => {
            return (
                <div className="row">
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
            return (<img className="card-img-top" src={img} alt="Arriba España!" />)
        }
    
    


    return (
        <div className={`m-2 ${col} d-flex justify-content-center`}>
            <div className="d-flex flex-wrap">
                <div className="card shadow-sm" style={{ minHeight: minHeight, minWidth: minWidth }}>
                    {!img && progress ? getProgress() : getImage(img)}
                    <h5 className="card-title m-2">{title}</h5>
                    <div className="card-body">
                        <div>{children}</div>
                    </div>
                </div>

            </div>
        </div>
    );
}