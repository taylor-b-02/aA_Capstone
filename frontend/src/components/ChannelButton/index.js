import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaCog, FaHashtag } from "react-icons/fa";
import css from "./ChannelButton.module.css";

function ChannelButton({ channel, setChannel, openModal, currChannel }) {
	const dispatch = useDispatch();
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		// setIsActive(currentChannel === channel);
		setIsActive(currChannel === channel.id);
		console.log("isActive: ", isActive);
	}, [currChannel, channel]);

	const handleClick = () => {
		console.log("CHANNEL ID", channel.id);
		setChannel(channel.id);

		// dispatch(channelActions.setCurrent(channel.id));
		// setIsActive(!isActive);
		console.log("isActive: ", isActive);
	};

	return (
		<>
			<div
				className={isActive ? css["channel-focused"] : css["channel"]}
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
