// RollingStore provides an in-memory store
// in a sequential list that rolls old items
// off as it adds more items.
// Each item must have a field called 'id',
// and all IDs must be unique

class RollingStore {
  constructor(maxSize = 500) {
    this.maxSize = maxSize;
    this.data = [];
  }

  addItem(item) {
    if (item && item.id) {
      this.data.push(item);
      while (this.data.length > this.maxSize) {
        this.data.shift();
      }
      return true;
    }
    return false;
  }

  findItem(id) {
    const index = this._findIndex(id);
    return index === -1 ? null : this.data[index];
  }

  findItems(after, num) {
    const index = after === '' ? 0 : this._findIndex(after) + 1;
    if (num < 1 || index + num > this.data.length) {
      return [];
    }
    return this.data.slice(index, index + num);
  }

  _findIndex(id) {
    for (let i = 0, n = this.data.length; i < n; i++) {
      if (this.data[i].id === id) {
        return i;
      }
    }
    return -1;
  }
}

module.exports = RollingStore;
