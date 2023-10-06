export default function GeneralCard({ children, title, col }) {
    return (
        <div className={`m-1 col-${col}`}>
            <div className="">
                <div className="">
                    <div className="card">
                        <h5 className="card-title m-2">{title}</h5>
                            <div className="card-body">
                                <div>{children}</div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }