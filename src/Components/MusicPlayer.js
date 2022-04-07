import React, { useState, useRef, useEffect } from "react";
import "./Styles/MusicPlayer.css";
import {
  FaRegHeart,
  FaHeart,
  FaStepBackward,
  FaBackward,
  FaPause,
  FaPlay,
  FaForward,
  FaStepForward,
  FaShareAlt,
} from "react-icons/fa";
import { BsDownload } from "react-icons/bs";

function MusicPlayer({ song, imgSrc }) {
  const [isLove, setLoved] = useState(false);
  const [isPlaying, setPlaying] = useState(false);
  const [duration, setDuraion] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioPlayPause = useRef();
  const progressBar = useRef();

  useEffect(() => {
    const seconds = Math.floor(audioPlayPause.current.duration);
    setDuraion(seconds);
  }, [
    audioPlayPause?.current?.loadedmetadata,
    audioPlayPause?.current?.readyState,
  ]);

  const CalculateTime = (sec) => {
    const minutes = Math.floor(sec / 60);
    const returnMin = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(sec % 60);
    const returnSec = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnMin}: ${returnSec}`;
  };

  const changeProgress = () => {
    audioPlayPause.current.currentTime = progressBar.current.value;
    progressBar.current.style.setProperty(
      `--player-played`,
      `${(progressBar.current.value / duration) * 100}%s`
    );
    setCurrentTime(progressBar.current.value);
  };

  const changeLoved = () => {
    setLoved(!isLove);
  };

  const changePlayPause = () => {
    const preValue = isPlaying;

    if (!preValue) {
      audioPlayPause.current.play();
    } else {
      audioPlayPause.current.pause();
    }
    setPlaying(!preValue);
  };

  return (
    <div className="musicPlayer">
      <div className="songImage">
        <img src={imgSrc} alt="" />
      </div>
      <div className="songAttributes">
        <audio src={song} preload="metadata" ref={audioPlayPause} />

        <div className="top">
          <div className="left">
            <div className="loved" onClick={changeLoved}>
              {isLove ? (
                <i>
                  <FaHeart />
                </i>
              ) : (
                <i>
                  <FaRegHeart />
                </i>
              )}
            </div>
            <div className="download">
              <i>
                <BsDownload />
              </i>
            </div>
          </div>
          <div className="middle">
            <div className="back">
              <i>
                <FaStepBackward />
              </i>
              <i>
                <FaBackward />
              </i>
            </div>
            <div className="playPause" onClick={changePlayPause}>
              {isPlaying ? (
                <i>
                  <FaPause />
                </i>
              ) : (
                <i>
                  <FaPlay />
                </i>
              )}
            </div>
            <div className="forward">
              <i>
                <FaForward />
              </i>
              <i>
                <FaStepForward />
              </i>
            </div>
          </div>
          <div className="right">
            <i>
              <FaShareAlt />
            </i>
          </div>
        </div>

        <div className="bottom">
          <div className="currentTime">{CalculateTime(currentTime)}</div>
          <input
            type="range"
            className="progresBar"
            ref={progressBar}
            onChange={changeProgress}
          />
          <div className="duration">
            {duration && !isNaN(duration) && CalculateTime(duration)
              ? CalculateTime(duration)
              : `00:00`}
          </div>
        </div>
      </div>
    </div>
  );
}

export { MusicPlayer };
