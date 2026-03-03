import React from 'react'
import {themesArray} from '@/constants';

const capitalize = (str: string) => str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

const ThemesComp = ({val}:{val:string | undefined}) => {
    
  return (
    <>
        {
            val && themesArray.includes(val.toLowerCase()) ? <div>{val.toLowerCase() != 'exit' ? `Themes: ${capitalize(val)} Theme Applied!` :  'Exited Theme Switcher'}</div> : <div className='warn-text'>Themes: Theme not found</div>
        }
    </>
  )
}

export default ThemesComp
