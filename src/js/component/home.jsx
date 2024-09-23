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

	const deleteTask = (task) => {
		fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
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

	const taskDone = (task) => {
		if(task.is_done == true){
			return "isDone done"
		}
		else return "done"
	}

	const handleDoneButton = (task) => {
		fetch(`https://playground.4geeks.com/todo/todos/${task.id}`, {
			method: "PUT",
			body: JSON.stringify({
				"label": `${task.label}`,
				"is_done": `${!task.is_done}`
			  }),
			headers: {
				"Content-type": "application/json"
			} 
		})
		.then(response => {if(!response.ok){throw new Error("Failed to update the task")}
			return response.json()	 
		})
		.then(() => fetch(`https://playground.4geeks.com/todo/users/${user}`)
		.then(response => response.json())
		.then(data => {setTaskList(data.todos)}))
	}

	return (
		<div>
			<h1 className="fst-italic">todos</h1>
			<div className="toDoList d-flex flex-column justify-content-center p-0">
				<ul className="list-group">
					<input className="list-group-item task" type="text" value={inputValue} onChange={inputChange} onKeyDown={handleKeyPress} placeholder="What needs to be done?"/>
					{(taskList.length > 0) && taskList.map((task, index) => 
					(
						<div className="d-flex parent" key={index+"div"}>
							<li className="list-group-item task" key={index}>{task.label}</li>
							<button className={taskDone(task)} onClick={() => handleDoneButton(task)} >✓</button>
							<button className="delete" onClick={() => deleteTask(task)}>x</button>
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
