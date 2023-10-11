export default function GeneralCard({ children, title, col, minWidth,minHeight }) {
    return (
        <div className={`m-2 ${col} d-flex justify-content-center`}>
            <div className="d-flex flex-wrap">
                    <div className="card shadow-sm" style={{minHeight:minHeight, minWidth:minWidth}}>
                    {/* <img src="..." class="card-img-top" alt="..."/> */}
                        <h5 className="card-title m-2">{title}</h5>
                            <div className="card-body">
                                <div>{children}</div>
                            </div>
                    </div>
                
            </div>
        </div>
    );
  }