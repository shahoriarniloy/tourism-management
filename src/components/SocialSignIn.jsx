"use client"

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const SocialSignIn = () => {
    const router=useRouter();
    const handleSocialLogin = async(provider)=>{
        console.log('called');
        const resp = await signIn(provider)
        // if(resp.status==='authenticated')
        // {
        //     router.push('/')
        // }

    }
    return (
        <div>
            <div className="mt-4">
          <p className="text-center text-sm text-gray-600">Or sign in with</p>
          <div className="flex justify-center space-x-4 mt-3">
            <button onClick={() => handleSocialLogin('google')}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              <i className="fab fa-google"></i> 
              <span>Google</span>
            </button>

            {/* <button onClick={handleSocialLogin}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-900"
            >
              <i className="fab fa-facebook-f"></i>
              <span>Facebook</span>
            </button> */}
          </div>
        </div>
            
        </div>
    );
};

export default SocialSignIn;