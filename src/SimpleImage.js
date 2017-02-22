import React from 'react';


const SimpleImage = ({src, alt, setRef, className, width, height}) => {
  return <img src={src} alt={alt} ref={setRef} className={className} width={width} height={height}/>
};

SimpleImage.PropTypes = {
  src: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  alt: React.PropTypes.string
};

export default SimpleImage;