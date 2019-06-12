import React from 'react';

export default function FriendEditor({ form, addFriend, updateFriend, isEditing, inputChange }) {
	const onNameChange = event => {
		inputChange(event.target.value, 'nameValue');
	};

	const onEmailChange = event => {
		inputChange(event.target.value, 'emailValue');
	};

	const onAgeChange = event => {
		inputChange(event.target.value, 'ageValue');
	};

	const onFriendAdd = event => {
		addFriend();
	};

	const onFriendUpdate = event => {
		updateFriend();
	};

	return (
		<div className="sub-container">
			{isEditing ? <h3>Edit Friend</h3> : <h3>Add a new friend!</h3>}
			name:
			<input type="text" value={form.nameValue} onChange={onNameChange} />
			age:
			<input type="number" value={form.ageValue} onChange={onAgeChange} />
			email:
			<input type="email" value={form.emailValue} onChange={onEmailChange} />
			{isEditing ? (
				<button onClick={onFriendUpdate}>Update Friend!</button>
			) : (
				<button onClick={onFriendAdd}>Add Friend!</button>
			)}
		</div>
	);
}
