import React from 'react';

import Modal from 'react-modal';
import { FaCog, FaHashtag } from 'react-icons/fa';

import css from './ChannelButton.module.css';

function ChannelButton({ channel, setChannel, openModal }) {

    return (
        <>
            <div
                key={channel.id}
                value={channel.id}
                className={css['channel']}
                onClick={() => {
                    console.log('CHANNEL ID', channel.id);
                    setChannel(channel.id);
                }}
                tabIndex="0"
            >
                <FaHashtag className={css['channel-tag']} />
                <div
                    className={css['channel-name-container']}
                    tabIndex="0"
                >{`${channel.name}`}</div>
                <FaCog
                    onClick={openModal}
                    value={channel.id}
                    className={css['channel-settings']}
                ></FaCog>
            </div>
        </>
    );
}

export default ChannelButton;