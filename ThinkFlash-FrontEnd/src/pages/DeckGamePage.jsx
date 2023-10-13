import GeneralCard from "../components/GeneralCard/GeneralCard"
import "../../style.css"

export default function DeckGamePage() {
    return (
        <div className="container h-90">
            <div className="row h-100">
                <div className="col-md-6 h-100 d-flex align-items-center">
                    <GeneralCard title={"Title"} col="col" minWidth="30rem" minHeight="45rem"
                    img="https://as01.epimg.net/epik/imagenes/2018/11/16/portada/1542384053_864693_1542384302_noticia_normal.jpg">
                        {"Theme"}
                    </GeneralCard>
                </div>
                <div className="col-md-6">
                    <div className="text-container p-4 d-flex flex-column justify-content-center h-100 mb-5 text-center">
                        <div className="list-group shadow-lg bg-primary">
                            <button type="button" className="btn btn-light m-2">
                                The current button
                            </button>
                            <button type="button" className="btn btn-light m-2">A second button item</button>
                            <button type="button" className="btn btn-light m-2">A third button item</button>
                            <button type="button" className="btn btn-light m-2">A fourth button item</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}