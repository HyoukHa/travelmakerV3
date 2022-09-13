import { useState, useEffect } from "react"

const useDetectClose = (elements, initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);

  useEffect(() => {
    const onClick = (e) => {
      if (elements.current !== null && !elements.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener("click", onClick);
    }

    return () => {
      window.removeEventListener("click", onClick);
    };
  }, [isOpen, elements]);

  return [isOpen, setIsOpen];
}

export default useDetectClose;

