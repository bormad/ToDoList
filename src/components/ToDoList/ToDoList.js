import React from 'react';
import { ToDoItem } from '../ToDoItem/ToDoItem';
import style from './ToDoList.module.css';
import { useDispatch, useSelector } from 'react-redux';
export const ToDoList = () => {
	const toDos = useSelector((state) => state.toDos);
	const dispatch = useDispatch();
	const [inputValue, setInputValue] = React.useState('');

	const [sort, setSort] = React.useState(false);
	const [search, setSearch] = React.useState('');

	let id;

	const onClickSort = () => {
		if (!sort) {
			dispatch({ type: 'SORT_TODO' });
			setSort(!sort);
		} else {
			dispatch({ type: 'NOT_SORT_TODO' });
			setSort(!sort);
		}
	};

	const onClickAddToDo = (event) => {
		event.preventDefault();
		if (!!inputValue.trim()) {
			fetch('http://localhost:3004/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					id: id,
					title: inputValue,
					completed: false
				})
			})
				.then((response) => response.json())
				.then((json) => dispatch({ type: 'SET_TODO', payload: json }));
		}
		setInputValue('');
	};

	const onClickSearch = (event) => {
		event.preventDefault();
		if (!!search.trim()) {
			dispatch({ type: 'SEARCH_TODO', payload: search });
			setSearch('');
		}
	};

	return (
		<>
			<div className={style.Wrapper}>
				<form>
					<input
						type='text'
						value={inputValue}
						onChange={(event) => setInputValue(event.target.value)}
					/>
					<button onClick={onClickAddToDo} type='submit'>
						Добавить задачу
					</button>
				</form>
				<form>
					<input
						type='text'
						placeholder='Search'
						value={search}
						onChange={({ target }) => setSearch(target.value)}
					/>
					<button onClick={onClickSearch} type='submit'>
						Поиск
					</button>
				</form>

				<div>
					<input type='checkbox' onChange={onClickSort} />
					Отсортировать по алфавиту
				</div>
			</div>

			{toDos?.map((obj) => {
				return <ToDoItem key={obj.id} objID={obj.id} />;
			})}
		</>
	);
};
