type Listener = (id: symbol) => void;

class DropdownBus {
  private listeners: Set<Listener> = new Set();

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  emitOpened(id: symbol) {
    this.listeners.forEach(l => {
      try {
        l(id);
      } catch (e) {
        // no-op
      }
    });
  }
}

const dropdownBus = new DropdownBus();
export default dropdownBus;
