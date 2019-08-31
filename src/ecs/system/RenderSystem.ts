import { UpdateSystem } from "./UpdateSystem";
import PositionComponent from "../component/PositionComponent";
import RenderComponent from "../component/RenderComponent";
import { zUtils } from "../../utils";
import HeadComponent from "../component/HeadComponent";

const config = {
    MAP_HEIGHT: 20,
    MAP_WIDTH: 20
}
enum MapType {
    Snake = "○",
    Empty = " ",
    Head = "●"
};

export class RenderSystem extends UpdateSystem {
    watchComponents = [PositionComponent, RenderComponent];

    pushEntityToMap(mapArr: MapType[][]) {
        this.entities.forEach(entity => {
            const position = entity.getComponent(PositionComponent).position;
            const isHead = entity.getComponent(HeadComponent);
            mapArr[position.y] && (mapArr[position.y][position.x] = isHead ? MapType.Head : MapType.Snake);
            // console.log(position.x, position.y);
        })
        return mapArr;
    }

    generatorMap() {
        const mapArr: MapType[][] = [];
        for (let i = 0; i < config.MAP_HEIGHT; i++) {
            mapArr[i] = [];
            for (let j = 0; j < config.MAP_WIDTH; j++) {
                mapArr[i][j] = MapType.Empty;
            }
        }
        return mapArr;
    }

    get(repeatTimes: number, start: string, middle: string, end: string): string {
        const arr = [];
        arr.push(start)
        zUtils.repeat(repeatTimes, () => {
            arr.push(middle);
        })
        arr.push(end)
        return arr.join("")
    }

    showMap() {
        const mapArr = this.generatorMap();
        this.pushEntityToMap(mapArr);
        // console.log(mapArr);
        const arrStr = [];
        for (let i = config.MAP_HEIGHT * 2; i >= 0; i--) {
            if (i === config.MAP_HEIGHT * 2) {
                arrStr.push(this.get(config.MAP_WIDTH - 1, "┏", "━━━┳", '━━━┓'));

            } else if (i === 0) {
                arrStr.push(this.get(config.MAP_WIDTH - 1, "┗", "━━━┻", '━━━┛'));

            } else if (i % 2 !== 0) {
                const arr = []
                for (let j = 0; j < config.MAP_WIDTH; j++) {
                    arr.push(`┃ ${mapArr[i >> 1][j]} `)
                }
                arr.push('┃')
                arrStr.push(arr.join(""));

            } else if (i % 2 === 0) {
                arrStr.push(this.get(config.MAP_WIDTH - 1, "┣", "━━━╋", '━━━┫'));

            }
        }
        console.log(arrStr.join("\n"))
    }
    update() {
        this.showMap();
    }
}
