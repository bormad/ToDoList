import React from 'react';
import { ToDoList } from './components/ToDoList/ToDoList';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Task } from './page/task/Task';
import { NotFound } from './components/NotFound';

import { useDispatch } from 'react-redux';

export const App = () => {
	const dispatch = useDispatch();

	React.useEffect(() => {
		fetch('http://localhost:3004/todos')
			.then((response) => response.json())
			.then((json) => {
				dispatch({ type: 'SET_TODO', payload: json });
			});
	}, []);

	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<ToDoList />} />
				<Route path='/task/:id' element={<Task />} />
				<Route path='/404' element={<NotFound />} />
				<Route path='*' element={<Navigate to='/404' />} />
			</Routes>
		</div>
	);
};
