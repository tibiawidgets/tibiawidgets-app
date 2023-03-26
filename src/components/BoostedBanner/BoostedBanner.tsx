import * as React from 'react';
import './BoostedBanner.css';

export interface IBoostedBannerProps {}

export default function BoostedBanner(props: IBoostedBannerProps) {
  return (
    <div className="banner-box">
      <div className="corner-tl" />
      <div className="corner-tr" />
      <div className="border-1" />
      <div className="banner-content">Content</div>
      <div className="corner-bl" />
      <div className="corner-br" />
      <div className="border-2" />
    </div>
  );
}
