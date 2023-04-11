import './App.css'
import './components/list.css';
import { useState, useCallback, useMemo, useEffect } from 'react'
import ListBar from './components/ListBar';


function App() {
  const initList = useMemo(() => [
    {
      title: '\u{1F31E} My day',
      ['To Do']: [],
      ['In Progress']: [],
      ['Done']: [],
    },
  ], []);

  const [lists, setLists] = useState(() => {
    return localStorage.getItem('lists')
      ? JSON.parse(localStorage.getItem('lists'))
      : initList;
  });

  const [currentList, setCurrentList] = useState(lists[0]);

  const updateLists = useCallback(async () => {
    try {
      if (!lists.length) {
        await localStorage.setItem('lists', JSON.stringify(initList));
        setLists(JSON.parse(localStorage.getItem('lists')));
      } else {
        await localStorage.setItem('lists', JSON.stringify(lists));
      }
    } catch (e) {
      console.error('Failed to modify lists!');
    }
  }, [lists]);

  // Set localStorage
  useEffect(() => {
    updateLists();
  }, [lists]);

  return (
    <div className="App">
      <ListBar 
        lists = {lists}
        setLists = {setLists}
        currentList = {currentList}
        setCurrentList = {setCurrentList}
      />
    </div>
  )
}

export default App
