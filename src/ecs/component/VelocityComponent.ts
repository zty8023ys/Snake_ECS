import { BaseComponent } from "../../../lib/ecs/ECS";


export default class VelocityComponent extends BaseComponent {
    public velocity: { x: -1 | 0 | 1, y: -1 | 0 | 1 } = { x: 0, y: 0 };
}
