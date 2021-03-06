import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App";
import * as serviceWorker from "./serviceWorker";

var todoItems = [];
todoItems.push({ index: 1, value: "learn react", done: false });
todoItems.push({ index: 2, value: "Go shopping", done: true });
todoItems.push({ index: 3, value: "buy flowers", done: true });

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
					item={item}
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
				<button onClick={this.onClickDone}>done</button>
				{this.props.item.value}
				<span onClick={this.onClickClose}>&times;</span>
			</li>
		);
	}
}

class ToDoForm extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.refs.itemName.focus();
	}

	handleSubmit(event) {
		event.preventDefault();
		var newItemValue = this.refs.itemName.value;
		if (newItemValue) {
			// alert("A name was submitted: " + this.refs.itemName.value);
			this.props.addItem({ newItemValue });
			this.refs.toDoForm.reset();
		}
	}

	render() {
		return (
			<form ref="toDoForm" onSubmit={this.handleSubmit}>
				<input ref="itemName" placeholder="New to do item..." />
				<button type="submit">+</button>
			</form>
		);
	}
}

class Toggle extends React.Component {
	constructor(props) {
		super(props);
		this.toggleState = this.toggleState.bind(this);
		this.state = {
			isOpen: true
		};
	}
	toggleState() {
		var isOpen = this.state.isOpen;
		isOpen = !isOpen;
		this.setState({ isOpen: isOpen });
	}
	render() {
		return (
			<div onClick={this.toggleState} className={this.state.isOpen}>
				toggle
			</div>
		);
	}
}

class ToDoApp extends React.Component {
	constructor(props) {
		super(props);
		this.addItem = this.addItem.bind(this);
		this.removeItem = this.removeItem.bind(this);
		this.markTodoDone = this.markTodoDone.bind(this);

		this.state = {
			todoItems: todoItems,
			isFormOpen: false
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
		this.setState({ todoItems: todoItems });
	}
	markTodoDone(itemIndex) {
		var todo = todoItems[itemIndex];
		todoItems.splice(itemIndex, 1);
		todo.done = !todo.done;
		todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
		this.setState({ todoItems: todoItems });
	}

	render() {
		return (
			<div>
				<Title />
				<ToDoList
					items={this.props.initItems}
					removeItem={this.removeItem}
					markTodoDone={this.markTodoDone}
				/>
				<ToDoForm isOpen={this.props.isOpen} addItem={this.addItem} />
				<Toggle />
			</div>
		);
	}
}

ReactDOM.render(
	<ToDoApp initItems={todoItems} />,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
