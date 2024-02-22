import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import HomePage from './components/TodoFiles/HomePage';
import TodoList from './components/TodoFiles/TodoList';
import AddNew from './components/TodoFiles/AddNew';
import { TodoProvider } from './context/TodoContext';
import EditTodo from './components/TodoFiles/EditTodo';
import TodoView from './components/TodoFiles/TodoView';

function App() {
  return (
    < >
      <Router>
        <TodoProvider >
          <Routes>

            <Route path='/login' element = {<Login />} />
            <Route path = '/' element = {<HomePage />} >
              <Route path='/' element = { <TodoList /> } />
              <Route path='/addnew' element = {<AddNew /> } />
              <Route path='/edit-todo' element = {<EditTodo /> } />
              <Route path='/view-todo' element = {<TodoView /> } />
            </Route>
            {/* <Route path="home" element={<Notes />}>
            </Route> */}
          </Routes>
        </TodoProvider>
      </Router>
    </>
  );
}

export default App;
