import { BaseComponent, BaseEntity } from "../../../lib/ecs/ECS";
import { zUtils } from "../../utils";

export default class LinkedComponent extends BaseComponent {
    public static Head: BaseEntity = null;
    public static Tail: BaseEntity = null;
    public next: BaseEntity = null;
    public prev: BaseEntity = null;
    init() {
        const tail: BaseEntity = LinkedComponent.Tail;
        this.test(tail);
        tail.getComponent(LinkedComponent).next = this.entity;
        this.prev = tail;
        LinkedComponent.Tail = this.entity;
        return this.entity;
    }
    test(tail: BaseEntity) {
        zUtils.assert(this.prev === null);
        zUtils.assert(tail.getComponent(LinkedComponent).next === null);
        zUtils.assert(this.entity.getId() !== tail.getId());
    }
}
