import { IComponent } from './component.h';
import { IStart, IUpdate } from '../lifecycle/lifecycle.h';

export type constr<T> = { new(...args: unknown[]): T };

export abstract class Entity implements IStart, IUpdate {
    protected _components: IComponent[] = [];

    public get Components(): IComponent[] {
        return this._components
    }
    
    public Start(): void {
        for(const component of this._components){
            component.Start()
        }
    }

    public AddComponent(
        component: IComponent
    ): void {
        component.Entity = this
        this._components.push(component)
    }

    public GetComponent<C extends IComponent>(constr: constr<C>): C {
        for (const component of this._components) {
            if (component instanceof constr) {
                return component as C;
            }
        }
        throw new Error(`Component ${constr.name} not found on Entity ${this.constructor.name}`)
    }

    public HasComponent<C extends IComponent>(constr: constr<C>): boolean {
        for (const component of this._components) {
            if (component instanceof constr) {
                return true
            }
        }
    
        return false
    }

    public RemoveComponent<C extends IComponent>(constr: constr<C>): void {
        let toRemove: IComponent | undefined;
        let index: number | undefined;

        for (let i = 0; i < this._components.length; i++) {
            const component = this._components[i];

            if (component instanceof constr) {
                toRemove = component;
                index = i;
                break;
            }
        }
        
        if (toRemove && index) {
            toRemove.Entity = null;
            this._components.splice(index, 1);
        }
    }

    public Update(deltaTime: number): void {
        for(const component of this._components){
            component.Update(deltaTime);
        }
    }
}