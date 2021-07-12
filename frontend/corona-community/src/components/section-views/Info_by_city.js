import React, { useState, useEffect } from 'react';
import Loading from '../Loading';

const Info_by_city = () => {
  const [info, setInfo] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.corona-19.kr/korea/country/new/?serviceKey=${process.env.REACT_APP_API_KEY}`
      );
      const data = await response.json();

      setInfo(JSON.stringify(data));
    };

    fetchData();
  }, []);

  if (!info) {
    return <Loading></Loading>;
  }

  return <div className="info_by_city">{info}</div>;
};

export default Info_by_city;
