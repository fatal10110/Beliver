import type { ResourceStockpile } from 'shared-types'
import { ResourceType } from 'shared-types'

type ResourceBarProps = {
  resources: ResourceStockpile
}

const ResourceBar = ({ resources }: ResourceBarProps) => {
  return (
    <div className="resource-bar">
      <div className="resource-bar__item">
        <span>Faith</span>
        <strong>{resources[ResourceType.Faith]}</strong>
      </div>
      <div className="resource-bar__item">
        <span>Food</span>
        <strong>{resources[ResourceType.Food]}</strong>
      </div>
      <div className="resource-bar__item">
        <span>Wood</span>
        <strong>{resources[ResourceType.Wood]}</strong>
      </div>
      <div className="resource-bar__item">
        <span>Devotion</span>
        <strong>{resources[ResourceType.Devotion]}</strong>
      </div>
    </div>
  )
}

export default ResourceBar
