import { Routes, Route } from 'react-router';

function App() {
	return (
		<div className='App'>
			<Routes>
				<Route path='/' element={<></>} />
				<Route path='/pokemon/:id' element={<></>} />
				<Route path='/pokemon/:id/:info' element={<></>} />
			</Routes>
		</div>
	);
}

export default App;
