export class Cell {
    id: number
    alive = 0
    old = false

    constructor(id: number){
        this.id = id
    }

    public toggleAlive(){
        this.alive = this.alive ? 0 : 1
    }

    public toggleOld(){
        this.old = !this.old
    }
}