import React from 'react'

const ThemesComp = ({val}:{val:string | undefined}) => {
    const themesObj: Record<string, string> = {
        '1':"Matrix",
        '2':'Ubuntu',
        '3':'Tokyo Night',
        '4':'One Light',
        '6':'Exit'
    }
  return (
    <>
        {
            val && themesObj[val] ? <div>{val != '6' ? `Themes: ${themesObj[val]} Theme Applied!` :  'Exited Theme Switcher'}</div> : <div className='text-red-500'>Themes: Theme not found</div>
        }
    </>
  )
}

export default ThemesComp
