if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};
if (!String.prototype.last){
    String.prototype.last = function(){
        return this[this.length - 1];
    };
};