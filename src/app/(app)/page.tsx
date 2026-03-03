"use client";

import MatrixCanvas from "@/components/matrix/MatrixCanvas";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Resume = dynamic(() => import("@/components/Resume"), {
  ssr: false,
});
const Terminal = dynamic(() => import("@/components/Terminal"), {
  ssr: false,
});
import { themesArray } from "@/constants";

export default function Home() {
  const [theme, setTheme] = useState<string>('matrix');
  const [activeWindow,setActiveWindow] = useState<string>('terminal');

  const permittedThemes = themesArray.slice(0,themesArray.length - 1)
  
  useEffect(()=>{
    let storedTheme = localStorage.getItem("theme") || "matrix";
    storedTheme = permittedThemes.includes(storedTheme) ? storedTheme : 'matrix';
    handleTheme(storedTheme)
  },[])

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  const assignActiveWindow = (id:string) => {
    if(id == activeWindow) return;
    setActiveWindow(id);
  }

  return (
    <main className="min-h-dvh w-full themed-bg font-mono">
      {theme === "matrix" && <MatrixCanvas />}
      <Terminal setTheme={handleTheme} assignActiveWindow={assignActiveWindow} activeWindow={activeWindow}/>
      <Resume assignActiveWindow={assignActiveWindow} activeWindow={activeWindow}/>
    </main>
  );
}
