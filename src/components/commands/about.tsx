import React from 'react'

const About = () => {
  const aboutData = [{keyword:'Name',text:'Ashlyn Dsilva'},
    {keyword:'Role',text:'Frontend Developer'},
    {keyword:'Stack',text:'React.js, Next.js, Redux, SCSS, TailwindCSS'},
    {keyword:'Focus',text:'Building responsive, performant and maintainable web apps'}
  ]
  return (
    
    <>
      
      <ul>
        {
          aboutData.map((data,index) => (
            <li key={index}>
              <span className='text-red-600'>{`[${data.keyword}]: `}</span>{data.text}
            </li> 
          ))
        }
      </ul>
    </>
  )
}

export default About
