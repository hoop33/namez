const NameAPI = require('../name');

test('nameReducer should not return null', () => {
  expect(NameAPI.nameReducer()).toBeTruthy();
});

test('nameReducer should generate an ID', () => {
  expect(NameAPI.nameReducer().id).toBeTruthy();
});

test('nameReducer should create text from adj and noun', () => {
  expect(NameAPI.nameReducer('Adj', 'Noun').text).toBe('Adj Noun');
});

test('nameReducer should create blank text when noun not present', () => {
  expect(NameAPI.nameReducer('Adj').text).toBe('');
});

test('nameReducer should create blank text when noun is null', () => {
  expect(NameAPI.nameReducer('Adj', null).text).toBe('');
});

test('nameReducer should create blank text when noun is undefined', () => {
  expect(NameAPI.nameReducer('Adj', undefined).text).toBe('');
});

test('nameReducer should create blank text when noun is blank', () => {
  expect(NameAPI.nameReducer('Adj', '').text).toBe('');
});

test('nameReducer should create blank text when adj is null', () => {
  expect(NameAPI.nameReducer(null, 'Noun').text).toBe('');
});

test('nameReducer should create blank text when noun is undefined', () => {
  expect(NameAPI.nameReducer(undefined, 'Noun').text).toBe('');
});

test('nameReducer should create blank text when noun is blank', () => {
  expect(NameAPI.nameReducer('', 'Noun').text).toBe('');
});

test('nameReducer should create title case when all lowercase', () => {
  expect(NameAPI.nameReducer('adj', 'noun').text).toBe('Adj Noun');
});

test('nameReducer should create title case when all uppercase', () => {
  expect(NameAPI.nameReducer('ADJ', 'NOUN').text).toBe('Adj Noun');
});

test('nameReducer should create title case when all title case', () => {
  expect(NameAPI.nameReducer('Adj', 'Noun').text).toBe('Adj Noun');
});

test('nameReducer should handle 1-length strings', () => {
  expect(NameAPI.nameReducer('a', 'n').text).toBe('A N');
});
