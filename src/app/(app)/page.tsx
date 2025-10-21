'use client'

import Terminal from "@/components/Terminal";
import MatrixCanvas from "@/components/matrix/MatrixCanvas";
import { useEffect, useState } from "react";

export default function Home() {

  const [theme,setTheme] = useState('matrix');

  useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);
  
  return (
    <main className="min-h-dvh w-full themed-bg font-mono">
       {theme === 'matrix' && <MatrixCanvas/>}
      <Terminal setTheme={setTheme}/>
    </main>
  );
}
