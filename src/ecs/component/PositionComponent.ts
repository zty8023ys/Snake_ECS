import { BaseComponent } from "../../../lib/ecs/ECS";
interface IPosition {
    x: number,
    y: number,
}

export default class PositionComponent extends BaseComponent {
    public position: IPosition = { x: 0, y: 0 };
    init(position: IPosition) {
        this.position = position;
        return this.entity;
    }
    moveBy(position: IPosition) {
        this.position = {
            x: this.position.x + position.x,
            y: this.position.y + position.y
        };
        return this.entity;
    }
    moveTo(position: IPosition) {
        this.position = position;
        return this.entity;
    }
}
