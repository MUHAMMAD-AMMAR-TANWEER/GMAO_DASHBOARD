import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext, StateContext } from '../contexts/ContextProvider';
import { links } from '../data/dummy';
import CreatePDFButton from './pdfButton';

const Sidebar = () => {
  const ref = useRef();
  const { startDate, endDate, updateDates } = useContext(StateContext);
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();
  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  const [displayBtn, setDisplayBtn] = useState(false);
  const [startDat, setStartDat] = useState();
  const [endDat, setEndDat] = useState();
 

  

  useEffect(() => {
    if (startDate && endDate) {
      console.log(startDate, endDate, 'console please');
    }
  }, [startDate, endDate]);

  
  return (
    
    <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10'>
      
        <div className={activeMenu ? "block" : "hidden"}>
          <div className='flex flex-col space-y-3 justify-between items-center'>
            <Link
              to='/'
              onClick={handleCloseSideBar}
              className='items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900'
            >
              <SiShopware /> <span>GMAO</span>
            </Link>
            <div className='flex flex-col items-center justify-center space-y-3'>
              <div style={{ marginRight: '10px' }}>
                <label
                  
                  for='Start'
                  style={{}}
                  className='text-slate-900 dark:text-white font-bold'
                >
                Date début :{' '}
                </label>
                <input
                  type='date'
                  id='Start'
                  name='Start'
                  
                  onChange={(event) => {
                    
                    setStartDat(new Date(event.target.value));
                    setDisplayBtn(true);
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid gray',
                    borderRadius: '10px',
                    padding: '3px 8px',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                  className='text-slate-900 dark:text-white '
                ></input>
              </div>
              <div>
                <label
                  for='End'
                  className='text-slate-900 dark:text-white font-bold'
                >
                Date fin :{' '}
                </label>
                <input
                  type='date'
                  id='End'
                  name='End'
                  onChange={(event) => {
                    setEndDat(new Date(event.target.value));
                    console.log(endDat);
                    setDisplayBtn(true);
                  }}
                  style={{
                    backgroundColor: 'transparent',
                    border: '1px solid gray',
                    borderRadius: '10px',
                    padding: '3px 8px',
                    outline: 'none',
                    cursor: 'pointer',
                  }}
                  className='text-slate-900 dark:text-white '
                ></input>
              </div>
              {displayBtn && startDat && endDat && (
                <button
                  className='bg-gray-400 hover:bg-gray-300 text-slate-900 dark:text-white w-full mx-4 font-bold py-2 px-4 rounded-xl inline-flex items-center justify-center'
                  onClick={() => {
                    updateDates(startDat, endDat);
                  }}
                >
                Générer
                Rapports
                
                </button>
              )}
            </div>

            <div>
                  <CreatePDFButton/>
            </div>

            <TooltipComponent content='Menu' position='BottomCenter'>
              <button
                type='button'
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className='text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden'
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className='mt-10 '>
            {links.map((item) => (
              <div key={item.title}>
                <p className='text-slate-900 dark:text-white m-3 mt-4 uppercase'>
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className='capitalize '>{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </div>
      
    </div>
  );
};

export default Sidebar;
