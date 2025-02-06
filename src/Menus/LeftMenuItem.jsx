import { useState } from 'react';

function OptionList({ options, setContent }) {
    return (
        <ul>
            {options.map((option, idx) => (
                <li key={idx} className='text-[0.65rem] cursor-pointer' onClick={() => {setContent(option)}}>{option}</li>
            ))}
        </ul>
    );
}

function MenuItem({ item, onClick, setContent }) {
    return (
        <li className='text-left text-xs/relaxed'>
            <span onClick={onClick} className="cursor-pointer text-xs font-bold">
            <span className="text-[0.45rem] pr-1">{item.collapsed ?  '▼' : '▶'}</span>
            {item.title}
            </span>
            <div className={item.collapsed ? 'block pl-4 py-1 font-semibold' : 'hidden' }  >
                <OptionList options={item.options} setContent={setContent} />
            </div>
        </li>
    );
}

export default function LeftMenuItem({ item, setContent }) {
    const [menuItems, setMenuItems] = useState(item);

    function expandCollapse(index) {
        const newMenuItems = [...menuItems];
        newMenuItems[index].collapsed = !newMenuItems[index].collapsed;
        setMenuItems(newMenuItems);
    }

    return (
        <ul className=''>
            {menuItems.map((item, index) => (
                <MenuItem 
                    key={index} 
                    item={item} 
                    onClick={() => expandCollapse(index)} 
                    setContent = {setContent}
                />
            ))}
        </ul>
    );
}