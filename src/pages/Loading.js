import React from 'react';
import LoadingGif from "../assets/image/Loading-gif.mp4";

const Loading = () => {
  return (
    <div className='login-wrapper'>
        <video src={LoadingGif} autoPlay loop muted />
        <h1 style={{position: 'absolute', zIndex: '999'}}>SaaS Management</h1>
    </div>
  )
}

export default Loading;