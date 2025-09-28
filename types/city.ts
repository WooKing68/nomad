import { BudgetType, RegionType, EnvironmentType, SeasonType } from './filter'

export interface City {
  id: string
  name: string
  description: string
  imageUrl?: string
  likes: number
  dislikes: number
  budget: BudgetType
  region: RegionType
  environment: EnvironmentType
  season: SeasonType
}