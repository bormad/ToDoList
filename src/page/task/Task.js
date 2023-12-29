import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToDoItem } from '../../components/ToDoItem/ToDoItem';
import useRefresh from '../../hooks/useRefresh';

export const Task = () => {
	const { id } = useParams();
	const [toDo, setToDo] = React.useState([]);
	const { refreshProducts, handleRefresh } = useRefresh();
	const navigate = useNavigate();

	React.useEffect(() => {
		fetch(`http://localhost:3004/todos/${id}`)
			.then((response) => response.json())
			.then((json) => {
				if (Object.keys(json).length === 0) {
					navigate('/404');
				} else {
					setToDo(json);
				}
			});
	}, [refreshProducts]);

	return (
		<div>
			<ToDoItem
				key={id}
				objID={id}
				title={toDo.title}
				setToDos={setToDo}
				toDos={toDo}
				handleRefresh={handleRefresh}
				completed={toDo.completed}
			/>
		</div>
	);
};
