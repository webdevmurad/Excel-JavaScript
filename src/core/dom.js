class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector;
  }

  // Тут возвращается html вёрстка
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  /* Добавляет к слушателям приставку on,
  к примеру к input он добавится и будет onInput.*/
  on(eventType, callback) {
    console.log('eventType', eventType);
    console.log('callback', callback);
    this.$el.addEventListener(eventType, callback);
  }

  // Добавлять DOM node к вёрстке
  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }

    return this;
  }
}

// Создаёт Dom класс
export function $(selector) {
  return new Dom(selector);
}

// Создаётся DOM-элемент с классом.
$.create = (tagname, classes = '') => {
  const el = document.createElement(tagname);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
