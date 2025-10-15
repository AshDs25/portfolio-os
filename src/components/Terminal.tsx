"use client";

import { useEffect, useRef, useState } from "react";
import { commands } from "./commands/commands";
import TerminalIcon from "./TerminalIcon";
import useDragElement from "@/hooks/useDragElement";
// import MyIcon from "@/public/terminal.svg";

interface Command {
  command:string,
  isTheme:boolean,
  arg?:string
}

export default function Terminal({setTheme}:{setTheme:(arg0:string)=>void}) {
  const [command, setCommand] = useState<string>("");
  const [history, setHistory] = useState<Command[]>([]);
  const [allHistory, setAllHistory] = useState<Command[]>([]);
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [commandPointer, setCommandPointer] = useState<number | null>(null);
  const [minMax, setMinMax] = useState("min");
  const [cursorShow,setCursorShow] = useState(false); 
  const [isThemeSwitcher,setIsThemeSwitcher] = useState(false);

  const themesObj: Record<string, string> = {
        '1':"Matrix",
        '2':'Ubuntu',
        '3':'Tokyo',
        '4':'One',
        '6':'Exit'
    }

  const eleRef = useRef<any | null>(null);
    useDragElement({eleRef,childId:'header'})

  const toggleMinMax = () => {
    setMinMax((prev) => (prev == "min" ? "max" : "min"));
  };

  const bottomRef = useRef<HTMLDivElement | null>(null);

  function triggerDownload() {
    const link = document.createElement("a");
    link.href = "http://localhost:3000/CV.pdf";
    link.download = "ashlyn_resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const checkForRedirect = (val: string) => {
    switch (val) {
      case "get-linkedin":
        setTimeout(() => {
          window.open(
            "https://www.linkedin.com/in/ashlyn-dsilva-dev",
            "_blank"
          );
        }, 500);
        break;
      case "git-hub":
        setTimeout(() => {
          window.open("https://github.com/AshDs25", "_blank");
        }, 500);
        break;
      case "get-resume":
        triggerDownload();
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // if(command?.trim()?.toLowerCase() === '') return;

    const trimmedText = command?.trim()?.toLowerCase();

    if (trimmedText === "clear") {
      setHistory([]);
      setAllHistory((prev) => [...prev, {command:trimmedText,isTheme:isThemeSwitcher}]);
      setCommand("");
      setShowIntro(false);
      return;
    }

    if(isThemeSwitcher){
      if(trimmedText == '6'){
        setIsThemeSwitcher(false)
        setHistory((prev) => [...prev,{command:"themes",isTheme:true,arg:trimmedText}]);
        setAllHistory((prev) => [...prev,{command:"themes",isTheme:true,arg:trimmedText}])
      }
      if(!['5','6'].includes(trimmedText) && themesObj[trimmedText]){
        setTheme(themesObj[trimmedText].toLowerCase())
      }
      setHistory((prev) => [...prev,{command:trimmedText=='5'?'themes':'themesComp',isTheme:isThemeSwitcher,arg:trimmedText}])
      setAllHistory((prev) => [...prev,{command:trimmedText=='5'?'themes':'themesComp',isTheme:isThemeSwitcher,arg:trimmedText}])
      setCommand("");
      return;
    }

    if (trimmedText === "default") {
      setHistory((prev) => [...prev, {command:trimmedText,isTheme:isThemeSwitcher}]);
      setAllHistory((prev) => [...prev, {command:trimmedText,isTheme:isThemeSwitcher}]);
      setCommand("");
      return;
    }

    if (trimmedText === 'themes'){
      setIsThemeSwitcher(true);
      setHistory((prev) => [...prev, {command:trimmedText,isTheme:true}]);
      setAllHistory((prev) => [...prev, {command:trimmedText,isTheme:true}]);
      setCommand("");
      return
    }


    setHistory((prev) => [...prev, {command:trimmedText,isTheme:isThemeSwitcher}]);
    setAllHistory((prev) => [...prev, {command:trimmedText,isTheme:isThemeSwitcher}]);
    setCommand(""); // clear after submit
    checkForRedirect(trimmedText);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "instant" });
  }, [history]);

  useEffect(() => {
    setCursorShow(true);
  },[])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (allHistory.length === 0) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();

      // if pointer is null, start at the last command
      if (commandPointer === null) {
        setCommandPointer(allHistory.length - 1);
        setCommand(allHistory[allHistory.length - 1]?.command);
      } else if (commandPointer > 0) {
        // move one step up
        const newIndex = commandPointer - 1;
        setCommandPointer(newIndex);
        setCommand(allHistory[newIndex]?.command);
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (commandPointer === null) return; // nothing to do

      if (commandPointer < allHistory.length - 1) {
        // move one step down
        const newIndex = commandPointer + 1;
        setCommandPointer(newIndex);
        setCommand(allHistory[newIndex]?.command);
      } else {
        // reached bottom -> reset to empty command
        setCommandPointer(null);
        setCommand("");
      }
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const focusInput = () => inputRef.current?.focus();
    // focus on mount
    focusInput();

  }, []);

  const toggleShow = () => {
    if (show) {
      setShow(false);
      setHistory([]);
      setShowIntro(true);
      setTimeout(() => setIsVisible(false), 300); // match transition duration
    } else {
      setIsVisible(true);
      setTimeout(() => setShow(true), 10); // allow reflow before fade in
    }
  };
  const handleShow = () => {
    setShow(!show);
  }
  
  return (
    // <div className="flex items-center justify-center h-dvh w-dvw overflow-hidden px-4 absolute top-[0] z-10">
    //   {/* `px-4` ensures margin inside on mobile */}

    //   {/* Terminal Box */}
    // </div>
    <>
      <TerminalIcon toggleShow={toggleShow} show={show} setShow={setShow} isVisible={isVisible}/>
      

      {isVisible && (
        <div
          className={`
             fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
             border text-[#0aff0a] rounded-lg shadow-lg
             w-full max-w-md lg:min-w-[600px] 
             flex flex-col max-h-[400px] transition-[min-height,width,opacity] duration-500
             ${minMax == "max" ? "min-h-[600px]" : "min-h-[400px]"}
             ${show ? "opacity-100 z-2" : "opacity-0 -z-2"}
         `}
         ref={eleRef}
        >

          {/*Header */}    
          <div className="flex items-center space-x-2 border-b-2 rounded-t-[0.5rem] p-2 bg-black" id='header'>
            <div
              className="h-3 w-3 rounded-full bg-red-500 transition-shadow duration-300 hover:shadow-[0_0_10px_#ef4444,0_0_20px_#ef4444,0_0_30px_#ef4444] cursor-pointer"
              onClick={toggleShow}
            ></div>
            <div
              className="h-3 w-3 rounded-full bg-yellow-500 cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_10px_#f59e0b,0_0_20px_#f59e0b,0_0_30px_#f59e0b]"
              onClick={handleShow}
            ></div>
            <div className="h-3 w-3 rounded-full bg-green-500 cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_10px_#00c950,0_0_20px_#00c950,0_0_30px_#00c950]" onClick={toggleMinMax}></div>
            <span className="mx-auto font-mono text-sm text-[#d3d1d1]">
              Ashlyn Dsilva:~/portfolio$
            </span>
          </div>

          {/* Body */}
          <div className="flex-1 w-full overflow-y-auto bg-black rounded-b-[0.5rem] terminal" onClick={()=>{inputRef.current?.focus();setCursorShow(true);}}>
            <div>
              {showIntro && (
                <div className="px-4 py-3">{commands["default"]() || null}</div>
              )}
              
              {history.map((cmd, index) =>  (
               
                <div className="px-4 py-3" key={index}>
                  <>
                    <span className="whitespace-nowrap text-[#ba88f5]">
                      ashlyn:~/portfolio{cmd.isTheme?'/themes':''}$
                    </span>
                    <span className="ml-2">{cmd.arg? cmd.arg : cmd.command}</span>
                  </>

                  {cmd.command && (
                    <div>
                      {commands[cmd.command] && cmd.command != "default" ? (
                        commands[cmd.command](cmd.arg?cmd.arg:undefined) || null
                      ) : (
                        <span className="text-red-500">
                          Command not found: {cmd.command}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div ref={bottomRef}></div>
            </div>
            <form onSubmit={handleSubmit} className="p-4 flex items-center">
              <span className="whitespace-nowrap text-[#ba88f5]">
                ashlyn:~/portfolio{isThemeSwitcher?'/themes':''}$
              </span>
              <div className="relative ml-2 flex-1">
                <input
                  spellCheck="false"
                  autoFocus
                  ref={inputRef}
                  type="text"
                  value={command}
                  onChange={(e) => {
                    setCommand(e.target.value);
                    if (commandPointer) setCommandPointer(null);
                  }}
                  onBlur={()=>setCursorShow(false)}
                  onFocus={()=>setCursorShow(true)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent outline-none text-transparent
               overflow-x-auto whitespace-nowrap"
                />
                <div className="absolute inset-0 pointer-events-none text-[#0aff0a] whitespace-pre overflow-hidden">
                  {command}
                  {cursorShow && <span className="inline-block w-2 h-4 bg-[#0aff0a] animate-[blink-cursor_1.2s_infinite] ml-0.5"></span>}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
