const getCityInfo = (info, key) => {
  const data = JSON.parse(info);
  const cityInfo = data[key];
  return cityInfo;
};

const makeCard = cityInfo => {
  return (
    <div className="city_card">
      <div className="city_card_name">{cityInfo['countryName']}</div>
      <div className="city_card_value">
        <div>
          확진자: <span className="orange"> &nbsp;{cityInfo['totalCase']}</span>
          <span className="city_card_plus">
            {' '}
            &nbsp;[+{cityInfo['newCase']}]
          </span>
        </div>
        <div>
          국내 &nbsp;&nbsp;:{' '}
          <span className="skyblue"> &nbsp;{cityInfo['newCcase']}</span>{' '}
        </div>
        <div>
          해외 &nbsp;&nbsp;:{' '}
          <span className="skyblue"> &nbsp;{cityInfo['newFcase']}</span>{' '}
        </div>
        <div>
          완치자: <span className="green"> &nbsp;{cityInfo['recovered']}</span>{' '}
        </div>
        <div>
          사망자: <span className="red"> &nbsp;{cityInfo['death']}</span>{' '}
        </div>
        <div>
          발생률: <span className="blue"> &nbsp;{cityInfo['percentage']}%</span>{' '}
        </div>
      </div>
    </div>
  );
};

export { getCityInfo, makeCard };
