'use client'

import MatrixCanvas from "@/components/matrix/MatrixCanvas";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
const Resume = dynamic(() => import('@/components/Resume'), {
  ssr: false,
});
const Terminal = dynamic(() => import('@/components/Terminal'), {
  ssr: false,
});

export default function Home() {

  const [theme,setTheme] = useState('matrix');

  useEffect(() => {
  document.documentElement.setAttribute('data-theme', theme);
}, [theme]);
  
  return (
    <main className="min-h-dvh w-full themed-bg font-mono">
      {theme === 'matrix' && <MatrixCanvas/>}
      <Terminal setTheme={setTheme}/>
      <Resume/>
    </main>
  );
} 
