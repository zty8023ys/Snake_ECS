import { UpdateSystem } from "./UpdateSystem";
import PositionComponent from "../component/PositionComponent";
import RenderComponent from "../component/RenderComponent";

export class RenderSystem extends UpdateSystem {
    watchComponents = [PositionComponent, RenderComponent];

    update() {

    }
}