import api from './index'


export type PathData = {
  path: string[],
  distance: number
}
export const getShortestPathService = (x: string | number, y: string | number) => {
  return api.get<PathData>(`/v1/paths?origin_x=${x}&origin_y=${y}`)
  
}
