import React from 'react';

const Home = () => {
  const containerStyle = {
    position: 'relative',
    height: '100vh', // Full viewport height
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'url(https://www.shutterstock.com/image-photo/application-form-document-filling-concept-260nw-485932660.jpg) no-repeat center center',
    backgroundSize: 'cover'
  };

  const headingStyle = {
    position: 'absolute',
    zIndex: 1,
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    fontSize: '2rem',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Welcome to the Student Portal</h2>
     
    </div>
  );
};

export default Home;
