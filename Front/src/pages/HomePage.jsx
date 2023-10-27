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
								<h1 className="display-5 fw-semibold text-start">Aprende. Progresa. Triunfa.</h1>
								<p className={`lead text-${colorMode} mt-3 text-sm-start`}>
								Think Flash es la app perfecta para el aprendizaje dinámico y efectivo. Diseñada para personas en procesos de capacitación, 
								ofrece barajas temáticas que abarcan diversas áreas de conocimiento.<br /></p>
								<p className={`lead text-${colorMode} mt-3 text-sm-start`}>Además de medir tu progreso con precisión, puedes 
								personalizar tu experiencia seleccionando tus barajas favoritas o creando las tuyas propias. Think Flash combina la seriedad 
								del estudio con la flexibilidad necesaria para adaptarse a tus necesidades educativas desde todos tus dispositivos.</p>
								<div className="container text-center mt-3">
								<Link to="/signup" className={`btn btn-${colorMode} btn-lg fw-bold col-lg-5`}>¡Comienza ahora!</Link>
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
						<h5 className={`font-weight-normal rounded-3 p-2 text-center bg-${colorMode} mb-4`}>Aprendizaje Personalizado 🧠</h5>
						<p className={`text-${colorMode} text-center`}>
						Adapta tu experiencia de estudio según tus necesidades. Personaliza tus barajas, elige tus temas favoritos y dirige tu camino hacia el conocimiento, convirtiendo cada sesión de estudio en una experiencia única y efectiva.
						</p>
					</div>
					<div className="col-md-4">
						<h5 className={`font-weight-normal rounded-3 p-2 text-center bg-${colorMode} mb-4`}> Medición Precisa de Progreso 📈</h5>
						<p className={`text-${colorMode} text-center`}>
						Mide tu progreso de manera precisa con cada carta acertada. Observa cómo tu conocimiento se expande y aprovecha la retroalimentación instantánea para perfeccionar tus habilidades.
						</p>
					</div>
					<div className="col-md-4">
						<h5 className={`font-weight-normal rounded-3 p-2 text-center bg-${colorMode} mb-4`}>Flexibilidad en el Aprendizaje 🚀</h5>
						<p className={`text-${colorMode} text-center`}>
						Desde oposiciones públicas hasta idiomas, Think Flash abarca un amplio espectro de temas. Cambia entre barajas y temáticas, adaptándote a tus objetivos educativos.
						</p>
					</div>
				</div>
			</div>
			</div>
		</div>
		
    )
}