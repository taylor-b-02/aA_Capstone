import React from 'react';
import { useSelector } from 'react-redux';

import { FaHashtag } from 'react-icons/fa';

import * as css from './ChannelTitle.module.css';

function ChannelTitle() {
	const channel = useSelector((state) => state.current.channel);
	const name = useSelector((state) => state.channel[channel])?.name;

	return (
		<>
			{name && (
				<div id={css['container']}>
					<div id={css['title']}>
						{name}
						<FaHashtag id={css['tag']} />
					</div>
				</div>
			)}
		</>
	);
}

export default ChannelTitle;
