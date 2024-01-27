import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';

const initialState = {
	toDos: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_TODO':
			return {
				...state,
				toDos: state.toDos.concat(action.payload)
			};
		case 'SORT_TODO':
			return {
				...state,
				toDos: state.toDos.sort((a, b) => a.title.localeCompare(b.title))
			};
		case 'NOT_SORT_TODO':
			return {
				...state,
				toDos: state.toDos.sort((a, b) => a.id - b.id)
			};
		case 'SEARCH_TODO':
			return {
				...state,
				toDos: state.toDos.filter((obj) => obj.title.includes(action.payload))
			};
		case 'DELETE_TODO':
			return {
				...state,
				toDos: state.toDos.filter((obj) => obj.id !== action.payload)
			};
		case 'CHANGE_COMPLETED_TODO':
			return {
				...state,
				toDos: state.toDos.map((todo) => {
					if (todo.id === Number(action.payload)) {
						return {
							...todo,
							completed: action.completed
						};
					}
					return todo;
				})
			};
		case 'CHANGE_TITLE_TODO':
			return {
				...state,
				toDos: state.toDos.map((todo) => {
					if (todo.id === Number(action.payload)) {
						return {
							...todo,
							title: action.title
						};
					}
					return todo;
				})
			};
		default:
			return state;
	}
};

export const store = createStore(reducer, applyMiddleware(thunk));
