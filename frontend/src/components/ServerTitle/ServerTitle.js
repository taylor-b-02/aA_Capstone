import React from 'react';
import { useSelector } from 'react-redux';

import { IoMdArrowDropdown } from 'react-icons/io';
import * as css from './ServerTitle.module.css';

function ServerTitle() {
	const server = useSelector((state) => state.current.server);
	const name = useSelector((state) => state.server[server])?.name;

	return (
		<>
			{name && (
				<div id={css['container']}>
					<div id={css['title']}>
						{name}
						<IoMdArrowDropdown id={css['dropdown']} />
					</div>
				</div>
			)}
		</>
	);
}

export default ServerTitle;
