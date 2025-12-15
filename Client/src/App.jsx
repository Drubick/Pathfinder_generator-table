import { useState, useEffect} from 'react';
import './App.css';
import ContentArea from './FrontEnd/ContentArea/ContentArea';
import TopMenu from './FrontEnd/Menus/TopMenu';
import axios from "axios";

function App() {
  const fetchAPI = async () =>{
    const response = await axios.get("http://localhost:5000");
    console.log(response.data.fruits)
  };


  useEffect(() => {
    fetchAPI();
  }, []);


  const [content, setContent] = useState('');
  const [savedMonsters, setSavedMonsters] = useState([]);

  return (
 
    <div className='w-full min-h-screen flex flex-col text-primary-light dark:text-primary-dark bg-pre-primary-light dark:bg-pre-primary-dark'>
      <TopMenu setContent={setContent} />
        <div className='flex flex-row flex-1 min-h-0'>
          <div className="flex-1 bg-pre-primary-light dark:bg-pre-primary-dark overflow-auto"> {/* Main content area */}
            <ContentArea
            content={content}
            savedMonsters={savedMonsters}
            setSavedMonsters={setSavedMonsters}
            />
          </div>
        </div>
    </div>
    )
}

export default App
