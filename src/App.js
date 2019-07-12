import React from "react";

// class Toggle extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = { isToggleOn: true };

// 		// This binding is necessary to make `this` work in the callback
// 		this.handleClick = this.handleClick.bind(this);
// 	}

// 	handleClick() {
// 		this.setState(state => ({
// 			isToggleOn: !state.isToggleOn
// 		}));
// 	}

// 	render() {
// 		return (
// 			<button onClick={this.handleClick}>
// 				{this.state.isToggleOn ? "-" : "+"}
// 			</button>
// 		);
// 	}
// }

// function ToDoList(props) {
// 	const items = props.items;
// 	const listItems = items.map(item => (
// 		<ToDoItem
// 			key={item.id.toString()}
// 			id={item.id}
// 			value={item.title}
// 			date={item.date}
// 		/>
// 	));
// 	return <ul>{listItems}</ul>;
// }
function Title() {
	return <h1>Too Much To Do List</h1>;
}

class ToDoList extends React.Component {
	render() {
		// map all items in the array to ToDoItem components
		var items = this.props.items.map((item, index) => {
			return (
				<ToDoItem
					key={index}
					index={index}
					removeItem={this.props.removeItem}
					markTodoDone={this.props.markTodoDone}
				/>
			);
		});
		return <ul>{items}</ul>;
	}
}

class ToDoItem extends React.Component {
	constructor(props) {
		super(props);

		this.onClickClose = this.onClickClose.bind(this);
		this.onClickDone = this.onClickDone.bind(this);
	}
	onClickClose() {
		var index = parseInt(this.props.index);
		this.props.removeItem(index);
	}
	onClickDone() {
		var index = parseInt(this.props.index);
		this.props.markTodoDone(index);
	}
	render() {
		var todoClass = this.props.item.done ? "done" : "undone";
		return (
			<li className={todoClass}>
				<span onClick={this.onClickDone}>done</span>
				{this.props.item.value}
				<span onClick={this.onClickClose}>&times;</span>
			</li>
		);
	}
}

class ToDoForm extends React.Component {
	constructor(props) {
		super(props);
		// this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	// handleChange(event) {
	// 	this.setState({ value: event.target.value });
	// }

	componentDidMount() {
		this.refs.itemName.focus();
	}

	handleSubmit(event) {
		event.preventDefault();
		var newItemValue = this.refs.itemName.value;
		if (newItemValue) {
			// alert("A name was submitted: " + this.state.value);
			this.props.addItem({ newItemValue });
			this.refs.toDoForm.reset();
		}
	}

	render() {
		return (
			<form ref="toDoForm" onSubmit={this.handleSubmit}>
				<input ref="itemName" placehodler="New to do item..." />
				<button type="submit">+</button>
			</form>
		);
	}
}

const todoItems = [
	{ id: 1, title: "shopping", date: "010120" },
	{ id: 2, title: "gym", date: "010120" },
	{ id: 3, title: "read", date: "010120" }
];

class ToDoApp extends React.Component {
	constructor(props) {
		super(props);
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.markTodoDone = this.markTodoDone.bind(this);
		this.state = {
			todoItems: todoItems
		};
	}
	addItem(todoItem) {
		// pop new item into array
		todoItems.unshift({
			// increase index by 1
			index: todoItems.length + 1,
			// set the new value
			value: todoItem.newItemValue,
			done: false
		});
		this.setState({ todoItems: todoItems });
	}
	removeItem(itemIndex) {
		todoItems.splice(itemIndex, 1);
	}
	markTodoDone(itemIndex) {
		var todo = todoItems[itemIndex];
		todoItems.splice(itemIndex, 1);
		todo.done = !todo.done;
		todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
		this.setState = { todoItems: todoItems };
	}

	render() {
		return (
			<div>
				<Title />
				<ToDoList
					items={this.props.initItems}
					removeItems={this.removeItems}
					markToDoDone={this.markToDoDone}
				/>
				<ToDoForm addItem={this.addItem} />
			</div>
		);
	}
}
ReactDOM.render(<ToDoApp />, document.getElementById("root"));
// export default ToDoApp;
