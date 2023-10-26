import getPreferentColor from "../../services/colors/getPreferentColor"

const colorMode = getPreferentColor(localStorage.getItem("opposite_color"));

export default function Footer (){
    return(
        <footer>
        <div className={`text-center mt-3 p-4 bg-${colorMode}`}>
            © 2023 Think Flash 2023
          </div>
    </footer>
    )
}