import React, { useEffect, useState } from "react";



const Home = () => {

	const [taskList, setTaskList] = useState(["Wash the dishes", "Clean the house"])
	const [inputValue, setInputValue] = useState("")


	const inputChange = (e) => {
		setInputValue(e.target.value)
	}

	const handleKeyPress = (e) => {
		if(e.key === "Enter"){
			inputValue.length > 0 && setTaskList([...taskList, inputValue])
			setInputValue("")
		}
	}

	const deleteTask = (e) => {
		const newList = taskList.filter((task) => task !== e.target.className)
		setTaskList(newList)
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
							<li className="list-group-item task" key={index}>{task}</li>
							<button className={task} onClick={deleteTask}>x</button>
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
