import { BaseSystem, BaseEntity } from "../lib/ecs/ECS";

import { UpdateSystem } from "./ecs/system/UpdateSystem";
import { MovementSystem } from "./ecs/system/MovementSystem";
import { VelocitySystem } from "./ecs/system/VelocitySystem";
import { InputSystem } from "./ecs/system/InputSystem";
import { ResultSystem } from "./ecs/system/ResultSystem";

import PositionComponent from "./ecs/component/PositionComponent";
import VelocityComponent from "./ecs/component/VelocityComponent";
import LinkedComponent from "./ecs/component/LinkedComponent";
import InputComponent from "./ecs/component/InputComponent";
import HeadComponent from "./ecs/component/HeadComponent";

import { zUtils } from "./utils";

export class Main {
    private mainLoopInterval: number = -1;

    private updateSystem: UpdateSystem[] = [];
    private allSystem: BaseSystem[] = [];
    private entities: { [id: number]: BaseEntity } = {};
    private movementSystem: MovementSystem = null;

    constructor() {
        this.init();
    }
    addSystem<T extends BaseSystem>(systemClass: new () => T): T {
        const system = new systemClass();
        system.context = this;
        if (system instanceof UpdateSystem) {
            this.updateSystem.push(system as UpdateSystem);
        }
        this.allSystem.push(system);
        return system;
    }
    getSystem<T extends BaseSystem>(systemClass: new () => T): T {
        return this.allSystem.filter(system => system instanceof systemClass)[0] as T;
    }
    getBaseEntity(): BaseEntity {
        return this.getEntity(BaseEntity);
    }
    getEntity<T extends BaseEntity>(entityClass: new () => T): T {
        return new entityClass();
    }
    regesteEntity<T extends BaseEntity>(entity: T, ...targetSystems: BaseSystem[]): T {
        this.entities[entity.getId()] = entity;
        if (targetSystems.length > 0) {
            targetSystems.forEach(system => {
                zUtils.assert(system.checkWatch(entity));
            })
        } else {
            this.allSystem.forEach(system => {
                system.checkWatch(entity);
            })
        }
        return entity;
    }
    init() {
        this.addSystem(InputSystem);
        this.movementSystem = this.addSystem(MovementSystem);
        this.addSystem(VelocitySystem);
        this.addSystem(ResultSystem);

        const head = this.getBaseEntity();
        head.addComponent(HeadComponent);
        head.addComponent(PositionComponent).init({ x: 1, y: 0 });
        head.addComponent(LinkedComponent);
        head.addComponent(InputComponent);
        head.addComponent(VelocityComponent);
        LinkedComponent.Head = head;
        LinkedComponent.Tail = head;
        this.regesteEntity(head);

        zUtils.repeat(5, () => {
            const body = this.getBaseEntity();
            body.addComponent(PositionComponent);
            body.addComponent(LinkedComponent).init();
            this.regesteEntity(body);
        });

        this.mainLoopInterval = setInterval(() => {
            this.update();
        }, 1000);
    }
    update() {
        this.updateSystem.forEach(updateSystem => {
            updateSystem.update();
        })

        this.movementSystem.entities.forEach(entity => {
            console.log(entity.getComponent(PositionComponent).position)
        })
        console.log("===========")
    }
    gameEnd() {
        clearInterval(this.mainLoopInterval);
        console.log("GameEnd!")
    }
}
new Main();
