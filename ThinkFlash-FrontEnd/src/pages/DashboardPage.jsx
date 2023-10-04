import ContainerDiv from "../components/ContainerDiv"

export default function DashboardPage ({username}) {
    return(
        <div className="h-75">
            <h1>This is a dashboard page</h1>
            <ContainerDiv
            title = "My Decks"
            height="50"
            link={`/${username}/mydecks`}
            >
                This is my decks   
            </ContainerDiv> 
            <ContainerDiv
            title = "All Decks"
            height="25"
            link='/alldecks'
            >
                This is all decks 
            </ContainerDiv> 
        </div>
    )
}