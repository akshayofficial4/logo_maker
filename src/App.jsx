import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import SideNav from './components/SideNav';
import IconController from './components/IconController';
import BackgroundController from './components/BackgroundController';
function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div>
      <Header />

      {/*...Side Bar... */}

      <div className='w-64 fixed '>
        <SideNav selectedIndex={(value) => setSelectedIndex(value)} />
      </div>

      <div className='ml-64 grid grid-cols-1 md:grid-cols-6 fixed ' >

      {/*...Control Panel.. */}

        <div className='md:col-span-2 border h-screen p-5 shadow-sm overflow-auto'>

          { selectedIndex == 0 ? <IconController /> : <BackgroundController /> }

        </div>

      {/*...Icon Preview...*/}

        <div className='md:col-span-3' >
          icon preview...
        </div>

      {/*...Adds Preview...*/}

        <div className='' >
          Adds preview
        </div>
        
      </div>

    </div>
  )
}

export default App
