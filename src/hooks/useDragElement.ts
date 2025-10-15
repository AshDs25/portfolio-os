import React, { useEffect, useRef } from 'react'

const useDragElement = ({eleRef,childId}:{eleRef:React.RefObject<any | null>,childId?:string}) => {
    const elementPos = useRef<any | null>({calXPos:0,calYPos:0,initXPos:0,initYPos:0,isDragging:false});
    
    useEffect(()=>{
        const elementToDrag = eleRef.current;
        if(elementToDrag){
            console.log("listener addeed")

            const elementUsedForDrag = !!childId ? document.getElementById(childId) : elementToDrag
           
            function handleMouseMove(e:MouseEvent){
                if(!elementPos.current.isDragging) return;
                e.preventDefault();
                console.log('mouse move')
                //cal new pos
                elementPos.current.calXPos = elementPos.current.initXPos - e.clientX;
                elementPos.current.calYPos = elementPos.current.initYPos - e.clientY;
                elementPos.current.initXPos = e.clientX;
                elementPos.current.initYPos = e.clientY;

                console.log(elementPos.current.calYPos,elementPos.current.calXPos)

                const newTop = elementToDrag.offsetTop - elementPos.current.calYPos;
                const newLeft = elementToDrag.offsetLeft - elementPos.current.calXPos;

                const elementRect = elementToDrag.getBoundingClientRect();
                const elementWidth = elementRect.width;
                const elementHeight =  elementRect.height;

                const viewPortHeight = window.innerHeight;
                const viewPortWidth = window.innerWidth;

                const halfWidth = elementWidth / 2;
                const halfHeight = elementHeight / 2;

                const constrainedTop = Math.max(halfHeight, Math.min(newTop,viewPortHeight - halfHeight));
                const constrainedLeft = Math.max(halfWidth,Math.min(newLeft,viewPortWidth - halfWidth));


                elementToDrag.style.top = constrainedTop + 'px';
                elementToDrag.style.left = constrainedLeft  + 'px';
            }

            function handleMouseUp(){
                elementPos.current.isDragging = false;
                elementToDrag.style.cursor = 'default ';
                document.removeEventListener('mousemove',handleMouseMove);
                document.removeEventListener('mouseup',handleMouseUp);
            }

            function handleMouseDown(e:MouseEvent){
                 e.preventDefault();
                elementPos.current.initXPos = e.clientX;
                elementPos.current.initYPos = e.clientY;
                elementPos.current.isDragging = true;
                elementToDrag.style.cursor = 'grabbing';

                document.addEventListener('mousemove',handleMouseMove);
                document.addEventListener('mouseup',handleMouseUp);
            }
            elementUsedForDrag.addEventListener('mousedown',handleMouseDown)

            return(()=>{
                elementUsedForDrag.removeEventListener('mousedown',handleMouseDown);
                document.removeEventListener('mousemove',handleMouseMove);
                document.removeEventListener('mouseup',handleMouseUp);
            })
        }

    },[eleRef.current])
}

export default useDragElement
