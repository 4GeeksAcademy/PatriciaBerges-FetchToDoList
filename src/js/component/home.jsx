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
		let taskToDelete = taskList.filter((task, index) => {if(e.target.className == task) {
			let newList = taskList
			newList.splice(index,1)
			setTaskList(newList)
		}})
	}

	return (
		<div>
			<input type="text" value={inputValue} onChange={inputChange} onKeyDown={handleKeyPress} placeholder="Enter your task"/>
			<ul>
				{(taskList.length > 0) && taskList.map((task, index) => 
				(
					<div className="d-flex">
						<li key={index}>{task}</li>
						<button className={task} onClick={deleteTask}>X</button>
					</div>
				)
				)}
			</ul>
		</div>
	);
};

export default Home;
