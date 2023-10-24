import getPreferentColor from "../../services/colors/getPreferentColor";
import { useState, useEffect } from "react";
import useAppContext from "../../../context/AppContext";
import { useRouteLoaderData } from "react-router-dom";
import handleChangeValue from "./ConfigHandleClicks";

export default function getShowPage (activeTab) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [toChange, setToChange] = useState("");
  const [password, setPassword] = useState("");


  const userId = sessionStorage.getItem("user_id");
  const token = sessionStorage.getItem("token");

  const handleClickChangeValue = ({ value, toChange }) => {
      
      toChange == "name" && sessionStorage.setItem("username", name)
      toChange == "email" && sessionStorage.setItem("email", email)
    
      handleChangeValue({
        userId: userId,
        toChange: toChange,
        newValue: value,
        token: token,
        password: password,
      })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
      
  };

  const colorMode = getPreferentColor();
  let tabContent;
  switch (activeTab) {
      case "avatar":
          tabContent = (
          <form className="row flex-column align-items-center">
              <div className="my-3 col-12 col-md-6">
                <label htmlFor="avatar" className="form-label">New Avatar URL</label>
                <input type="text" className="form-control" id="avatar"/>
              </div>
              <div className="mb-3 col-12 col-md-6">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="password"/>
              </div>
              <button type="submit" className={`mb-3 col-6 col-md-3 ms-auto me-auto btn card-btn-${colorMode}`}>Change Avatar</button>
            </form>);
          break;
      case "username":
          tabContent = (
              <form className="row flex-column align-items-center">
                  <div className="my-3 col-12 col-md-6">
                    <label htmlFor="name" className="form-label">New Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} id="name"/>
                  </div>
                  <div className="mb-3 col-12 col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="password"/>
                  </div>
                  <button type="submit" onClick={()=>handleClickChangeValue({value:name, toChange:"name"})} className={`mb-3 col-6 col-md-3 ms-auto me-auto btn card-btn-${colorMode}`}>Change Name</button>
                </form>);
          break;
      case "email":
          tabContent = (
              <form className="row flex-column align-items-center">
                  <div className="my-3 col-12 col-md-6">
                    <label htmlFor="email" className="form-label">New E-Mail</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="email"/>
                  </div>
                  <div className="my-3 col-12 col-md-6">
                    <label htmlFor="confirmEmail" className="form-label">Confirm New E-Mail</label>
                    <input type="email" className="form-control" value={checkEmail} onChange={(e) => setCheckEmail(e.target.value)} id="confirmEmail"/>
                  </div>
                  <div className="mb-3 col-12 col-md-6">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="password"/>
                  </div>
                  <button type="submit" onClick={()=>handleClickChangeValue({value:email, toChange:"email"})} className={`mb-3 col-6 col-md-3 ms-auto me-auto btn card-btn-${colorMode}`}>Change E-mail</button>
                </form>);
          break;
      case "password":
          tabContent = (
              <form className="row flex-column align-items-center">
                  <div className="my-3 col-12 col-md-6">
                    <label htmlFor="newPassword" className="form-label">New Password</label>
                    <input type="password" className="form-control" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} id="newPassword"/>
                  </div>
                  <div className="my-3 col-12 col-md-6">
                    <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
                    <input type="password" className="form-control" value={checkPassword} onChange={(e) => setCheckPassword(e.target.value)} id="confirmPassword"/>
                  </div>
                  <div className="mb-3 col-12 col-md-6">
                    <label htmlFor="password" className="form-label">Actual Password</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="password"/>
                  </div>
                  <button type="submit" onClick={()=>handleClickChangeValue({value:newPassword, toChange:"password"})} className={`mb-3 col-6 col-md-3 ms-auto me-auto btn card-btn-${colorMode}`}>Change Password</button>
                </form>);
          break;
      default:
          tabContent = (
              <div className="d-flex justify-content-center align-items-center p-5">
                  <h1 className="py-5">In this page you can configurate your account</h1>
              </div>
          );
  }
  return tabContent;
}