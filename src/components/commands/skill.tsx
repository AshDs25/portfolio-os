import React from "react";

const Skill = () => {
  const skillData = [
    {
      keyword: "Frontend",
      text: "React, Next.js, Redux (production UI & state)",
    },
    {
      keyword: "Languages",
      text: "JavaScript (ES6+), TypeScript (typed UI logic)",
    },
    {
      keyword: "Styling",
      text: "SCSS, TailwindCSS (responsive layouts)",
    },
    {
      keyword: "Tools",
      text: "Git, GitHub, VS Code, Postman",
    },
    {
      keyword: "Other",
      text: "REST APIs, cross-team collaboration, feature delivery",
    },
  ];

  return (
    <ul>
      {skillData.map((data, index) => (
        <li key={index}>
          <span className="warn-text">{`[${data.keyword}]: `}</span>
          {data.text}
        </li>
      ))}
    </ul>
  );
};

export default Skill;
