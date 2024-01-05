import React from 'react';
import { ToDoItem } from '../ToDoItem/ToDoItem';
import style from './ToDoList.module.css';
import useRefresh from '../../hooks/useRefresh';
import { AppContext } from '../context';
export const ToDoList = () => {
	const { refreshProducts, handleRefresh } = useRefresh();
	const { toDos, setToDos } = React.useContext(AppContext);
	const [inputValue, setInputValue] = React.useState('');

	const [sort, setSort] = React.useState(false);
	const [search, setSearch] = React.useState('');

	let id;

	React.useEffect(() => {
		if (sort) {
			const sortedToDos = [...toDos].sort((a, b) => {
				return a.title.localeCompare(b.title);
			});
			setToDos(sortedToDos);
		} else {
			handleRefresh();
		}
	}, [sort]);

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
				.then((json) => setToDos([...toDos, json]));
		}
		setInputValue('');
	};

	const onClickSearch = (event) => {
		event.preventDefault();
		if (!search.trim()) {
			handleRefresh();
		} else {
			setToDos((toDos) => toDos.filter((obj) => obj.title.includes(search)));
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
					<input
						type='checkbox'
						checked={sort}
						onClick={() => setSort(!sort)}
					/>
					Отсортировать по алфавиту
				</div>
			</div>

			{toDos?.map((obj) => {
				return (
					<ToDoItem key={obj.id} objID={obj.id} handleRefresh={handleRefresh} />
				);
			})}
		</>
	);
};
