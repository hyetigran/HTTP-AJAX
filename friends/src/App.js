import React from 'react';
import './App.css';
import axios from 'axios';

import FriendEditor from './components/FriendEditor';
import Friend from './components/Friend';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			friends: [],
			errorMessage: '',
			spinner: false,
			form: {
				nameValue: '',
				emailValue: '',
				ageValue: ''
			},
			currentFriendId: null,
			initialFormState: {
				nameValue: '',
				emailValue: '',
				ageValue: ''
			}
		};
	}

	componentDidMount() {
		this.setState({ spinner: true });
		axios
			.get('http://localhost:5000/friends')
			.then(res => {
				this.setState({ friends: res.data });
			})
			.catch(err => {
				this.setState({ errorMessage: err.response.statusText });
			})
			.finally(this.setState({ spinner: false }));
	}

	addFriend = () => {
		this.setState({ spinner: true });
		const newFriend = {
			id: this.state.friends.length + 1,
			name: this.state.form.nameValue,
			age: this.state.form.ageValue,
			email: this.state.form.emailValue
		};
		axios
			.post('http://localhost:5000/friends', { ...newFriend })
			.then(res => {
				this.setState({ friends: res.data });
				console.log(res.data);
			})
			.catch(err => {
				this.setState({ errorMessage: err.response.statusText });
			})
			.finally(this.setState({ spinner: false }));
	};

	updateFriend = () => {
		this.setState(state => ({
			friends: state.friends.map(friend => {
				if (friend.id === state.currentFriendId) {
					friend.name = state.form.nameValue;
					friend.email = state.form.emailValue;
					friend.age = state.form.ageValue;
				}
				return friend;
			}),
			form: this.state.initialFormState,
			currentFriendId: null
		}));
	};

	deleteFriend = id => {
		axios
			.delete(`http://localhost:5000/friends/${this.state.friends.id}`)
			.then(this.setState({ friends: this.state.friends.filter(fr => fr.id !== id) }))
			.catch(err => {
				this.setState({ errorMessage: err.response.statusText });
			})
			.finally(this.setState({ spinner: false }));
	};
	// deleteFriend = id => {
	// 	this.setState(st => ({
	// 		friends: st.friends.filter(fr => fr.id !== id),
	// 		form: this.state.initialFormState,
	// 		currentFriendId: null
	// 	}));
	// };

	setFriendToBeEdited = id => {
		this.setState(state => {
			const friendToEdit = state.friends.find(friend => friend.id === id);

			return {
				currentFriendId: id,
				form: {
					nameValue: friendToEdit.name,
					ageValue: friendToEdit.age,
					emailValue: friendToEdit.email
				}
			};
		});
	};

	inputChange = (value, field) => {
		this.setState(state => ({
			form: {
				...state.form,
				[field]: value
			}
		}));
	};

	markAsEnemy = id => {
		this.setState(currentState => ({
			friends: currentState.friends.map(friend => {
				if (friend.id === id) {
					friend.friendly = false;
				}
				return friend;
			})
		}));
	};

	wipeOutEnemies = () => {
		// using setState:
		// wipe the enemies from the friends array
		this.setState(currentState => ({
			friends: currentState.friends.filter(friend => friend.friendly)
		}));
	};

	render() {
		return (
			<div className="container">
				<FriendEditor
					form={this.state.form}
					inputChange={this.inputChange}
					addFriend={this.addFriend}
					updateFriend={this.updateFriend}
					isEditing={!!this.state.currentFriendId}
				/>

				<div className="sub-container">
					<h3>Friends List:</h3>
					{/* Make it so we get the `No friends! Sad!` h5 if there are no friends */}
					{this.state.friends.map(friend => (
						<Friend
							key={friend.id}
							friend={friend}
							deleteFriend={this.deleteFriend}
							markAsEnemy={this.markAsEnemy}
							setFriendToBeEdited={this.setFriendToBeEdited}
						/>
					))}
				</div>
			</div>
		);
	}
}
