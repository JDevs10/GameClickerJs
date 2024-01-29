import { Entity } from '../utils/ecs/entity';

export class Game extends Entity {
    private _lastTimestamp = 0;

    public Entities: Entity[] = []

    public Start(): void {
        super.Start()

        console.log('start game')
        
        // awake all children
        for (const entity of this.Entities){
            entity.Start()
        }

        // Make sure Update starts after all entities are started
        window.requestAnimationFrame(() => {
            // set initial timestamp
            this._lastTimestamp = Date.now()

            console.log('Make sure Update starts after all entities are started')
    
            // start update loop
            this.Update()
        })
    }

    public Update(): void {
        const deltaTime = (Date.now() - this._lastTimestamp) / 1000;

        // update all components
        super.Update(deltaTime);

        // update all children
        for (const entity of this.Entities){
            entity.Update(deltaTime)
        }

        console.log('update loop')

        // update the timestamp
        this._lastTimestamp = Date.now();

        // Invoke on next frame
        window.requestAnimationFrame(() => this.Update());
    }
}