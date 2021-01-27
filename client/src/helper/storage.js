
class ChessboxStorage {
  constructor(storageName) {
    this.name = storageName;
  }

  asJson = (data) => JSON.stringify(data);
  toJson = (data) => JSON.parse(data);

  create = (data) => {
    const storage = window.localStorage;
    const getData = storage.getItem(this.name);

    if (!storage.getItem(this.name)) {
      storage.setItem(this.name, this.toJson(data))
    }

    return this.toJson(getData);
  }

  get = () => {
    const storage = window.localStorage;
    const getData = storage.getItem(this.name);

    if (!getData) {
      console.log('The storage currently empty.');
      console.log('_.get() returning: False');

      return false;
    }

    return this.toJson(getData);
  }

  set = (data) => {
    const storage = window.localStorage;
    return storage.setItem(this.name, this.asJson(data))
  }

  auth = () => {
    const storage = window.localStorage;
    const getData = storage.getItem('csxAuth');

    if (!getData) {
      storage.setItem('csxAuth', this.toJson(false));
    } 

    return {
      get: () => this.toJson(getData || false),
      set: (data) => storage.setItem('csxAuth', this.toJson(data))
    }
  }

  UID = () => {
    const storage = window.localStorage;
    const getData = storage.getItem('csxUID');

    if (!getData) {
      storage.setItem('csxUID', '');
    }

    return {
      get: () => getData,
      set: data => storage.setItem('csxUID', data)
    }
  }
}

export const userStorage = new ChessboxStorage('csxUserEntry');