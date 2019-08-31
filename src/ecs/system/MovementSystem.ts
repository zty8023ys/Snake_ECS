import PositionComponent from "../component/PositionComponent";
import { UpdateSystem } from "./UpdateSystem";
import LinkedComponent from "../component/LinkedComponent";

export class MovementSystem extends UpdateSystem {
    watchComponents = [PositionComponent, LinkedComponent];

    update() {
        let current = LinkedComponent.Tail;
        let prev = current.getComponent(LinkedComponent).prev;
        while (prev) {
            current.getComponent(PositionComponent).position = prev.getComponent(PositionComponent).position;
            current = prev;
            prev = prev.getComponent(LinkedComponent).prev;
        }
    }
}
