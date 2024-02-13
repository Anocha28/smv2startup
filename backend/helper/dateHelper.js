const getDateTime = async () => {
    Date.prototype.addHours = function(h){
        this.setHours(this.getHours()+h)
        return this;
    }
    return new Date().addHours(7)
}

export { getDateTime }