import React from 'react';

export default function Friend({ friend, deleteFriend, markAsEnemy, setFriendToBeEdited }) {
	const onEdit = event => {
		// One liner. Implement using setFriendToBeEdited
		setFriendToBeEdited(friend.id);
	};

	const onDelete = event => {
		// One liner. Implement using deleteFriend
		deleteFriend(friend.id);
	};

	return (
		<div>
			<span style={{ color: 'green' }}>
				{friend.name} ({friend.age}) can be reached at{' '}
				<span style={{ color: 'blue', textDecoration: 'underline' }}>{friend.email}</span>
			</span>
			<button onClick={onEdit} className="small">
				Edit
			</button>
			<button onClick={onDelete} className="small danger">
				Delete
			</button>
		</div>
	);
}
