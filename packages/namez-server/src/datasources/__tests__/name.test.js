const NameAPI = require('../name');
const RollingStore = require('../rolling_store');
const WordnikAPI = require('../wordnik');

describe('[NameAPI.nameReducer]', () => {
  it('should not return null', () => {
    expect(NameAPI.nameReducer()).toBeTruthy();
  });

  it('should generate an ID', () => {
    expect(NameAPI.nameReducer().id).toBeTruthy();
  });

  it('should create text from adj and noun', () => {
    expect(NameAPI.nameReducer('Adj', 'Noun').text).toBe('Adj Noun');
  });

  it('should create blank text when noun not present', () => {
    expect(NameAPI.nameReducer('Adj').text).toBe('');
  });

  it('should create blank text when noun is null', () => {
    expect(NameAPI.nameReducer('Adj', null).text).toBe('');
  });

  it('should create blank text when noun is undefined', () => {
    expect(NameAPI.nameReducer('Adj', undefined).text).toBe('');
  });

  it('should create blank text when noun is blank', () => {
    expect(NameAPI.nameReducer('Adj', '').text).toBe('');
  });

  it('should create blank text when adj is null', () => {
    expect(NameAPI.nameReducer(null, 'Noun').text).toBe('');
  });

  it('should create blank text when noun is undefined', () => {
    expect(NameAPI.nameReducer(undefined, 'Noun').text).toBe('');
  });

  it('should create blank text when noun is blank', () => {
    expect(NameAPI.nameReducer('', 'Noun').text).toBe('');
  });

  it('should create title case when all lowercase', () => {
    expect(NameAPI.nameReducer('adj', 'noun').text).toBe('Adj Noun');
  });

  it('should create title case when all uppercase', () => {
    expect(NameAPI.nameReducer('ADJ', 'NOUN').text).toBe('Adj Noun');
  });

  it('should create title case when all title case', () => {
    expect(NameAPI.nameReducer('Adj', 'Noun').text).toBe('Adj Noun');
  });

  it('should handle 1-length strings', () => {
    expect(NameAPI.nameReducer('a', 'n').text).toBe('A N');
  });
});

describe('[NameAPI.getNames]', () => {
  it('should return empty when limit is 0', async () => {
    const names = new NameAPI(new RollingStore());
    const res = await names.getNames('', 0, null);
    expect(res).toEqual([]);
  });

  it('should return one item when limit is 1', async () => {
    const names = new NameAPI(new RollingStore());
    const wordnik = new WordnikAPI();
    wordnik.getRandomWords = jest
    .fn()
    .mockReturnValueOnce(mockWordnikAdjectiveResponse)
    .mockReturnValueOnce(mockWordnikNounResponse);

    const res = await names.getNames('', 1, wordnik);
    expect(res.length).toBe(1);
    expect(res[0].id).toBeTruthy();
    expect(res[0].text).toBe('First Apple');
  });

  it('should return five items when limit is 5', async () => {
    const names = new NameAPI(new RollingStore());
    const wordnik = new WordnikAPI();
    wordnik.getRandomWords = jest
    .fn()
    .mockReturnValueOnce(mockWordnikAdjectiveResponse)
    .mockReturnValueOnce(mockWordnikNounResponse);

    const res = await names.getNames('', 5, wordnik);
    expect(res.length).toBe(5);
  });
});

// Mock data

const mockWordnikAdjectiveResponse = [
  'first', 'second', 'third', 'fourth', 'fifth'
];

const mockWordnikNounResponse = [
  'apple', 'baker', 'charlie', 'delta', 'eggplant'
];
