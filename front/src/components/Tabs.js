import React, { useState } from "react";
import Settings from "./Settings";

function Tabs() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const tabs = [
    {
      title: "Game Mode",
      content: "Hola soy Game Mode",
    },
    { title: "Settings", content: "Hola soy Settings" },
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
          <p>{tab.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Tabs;
