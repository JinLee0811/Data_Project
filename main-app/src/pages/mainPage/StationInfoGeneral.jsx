import { useEffect } from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import useHttpRequest from '../../utils/useHttp';
import { ClipLoader } from 'react-spinners';

export default function StationfacilInfoGeneral() {
  const station = useOutletContext();
  const { station_id } = useParams();
  const [facilInfo, setFacilInfo] = useState();
  const { sendRequest, isLoading } = useHttpRequest();

  const getLevel = (level) => {
    if (level > 60) return '혼잡';
    if (level > 34) return '보통';
    return '쾌적';
  };

  useEffect(() => {
    sendRequest(`/facilities/${station_id}`, 'get')
      .then((response) => {
        setFacilInfo(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (isLoading) {
    return (
      <LoadingContainer>
        <ClipLoader color='#33a23d' loading={isLoading} />
      </LoadingContainer>
    );
  }
  return (
    station &&
    facilInfo && (
      <>
        <Div>호선: {station?.station_line}</Div>
        <Div>단위면적 가격: {station?.rent_price}</Div>

        <Div>
          편의시설
          <Grid>
            <GridItem>
              <GridHead>
                <MaterialSymbol className='material-symbols-outlined'>
                  park
                </MaterialSymbol>
                <div>
                  {facilInfo?.park.length === 0
                    ? '주변에 공원이 없어요'
                    : facilInfo.park[0].name}
                </div>
              </GridHead>
              <Distance>
                {facilInfo?.park.length !== 0 &&
                  `(반경 ${facilInfo.park[0].dist}m)`}
              </Distance>
            </GridItem>
            <GridItem>
              <GridHead>
                <MaterialSymbol className='material-symbols-outlined'>
                  storefront
                </MaterialSymbol>
                <div>
                  {facilInfo?.mart.length === 0
                    ? '주변에 마트가 없어요'
                    : facilInfo.mart[0].name}
                </div>
              </GridHead>
              <Distance>
                {facilInfo?.mart.length !== 0 &&
                  `(반경 ${facilInfo.mart[0].dist}m)`}
              </Distance>
            </GridItem>
            <GridItem>
              <GridHead>
                <MaterialSymbol className='material-symbols-outlined'>
                  theaters
                </MaterialSymbol>
                <div>
                  {facilInfo?.cinemas.length === 0
                    ? '주변에 영화관이 없어요'
                    : facilInfo.cinemas[0].name}
                </div>
              </GridHead>
              <Distance>
                {facilInfo?.cinemas.length !== 0 &&
                  `(반경 ${facilInfo.cinemas[0].dist}m)`}
              </Distance>
            </GridItem>

            <GridItem>
              <GridHead>
                <MaterialSymbol className='material-symbols-outlined'>
                  local_hospital
                </MaterialSymbol>
                <div>
                  {facilInfo?.hospitals?.length === 0
                    ? '주변에 병원이 없어요'
                    : facilInfo.hospitals[0].name}
                </div>
              </GridHead>
              <div> </div>
            </GridItem>
          </Grid>
        </Div>
        <Div>
          <div>혼잡도</div>
          <Complex>
            <div>
              출근(상행) -
              {getLevel(station.StationCrowdedness[0].startTime_upbound)}
            </div>
            <Circle
              level={getLevel(station.StationCrowdedness[0].startTime_upbound)}
            ></Circle>
          </Complex>
          <Complex>
            <div>
              출근(하행) -
              {getLevel(station.StationCrowdedness[0].startTime_downbound)}
            </div>
            <Circle
              level={getLevel(
                station.StationCrowdedness[0].startTime_downbound
              )}
            ></Circle>
          </Complex>

          <Complex>
            <div>
              퇴근(상행) -
              {getLevel(station.StationCrowdedness[0].endTime_upbound)}
            </div>
            <Circle
              level={getLevel(station.StationCrowdedness[0].endTime_upbound)}
            ></Circle>
          </Complex>
          <Complex>
            <div>
              퇴근(하행) -
              {getLevel(station.StationCrowdedness[0].endTime_downbound)}
            </div>
            <Circle
              level={getLevel(station.StationCrowdedness[0].endTime_downbound)}
            ></Circle>
          </Complex>
        </Div>
      </>
    )
  );
}

const Div = styled.div`
  display: flex;
  padding: 1.2rem 1rem;
  font-size: 0.8rem;
  border-bottom: 0.5px solid #e9ecef;
  flex-direction: column;
  /* font-family: 'NanumSquareNeoExtraBold'; */
  .material-symbols-outlined {
    color: #999;
    font-size: 1.2rem;
  }
  h1 {
    padding: 5px;
    font-size: 1rem;
  }
  .complex {
    padding-top: 1rem;
    padding-left: 0.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 7px;
`;

const GridItem = styled.div`
  padding: 5px;
  font-size: 0.7rem;
`;
const GridHead = styled.div`
  display: flex;
  align-items: center;
`;

const Distance = styled.div`
  padding-left: 17px;
  color: #999;
`;

const MaterialSymbol = styled.div`
  font-size: 1rem;
`;

const LoadingContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding-top: 80px;
  align-items: center;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  border-radius: 50%;
  background: ${({ level }) =>
    `radial-gradient(circle, ${complex_level[level]}, #fff)`};

  filter: blur(3px);
`;

const Complex = styled.div`
  display: flex;
  padding-top: 1rem;
  padding-left: 0.5rem;
  align-items: center;
`;

const complex_level = {
  혼잡: '#ff0000',
  보통: '#ffff00',
  쾌적: '#00ff00',
};
