import path from 'path';
import fs from 'fs';
import getDiff from '../src';

const getFixturePath = (name) => path.join(__dirname, '__fixtures__', name);
const filePath = (file) => getFixturePath(file);
const expected = (result) => fs.readFileSync(getFixturePath(result), 'utf-8');

describe('toString', () => {
  it('test json1', () => {
    expect(getDiff(filePath('before.json'), filePath('after.json'))).toBe(expected('result.txt'));
  });

  it('test yml', () => {
    expect(getDiff(filePath('before.yml'), filePath('after.yml'))).toBe(expected('result.txt'));
  });

  it('test ini', () => {
    expect(getDiff(filePath('before.ini'), filePath('after.ini'))).toBe(expected('result.txt'));
  });
});

describe('plain', () => {
  it('test json', () => {
    expect(getDiff(filePath('before.json'), filePath('after.json'), 'plain')).toBe(expected('plain.txt'));
  });

  it('test yml', () => {
    expect(getDiff(filePath('before.yml'), filePath('after.yml'), 'plain')).toBe(expected('plain.txt'));
  });

  it('test ini', () => {
    expect(getDiff(filePath('before.ini'), filePath('after.ini'), 'plain')).toBe(expected('plain.txt'));
  });
});

describe('json', () => {
  it('test json', () => {
    expect(getDiff(filePath('before.json'), filePath('after.json'), 'json')).toBe(expected('result.json'));
  });

  it('test yml', () => {
    expect(getDiff(filePath('before.yml'), filePath('after.yml'), 'json')).toBe(expected('result.json'));
  });

  it('test ini', () => {
    expect(getDiff(filePath('before.ini'), filePath('after.ini'), 'json')).toBe(expected('result.json'));
  });
});
