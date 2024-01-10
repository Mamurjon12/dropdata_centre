class Pagination{
    constructor(totalitems, page, limit) {
        this.limit = limit || 14
        this.page = page || 1
        this.totalitems = Math.ceil(totalitems / this.limit)
        this.ofset = (this.page - 1) * this.limit
    }
}

module.exports = Pagination

// git add, git commmit -m 'initial', brench, remote add origin, 