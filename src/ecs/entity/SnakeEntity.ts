import PositionComponent from "../component/PositionComponent";
import LinkedComponent from "../component/LinkedComponent";
import RenderComponent from "../component/RenderComponent";
import { BaseEntity } from "../../../lib/ecs/ECS";

export default class SnakeEntity extends BaseEntity {
    constructor() {
        super();
        this.addComponent(PositionComponent).init({ x: 10, y: 10 });
        this.addComponent(LinkedComponent).init();
        this.addComponent(RenderComponent);
    }
}
