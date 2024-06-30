import React from 'react';
import {getAuth} from 'firebase/auth';
import { useLocation , Link } from 'react-router-dom';
import {CiShare1 , CiEdit} from 'react-icons/ci';
import {BsBookmark , BsBookmarkFill} from 'react-icons/bs';
import {MdDelete} from 'react-icons/md';
import {useState} from 'react';
import {toast} from 'react-toastify';
import { useNavigate } from 'react-router';


export default function BlogItem( {blog , id , onDelete , onEdit}) 
{
 const auth = getAuth();
 const location = useLocation();
 const [shareurl , setShareurl] = useState(false);
 const navigate = useNavigate();



 function pathMatchRoute(route)
 {
   if(route === location.pathname ){
     return true;
   }
 }

 const handleShareClick = () => {
  const baseUrl = 'https://blogstack-harshj23.vercel.app';
  const url = `${baseUrl}/${blog.category}/${blog.title}/${id}`;
navigator.clipboard.writeText(url)
    .then(() => {
     toast.success("Link copied to clipboard");
    })
    .catch((error) => {
     toast.error(error);
    });


};





return (

    <li className='mb-4 mx-4 '>
      <div className="card  hover:cursor-pointer lg:card-side bg-white text-[#454545] hover:shadow-2xl transition-scale duration-200 ease-in ">
 <img src={blog.imgUrls} className='h-[200px] w-full sm:w-[200px] py-3 px-3 object-cover ' alt="Album"/>
      <Link className='contents' to={`/${blog.category}/${blog.title}/${id}`}>
  <div className="card-body">
<div className='-mt-6 flex flex-row justify-between'>
    <span className=' text-xs font-semibold uppercase text-white bg-orange-500 p-1 rounded-md'>{blog.category}</span>
    <span>

        {!pathMatchRoute("/profile") && (
      <p className='font-semibold text-sm hover:cursor-pointer hover:underline'>

          -{blog.Name} 
      </p>

        )}
    </span>

</div>
      <h2 className=" text-xl font-bold">{blog.title}</h2>
    <p className='text-sm'>{blog.description}</p>




<div className="card-actions justify-end mt-3">
      <ul className='flex flex-row space-x-10'>

      {!pathMatchRoute("/profile") && (
     
        <li className="tooltip tooltip-bottom font-bold" data-tip="Bookmark"><BsBookmark  className=' h-5 w-5 font-bold'/></li>

        )}
        <li className="tooltip tooltip-bottom font-bold" data-tip="Share Link" onClick={handleShareClick}><CiShare1  className=' h-6 w-6 font-bold'/></li>
        
        {pathMatchRoute("/profile") && (
     <>
     { onEdit && (
<Link to = {`/edit-blog/${id}`}>

<li className="tooltip tooltip-bottom font-bold" data-tip="Edit this blog"><CiEdit  className=' h-6 w-6 font-bold'/></li>

</Link>

     )

     }
     {
      onDelete && (
        
        <li className="tooltip tooltip-bottom font-bold" data-tip="Delete this blog"  onClick={() => onDelete(blog.id)} ><MdDelete  className=' h-6 w-6 font-bold'/></li>
      )
     }
     </>

     )}


      </ul>
</div>

  </div>
</Link>
</div>
    </li>
  )
}
