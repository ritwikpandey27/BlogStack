import React, { useState, useEffect } from "react";
import {BsFillStopFill , BsPauseFill , BsFillPlayFill} from 'react-icons/bs';
import {RxResume} from 'react-icons/rx';

const TextToSpeech = ({ text }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [utterance, setUtterance] = useState(null);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  const handlePlay = () => {
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(false);
  };

  const handlePause = () => {
    const synth = window.speechSynthesis;

    synth.pause();

    setIsPaused(true);
  };

  const handleStop = () => {
    const synth = window.speechSynthesis;

    synth.cancel();

    setIsPaused(false);
  };

  return (
    <div className="bg-slate-900 flex flex-row justify-evenly mt-8 p-2 text-orange-500  w-2/3 mx-auto rounded-full ">
      <button  className="mx-2"  onClick={handlePlay}>{isPaused ?  < RxResume className="h-7 w-7"/> : < BsFillPlayFill  className="h-8 w-8 align-middle"/>}</button>
      <button className="mx-2" onClick={handlePause}>< BsPauseFill className="h-8 w-8 align-middle"/></button>
      <button  className="mx-2"onClick={handleStop}><BsFillStopFill className="h-8 w-8 align-middle"/></button>
    </div>
  );
};

export default TextToSpeech;