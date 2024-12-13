import { useEffect, useState } from 'react'

interface IWindowSize {
  width: number
  height: number
}

function getWindowSize(): IWindowSize {
  if (!window) {
    console.error('Window is not defined')
    return null
  }
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

/**
 * It provides hook to handle mutable window size [width and height].
 */
export function useWindowSize(): IWindowSize {
  const [windowDimensions, setWindowDimensions] = useState<IWindowSize>(getWindowSize())

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
