import React, { Fragment, useEffect, useRef, useState } from "react";
import "./LoginSignup.css";
import {useDispatch,useSelector} from "react-redux";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import FaceIcon from "@material-ui/icons/Face";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {useAlert} from "react-alert"
import { clearError,login,register } from "../../actions/userActions";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const [isShow, setIsShow] = useState(false); 
  const [formSubmitted, setFormSubmitted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const alert = useAlert();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user,setUser] = useState({
    name:"",
    email:"",
    password:""
  })

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const {loading,error,isAuthenticated} = useSelector(state=>state.user)

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const redirect = location.search ? location.search.split("=")[1]: "/account";
  
  console.log(isShow);
  console.log(formSubmitted)
  useEffect(() => {
    setIsShow(true);
  }, []);

  useEffect(()=>{
        if(error && isShow && formSubmitted){
            alert.error(error)
            dispatch(clearError())
        }
        if(isAuthenticated){
           navigate(redirect);
        }
  },[dispatch,alert,error,isAuthenticated,navigate,redirect,isShow,formSubmitted])

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail,loginPassword));
    setFormSubmitted(true);
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("password",password);
    myForm.set("avatar",avatar);

    dispatch(register(myForm));
    setFormSubmitted(true);
  }

  const registerDataChange = (e) => {
    if(e.target.name === "avatar"){
        const fileReader = new FileReader();

        fileReader.onload = () => {
            if(fileReader.readyState === 2){
                setAvatarPreview(fileReader.result);
                setAvatar(fileReader.result);
            }
        }
        fileReader.readAsDataURL(e.target.files[0]);
    }else {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
    }
  }

  return (
  <Fragment>
    {loading ? <Loader /> :   <Fragment>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>Register</p>
            </div>
            <button ref={switcherTab}></button>
          </div>
          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forgot Password ?</Link>
            <input type="submit" value="Login" className="loginBtn" />
          </form>
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
          </form>
        </div>
      </div>
    </Fragment>}
  </Fragment>
  );
};

export default LoginSignup;
