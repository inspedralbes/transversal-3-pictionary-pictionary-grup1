import React, { useState } from "react";
import Settings from "./Settings";
import Gamemodes from "./Gamemodes";
import '../index.css'

function Tabs({ socket, start }) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const tabs = [

    {
      title: "Categories",
      content: <Settings socket={socket} start={start} />,
    },
    {
      title: "Game Mode",
      content: <Gamemodes socket={socket} start={start} />,
    },
    {
      title: "Settings",
      content: <Settings socket={socket} start={start} />,
    },
  ];

  return (
    <div className="tabs">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`tab-link ${activeTab === index ? "active" : ""}`}
          onClick={() => handleTabClick(index)}
          data-tab={`tab${index + 1}`}
        >
          {tab.title}
        </button>
      ))}
      {tabs.map((tab, index) => (
        <div
          key={index}
          id={`tab${index + 1}`}
          className={`tab-content ${activeTab === index ? "active" : ""}`}
        >
          <div>{tab.content}</div>
        </div>
      ))}
    </div>
  );
}

export default Tabs;
