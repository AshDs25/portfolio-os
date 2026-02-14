import React, { useEffect, useRef, useState } from "react";
import IconWrapper from "./IconWrapper";
import { PdfIcon, TerminalIcon } from "./svg/svg";
import useDragElement from "@/hooks/useDragElement";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const Resume = () => {
  const [show, setShow] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [minMax, setMinMax] = useState<string>("max");
  const eleRef = useRef(null);
  const pdfContainerRef = useRef<HTMLDivElement | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(1);

  const toggleShow = () => {
    if (show) {
      setShow(false);
      setTimeout(() => setIsVisible(false), 300); // match transition duration
    } else {
      setIsVisible(true);
      setTimeout(() => setShow(true), 10); // allow reflow before fade in
    }
  };
  const handleShow = () => {
    setShow(!show);
  };


  useDragElement({ eleRef, childId: "header-res" });

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const goPrev = () => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  };

  const goNext = () => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  };

  const toggleMinMax = () => {
    setMinMax((prev) => (prev == "min" ? "max" : "min"));
  };

  useEffect(() => {
  const updateWidth = () => {
    if (!pdfContainerRef.current) return;
    const width = pdfContainerRef.current.clientWidth;
    setContainerWidth(width - 40);
  };

  updateWidth();
  window.addEventListener("resize", updateWidth);

  return () => window.removeEventListener("resize", updateWidth);
}, []);

  return (
    <>
      <IconWrapper
        toggleShow={toggleShow}
        show={show}
        setShow={setShow}
        isVisible={isVisible}
        title={"Ashlyn Resume"}
        positionClassName={"fixed top-[2%] left-[10%] "}
        icon={<PdfIcon />}
      />

      {isVisible && <div
        className={`
              fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
              terminal-border terminal-text rounded-lg terminal-shadow
              w-full max-w-md lg:min-w-[800px] 
              flex flex-col max-h-[400px] transition-[min-height,width,opacity,color,background-color] duration-500
              ${minMax == "max" ? "min-h-[800px] h-[800px]" : "min-h-[400px] h-[400px]"}
              ${show ? "opacity-100 z-2" : "opacity-0 -z-2"}
          `}
        ref={eleRef}
      >
        <div
          className="flex items-center space-x-2 terminal-header-border rounded-t-[0.5rem] p-2 terminal-bg "
          id="header-res"
        >
          <div
            className="h-3 w-3 rounded-full bg-red-500 transition-shadow duration-300 hover:shadow-[0_0_10px_#ef4444,0_0_20px_#ef4444,0_0_30px_#ef4444] cursor-pointer"
            onClick={toggleShow}
          ></div>
          <div
            className="h-3 w-3 rounded-full bg-yellow-500 cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_10px_#f59e0b,0_0_20px_#f59e0b,0_0_30px_#f59e0b]"
            onClick={handleShow}
          ></div>
          <div
            className="h-3 w-3 rounded-full bg-green-500 cursor-pointer transition-shadow duration-300 hover:shadow-[0_0_10px_#00c950,0_0_20px_#00c950,0_0_30px_#00c950]"
            onClick={toggleMinMax}
          ></div>
          <span className="mx-auto font-mono text-sm terminal-header-text">
            Ashlyn Dsilva:~/Ashlyn Resume.pdf$
          </span>
        </div>

        {/* <div
              className="flex-1 w-full overflow-y-auto terminal-bg rounded-b-[0.5rem] terminal">
                <iframe style={{height:'100%',width:'100%'}} src='/CV.pdf#view=FitH'/>
            </div> */}


        <div
          ref={pdfContainerRef}
          className="flex-1 w-full overflow-auto terminal-bg rounded-b-[0.5rem] p-2  terminal resume-window"
        >
        <div className="page-controls absolute bottom-[5%] left-[50%] translate-[-50%] z-2 terminal-bg  rounded-[0.5rem]">
          <button type="button" style={{width:'44px', height:'44px'}} className="nav-button rounded-l-[0.5rem]" onClick={goPrev} disabled={pageNumber === 1}>
            ‹
          </button>
          <span className="px-1">
            {pageNumber} of {numPages}
          </span>
          <button
            style={{width:'44px', height:'44px'}}
            type="button"
            onClick={goNext}
            disabled={pageNumber === numPages}
            className="nav-button rounded-r-[0.5rem]"
          >
            ›
          </button>
        </div>
          <Document
            file="/CV.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<p className="text-center">Loading PDF...</p>}
          >
            <Page
              pageNumber={pageNumber}
              width={containerWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
      </div>}
    </>
  );
};

export default Resume;
