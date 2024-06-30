import React from 'react'
import {useNavigate, useParams} from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import {getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import {v4 as uuidv4} from "uuid" ;
import {toast} from 'react-toastify';
import {doc , serverTimestamp , getDoc, updateDoc } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function PublishBlog() {

    // const navigate = useNavigate();

    // const [text, setText] = useState('');
const auth = getAuth();
const params = useParams();
const navigate = useNavigate();

    // all variables stored in "blogs" collection 
    const [blogData, setBlogData] = useState({
    // category : "Sports" , 
    title: "",
    content:"",
    description:"",
    images:{}, 
  })
      //de-structuring the form data
    const { 
      // category , 
      title , content , description , images } = blogData;


      const [selectedCategory, setSelectedCategory] = useState("Sports");

  const textareaRef = useRef(null);
const blogContent = true ;

  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   setText(value);


  //   if(id=="content"){
      
  //     adjustTextareaHeight();
  //   }


  // };


// function to fetch doc data and autofill the initial data
useEffect(()=>{

    async function fetchBlog(){
        const docRef = doc (db, "blogs" , params.blogId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            setBlogData(docSnap.data());
            console.log(docSnap.data().category);
            setSelectedCategory(docSnap.data().category);
        }else{
            navigate("/");
            toast.error("Blog does not exist");
        }

    }
fetchBlog();
},[navigate , params.blogId]);



  function handleChange(e){
let boolean = null ; 

if(e.target.files)
{
  setBlogData((prevState) => ({
    ...prevState,
    images:e.target.files


  }))
}

// for text , boolean , numbers 
  if(!e.target.files)
  {
    setBlogData((prevState) => ({
      ...prevState,
      [e.target.id] : boolean ?? e.target.value ,
    }));
  }

  if(blogContent)
  {
      
    adjustTextareaHeight();
       }
}

 async function onSubmit(e){
  e.preventDefault();
  
console.log(blogData);

// whole code of storeImage function availaible on Firebase Docs : https://firebase.google.com/docs/storage/web/upload-files#full_example
async function storeImage(image){
    
  return new Promise((resolve,reject) => {
    const storage = getStorage(); 
    const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
    const storageRef = ref(storage,filename);
    const uploadTask = uploadBytesResumable(storageRef, image);

    // Listen for state changes, errors, and completion of the upload.

    uploadTask.on('state_changed' , (snapshot)=>{
       // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       console.log('Upload is ' + progress + '% done');
       switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }

    },
    (error) =>{reject(error);},

    ()=>{
       // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => 
            {
              resolve(downloadURL);
              console.log(downloadURL);
            });
            // console.log(downloadURL);
    }
    );
    

  });

}

const imgUrls = await Promise.all(
  [...images].map((image)=> storeImage(image))).catch((error)=>{
    toast.error("Failed to upload images");
    return;
  });


  // create a copy of blogData 
  const blogDataCopy = {

    ...blogData, 
    imgUrls, 
    timestamp:serverTimestamp(),
    useRef: auth.currentUser.uid,
    Name: auth.currentUser.displayName, 
    category: selectedCategory,
}

delete blogDataCopy.images;

// add new document with a document ID
const docRef =  doc(db , "blogs" , params.blogId);
await updateDoc(docRef , blogDataCopy);
console.log("Document written with ID: ", docRef.id);

toast.success("Blog Edited successfully");
navigate("/profile");
console.log(blogDataCopy);
}



  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  return (
    <main className='bg-white 454545'>

        <h1 className='text-3xl normal-case font-bold mt-4 ml-4'>Edit your blog</h1>


<form onSubmit = {onSubmit} class='bg-white px-2' >

<div className='flex flex-col sm:flex-row mt-6 w-full   '>
            
  <div class="form-control  flex flex-col  w-full  sm:w-2/3  ">
    <input type="text" placeholder="Title" id="title" value={title} onChange={handleChange} className="input  text-[#454545]  input-ghost w-full focus:bg-white focus:outline-0 focus:border-l-orange-500 border-2 font-semibold  sm:text-xl text-lg focus:border-y-0 focus:border-r-0" />
    <textarea 
          ref={textareaRef}
          value={content}
          id="content"
          onChange={handleChange}  className="textarea w-full  mt-12 textarea-ghost  text-[#454545]  focus:outline-0 focus:border-l-orange-500 border-2 focus:border-y-0   focus:border-r-0 focus:bg-white focus:border-l-2 text-sm font-semibold overflow-hidden sm:text-base mb-4" placeholder="Start Crafting your thoughts ...">
    </textarea>
    <input type="text" id="description" value={description} placeholder="One line description so your readers know what your content is about" onChange={handleChange} className=" text-[#454545] input input-ghost w-full  focus:bg-white focus:outline-0 focus:border-l-orange-500 border-2 font-semibold  sm:text-base text-xs focus:border-y-0 focus:border-r-0" />

  </div>


<div className='sm:ml-14  mt-4  mb-3 flex flex-col  items-center'>

<div className="form-control w-full max-w-xs mb-3">
  <label className="label">
    <span className="label-text">Content Category</span>
  </label>
  <select    value={selectedCategory}
  onChange={(e) => setSelectedCategory(e.target.value)} className="select select-bordered focus:outline-0 hover:shadow-lg">
    <option   value="Sports">Sports</option>
    <option  value="Science and tech"> Science and Tech</option>
    <option  value="Politics">Politics</option>
    <option  value="Entertainment">Entertainment</option>
    <option  value="Startups">Startups</option>
    <option  value="Other">Other</option>


  </select>
</div>

<div className='mb-10'>
<label className="label">
    <span className="label-text">Select Thumbnail for your content (only 1)</span>
  </label>
<input type="file" id="images"  onChange={handleChange} className="file-input file-input-bordered file-input-primary w-full max-w-xs"  />
</div>


<button type="submit" className="btn btn-outline hover:bg-orange-500  border-orange-500 border-2 text-orange-500 hover:border-orange-500  sm:w-full  ">PUBLISH CHANGES</button>


</div>

</div>

</form>

    </main>
  )
}
