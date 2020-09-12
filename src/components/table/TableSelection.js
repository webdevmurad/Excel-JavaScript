export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clear()
        $el.focus().addClass(TableSelection.className)
        this.group.push($el)
        this.current = $el
    }

    clear() {
        this.group.forEach(el => el.removeClass(TableSelection.className))
        this.group = []
    }

    selectGroup(groups = []) {
        this.clear()
        this.group = groups
        this.group.map(el => el.addClass(TableSelection.className))
    }
    
}