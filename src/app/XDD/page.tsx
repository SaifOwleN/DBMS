"use client";
import React from "react";

const Blob = ({ className }: { className: string }) => (
  <svg
    id="sw-js-blob-svg"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    className={`absolute w-72 -z-10 ${className}`}
    version="1.1"
  >
    <defs>
      <linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0">
        <stop
          id="stop1"
          stop-color="rgba(28.444, 193.313, 140.257, 1)"
          offset="0%"
        />
        <stop
          id="stop2"
          stop-color="rgba(48.601, 210.492, 232.268, 1)"
          offset="100%"
        />
      </linearGradient>
    </defs>
    <path
      fill="url(#sw-gradient)"
      d="M19.2,-34.1C23.5,-30.7,24.8,-22.9,26.8,-16.5C28.7,-10.1,31.4,-5,32.7,0.8C34,6.5,34,13.1,32,19.5C30,25.8,26.1,32,20.4,33.8C14.7,35.6,7.4,32.9,0,33C-7.4,33.1,-14.9,35.9,-19.5,33.5C-24.1,31.1,-25.9,23.5,-28.9,17.1C-32,10.6,-36.2,5.3,-37.7,-0.8C-39.1,-7,-37.7,-14,-34.8,-20.6C-31.9,-27.2,-27.4,-33.4,-21.3,-35.8C-15.3,-38.1,-7.6,-36.6,-0.1,-36.4C7.4,-36.2,14.8,-37.4,19.2,-34.1Z"
      width="100%"
      height="100%"
      transform="translate(50 50)"
      stroke-width="0"
      stroke="url(#sw-gradient)"
    />
  </svg>
);

const Root = () => {
  return (
    <div className="flex flex-col justify-around h-full gap-10 mt-10 px-16">
      <Blob className="top-32 left-4" />
      <Blob className="right-24 top-20" />

      <div className="flex h-full w-full justify-between ">
        <div className="flex flex-col text-pretty justify-center gap-8 h-full w-1/2">
          <div className="border border-black p-10 relative">
            <div className="absolute -top-3 -left-3 w-6 aspect-square bg-amber-300 border-2 border-black" />
            <div className="absolute -bottom-3 -left-3 w-6 aspect-square bg-amber-300 border-2 border-black" />
            <div className="absolute -top-3 -right-3 w-6 aspect-square bg-amber-300 border-2 border-black" />
            <div className="absolute -bottom-3 -right-3 w-6 aspect-square bg-amber-300 border-2 border-black" />
            <p className="2xl:text-5xl xl:text-3xl leading-relaxed relative">
              Lading Page SASS XDDMORS I WANNA KMS I WANNA KMS
            </p>
          </div>
          <p className="text-lg px-16 ">
            LLading Page SASS XDDMORS I WANNA KMS I WANNA KMS I WANNA KMSading
            Page SASS XDDMORS I WANNA KMS I WANNA KMS I WANNA KMS LLading Page
            SASS XDDMORS I WANNA KMS I WANNA KMS I WANNA KMSading Page SASS
            XDDMORS I WANNA KMS I WANNA KMS I WANNA KMS
          </p>
          <div className="flex px-16 gap-10 ">
            <a
              href="/login"
              type="button"
              className="btn w-40 btn-neutral rounded-lg"
            >
              Sign in
            </a>
            <a
              href="/Home"
              type="button"
              className="btn w-40 btn-neutral rounded-lg"
            >
              Dashboard
            </a>
          </div>
        </div>
        <div className="flex justify-center h-full w-1/2 ">
          <img
            className="w-[70%]"
            alt="giant"
            src="https://i.pinimg.com/originals/6d/85/4f/6d854fb67a99b3af19fd8cd32f2350ab.jpg"
          />
        </div>
      </div>
      <div className="w-full xd bg-amber-300 break-words  flex justify-betwee p-10 gap-10 border border-black rounded-3xl relative z-10 shadow ">
        <p className="text-wrap">
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
        </p>
        <p className="">
          Lorem ipsum dolor sit amet, qui minim labore adipisicing minim
        </p>
        <p className="">
          I WANNA DIEI WANNA DIEI WANNA DIEI WANNA DIEI WANNA DIEI WANNA
          DIEIWANNADIEIWANNADIEI WANNA DIEI WANNA DIEI WANNA DIE
        </p>
      </div>
    </div>
  );
};

export default Root;
