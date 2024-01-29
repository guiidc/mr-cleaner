"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class PathService {
    constructor(CompanyRepository) {
        this.CompanyRepository = CompanyRepository;
    }
    getShortestPath(originX, originY) {
        return __awaiter(this, void 0, void 0, function* () {
            const parsedOriginX = isNaN(Number(originX)) ? 0 : Number(originX);
            const parsedOriginY = isNaN(Number(originY)) ? 0 : Number(originY);
            const companiesList = yield this.CompanyRepository.list();
            const pointsList = companiesList.map(company => ({
                company: company.name,
                x: company.coordinate_x,
                y: company.coordinate_y
            }));
            pointsList.unshift({ company: 'Mr. Cleaner', x: parsedOriginX, y: parsedOriginY });
            const result = this.calculateShortestPath(pointsList);
            return result;
        });
    }
    /**
     * INTERNAL FUNCTIONS
     */
    calculateDistanceBetweenTwoPoints(point1, point2) {
        const deltaX = point1.x - point2.x;
        const deltaY = point1.y - point2.y;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }
    calculateTotalDistance(path, points) {
        let totalDistance = 0;
        for (let i = 0; i < path.length - 1; i++) {
            const currentPoint = points[path[i]];
            const nextPoint = points[path[i + 1]];
            totalDistance += this.calculateDistanceBetweenTwoPoints(currentPoint, nextPoint);
        }
        return totalDistance;
    }
    changeEdges(path, i, k) {
        const newPath = path.slice(0, i);
        newPath.push(...path.slice(i, k + 1).reverse());
        newPath.push(...path.slice(k + 1));
        return newPath;
    }
    calculateShortestPath(points) {
        const pointsAmount = points.length;
        console.log(points);
        const initialPointIndex = points.findIndex(point => point.x === 0 && point.y === 0);
        let betterPath = [...Array(pointsAmount).keys()].filter(index => index !== initialPointIndex);
        betterPath.unshift(initialPointIndex);
        let betterDistance = this.calculateTotalDistance(betterPath, points);
        let improved = true;
        while (improved) {
            improved = false;
            for (let i = 0; i < pointsAmount - 1; i++) {
                for (let k = i + 1; k < pointsAmount; k++) {
                    const newPath = this.changeEdges(betterPath, i, k);
                    const newDistance = this.calculateTotalDistance(newPath, points);
                    if (newDistance < betterDistance) {
                        betterPath = newPath;
                        betterDistance = newDistance;
                        improved = true;
                    }
                }
            }
        }
        betterPath.push(betterPath[0]);
        return { path: betterPath.map(index => points[index].company), distance: Number(betterDistance.toFixed(2)) };
    }
}
exports.default = PathService;
