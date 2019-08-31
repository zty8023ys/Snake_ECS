import HeadComponent from "../component/HeadComponent";
import PositionComponent from "../component/PositionComponent";
import { UpdateSystem } from "./UpdateSystem";
import { zUtils } from "../../utils";
import { Main } from "../../main";

export class ResultSystem extends UpdateSystem {
    watchComponents = [HeadComponent, PositionComponent]

    update() {
        const entity = this.entities[0];
        if (this.checkGameEnd(entity.getComponent(PositionComponent).position)) {
            this.gameEnd();
        }
    }

    gameEnd() {
        (this.context as Main).gameEnd();
    }

    checkGameEnd({ x, y }: { x: number, y: number }): boolean {
        return !(zUtils.isBetween(x, 0, 19) && zUtils.isBetween(y, 0, 19));
    }
}
