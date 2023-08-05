import {useEffect, useState} from 'react';

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({availWidth: window.screen.availWidth, availHeight: window.screen.availHeight});

  const callback = () => {
    setScreenSize({availWidth: window.screen.availWidth, availHeight: window.screen.availHeight});
  };

  useEffect(() => {
    window.addEventListener('resize', callback);

    return () => {
      window.removeEventListener('resize', callback);
    };
  }, []);

  return { screenSize };
};
