import React from 'react';

export default function Friend(props) {
	console.log(props);
	const friend = props.friends.find(friend => friend.id === props.match.params.friendId);

	const onEdit = event => {
		props.setFriendToBeEdited(props.friend.id);
	};

	const onDelete = event => {
		props.deleteFriend(props.friend.id);
	};

	return (
		<div className="friend-container">
			{props.friends.map(friend => {
				return (
					<div className="friend-card">
						<span style={{ color: 'green' }}>{friend.name}</span>
						<div>
							<button onClick={onEdit} className="small">
								Edit
							</button>
							<button onClick={onDelete} className="small danger">
								Delete
							</button>
						</div>
					</div>
				);
			})}
		</div>
	);
}
