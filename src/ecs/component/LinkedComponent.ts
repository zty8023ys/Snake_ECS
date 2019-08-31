import { BaseComponent, BaseEntity } from "../../../lib/ecs/ECS";
import { zUtils } from "../../utils";

export default class LinkedComponent extends BaseComponent {
    public static Head: BaseEntity = null;
    public static Tail: BaseEntity = null;
    public next: BaseEntity = null;
    public prev: BaseEntity = null;
    init(pre: BaseEntity = LinkedComponent.Tail) {
        zUtils.assert(this.prev === null);
        zUtils.assert(pre.getComponent(LinkedComponent).next === null);
        zUtils.assert(this.entity.getId() !== pre.getId());
        if (!this.next) {
            LinkedComponent.Tail = this.entity;
        }
        pre.getComponent(LinkedComponent).next = this.entity;
        this.prev = pre;
        return this.entity;
    }
}