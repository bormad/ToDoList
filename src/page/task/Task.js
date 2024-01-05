import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToDoItem } from '../../components/ToDoItem/ToDoItem';
import useRefresh from '../../hooks/useRefresh';
import { AppContext } from '../../components/context';

export const Task = () => {
	const { id } = useParams();
	const { refreshProducts, handleRefresh } = useRefresh();

	return (
		<div>
			<ToDoItem key={id} objID={id} handleRefresh={handleRefresh} />
		</div>
	);
};

// const { toDos } = React.useContext(AppContext);
// let currentToDo = toDos.filter((obj) => obj.id === id);
// let { title, completed } = currentToDo[0];
// const navigate = useNavigate();
// const [toDo, setToDo] = React.useState([]);
// React.useEffect(() => {
// 	fetch(`http://localhost:3004/todos/${id}`)
// 		.then((response) => response.json())
// 		.then((json) => {
// 			if (Object.keys(json).length === 0) {
// 				navigate('/404');
// 			} else {
// 				setToDo(json);
// 			}
// 		});
// }, [refreshProducts]);
