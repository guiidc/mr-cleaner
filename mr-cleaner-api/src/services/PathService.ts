import type CompanyRepository from '../repositories/CompanyRepository'
import { type Point } from '../types/Point'

export default class PathService {
  constructor (private readonly CompanyRepository: CompanyRepository) {}
  public async getShortestPath (originX: number | undefined, originY: number | undefined): Promise<any> {
    const parsedOriginX = isNaN(Number(originX)) ? 0 : Number(originX)
    const parsedOriginY = isNaN(Number(originY)) ? 0 : Number(originY)

    const companiesList = await this.CompanyRepository.list()

    const pointsList = companiesList.map(company => ({
      company: company.name,
      x: company.coordinate_x,
      y: company.coordinate_y
    }))

    pointsList.unshift({ company: 'Mr. Cleaner', x: parsedOriginX, y: parsedOriginY })

    const result = this.calculateShortestPath(pointsList)
    return result
  }

  /**
   * INTERNAL FUNCTIONS
   */

  private calculateDistanceBetweenTwoPoints (point1: Point, point2: Point): number {
    const deltaX = point1.x - point2.x
    const deltaY = point1.y - point2.y
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  }

  private calculateTotalDistance (path: number[], points: Point[]): number {
    let totalDistance = 0
    for (let i = 0; i < path.length - 1; i++) {
      const currentPoint = points[path[i]]
      const nextPoint = points[path[i + 1]]
      totalDistance += this.calculateDistanceBetweenTwoPoints(currentPoint, nextPoint)
    }
    return totalDistance
  }

  private changeEdges (path: number[], i: number, k: number): number[] {
    const newPath = path.slice(0, i)
    newPath.push(...path.slice(i, k + 1).reverse())
    newPath.push(...path.slice(k + 1))
    return newPath
  }

  private calculateShortestPath (points: Point[]): { path: string[], distance: number } {
    const pointsAmount = points.length
    console.log(points)
    const initialPointIndex = points.findIndex(point => point.x === 0 && point.y === 0)

    let betterPath = [...Array(pointsAmount).keys()].filter(index => index !== initialPointIndex)
    betterPath.unshift(initialPointIndex)

    let betterDistance = this.calculateTotalDistance(betterPath, points)
    let improved = true

    while (improved) {
      improved = false

      for (let i = 0; i < pointsAmount - 1; i++) {
        for (let k = i + 1; k < pointsAmount; k++) {
          const newPath = this.changeEdges(betterPath, i, k)
          const newDistance = this.calculateTotalDistance(newPath, points)

          if (newDistance < betterDistance) {
            betterPath = newPath
            betterDistance = newDistance
            improved = true
          }
        }
      }
    }
    betterPath.push(betterPath[0])
    return { path: betterPath.map(index => points[index].company), distance: Number(betterDistance.toFixed(2)) }
  }
}
