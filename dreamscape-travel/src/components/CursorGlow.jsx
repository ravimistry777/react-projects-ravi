import { useEffect, useRef } from "react"

function CursorGlow() {
  const cursorRef = useRef(null)

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }

    window.addEventListener("mousemove", move, { passive: true })
    // Also update on scroll to keep the cursor glow at the mouse pointer
    window.addEventListener("scroll", () => {}, { passive: true }) 

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("scroll", () => {})
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="cursorGlow"
      style={{
        left: "-1000px", // Start offscreen to avoid initial flash in corner
        top: "-1000px"
      }}
    />
  )
}

export default CursorGlow