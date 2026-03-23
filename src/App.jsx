import { useState, useRef, useEffect } from 'react'
import './App.css'
import cakeImg from './assets/c.png'
import i1 from './assets/i1.png'
import i2 from './assets/i2.png'
import i3 from './assets/i3.png'
import i4 from './assets/i4.png'
import i5 from './assets/i5.png'
import i6 from './assets/i6.png'
import i9w from './assets/i9w.png'
import i10w from './assets/i10w.png'
import i11w from './assets/i11w.png'
import i12w from './assets/i12w.png'
import i13w from './assets/i13w.png'
import i14 from './assets/i14.png'
import i15 from './assets/i15.png'
import i16 from './assets/i16.png'


const stickerImgs = [i3, i4, i6, i10w, i11w, i12w, i13w, i14, i15, i16]
const wink = ";)";
const messages = [
  {
    title: "Happy Birthday, OJAS! ",
    text: "",
  },
  {
    title: "you are dangerously pyari, ngl :)",
    text: "",
  },
  {
    title: "u  r full of life and its just feels awesome to be around!",
    text: "",
  },
  {
    title: "OJAS, just keep that \"brightness\" intact as always",
    text: "",
  },
  {
    title: "i just hope i get to make you smile every day ;)",
    text: "",
  },
]

const stickers = [
  { id: 3,  top: '55%',   left: '2%',    right: 'auto', bottom: 'auto', rotate: '6deg',   w: 176, h: 176 },
  { id: 4,  top: '5%',    left: 'auto',  right: '0%',   bottom: 'auto', rotate: '-10deg', w: 176, h: 176 },
  { id: 6,  top: 'auto',  left: '18%',   right: 'auto', bottom: '7%',   rotate: '11deg',  w: 176, h: 176 },
  { id: 8,  top: '63%',   left: 'auto',  right: '0%',   bottom: 'auto', rotate: '18deg',  w: 176, h: 176 },
  { id: 9,  top: '26%',   left: '1%',    right: 'auto', bottom: 'auto', rotate: '-7deg',  w: 176, h: 176 },
  { id: 10, top: '5%',    left: '2%',    right: 'auto', bottom: 'auto', rotate: '14deg',  w: 176, h: 176 },
  { id: 11, top: 'auto',  left: 'auto',  right: '0%',   bottom: '3%',   rotate: '-9deg',  w: 176, h: 176 },
  { id: 14, top: 'auto',  left: '5%',    right: 'auto', bottom: '8%',   rotate: '-6deg',  w: 176, h: 176 },
  { id: 15, top: 'auto',  left: '38%',   right: 'auto', bottom: '5%',   rotate: '9deg',   w: 176, h: 176 },
  { id: 16, top: 'auto',  left: 'auto',  right: '5%',   bottom: '8%',   rotate: '-12deg', w: 176, h: 176 },
]

function App() {
  const [phase, setPhase] = useState('intro')
  const [flashing, setFlashing] = useState(false)
  const [clicks, setClicks] = useState(0)
  const [cakePos, setCakePos] = useState({ x: 50, y: 48 })
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(null)
  const [positions, setPositions] = useState({})
  const dragging = useRef(null)

  const handleCakeClick = () => {
    if (clicks >= 20) return
    const next = clicks + 1
    setClicks(next)
    setCakePos({
      x: Math.random() * 65 + 8,
      y: Math.random() * 55 + 12,
    })
    if (next === 20) {
      setTimeout(() => {
        setFlashing(true)
        setTimeout(() => {
          setFlashing(false)
          setPhase('main')
        }, 1100)
      }, 200)
    }
  }

  const go = (next) => {
    setDir(next > current ? 'down' : 'up')
    setTimeout(() => {
      setCurrent(next)
      setDir(null)
    }, 260)
  }

  const goNext = () => go((current + 1) % messages.length)
  const goPrev = () => go((current - 1 + messages.length) % messages.length)

  useEffect(() => {
    const onMouseMove = (e) => {
      if (!dragging.current) return
      const { id, offsetX, offsetY } = dragging.current
      setPositions(prev => ({ ...prev, [id]: { x: e.clientX - offsetX, y: e.clientY - offsetY } }))
    }
    const onTouchMove = (e) => {
      if (!dragging.current) return
      e.preventDefault()
      const touch = e.touches[0]
      const { id, offsetX, offsetY } = dragging.current
      setPositions(prev => ({ ...prev, [id]: { x: touch.clientX - offsetX, y: touch.clientY - offsetY } }))
    }
    const stopDrag = () => { dragging.current = null }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', stopDrag)
    window.addEventListener('touchmove', onTouchMove, { passive: false })
    window.addEventListener('touchend', stopDrag)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', stopDrag)
      window.removeEventListener('touchmove', onTouchMove, { passive: false })
      window.removeEventListener('touchend', stopDrag)
    }
  }, [])

  const onDragStart = (e, s) => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    dragging.current = { id: s.id, offsetX: e.clientX - rect.left, offsetY: e.clientY - rect.top }
  }

  const onTouchStart = (e, s) => {
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    dragging.current = { id: s.id, offsetX: touch.clientX - rect.left, offsetY: touch.clientY - rect.top }
  }

  if (phase === 'intro') {
    return (
      <>
        <div className="scene">
          <p className="cake-counter">{clicks} / 20</p>
          <p className="cake-hint">tap the cake to eat it {wink}</p>
          <img
            src={cakeImg}
            alt="cake"
            className="cake-img"
            style={{ left: `${cakePos.x}%`, top: `${cakePos.y}%` }}
            onClick={handleCakeClick}
            draggable={false}
          />
        </div>
        {flashing && <div className="flash-overlay" />}
      </>
    )
  }

  return (
    <>
    <div className="scene">
      {flashing && <div className="flash-overlay" />}
      {stickers.map((s, i) => {
        const pos = positions[s.id]
        const wrapperStyle = pos
          ? { position: 'fixed', left: pos.x, top: pos.y, width: s.w, height: s.h, transform: `rotate(${s.rotate})`, cursor: 'grab', zIndex: 20 }
          : { top: s.top, left: s.left, right: s.right, bottom: s.bottom, width: s.w, height: s.h, transform: `rotate(${s.rotate})`, cursor: 'grab', zIndex: 20 }
        return (
          <div
            key={s.id}
            className={`sticker${pos ? ' sticker--dragging' : ''}`}
            style={wrapperStyle}
            onMouseDown={(e) => onDragStart(e, s)}
            onTouchStart={(e) => onTouchStart(e, s)}
          >
            <img
              src={stickerImgs[i]}
              alt=""
              className="sticker-inner"
              style={{ animationDelay: `${i * 40}ms` }}
              draggable={false}
            />
          </div>
        )
      })}

      {/* Center content */}
      <div className="center">
        <div className="card-wrapper">
          <div className="card-stack">
            <img src={i1} alt="" className="card-photo" draggable={false} />
            <img src={i2} alt="" className="card-photo-right" draggable={false} />
            <img
              src={i9w}
              alt=""
              className="card-photo-bottomleft"
              style={positions[99]
                ? { position: 'fixed', left: positions[99].x, top: positions[99].y, width: 85, height: 'auto', cursor: 'grab', zIndex: 20 }
                : { cursor: 'grab' }}
              onMouseDown={(e) => onDragStart(e, { id: 99 })}
              onTouchStart={(e) => onTouchStart(e, { id: 99 })}
              draggable={false}
            />

            <div className={`card${dir ? ` card--exit-${dir}` : ''}`}>
              <h2 className="card-title">{messages[current].title}</h2>
              <p className="card-text">{messages[current].text}</p>
            </div>
          </div>
        </div>

        <div className="nav">
          <button className="nav-btn" onClick={goPrev} aria-label="Previous">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
          <span className="page-num">{current + 1} / {messages.length}</span>
          <button className="nav-btn" onClick={goNext} aria-label="Next">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
