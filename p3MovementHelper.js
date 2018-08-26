class p3MovementHelper{
    constructor(){
        this.up = 0;
        this.left = 0;
        this.right = 0;
        this.down = 0;
    }
    
    keyIn(keyValue){
        if(keyValue == 0){
            this.up += 1;
        }else if(keyValue == 1){
            this.left += 1;
        }else if(keyValue == 2){
            this.right += 1;
        }else if(keyValue == 3){
            this.down += 1;
        }
        if(this.up == 2 || this.left == 2 || this.right == 2 || this.down == 2){
            return true;
        }
        return false;
    };
    
    clearVals(){
        this.up = 0;
        this.left = 0;
        this.right = 0;
        this.down = 0;
    };
    
    total(){
        var total = 0;
        if(this.up != 2){
            total += this.up;
        }
        if(this.left != 2){
            total += this.left;
        }
        if(this.right != 2){
            total += this.right;
        }
        if(this.down != 2){
            total += this.down;
        }
        return total;
    };

}
