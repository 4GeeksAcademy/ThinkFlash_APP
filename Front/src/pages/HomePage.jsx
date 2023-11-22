import getPreferentColor from "../services/colors/getPreferentColor"
import { Link } from "react-router-dom"

export default function HomePage () {

	const colorMode = getPreferentColor(localStorage.getItem("opposite_color"))

    return(
		<div>
			<header className="header mt-5 pt-7">
				<div className="container-xl">
					<div className="row">
						<div className="col-md-6">
							<div className={`text-container text-${colorMode} p-4 d-flex flex-column justify-content-center h-100 mb-5`}>
								<h1 className="display-5 fw-semibold text-start">Learn. Progress. Succeed.</h1>
								<p className={`lead text-${colorMode} mt-3 text-sm-start`}>
								Think Flash is the perfect app for dynamic and effective learning. Designed for people in training processes, 
								offers thematic decks that cover diverse areas of knowledge.<br /></p>
								<p className={`lead text-${colorMode} mt-3 text-sm-start`}>In addition to accurately measuring your progress, you can 
								customize your experience by selecting your favorite decks or creating your own. Think Flash combines the seriousness 
								of study with the flexibility to adapt to your educational needs from all your devices.</p>
								<div className="container text-center mt-3">
								<Link to="/signup" className={`btn btn-${colorMode} btn-lg fw-bold col-lg-5`}>Start now!</Link>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="image-container mt-5 px-4">
							<img src="https://static.wixstatic.com/media/5bac31_65de7c75fdd54cff838e56165e8b849a~mv2.gif" alt="" className="img-fluid"/>
							</div>
						</div>
					</div>
				</div>
			</header>

			<div id="features" className="mt-3 ">
			<div className="container-xl ">
				<div className="row p-4 g-5 py-5">
					<div className="col-md-4">
						<h5 className={`font-weight-normal rounded-3 p-2 text-center bg-${colorMode} mb-4`}>Customized Learning 🧠</h5>
						<p className={`text-${colorMode} text-center`}>
						Adjust your study experience according to your needs. Customize your decks, choose your favorite themes and lead your path to knowledge, making each study session a unique and effective experience.
						</p>
					</div>
					<div className="col-md-4">
						<h5 className={`font-weight-normal rounded-3 p-2 text-center bg-${colorMode} mb-4`}> Accurate Progress Measurement 📈</h5>
						<p className={`text-${colorMode} text-center`}>
						Accurately measure your progress with each successful card. Watch your knowledge expand and take advantage of instant feedback to hone your skills.
						</p>
					</div>
					<div className="col-md-4">
						<h5 className={`font-weight-normal rounded-3 p-2 text-center bg-${colorMode} mb-4`}>Learning Flexibility 🚀</h5>
						<p className={`text-${colorMode} text-center`}>
						From state examinations to coding, Think Flash covers a wide range of subjects. Switch between decks and themes, adapting to your educational goals.
						</p>
					</div>
				</div>
			</div>
			</div>
		</div>
		
    )
}