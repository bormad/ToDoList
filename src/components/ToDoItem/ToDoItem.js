import React from 'react';
import style from './ToDoItem.module.css';

export const ToDoItem = ({
	title,
	objID,
	setRefreshProducts,
	refreshProducts,
	completed
}) => {
	const [showFormToChangeToDo, setShowFormToChangeToDo] = React.useState(false);
	const [newValueToDo, setNewValueToDo] = React.useState('');

	const deleteToDoItem = (index) => {
		fetch(`http://localhost:3004/todos/${index}`, {
			method: 'DELETE'
		}).then(() => setRefreshProducts(!refreshProducts));
	};

	const onClickCompleted = (event) => {
		event.preventDefault();
		fetch(`http://localhost:3004/todos/${objID}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				id: objID,
				title: title,
				completed: !completed
			})
		})
			.then(() => setRefreshProducts(!refreshProducts))
			.finally(() => setShowFormToChangeToDo(false));
	};

	const onClickChangeToDo = (event) => {
		event.preventDefault();
		console.log(newValueToDo);
		// Отправка на сервер
		console.log(objID);
		fetch(`http://localhost:3004/todos/${objID}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				id: objID,
				title: newValueToDo,
				completed: completed
			})
		})
			.then(() => setRefreshProducts(!refreshProducts))
			.finally(() => setShowFormToChangeToDo(false));
	};

	return (
		<div className={style.ToDoItem}>
			{showFormToChangeToDo ? (
				<form>
					<input
						value={newValueToDo}
						onChange={(e) => setNewValueToDo(e.target.value)}
						placeholder={title}
					/>
					<button type='submit' onClick={onClickChangeToDo}>
						Изменить
					</button>
				</form>
			) : (
				<div>
					<input
						type='checkbox'
						checked={completed}
						onClick={onClickCompleted}
					/>
					{title}
				</div>
			)}

			<div>
				{showFormToChangeToDo ? null : (
					<button onClick={() => setShowFormToChangeToDo(true)}>
						Изменить
					</button>
				)}
				<button onClick={() => deleteToDoItem(objID)}>Удалить</button>
			</div>
		</div>
	);
};
