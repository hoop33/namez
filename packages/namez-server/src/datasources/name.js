const {DataSource} = require('apollo-datasource');
const shortid = require('shortid');

const MaxLimit = 20;
const FetchNum = 100;

class NameAPI extends DataSource {
  constructor(store) {
    super();
    this.store = store;
  }

  async getNames(after = '', limit = 10, wordnikAPI) {
    if (limit < 1) {
      return [];
    }

    if (limit > MaxLimit) {
      limit = MaxLimit;
    }

    let names = this.store.findItems(after, limit);
    if (names.length === 0) {
      await this.getMoreNames(wordnikAPI);
      names = this.store.findItems(after, limit);
    }
    return names;
  }

  getNameById(id) {
    return this.store.findItem(id);
  }

  async getMoreNames(wordnikAPI) {
    const adjectives = await wordnikAPI.getRandomWords('adjective', FetchNum);
    const nouns = await wordnikAPI.getRandomWords('noun', FetchNum);
    if (
      Array.isArray(adjectives) &&
      Array.isArray(nouns) &&
      adjectives.length === nouns.length
    ) {
      for (let i = 0; i < adjectives.length; i++) {
        this.store.addItem(NameAPI.nameReducer(adjectives[i], nouns[i]));
      }
    }
  }

  static nameReducer(adj, noun) {
    return {
      id: shortid.generate(),
      text:
        adj && noun
          ? `${adj.toLowerCase()} ${noun.toLowerCase()}`
          : '',
    };
  }
}

module.exports = NameAPI;
