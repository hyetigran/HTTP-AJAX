import React from 'react';
import './App.css';
import axios from 'axios';

import FriendEditor from './components/FriendEditor';
import FriendsPage from './components/FriendsPage';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

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
			},
			isEditing: false
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
	updateFriend = friendToEdit => {
		axios
			.put(`http://localhost:5000/friends/${this.state.currentFriendId}`, friendToEdit)
			.then(
				this.setState({
					friends: this.state.friends.map(friend => {
						if (friend.id === this.state.currentFriendId) {
							friend.name = this.state.form.nameValue;
							friend.email = this.state.form.emailValue;
							friend.age = this.state.form.ageValue;
						}
						return friend;
					}),
					form: this.state.initialFormState,
					currentFriendId: null,
					isEditing: false
				})
			)
			.catch(err => {
				this.setState({ errorMessage: err.response.statusText });
			})
			.finally(this.setState({ spinner: false }));
	};

	deleteFriend = id => {
		axios
			.delete(`http://localhost:5000/friends/${id}`)
			.then(
				this.setState({
					friends: this.state.friends.filter(fr => fr.id !== id),
					form: this.state.initialFormState,
					currentFriendId: null
				})
			)
			.catch(err => {
				this.setState({ errorMessage: err.response.statusText });
			})
			.finally(this.setState({ spinner: false }));
	};

	setFriendToBeEdited = id => {
		this.setState(state => {
			const friendToEdit = state.friends.find(friend => friend.id === id);

			return {
				currentFriendId: id,
				form: {
					nameValue: friendToEdit.name,
					ageValue: friendToEdit.age,
					emailValue: friendToEdit.email
				},
				isEditing: true
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

	render() {
		return (
			<Router>
				<div className="container">
					<div className="navbar" style={{ display: 'flex' }}>
						<li activeClassName="activeNavButton">
							<NavLink exact to="/">
								Home
							</NavLink>
						</li>
						<li activeClassName="activeNavButton">
							<NavLink exact to="/friends">
								Friends
							</NavLink>
						</li>
						<li activeClassName="activeNavButton">
							<NavLink exact to="/friend-editor">
								Friends Editor
							</NavLink>
						</li>
					</div>
					<Route exact path="/" />
					<Route
						exact
						path="/friends"
						render={props => (
							<FriendsPage
								{...props}
								friends={this.state.friends}
								setFriendToBeEdited={this.setFriendToBeEdited}
								deleteFriend={this.deleteFriend}
							/>
						)}
					/>
					<Route
						exact
						path="/friend-editor/:id"
						render={props => (
							<FriendEditor
								{...props}
								form={this.state.form}
								inputChange={this.inputChange}
								addFriend={this.addFriend}
								updateFriend={this.updateFriend}
								isEditing={!!this.state.currentFriendId}
							/>
						)}
					/>
				</div>
			</Router>
		);
	}
}
