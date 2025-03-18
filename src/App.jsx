import { useState } from 'react';
import { Search } from 'lucide-react';
import './App.css';
import 'tailwindcss';
import SearchBox from './components/SearchBox';
import AppButton from './components/AppButton';
import SortBtn from './components/SortBtn';
import DropdownMenu from './components/DropdownMenu';
function App() {
  const [count, setCount] = useState(0);

  return (
      <>
          <div className="bg-gray-200 p-5 rounded-lg">
              <h1 className="text-black font-bold my-5">Chlart Task Manager</h1>
              <div className="flex flex-col gap-5 items-center">
                  <SearchBox />
                  <div className="flex justify-center gap-5">
                      <AppButton label="Add new task" />
                      <SortBtn />
                  </div>
              </div>
              <div className="flex flex-col gap-5 bg-gray-50 p-5 rounded-lg">
                  <h2 className="text-black font-bold my-5 text-4xl">Your task</h2>
                  <div className="w-full bg-black rounded-lg p-2 text-white flex justify-between items-center">
                      <div>
                          <h3 className="text-2xl">Task 1</h3>
                      </div>
                      <DropdownMenu /> {/* This should now be aligned with your task bar */}
                  </div>
              </div>
          </div>
      </>
  );
}


export default App;