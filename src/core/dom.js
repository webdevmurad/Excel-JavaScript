class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
        }
        return this.$el.outerHTML.trim()
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }

        if (Element.prototype.append) {
            this.$el.append(node)
        } else {
            this.$el.appendChild(node)
        }
    }

    on(eventType, callback) {
        console.log('Добавил')
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType, callback) {
        console.log('Удалил')
        this.$el.removeEventListener(eventType, callback)
    }

}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName);
    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}