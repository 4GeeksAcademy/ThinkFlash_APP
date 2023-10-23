import getPreferentColor from "../../services/colors/getPreferentColor"
import '../Footer/footer.css'

const colorMode = getPreferentColor();

export default function Footer (){
    return(
        <footer className="sticky-bottom">
        <div className={`text-center mt-3 p-4 bg-${colorMode}`}>
            © 2023 Think Flash 2023
          </div>
    </footer>
    )
}