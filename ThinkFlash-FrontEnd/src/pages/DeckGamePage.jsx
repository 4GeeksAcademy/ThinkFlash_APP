import GeneralCard from "../components/GeneralCard/GeneralCard"

export default function DeckGamePage() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <GeneralCard title="Theme" minWidth="18rem" minHeight="100%">
                        ASDasdasd
                    </GeneralCard>
                </div>
                <div className="col-md-6">
                    <div className="text-container p-4 d-flex flex-column justify-content-center h-100 mb-5 text-center">
                        <div class="list-group">
                            <button type="button" class="list-group-item list-group-item-action active" aria-current="true">
                                The current button
                            </button>
                            <button type="button" class="list-group-item list-group-item-action">A second button item</button>
                            <button type="button" class="list-group-item list-group-item-action">A third button item</button>
                            <button type="button" class="list-group-item list-group-item-action">A fourth button item</button>
                            <button type="button" class="list-group-item list-group-item-action" disabled>A disabled button item</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}