import React from 'react';
import Friend from './Friend';

export default function FriendsPage({ friends, deleteFriend, setFriendToBeEdited }) {
	return (
		<div className="friend-container">
			{friends.map(friend => (
				<Friend key={friend.id} deleteFriend={deleteFriend} findFriend={setFriendToBeEdited} friend={friend} />
			))}
		</div>
	);
}
