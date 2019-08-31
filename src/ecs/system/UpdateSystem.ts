import { BaseSystem } from "../../../lib/ecs/ECS";

export abstract class UpdateSystem extends BaseSystem {
    abstract update(): void;
}
