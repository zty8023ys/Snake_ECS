import InputComponent, { Direction } from "../component/InputComponent";
import PositionComponent from "../component/PositionComponent";
import { UpdateSystem } from "./UpdateSystem";
import { zUtils } from "../../utils";
import VelocityComponent from "../component/VelocityComponent";

export class InputSystem extends UpdateSystem {
    watchComponents = [InputComponent, PositionComponent, VelocityComponent];
    update() {
        // this.onInput(Direction.UP);
        this.onInput(
            zUtils.fairlyRandom(
                Direction.UP,
                Direction.DOWN,
                Direction.LEFT,
                Direction.RIGHT,
                Direction.STOP
            )
        )
    }
    onInput(direction: Direction) {
        console.log("Pressed ", Direction[direction]);
        const inputEntity = this.entities[0];
        const inputComponent = inputEntity.getComponent(InputComponent);
        if (!inputComponent.isVaildInput(direction)) return;
        inputComponent.direction = direction;
        if (direction === Direction.STOP) return;

        let velocity: {
            x: -1 | 0 | 1,
            y: -1 | 0 | 1
        } = { x: 0, y: 0 };
        switch (direction) {
            case Direction.UP:
                velocity = { x: 0, y: 1 };
                break;
            case Direction.DOWN:
                velocity = { x: 0, y: -1 };
                break;
            case Direction.LEFT:
                velocity = { x: -1, y: 0 };
                break;
            case Direction.RIGHT:
                velocity = { x: 1, y: 0 };
                break;
        }
        inputEntity.getComponent(VelocityComponent).velocity = velocity;
    }
}