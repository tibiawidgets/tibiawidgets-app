import * as React from 'react';
import './BoostedBanner.css';
import RashidImg from '../../assets/RashidTemplate.gif';
import { getRashidLocation, getCreatures, getBosses } from '../../services/tibia-api';

export interface IBoostedBannerProps {}

export default function BoostedBanner(props: IBoostedBannerProps) {
  const [date, setDate] = React.useState(new Date());
  const [boostedBoss, setBoostedBoss] = React.useState({});
  const [boostedMonster, setBoostedMonster] = React.useState({});

  React.useEffect(() => {
    getBosses().then((data) => {
      setBoostedBoss(data.boostable_bosses.boosted);
    });
    getCreatures().then((data) => {
      setBoostedMonster(data.creatures.boosted);
    });
  }, []);

  return (
    <div className="banner-box">
      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="border-1" />
      <div className="banner-content">
        <span className="flex  items-center">
          <img src={RashidImg} width={80} alt="rashid" />
          Rashid is at <span className="ml-2 text-yellow-500 outlined-text">{getRashidLocation()}</span>
        </span>
        <span className="flex items-center">
          <div className="relative w-20 h-full mr-2">
            <img className="mr-2 -mt-2 boss" src={boostedBoss.image_url} width={40} height={40} alt="boosted-monster" />
          </div>
          Boosted Monster:{' '}
          <span className="ml-2 text-yellow-500 outlined-text">{boostedBoss.name || 'loading...'}</span>
        </span>
        <span className="flex items-center">
          <div className="relative w-28 h-full">
            <img
              className="mr-2 -mt-2 boss"
              src={boostedMonster.image_url}
              width="60px"
              height="60px"
              alt="boosted-monster"
            />
          </div>
          Boosted Boss:{' '}
          <span className="ml-2 text-yellow-500 outlined-text">{boostedMonster.name || 'loading...'}</span>
        </span>
      </div>
      <div className="corner-bl" />
      <div className="corner-br" />
      <div className="border-2" />
    </div>
  );
}
