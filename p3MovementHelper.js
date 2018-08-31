class p3MovementHelper{
    constructor(){
        this.up = 0;
        this.left = 0;
        this.right = 0;
        this.down = 0;
        this.canTakeU1 = true;
        this.canTakeU2 = true;
        this.canTakeL1 = true;
        this.canTakeL2 = true;
        this.canTakeR1 = true;
        this.canTakeR2 = true;
        this.canTakeD1 = true;
        this.canTakeD2 = true;
    }
    //incriment the values according to input and return if valid inputs have been pressed
    keyIn(keyValue){
        if(keyValue == 0 && this.canTakeU1){
            this.canTakeU1 = false;
            this.up += 1;
        }else if(keyValue == 1 && this.canTakeL1){
            this.canTakeL1 = false;
            this.left += 1;
        }else if(keyValue == 2 && this.canTakeR1){
            this.canTakeR1 = false;
            this.right += 1;
        }else if(keyValue == 3 && this.canTakeD1){
            this.canTakeD1 = false;
            this.down += 1;
        }else if(keyValue == 0.2 && this.canTakeU2){
            this.canTakeU2 = false;
            this.up += 1;
        }else if(keyValue == 1.2 && this.canTakeL2){
            this.canTakeL2 = false;
            this.left += 1;
        }else if(keyValue == 2.2 && this.canTakeR2){
            this.canTakeR2 = false;
            this.right += 1;
        }else if(keyValue == 3.2 && this.canTakeD2){
            this.canTakeD2 = false;
            this.down += 1;
        }
        if(this.up == 2 || this.left == 2 || this.right == 2 || this.down == 2){
            return true;
        }
        return false;
    };
    
    //reset all values
    clearVals(){
        this.up = 0;
        this.left = 0;
        this.right = 0;
        this.down = 0;
        this.canTakeU1 = true;
        this.canTakeU2 = true;
        this.canTakeL1 = true;
        this.canTakeL2 = true;
        this.canTakeR1 = true;
        this.canTakeR2 = true;
        this.canTakeD1 = true;
        this.canTakeD2 = true;
    };
    
    //return the total number of inputs pressed 
    total(){
        var total = this.up + this.left + this.right + this.down;
        return total;
    };

}
