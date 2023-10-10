export default function GeneralCard({ children, title, col, minWidth }) {
    return (
        <div className={`m-2 ${col}`} style={{ minWidth: minWidth }}>
            <div className="h-100">
                
                    <div className="card h-100">
                        <h5 className="card-title m-2">{title}</h5>
                            <div className="card-body">
                                <div>{children}</div>
                            </div>
                    </div>
                
            </div>
        </div>
    );
  }