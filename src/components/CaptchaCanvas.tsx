import { useEffect, useRef } from 'react'

const drawCaptcha = (canvas: HTMLCanvasElement, captcha: string) => {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // Default settings
  const width = 130
  const height = 50
  const fontSize = 30
  const textColor = 'green'
  const backgroundColor = '#f2f2f2'
  const noiseColor = 'rgba(0, 128, 0, 0.5)'
  const noiseDensity = 100
  const zigzagStrength = 5

  // Set canvas size
  canvas.width = width
  canvas.height = height
  ctx.clearRect(0, 0, width, height)

  // Background
  ctx.fillStyle = backgroundColor
  ctx.fillRect(0, 0, width, height)

  // Noise dots
  for (let i = 0; i < noiseDensity; i++) {
    ctx.fillStyle = noiseColor
    ctx.beginPath()
    ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 2, 0, 2 * Math.PI)
    ctx.fill()
  }

  // Draw text with zig-zag effect
  ctx.font = `bold ${fontSize}px Arial`
  ctx.fillStyle = textColor
  ctx.textBaseline = 'middle'

  let x = 10
  for (let i = 0; i < captcha.length; i++) {
    const y = height / 2 + (i % 2 === 0 ? -zigzagStrength : zigzagStrength) // Zig-zag effect
    const angle = (Math.random() * 10 - 5) * (Math.PI / 180) // Random small rotation

    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(angle)
    ctx.fillText(captcha[i], 0, 0)
    ctx.restore()

    x += fontSize * 0.7 // Adjust spacing dynamically
  }
}

const CaptchaCanvas = ({ captcha }: { captcha: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      drawCaptcha(canvasRef.current, captcha)
    }
  }, [captcha])

  return <canvas ref={canvasRef} />
}

export default CaptchaCanvas
