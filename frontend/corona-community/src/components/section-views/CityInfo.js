import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import { getCityInfo, makeCard } from '../infoHandler/CityCardProvider';

const CityInfo = () => {
  const [info, setInfo] = useState();

  const fetchData = async () => {
    const response = await fetch(
      `https://api.corona-19.kr/korea/country/new/?serviceKey=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();

    setInfo(JSON.stringify(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!info) {
    return <Loading></Loading>;
  }

  const cards = {};
  const data = JSON.parse(info);
  let generatedCards = [];

  for (let key in data) {
    cards[key] = getCityInfo(info, key);
    generatedCards.push(makeCard(cards[key]));
  }
  generatedCards.shift();
  generatedCards.shift();

  return (
    <div>
      <div className="city_info_title">
        <h2>시도별 확진 현황판</h2>
        발생률: 인구 10만명당 (지역별 인구 출처 : 행정안전부, 주민등록인구현황
        (20년.1월 기준))
      </div>
      <div className="info_by_city">{generatedCards}</div>
    </div>
  );
};

export default CityInfo;
