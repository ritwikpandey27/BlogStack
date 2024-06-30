import React from 'react'
import { useNavigate } from 'react-router';

import OAuth from '../Components/OAuth';

export default function SignIn() {
    
    const navigate = useNavigate();
    

  return (
    <div className="hero min-h-screen bg-white mt-2">

  <div className="hero-content flex-col lg:flex-row-reverse">

    {/* main section written content  */}
    <div className="text-center lg:text-left ml-5">
      <h1 className="text-5xl font-bold normal-case ">Welcome to <span className='normal-case text-orange-500'>BlogStack</span></h1>
      <p className="py-6">A perfect platform for you  to craft informative blogs and discover new content , category wise.</p>
    </div>


{/* sign in card */}
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 ">
      <div className="card-body">
        
        <div >
            <p className='justify-center text-center'>Sign in With Google and and start writing amazing blogs on <span className='normal-case font-bold text-orange-500'>BlogStack</span> </p>
        </div>

        <OAuth/>

      </div>
    </div>


  </div>
</div>
  )
}
