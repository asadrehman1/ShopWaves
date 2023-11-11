import React, { Fragment, useEffect, useState } from "react";
import "./UpdateProfile.css";
import {useDispatch,useSelector} from "react-redux";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import MetaData from "../layout/Header/MetaData";
import FaceIcon from "@material-ui/icons/Face";
import { useNavigate } from "react-router-dom";
import {useAlert} from "react-alert"
import { clearError,loadUser,updateProfile } from "../../actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";

const UpdateProfile = () => {
    const navigate = useNavigate();
    
  const dispatch = useDispatch();
  const alert = useAlert();

  const {user} = useSelector(state=>state.user);
  const {loading , isUpdated ,error} = useSelector(state=>state.profile)
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");


  useEffect(()=>{
    if(user){
        setName(user.name);
        setEmail(user.email)
        setAvatarPreview(user?.avatar?.url);
    }
    
    if(error){
        alert.error(error)
        dispatch(clearError());
    }
    if(isUpdated){
       alert.success("Profile Successfully Updated");
       dispatch(loadUser());
       navigate("/account")

       dispatch({type:UPDATE_PROFILE_RESET})
    }
},[dispatch,alert,error,isUpdated,navigate,user])

  const updateSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name",name);
    myForm.set("email",email);
    myForm.set("avatar",avatar);

    dispatch(updateProfile(myForm));
  }

  const updateDataChange = (e) => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
            if(fileReader.readyState === 2){
                setAvatarPreview(fileReader.result);
                setAvatar(fileReader.result);
            }
        }
        fileReader.readAsDataURL(e.target.files[0]);
    }
  

    
  return (
   <Fragment>
    {loading ? <Loader /> :  <Fragment>
        <MetaData title="UPDATE PROFILE"/>
      <div className="updateProfileContainer">
        <div className="updateProfileBox">
            <h2 className="updateProfileHeading">Update Profile</h2>
        <form
            className="updateProfileForm"
            encType="multipart/form-data"
            onSubmit={updateSubmit}
          >
            <div className="updateProfileName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div className="updateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
                <div id="updateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateDataChange}
                  />
                </div>
                <input type="submit" value="Update" className="updateProfileBtn" />
          </form>
        </div>
    </div>
    </Fragment>}
   </Fragment>
  )
}

export default UpdateProfile