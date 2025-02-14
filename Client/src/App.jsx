import { useState, useEffect} from 'react';
import './App.css';
import ContentArea from './FrontEnd/ContentArea/ContentArea';
import LeftMenu from './FrontEnd/Menus/LeftMenu';
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
  return (
 
    <div className=' w-full h-screen flex flex-col absolute top-0 left-0 text-primary-light dark:text-primary-dark '>
      <TopMenu setContent={setContent} />
        <div className='flex flex-row h-screen'>
          {/* <LeftMenu  setContent={setContent}/> */}
          <div className="flex-grow-60 bg-pre-primary-light dark:bg-pre-primary-dark "> {/* Main content area */}
            <ContentArea content={content}/>
          </div>
        </div>
    </div>
    )
}

export default App
