import { BaseComponent } from "../../../lib/ecs/ECS";

export enum Direction {
    STOP = 0,
    UP = -1,
    DOWN = 1,
    LEFT = -2,
    RIGHT = 2
}

export default class InputComponent extends BaseComponent {
    public direction: Direction = Direction.RIGHT;

    isVaildInput(direction: Direction): boolean {
        return direction !== this.direction && (direction + this.direction !== 0);
    }

}
