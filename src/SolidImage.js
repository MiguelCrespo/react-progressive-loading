import React from 'react';


const SolidImage = ({src, alt, setRef, className, color, width, height, isLoaded}) => {
  let classes = 'solid-color';
  if (isLoaded) {
    classes += ' loaded';
  }

  return <div className="progressive-image_container progressive-image_container-solid">
    <div className={classes} style={{
      backgroundColor: color,
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: isLoaded ? 'none' : 'block'
    }}></div>
    <img src={src} alt={alt} ref={setRef} className={className} width={width} height={height}/>
  </div>
};

SolidImage.PropTypes = {
  src: React.PropTypes.string.isRequired,
  color: React.PropTypes.string.isRequired,
  isLoaded: React.PropTypes.bool,
  className: React.PropTypes.string,
  alt: React.PropTypes.string
};

export default SolidImage;