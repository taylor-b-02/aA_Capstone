import React, { useState } from "react";

import { FaCog, FaHashtag } from "react-icons/fa";

import css from "./ChannelButton.module.css";

function ChannelButton({ channel, setChannel, openModal }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    console.log("CHANNEL ID", channel.id);
    setChannel(channel.id);
    
    console.log("isActive: ", isActive);
    setIsActive(!isActive);
    console.log("isActive: ", isActive);
  };

  return (
    <>
      <div
        key={channel.id}
        value={channel.id}
        className={isActive ? css["channel"] : css["channel-focused"]}
        onClick={handleClick}
        tabIndex="0"
      >
        <FaHashtag className={css["channel-tag"]} />
        <div
          className={css["channel-name-container"]}
          tabIndex="0"
        >{`${channel.name}`}</div>
        <FaCog
          onClick={openModal}
          value={channel.id}
          className={css["channel-settings"]}
        ></FaCog>
      </div>
    </>
  );
}

export default ChannelButton;
