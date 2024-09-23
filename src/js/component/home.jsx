import React, { useEffect, useState } from "react";



const Home = () => {
	let user = "patry"

	const [taskList, setTaskList] = useState(["Wash the dishes", "Clean the house"])
	const [inputValue, setInputValue] = useState("")

	useEffect(() => {fetch(`https://playground.4geeks.com/todo/users/${user}`)
	.then(response => response.json())
	.then(data => {setTaskList(data.todos)})}, [])


	const inputChange = (e) => {
		setInputValue(e.target.value)
	}

	const handleKeyPress = (e) => {
		if(e.key === "Enter"){
			inputValue.length > 0 && fetch(`https://playground.4geeks.com/todo/todos/${user}`, {
				method: "POST",
				body: JSON.stringify({
					"label": `${inputValue}`,
					"is_done": false
				  }),
				headers: {
					"Content-type": "application/json"
				}
			})
			.then(resp => 
				{if(!resp.ok){throw new Error("Failed to submit the task")}
				return resp.json()})
			.then(data => setTaskList([...taskList, data]))
			.catch(error => console.log("Error:", error))
			setInputValue("")
		}
	}

	const deleteTask = (e) => {
		const newList = taskList.filter((task) => task.label === e.target.className)
		let taskToDelete = newList[0]
		fetch(`https://playground.4geeks.com/todo/todos/${taskToDelete.id}`, {
			method: "DELETE"
		})
		.then(resp => {if(resp.ok){fetch(`https://playground.4geeks.com/todo/users/${user}`)
			.then(response => response.json())
			.then(data => {setTaskList(data.todos)})}})
	}

	const tasksLeft = () => {
		if(taskList.length > 1) return (<p className=" tasksLeft">{taskList.length} tasks left to do</p>)
		else if (taskList.length == 1) return (<p className=" tasksLeft">1 task left to do</p>)
		else return (<p className=" tasksLeft">No tasks to do, add new tasks</p>)
	}

	return (
		<div>
			<h1 className="fst-italic">todos</h1>
			<div className="toDoList d-flex flex-column justify-content-center p-0">
				<ul className="list-group">
					<input className="list-group-item task" type="text" value={inputValue} onChange={inputChange} onKeyDown={handleKeyPress} placeholder="What needs to be done?"/>
					{(taskList.length > 0) && taskList.map((task, index) => 
					(
						<div className="d-flex parent">
							<li className="list-group-item task" key={index}>{task.label}</li>
							<button className={task.label} onClick={deleteTask}>x</button>
						</div>
					)
					)}
					{tasksLeft()}
				</ul>
			</div>
		</div>
	);
};

export default Home;
