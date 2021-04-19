import { MutableRefObject, useEffect } from "react"

/**
 * React to a ref coming onto the screen and moving off the screen
 *
 * @param ref 					The element reference
 * @param setVisible 		Callback function to handle the visibility of the ref
 */
const useIsVisible = <T extends Element>(ref: MutableRefObject<T>, setVisible: (isVisible: boolean) => void) => {

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting))
		
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.unobserve(ref.current);
    };
  }, [])
}

export default useIsVisible
