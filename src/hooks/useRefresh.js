import React from 'react';

const useRefresh = () => {
	const [refreshProducts, setRefreshProducts] = React.useState(false);

	const handleRefresh = () => {
		console.log('REFRESH');
		setRefreshProducts(!refreshProducts);
	};

	return { refreshProducts, handleRefresh };
};

export default useRefresh;
