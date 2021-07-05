import React, { useState, useEffect } from 'react';
import Loading from '../component/Loading';

const Korea_info = () => {
  const [info, setInfo] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.corona-19.kr/korea/?serviceKey=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();

      setInfo(JSON.stringify(data));
    };

    fetchData();
  }, []);

  if (!info) {
    return <Loading></Loading>;
  }

  return <div className="korea_info">{info}</div>;
};

export default Korea_info;
