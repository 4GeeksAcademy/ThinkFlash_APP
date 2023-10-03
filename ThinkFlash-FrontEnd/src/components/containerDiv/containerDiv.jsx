export default function containerDiv({ children, height, title }) {
    return (
        <div className={`vh-${height} w-100`}>
            <div className="card">
                <div className="card-header">
                    {title}
                </div>
                <div className="card-body">
                    {children}
                </div>
            </div>
        </div>

    )
}