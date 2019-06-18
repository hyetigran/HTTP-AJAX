import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Friend({ friend, deleteFriend, findFriend }) {
	return (
		<div className="friend-card">
			<span style={{ color: 'green' }}>{friend.name}</span>
			<div>
				<Link to={`/friend-editor/${friend.id}`} onClick={() => findFriend(friend.id)} className="small">
					Edit
				</Link>
				<button onClick={() => deleteFriend(friend.id)} className="small danger">
					Delete
				</button>
			</div>
		</div>
	);
}
