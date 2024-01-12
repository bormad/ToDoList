import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToDoItem } from '../../components/ToDoItem/ToDoItem';
import { AppContext } from '../../components/context';

export const Task = () => {
	const { toDos } = React.useContext(AppContext);
	const { id } = useParams();

	return (
		<div>
			{toDos
				?.filter((obj) => obj.id === Number(id))
				.map((obj) => (
					<ToDoItem key={obj.id} objID={obj.id} />
				))}
		</div>
	);
};
