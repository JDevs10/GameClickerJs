import { Entity } from './entity';
import { IStart, IUpdate } from '../lifecycle/lifecycle.h';

export interface IComponent extends IStart, IUpdate {
    Entity: Entity | null;
}