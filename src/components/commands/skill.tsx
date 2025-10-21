import React from 'react'

const Skill = () => {
  const skillData = [{keyword:'Languages',text:'JavaScript (ES6+), TypeScript'},
    {keyword:'Frontend',text:'React.js, Next.js, Redux'},
    {keyword:'Styling',text:'SCSS, TailwindCSS'},
    {keyword:'Tools',text:'Git, GitHub, VS Code, Postman'},
    {keyword:'Other',text:'Responsive Design, REST APIs, SSR'}
  ]
  return (
    <>
     
      <ul>

        {skillData.map((data,index) => (
            <li key={index}>
              <span className='warn-text'>{`[${data.keyword}]: `}</span>{data.text}
            </li> 
          ))}
      </ul>
     
    </>
  )
}

export default Skill;
