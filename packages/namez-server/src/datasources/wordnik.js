const {RESTDataSource} = require('apollo-datasource-rest');

class WordnikAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://api.wordnik.com/v4/';
  }

  async getRandomWords(partOfSpeech, limit = 10, minLength = 3) {
    // Note that the API requires the misspelling 'posessive'
    const response = await this.get('words.json/randomWords', {
      limit: limit,
      includePartOfSpeech: partOfSpeech,
      excludePartOfSpeech:
        'family-name,given-name,proper-noun,proper-noun-plural,proper-noun-posessive',
      hasDictionaryDef: true,
      minCorpusCount: 10000,
      maxCorpusCount: -1,
      minDictionaryCount: 1,
      maxDictionaryCount: -1,
      minLength: minLength,
      maxLength: -1,
    });
    return Array.isArray(response)
      ? response.map(word => WordnikAPI.wordReducer(word))
      : [];
  }

  static wordReducer(word) {
    return word.word;
  }

  willSendRequest(request) {
    request.params.set('api_key', process.env.WORDNIK_API_KEY);
  }
}

module.exports = WordnikAPI;
