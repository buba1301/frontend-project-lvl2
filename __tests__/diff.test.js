import path from 'path';
import fs from 'fs';
import getDiff from '../src';


describe('diffFile', () => {
  const getFixturePath = (name) => path.join(__dirname, '__fixtures__', name);
  const expected1 = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
  const expected2 = fs.readFileSync(getFixturePath('result1.txt'), 'utf-8');

  it('test json', () => {
    const filePathBefore = getFixturePath('before.json');
    const filePathAfter = getFixturePath('after.json');
    const diff = getDiff(filePathBefore, filePathAfter);
    expect(diff).toBe(expected1);
  });

  it('test json1', () => {
    const filePathBefore = getFixturePath('before1.json');
    const filePathAfter = getFixturePath('after1.json');
    const diff = getDiff(filePathBefore, filePathAfter);
    expect(diff).toBe(expected2);
  });

  it('test yml', () => {
    const filePathBefore = getFixturePath('before.yml');
    const filePathAfter = getFixturePath('after.yml');
    const diff = getDiff(filePathBefore, filePathAfter);
    expect(diff).toBe(expected1);
  });

  it('test yml1', () => {
    const filePathBefore = getFixturePath('before1.yml');
    const filePathAfter = getFixturePath('after1.yml');
    const diff = getDiff(filePathBefore, filePathAfter);
    expect(diff).toBe(expected2);
  });

  it('test ini', () => {
    const filePathBefore = getFixturePath('before.ini');
    const filePathAfter = getFixturePath('after.ini');
    const diff = getDiff(filePathBefore, filePathAfter);
    expect(diff).toBe(expected1);
  });
});
