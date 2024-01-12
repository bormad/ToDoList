import React from 'react';
import style from './ToDoItem.module.css';
import { Link, useParams } from 'react-router-dom';
import { AppContext } from '../context';

export const ToDoItem = ({ objID }) => {
	const { toDos, handleRefresh } = React.useContext(AppContext);
	const { id } = useParams();
	const [showFormToChangeToDo, setShowFormToChangeToDo] = React.useState(false);
	const [newValueToDo, setNewValueToDo] = React.useState('');
	const currentToDo = toDos?.filter((obj) => obj.id === objID);
	const { title, completed } = currentToDo[0];

	const deleteToDoItem = (index) => {
		fetch(`http://localhost:3004/todos/${index}`, {
			method: 'DELETE'
		})
			.then(() => handleRefresh())
			.catch((error) => console.error(error));
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
			.then(() => handleRefresh())
			.catch((error) => console.error(error))
			.finally(() => setShowFormToChangeToDo(false));
	};

	const onClickChangeToDo = (event) => {
		event.preventDefault();
		fetch(`http://localhost:3004/todos/${objID}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				id: objID,
				title: newValueToDo,
				completed: completed
			})
		})
			.then(() => handleRefresh())
			.catch((error) => console.error(error))
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
					<Link className={style.Title} to={`/task/${objID}`}>
						{title}
					</Link>
				</div>
			)}

			<div>
				{id ? (
					showFormToChangeToDo ? null : (
						<>
							<button onClick={() => setShowFormToChangeToDo(true)}>
								Изменить
							</button>

							<Link to={`/`}>
								<button onClick={() => deleteToDoItem(objID)}>Удалить</button>
							</Link>
						</>
					)
				) : null}
			</div>
			{id ? (
				<Link to={`/`}>
					<button>Вернуться на главную</button>
				</Link>
			) : null}
		</div>
	);
};
