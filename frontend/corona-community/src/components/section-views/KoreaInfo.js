import React, { useState, useEffect } from 'react';
import Loading from '../Loading';
import KoreaDounut from '../infoHandler/KoreaDounutChart';

const KoreaInfo = () => {
  const [info, setInfo] = useState();

  const fetchData = async () => {
    const response = await fetch(
      `https://api.corona-19.kr/korea/?serviceKey=${process.env.REACT_APP_API_KEY}`
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

  const infoJson = JSON.parse(info);
  const updateTime = infoJson['updateTime'];

  return (
    <div className="korea_info">
      <div className="korea_info_title">
        <h2>국내 현황판</h2>
        국내 확진 정보에 대한 자세한 내용은 [시도별 확진]에서 확인하실 수
        있습니다.
      </div>

      <div className="first_card">
        <div className="korea_total_info">
          <div className="korea_total_info_card">
            <div className="card_cover orange">
              <div className="card_value">{infoJson['TotalCase']}</div>
            </div>
            <div className="card_describe">국내 확진자</div>
          </div>

          <div className="korea_total_info_card">
            <div className="card_cover green">
              <div className="card_value">{infoJson['TotalRecovered']}</div>
              <div className="card_plus">+{infoJson['TodayRecovered']}</div>
            </div>
            <div className="card_describe">국내 완치자</div>
          </div>

          <div className="korea_total_info_card">
            <div className="card_cover red">
              <div className="card_value">{infoJson['TotalDeath']}</div>
              <div className="card_plus">+{infoJson['TodayDeath']}</div>
            </div>
            <div className="card_describe">국내 사망자</div>
          </div>

          <div className="korea_total_info_card last_card">
            <div className="card_cover blue">
              <div className="card_value">{infoJson['NowCase']}</div>
              <div className="card_plus">+{infoJson['TotalCaseBefore']}</div>
            </div>
            <div className="card_describe">국내 치료중</div>
          </div>
        </div>

        <div className="second_card">
          <div className="korea_total_info">
            <div className="korea_total_info_card">
              <div className="card_cover blue">
                <div className="card_value">{infoJson['checkingCounter']}</div>
              </div>
              <div className="card_describe">국내 검사중</div>
            </div>

            <div className="korea_total_info_card">
              <div className="card_cover orange">
                <div className="card_value">{infoJson['casePercentage']}%</div>
              </div>
              <div className="card_describe">국내 확진율</div>
            </div>

            <div className="korea_total_info_card">
              <div className="card_cover green">
                <div className="card_value">
                  {infoJson['recoveredPercentage']}%
                </div>
              </div>
              <div className="card_describe">국내 완치율</div>
            </div>

            <div className="korea_total_info_card last_card">
              <div className="card_cover red">
                <div className="card_value">{infoJson['deathPercentage']}%</div>
              </div>
              <div className="card_describe">국내 사망률</div>
            </div>
          </div>
        </div>
      </div>
      <div className="korea_info_summary">
        <div className="info_title bold">국내 주요 시도별 현황판</div>

        <div className="korea_info_summary_container">
          <div className="korea_info_doughnut">
            <KoreaDounut infoJson={infoJson}></KoreaDounut>
          </div>

          <div className="cities">
            <ul className="city_list">
              <li className="city_item blue">
                서울: &emsp;&emsp;{infoJson['city1p']}%
              </li>
              <li className="city_item yellow">
                기타: &emsp;&emsp;{infoJson['city2p']}%
              </li>
              <li className="city_item skyblue">
                경기: &emsp;&emsp;{infoJson['city3p']}%
              </li>
              <li className="city_item red">
                대구: &emsp;&emsp;{infoJson['city4p']}%
              </li>
              <li className="city_item purple">
                인천: &emsp;&emsp;{infoJson['city5p']}%
              </li>
            </ul>
          </div>

          <div className="summary_describe">
            <br></br>
            대한민국 시도별 발생동향을 확인하실 수 있습니다.
            <br></br>
            <br></br>
            발생률: 인구 10만명당 <br></br>(지역별 인구 출처 : 행정안전부,
            주민등록인구현황 <br></br>(20년.1월 기준))
            <br></br>
            <br></br>※ 지역구분은 신고지를 기준으로 하며, 초기 신고 이후
            소관지역이 변경된 경우 변동 가능
            <br></br>
            <br></br>※ {updateTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KoreaInfo;
