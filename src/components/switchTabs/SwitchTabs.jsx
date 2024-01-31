import React,{useState} from 'react'
import "./style.scss"

function SwitchTabs({data, onTabChange}) {
    const [selectedTab,setSelectedTab] = useState(0);
    const [left,selLeft] = useState(0)

    const activetab = (tab,index)=>{
        selLeft(index * 100)
        setTimeout(() => {
            setSelectedTab(index);
        },300);
        onTabChange(tab,index)
    }

  return (
    <div className="switchingTabs">
       <div className='tabItems'>
        {data.map((tab , index)=>(
            <span 
              key={index}
             className={`tabItem ${selectedTab === index? "active":" "}`}
             onClick={ ()=>activetab(tab,index)} >
            {tab}

            </span>
        ))}
        <span className='movingBg'  style={{left}}/>
       </div>
    </div>
  )
}

export default SwitchTabs