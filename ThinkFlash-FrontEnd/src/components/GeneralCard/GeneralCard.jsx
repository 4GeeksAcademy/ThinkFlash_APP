export default function GeneralCard({ children, title, col }) {
    return (
        <div className={`ms-2 col-${col}`}>
            <div className="h-100">
                
                    <div className="card h-75">
                        <h5 className="card-title m-2">{title}</h5>
                            <div className="card-body">
                                <div>{children}</div>
                            </div>
                    </div>
                
            </div>
        </div>
    );
  }