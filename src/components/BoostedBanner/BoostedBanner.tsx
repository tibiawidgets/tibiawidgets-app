import * as React from 'react';
import './BoostedBanner.css';
import RashidImg from '../../assets/RashidTemplate.gif';
import { getRashidLocation, getCreatures, getBosses } from '../../services/tibia-api';
import { BoostableCreature, BoostedBossResponseType, BoostedMonsterResponseType } from '../../types/types';

export interface IBoostedBannerProps {}

export default function BoostedBanner(props: IBoostedBannerProps) {
  const [boostedBoss, setBoostedBoss] = React.useState<BoostableCreature>({} as BoostableCreature);
  const [boostedMonster, setBoostedMonster] = React.useState<BoostableCreature>({} as BoostableCreature);

  React.useEffect(() => {
    getBosses().then(({ boostable_bosses }: BoostedBossResponseType) => {
      const { boosted } = boostable_bosses;
      setBoostedBoss(boosted);
    });
    getCreatures().then(({ creatures }: BoostedMonsterResponseType) => {
      const { boosted } = creatures;
      setBoostedMonster(boosted);
    });
  }, []);

  return (
    <div className="banner-box xl:justify-center">
      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="border-1" />
      <div className="banner-content xl:justify-around xl:max-w-5xl">
        <span className="flex items-center w-1/3">
          <img src={RashidImg} width={60} alt="rashid" />
          <span className="break-words">
            Rashid is at <span className="ml-2 text-yellow-500 outlined-text">{getRashidLocation()}</span>
          </span>
        </span>
        <span className="flex items-center w-1/3">
          <img className="w-16" src={boostedBoss.image_url} alt="boosted-monster" />
          <span className="flex flex-wrap">
            <span>Boosted Boss:&nbsp;</span>
            <span className="text-yellow-500 outlined-text sm:flex md:inline-block">
              {boostedBoss?.name || 'loading...'}
            </span>
          </span>
        </span>
        <span className="flex items-center w-1/3">
          <img className="w-16" src={boostedMonster?.image_url} alt="boosted-monster" />
          <span className="flex flex-wrap">
            <span>Boosted Monster: </span>
            <span className="ml-2 text-yellow-500 outlined-text">{boostedMonster?.name || 'loading...'}</span>
          </span>
        </span>
      </div>
      <div className="corner-bl" />
      <div className="corner-br" />
      <div className="border-2" />
    </div>
  );
}
