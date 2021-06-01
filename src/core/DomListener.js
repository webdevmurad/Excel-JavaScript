
import {capitalize} from './utils';

export class DomListener {
  constructor($root, listeners = []) {
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      // Тоже что и addEventListener
      this.$root.on(listener, this[method].bind(this));
    });
  }

  removeDOMListeners() {

  }
}

// input => onInput
function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
