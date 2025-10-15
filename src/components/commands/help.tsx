import React from 'react'

const Help = () => {
  const cmdList =  [
  { cmd: "about", desc: "Show a brief intro" },
  { cmd: "get-skills", desc: "Display list of skills" },
  { cmd: "get-project", desc: "List completed projects" },
  { cmd: "get-resume", desc: "Download Resume" },
  { cmd: "get-linkedin", desc: "Open LinkedIn profile" },
  { cmd: "git-hub", desc: "Open GitHub profile" },
  { cmd: "themes", desc: "Change site theme" },
  { cmd: "clear", desc: "Clear terminal results" },
  { cmd: "help", desc: "Show available commands" }
]

  return (
    <div>
      <ul>
        {
            cmdList.map((obj,index) => (
                <li key={index} className=''><span className='text-red-500'>{obj.cmd}</span>{": "}<span>{obj.desc}</span></li>
            ))
        }
      </ul>
    </div>
  )
}

export default Help
