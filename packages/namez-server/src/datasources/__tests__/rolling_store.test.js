const RollingStore = require('../rolling_store');

describe('[RollingStore.addItem]', () => {
  it('should not add item when null', () => {
    const store = new RollingStore();
    store.addItem(null);
    expect(store.size()).toBe(0);
  });

  it('should not add item when undefined', () => {
    const store = new RollingStore();
    store.addItem(undefined);
    expect(store.size()).toBe(0);
  });

  it('should not add item when no id', () => {
    const store = new RollingStore();
    store.addItem({});
    expect(store.size()).toBe(0);
  });

  it('should not add item when id is null', () => {
    const store = new RollingStore();
    store.addItem({id: null});
    expect(store.size()).toBe(0);
  });

  it('should not add item when id is undefined', () => {
    const store = new RollingStore();
    store.addItem({id: undefined});
    expect(store.size()).toBe(0);
  });

  it('should not add item when id is empty', () => {
    const store = new RollingStore();
    store.addItem({id: ''});
    expect(store.size()).toBe(0);
  });

  it('should add item when has id', () => {
    const store = new RollingStore();
    store.addItem({id: '1'});
    expect(store.size()).toBe(1);
  });

  it('should replace same id', () => {
    const store = new RollingStore();
    store.addItem({id: '1'});
    store.addItem({id: '1'});
    expect(store.size()).toBe(1);
  });

  it('should not replace different id', () => {
    const store = new RollingStore();
    store.addItem({id: '1'});
    store.addItem({id: '2'});
    expect(store.size()).toBe(2);
  });
});

describe('[RollingStore.size]', () => {
  it('should return correct size', () => {
    const store = new RollingStore(10);
    store.addItem({id: '1'});
    store.addItem({id: '2'});
    store.addItem({id: '3'});
    store.addItem({id: '4'});
    store.addItem({id: '5'});
    expect(store.size()).toBe(5);
  });

  it('should not exceed max size', () => {
    const store = new RollingStore(1);
    store.addItem({id: '1'});
    store.addItem({id: '2'});
    expect(store.size()).toBe(1);
  });
});

describe('[RollingStore.findItem]', () => {
  it('should return null when id is null', () => {
    const store = new RollingStore();
    expect(store.findItem(null)).toBeNull();
  });

  it('should return null when id is undefined', () => {
    const store = new RollingStore();
    expect(store.findItem(undefined)).toBeNull();
  });

  it('should return null when id is empty', () => {
    const store = new RollingStore();
    expect(store.findItem('')).toBeNull();
  });

  it('should return null when not found', () => {
    const store = new RollingStore();
    expect(store.findItem('1')).toBeNull();
  });

  it('should find item when present', () => {
    const store = new RollingStore();
    store.addItem({id: '1'});
    store.addItem({id: '2'});
    store.addItem({id: '3'});
    store.addItem({id: '4'});
    expect(store.findItem('3').id).toBe('3');
  });
});

describe('[RollingStore]', () => {
  it('should handle 500 additions and roll items', () => {
    const store = new RollingStore(250);
    for (let i = 0; i < 500; i++) {
      store.addItem({id: i.toString()});
    }
    expect(store.findItem('0')).toBeNull();
    expect(store.findItem('249')).toBeNull();
    expect(store.findItem('250').id).toBe('250');
    expect(store.findItem('499').id).toBe('499');
  });

  it('should handle 500 additions and cap at max size', () => {
    const store = new RollingStore(250);
    for (let i = 0; i < 500; i++) {
      store.addItem({id: i.toString()});
    }
    expect(store.size()).toBe(250);
  });
});

describe('[RollingStore.findItems]', () => {
  it('should return empty when store is empty', () => {
    const store = new RollingStore();
    expect(store.findItems()).toEqual([]);
  });

  it('should return empty when num is less than 1', () => {
    const store = new RollingStore();
    store.addItem({id: '1'});
    store.addItem({id: '2'});
    store.addItem({id: '3'});
    const items = store.findItems('1', 0);
    expect(store.findItems()).toEqual([]);
  });

  it('should return empty when size is less than num', () => {
    const store = new RollingStore();
    store.addItem({id: '1'});
    store.addItem({id: '2'});
    store.addItem({id: '3'});
    const items = store.findItems('1', 4);
    expect(store.findItems()).toEqual([]);
  });

  it('should return first item when after is null', () => {
    const store = new RollingStore();
    store.addItem({id: '1'});
    store.addItem({id: '2'});
    store.addItem({id: '3'});
    const items = store.findItems(null, 3);
    expect(items.length).toBe(3);
    expect(items[0].id).toBe('1');
  });

  it('should return first item when after is undefined', () => {
    const store = new RollingStore();
    store.addItem({id: '1'});
    store.addItem({id: '2'});
    store.addItem({id: '3'});
    const items = store.findItems(undefined, 3);
    expect(items.length).toBe(3);
    expect(items[0].id).toBe('1');
  });

  it('should return first item when after is blank', () => {
    const store = new RollingStore();
    store.addItem({id: '1'});
    store.addItem({id: '2'});
    store.addItem({id: '3'});
    const items = store.findItems('', 3);
    expect(items.length).toBe(3);
    expect(items[0].id).toBe('1');
  });

  it('should find item after id specified and return items', () => {
    const store = new RollingStore();
    store.addItem({id: '1'});
    store.addItem({id: '2'});
    store.addItem({id: '3'});
    store.addItem({id: '4'});
    store.addItem({id: '5'});
    store.addItem({id: '6'});
    store.addItem({id: '7'});
    store.addItem({id: '8'});
    const items = store.findItems('4', 3);
    expect(items.length).toBe(3);
    expect(items[0].id).toBe('5');
    expect(items[1].id).toBe('6');
    expect(items[2].id).toBe('7');
  });
});
