import {TfiWrite} from 'react-icons/tfi';
import { useNavigate } from 'react-router';
import React, { useEffect , useState} from 'react'
import { doc,   orderBy } from "firebase/firestore";
import {db} from '../firebase'
import { collection, query, where, getDocs ,   limit} from "firebase/firestore";
import BlogItem from '../Components/BlogItem';
import { Link } from 'react-scroll';



export default function Home() {

  const navigate = useNavigate();
  const [techBlogs , setTechBlogs] = useState(null);
  const [sportBlogs , setSportBlogs] = useState(null);
  const [startupBlogs , setStartupBlogs] = useState(null);
  const [politicsBlogs , setPoliticsBlogs] = useState(null);
  const [entertainmentBlogs , setEntertainmentBlogs] = useState(null);







// fetch blogs in tech 
useEffect(()=>{

  async function fetchTech(){
    const blogRef = collection(db , "blogs");
    const q = query(blogRef , where("category" , "==" , "Science and tech") , orderBy("timestamp" , "desc") ,  limit(4));
    const querySnapshot = await getDocs(q);
    let techBlogs =[];
    querySnapshot.forEach((doc)=>{

      return techBlogs.push(
        {
          id: doc.id,
          data : doc.data(),
        }
      );
  
    });
setTechBlogs(techBlogs);
console.log(techBlogs);
  }

  fetchTech();

},[])


// fetch blogs in sports
useEffect(()=>{

  async function fetchSports(){
    const blogRef = collection(db , "blogs");
    const q = query(blogRef , where("category" , "==" , "Sports") , orderBy("timestamp" , "desc") ,  limit(4));
    const querySnapshot = await getDocs(q);
    let sportBlogs =[];
    querySnapshot.forEach((doc)=>{

      return sportBlogs.push(
        {
          id: doc.id,
          data : doc.data(),
        }
      );
  
    });
setSportBlogs(sportBlogs);
console.log(sportBlogs);
  }

  fetchSports();

},[])


// fetch blogs in startups
useEffect(()=>{

  async function fetchSports(){
    const blogRef = collection(db , "blogs");
    const q = query(blogRef , where("category" , "==" , "Startups") , orderBy("timestamp" , "desc") ,  limit(4));
    const querySnapshot = await getDocs(q);
    let startupBlogs =[];
    querySnapshot.forEach((doc)=>{

      return startupBlogs.push(
        {
          id: doc.id,
          data : doc.data(),
        }
      );
  
    });
setStartupBlogs(startupBlogs);
console.log(startupBlogs);
  }

  fetchSports();

},[]);



// fetch blogs in Politics category
useEffect(()=>{

  async function fetchPolitics(){
    const blogRef = collection(db , "blogs");
    const q = query(blogRef , where("category" , "==" , "Politics") , orderBy("timestamp" , "desc") ,  limit(4));
    const querySnapshot = await getDocs(q);
    let politicsBlogs =[];
    querySnapshot.forEach((doc)=>{

      return politicsBlogs.push(
        {
          id: doc.id,
          data : doc.data(),
        }
      );
  
    });
setPoliticsBlogs(politicsBlogs);
console.log(politicsBlogs);
  }

  fetchPolitics();

},[]);



// fetch blogs in Entertainment category
useEffect(()=>{

  async function fetchEntertainment(){
    const blogRef = collection(db , "blogs");
    const q = query(blogRef , where("category" , "==" , "Entertainment") , orderBy("timestamp" , "desc") ,  limit(4));
    const querySnapshot = await getDocs(q);
    let entertainmentBlogs =[];
    querySnapshot.forEach((doc)=>{

      return entertainmentBlogs.push(
        {
          id: doc.id,
          data : doc.data(),
        }
      );
  
    });
setEntertainmentBlogs(entertainmentBlogs);
console.log(entertainmentBlogs);
  }

  fetchEntertainment();

 },[])



  return (
    <div className='px-3 '>
    <div className="hero min-h-16 bg-orange-200 text-[#454545]  py-6 my-4 ">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-3xl font-bold uppercase">Discover best content</h1>
      <p className="py-6">A perfect platform to Create and Discover new content, category wise</p>
<div className='flex flex-row justify-center space-x-4'>
      <button className="btn bg-[#FF6000] hover:bg-[#FFA559] outline-0 border-orange-500 "  onClick={()=>navigate("/publish-blogs")}>CREATE NEW BLOG <TfiWrite className='h-6 w-6 m-2' /> </button>
      <button className="btn btn-primary "   onClick={() =>
    window.scrollTo({
      top: document.getElementById('Startups').offsetTop,
      behavior: 'smooth',
    })
  }>DISCOVER</button>
</div>
    </div>
  </div>
</div>

<section>









<div>
      { startupBlogs && startupBlogs.length > 0 && (
        
        <Link to="Startups" id="Startups" smooth={true} duration={500}>
        <h2 className='font-bold text-xl'>Recent in Startups</h2>
        <p className='text-sm hover:text-orange-500 hover:cursor-pointer'>Show more in Startups</p>
<ul className="sm:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 my-3">
    {startupBlogs.map((blog) => (
      <BlogItem
        key={blog.id}
        id={blog.id}
        blog={blog.data}
      />
    ))}
  </ul>
</Link>

)}
</div>











  <div>
      <div>
      { techBlogs && techBlogs.length > 0 && (
        
        <Link to="Scienceandtech" id="Scienceandtech" smooth={true} duration={500} >
        <h2 className='font-bold text-xl'>Recent in Science and Tech</h2>
        <p className='text-sm hover:text-orange-500 hover:cursor-pointer'>Show more in Science and Tech</p>
<ul className="sm:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 my-3">
    {techBlogs.map((blog) => (
      <BlogItem
        key={blog.id}
        id={blog.id}
        blog={blog.data}
      />
    ))}
  </ul>
</Link>

)}
      </div>











<div>
      { sportBlogs && sportBlogs.length > 0 && (
        
        <>
        <h2 className='font-bold text-xl'>Recent in Sports</h2>
        <p className='text-sm hover:text-orange-500 hover:cursor-pointer'>Show more in Sports</p>
<ul className="sm:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 my-3">
    {sportBlogs.map((blog) => (
      <BlogItem
        key={blog.id}
        id={blog.id}
        blog={blog.data}
      />
    ))}
  </ul>
</>

)}
</div>




{/* politics */}
<div>
      { politicsBlogs && politicsBlogs.length > 0 && (
        
        <>
        <h2 className='font-bold text-xl'>Recent in Politics</h2>
        <p className='text-sm hover:text-orange-500 hover:cursor-pointer'>Show more in Politics</p>
<ul className="sm:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 my-3">
    {politicsBlogs.map((blog) => (
      <BlogItem
        key={blog.id}
        id={blog.id}
        blog={blog.data}
      />
    ))}
  </ul>
</>

)}
</div>


{/* Entertainment */}
<div>
      { entertainmentBlogs && entertainmentBlogs.length > 0 && (
        
        <>
        <h2 className='font-bold text-xl'>Recent in Entertainment</h2>
        <p className='text-sm hover:text-orange-500 hover:cursor-pointer'>Show more in Entertainment</p>
<ul className="sm:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 my-3">
    {entertainmentBlogs.map((blog) => (
      <BlogItem
        key={blog.id}
        id={blog.id}
        blog={blog.data}
      />
    ))}
  </ul>
</>

)}
</div>



  </div>
</section>


    </div>
  )
}
