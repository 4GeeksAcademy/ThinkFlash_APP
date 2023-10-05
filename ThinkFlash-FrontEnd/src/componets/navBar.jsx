export default function NavBar({ }) {
    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#navbarToggleExternalContent2"
                        aria-controls="navbarToggleExternalContent1"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <i className="fas fa-bars text-dark"></i>
                    </button>
                    <a className="navbar-brand" href="#">Navbar</a>
                </div>
            </nav>
            <div className="collapse" id="navbarToggleExternalContent2">
                <ul className="bg-light shadow-3 py-2 px-3">
                    <li className="btn btn-link btn-block m-0 p-2 text-start text-dark">Home</li>
                    <li className="btn btn-link btn-block m-0 p-2 text-start text-dark">Features</li>
                    <li className="btn btn-link btn-block m-0 p-2 text-start text-dark">Pricing</li>
                </ul>
            </div>
        </>
    )
}

