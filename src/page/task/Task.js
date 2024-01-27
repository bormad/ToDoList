import React from 'react';
import { useParams } from 'react-router-dom';
import { ToDoItem } from '../../components/ToDoItem/ToDoItem';
import { useSelector } from 'react-redux';

export const Task = () => {
	const toDos = useSelector((state) => state.toDos);
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
