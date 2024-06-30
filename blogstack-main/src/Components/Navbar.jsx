import React from 'react'
import { useNavigate ,  useLocation } from "react-router-dom";
import {HiHome} from 'react-icons/hi'
import {BiHome} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
import {VscSignIn} from 'react-icons/vsc'
import {TfiWrite} from 'react-icons/tfi'
import {useState,useEffect} from 'react'
import { getAuth , onAuthStateChanged } from "firebase/auth";





export default function Navbar() {

  // useState hook to set status of user and accordingly change the icon between sign-in and profile icon 
  const [pageState , setPageState] = useState(<VscSignIn className="h-6 w-6"/> );


  const location = useLocation();
  const auth = getAuth();
  // const user = auth.currentUser;

function pathMatchRoute(route)
{
  if(route === location.pathname ){
    return true;
  }
}

  useEffect(()=>{
   
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // user is signed-in
        setPageState(<CgProfile className='h-6 w-6'/>);
      
        // const uid = user.uid;
        // ...
      } else {
        // User is signed out
        setPageState(<VscSignIn className="h-6 w-6"/> );
     
      }
    });


  },[auth]);

const navigate = useNavigate();


  return (
    <div className=' shadow-gray-200 shadow-lg bg-white'>

    <header>
        <div className="navbar">
  <div className="navbar-start ">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-square">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 ">
        <li onClick={() => navigate("/profile")} className='bg-orange-500   font-bold text-white'><a>Profile</a></li>
        <li onClick={() => navigate("/")} className='bg-orange-500   font-bold text-white'><a>Homepage</a></li>
        <li className='bg-orange-200   hover:bg-orange-500 transition ease-in-out duration-100 font-bold hover:text-white'><a> Science and Tech</a></li>
        <li className='bg-orange-200   hover:bg-orange-500 transition ease-in-out duration-100 font-bold hover:text-white'><a>Sports</a></li>
        <li className='bg-orange-200   hover:bg-orange-500 transition ease-in-out duration-100 font-bold hover:text-white'><a>Startups</a></li>
        <li className='bg-orange-200   hover:bg-orange-500 transition ease-in-out duration-100 font-bold hover:text-white'><a>Politics</a></li>
      </ul>
    </div>
  </div>
  <div className="navbar-center" onClick={() => navigate("/")}>
    <a className="btn btn-ghost normal-case text-2xl text-orange-500">BlogStack</a>
  </div>

  {/* end icons of navbar  */}
<div className="navbar-end">

    <button className={`btn btn-ghost btn-square ${pathMatchRoute("/") &&   "border-b-orange-500 border-y-2"} `} onClick={() => navigate("/") } >
        <BiHome className="h-6 w-6"  />
       
    </button>

    <button className={`btn btn-ghost btn-square ${pathMatchRoute("/publish-blogs") &&   "border-b-orange-500 border-y-2"} `} onClick={() => navigate("/publish-blogs")}>
        <TfiWrite className="h-6 w-6"  />
       
    </button>

    <button className={`btn btn-ghost btn-square 
    ${ pathMatchRoute("/profile") || pathMatchRoute("/sign-in")  &&   "border-b-orange-500 border-y-2"} `} onClick={()=>navigate("/profile")}>
        {/* <CgProfile className='h-6 w-6'/> */}
        {/* <VscSignIn className="h-6 w-6"/> */}
      {pageState}
    </button>



</div>


</div>
      </header>

    </div>
   
  )
}
