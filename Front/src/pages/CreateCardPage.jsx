import chekLogNavigate from "../../utils/checkLogNavigate"
import getDecks from "../services/decks/getDecks"
import { allDecksData } from "../../constants"
import "../../style.css"
import getMyDecks from "../services/decks/getMyDecks"
import useAppContext from "../../context/AppContext"
import { useState, useEffect } from "react"
import getPreferentColor from "../services/colors/getPreferentColor"

export default function CreateCardPage() {

    const colorMode = getPreferentColor()

    return (
        <div className="vh-90  container d-flex align-items-center justify-content-center">
            <form className={`w-75 bg-${colorMode} rounded-5 p-5 d-flex flex-column justify-content-center`}>
                <div className="row">
                    <div className="col-4 mb-5">
                        <label for="exampleInputEmail1" className="form-label-lg">Area</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="col-4 mb-5">
                        <label for="exampleInputEmail1" className="form-label-lg">Theme</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="col-4 mb-5">
                        <label for="exampleInputEmail1" className="form-label-lg">Deck</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="col-6">
                        <div className="mt-2">
                            <label for="exampleFormControlTextarea1" class="form-label">Concept</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div class="mt-2">
                            <label for="exampleFormControlTextarea1" class="form-label">Fake Concept</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div class="mt-2">
                            <label for="exampleFormControlTextarea1" class="form-label">Fake Concept</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div class="mt-2">
                            <label for="exampleFormControlTextarea1" class="form-label">Fake Concept</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mt-2">
                        <div class="mt-2">
                            <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        </div>
                        <div class="mt-2">
                            <label for="exampleFormControlTextarea1" class="form-label">Fake Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div class="mt-2">
                            <label for="exampleFormControlTextarea1" class="form-label">Fake Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                        <div class="mt-2">
                            <label for="exampleFormControlTextarea1" class="form-label">Fake Description</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                    </div>
                </div>
                <button type="submit" className={`w-25 ms-auto me-auto mt-5 btn card-btn-${colorMode}`}>Submit</button>
            </form>
        </div>
    )
}