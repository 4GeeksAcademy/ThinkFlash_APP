export default function AllDecksPage() {
    return (
        <>
        <div className="container d-flex border  mt-5">
            <h1>Title</h1>
        </div>
        <div className="container d-flex border pt-0">
        <div className='justify-content-center align-items-center'>
            <div className="card" style={{ width: "18rem" }}>
                <img className="card-img-top p-2 rounded" src="https://placehold.co/600x400" alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">Heading</h5>
                    <p className="card-text">This is a short description of the card content</p>
                    <div className="border justify-content-center d-flex">
                    <button className="btn btn-primary justify-content-center border w-100">
                        Activate
                    </button>
                    </div>

                </div>
            </div>
        </div>
        </div>
        </>
    )
}