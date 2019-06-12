import React from 'react';

export default function FriendEditor({ form, addFriend, updateFriend, isEditing, inputChange }) {
	const onNameChange = event => {
		// One liner. You'll need inputChange
		inputChange(event.target.value, 'nameValue');
	};

	const onAgeChange = event => {
		// One liner. You'll need inputChange
		inputChange(event.target.value, 'ageValue');
	};

	const onFriendAdd = event => {
		// One liner. You'll need addFriend
		addFriend();
	};

	const onFriendUpdate = event => {
		updateFriend();
		// One liner. You'll need updateFriend
	};

	return (
		<div className="sub-container">
			{isEditing ? <h3>Edit Friend</h3> : <h3>Add a new friend!</h3>}
			name:
			<input type="text" value={form.nameValue} onChange={onNameChange} />
			age:
			<input type="text" value={form.ageValue} onChange={onAgeChange} />
			{isEditing ? (
				<button onClick={onFriendUpdate}>Update Friend!</button>
			) : (
				<button onClick={onFriendAdd}>Add Friend!</button>
			)}
		</div>
	);
}
