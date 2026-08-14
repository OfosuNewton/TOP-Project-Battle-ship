export class Ship {
    constructor(length) {
        this.length = length,
        this.hits = 0
        this.sunk = false;
        
    } 

    hit() {
       let current_hit_record = this.hits + 1;
       this.hits = current_hit_record;
       return this.hits;
    }
}


