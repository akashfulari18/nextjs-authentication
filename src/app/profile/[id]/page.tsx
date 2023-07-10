import React from 'react'

function userProfile({params}:any) {

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2 text-white bg-slate-900 text-center'>
        <div>ProfilePage</div>
    
   
    <div className='text-4xl'>Profile  page : {params.id}</div>

    
    </div>
  )
}

export default userProfile