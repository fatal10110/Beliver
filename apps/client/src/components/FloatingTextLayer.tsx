type FloatingText = {
  id: string
  text: string
  x: number
  y: number
}

type FloatingTextLayerProps = {
  items: FloatingText[]
}

const FloatingTextLayer = ({ items }: FloatingTextLayerProps) => {
  return (
    <div className="floating-text-layer">
      {items.map((item) => (
        <div
          key={item.id}
          className="floating-text"
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
        >
          {item.text}
        </div>
      ))}
    </div>
  )
}

export type { FloatingText }
export default FloatingTextLayer
