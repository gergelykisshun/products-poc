import { MutableRefObject, useEffect, useRef, useState } from "react";

export default function useVisibility(
  offset = 0
): [boolean, MutableRefObject<any>] {
  const [isVisible, setIsVisible] = useState(false);
  const currentElement = useRef();

  const onScroll = () => {
    if (!currentElement.current) {
      setIsVisible(false);
      return;
    }
    const node = currentElement.current as HTMLElement;
    const top = node.getBoundingClientRect().top;
    setIsVisible(top + offset >= 0 && top - offset <= window.innerHeight);
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll, true);
    return () => document.removeEventListener("scroll", onScroll, true);
  });

  return [isVisible, currentElement];
}
