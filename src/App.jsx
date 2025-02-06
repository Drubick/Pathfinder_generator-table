import { useState } from 'react';
import './App.css'
import ContentArea from './ContentArea/ContentArea'
import LeftMenu from './Menus/LeftMenu'
import TopMenu from './Menus/TopMenu'

function App() {
  const [content, setContent] = useState('');
  return (
    <div className=' w-full h-screen flex flex-col absolute top-0 left-0'>
      <TopMenu setContent={setContent} />
        <div className='flex flex-row h-screen'>
          <LeftMenu  setContent={setContent}/>
          <div className="flex-grow-60"> {/* Main content area */}
            <ContentArea content={content}/>
          </div>
        </div>
    </div>
    )
}

export default App
