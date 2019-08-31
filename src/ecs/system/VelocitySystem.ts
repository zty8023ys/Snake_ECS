import VelocityComponent from "../component/VelocityComponent";
import { UpdateSystem } from "./UpdateSystem";
import PositionComponent from "../component/PositionComponent";

export class VelocitySystem extends UpdateSystem {
    watchComponents = [VelocityComponent, PositionComponent]

    update() {
        this.entities.forEach(entity => {
            entity.getComponent(PositionComponent).moveBy(entity.getComponent(VelocityComponent).velocity);
        })
    }

}
