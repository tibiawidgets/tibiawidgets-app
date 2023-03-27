import * as React from 'react';
import './BoostedBanner.css';
import RashidImg from '../../assets/RashidTemplate.gif';
import { getRashidLocation, getCreatures, getBosses, imagesUrl } from '../../services/tibia-api';

export interface IBoostedBannerProps {}

export default function BoostedBanner(props: IBoostedBannerProps) {
  const [date, setDate] = React.useState(new Date());
  const [boostedBoss, setBoostedBoss] = React.useState({});
  const [boostedMonster, setBoostedMonster] = React.useState({});

  React.useEffect(() => {
    getBosses().then((data) => {
      const boosted = data.boostable_bosses.boostable_boss_list.find((creature) => creature.featured === true);
      setBoostedBoss(boosted);
    });
    getCreatures().then((data) => {
      const boosted = data.creatures.creature_list.find((creature) => creature.featured === true);
      setBoostedMonster(boosted);
    });
  }, []);

  return (
    <div className="banner-box xl:justify-center">
      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="border-1" />
      <div className="banner-content xl:justify-around xl:max-w-5xl">
        <span className="flex  items-center">
          <img src={RashidImg} width={60} alt="rashid" />
          Rashid is at <span className="ml-2 text-yellow-500 outlined-text">{getRashidLocation()}</span>
        </span>
        <span className="flex items-center">
          <div className="relative w-16 h-full">
            <img className="" src={boostedBoss.image_url} alt="boosted-monster" />
          </div>
          Boosted Boss:&nbsp;<span className="text-yellow-500 outlined-text">{boostedBoss.name || 'loading...'}</span>
        </span>
        <span className="flex items-center">
          <div className="relative w-16 h-full">
            <img className="" src={`${imagesUrl}/bloodpriest.gif`} alt="boosted-monster" />
          </div>
          Boosted Monster:{' '}
          <span className="ml-2 text-yellow-500 outlined-text">{boostedMonster.name || 'loading...'}</span>
        </span>
      </div>
      <div className="corner-bl" />
      <div className="corner-br" />
      <div className="border-2" />
    </div>
  );
}
