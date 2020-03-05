import path from 'path';
import getDiff from '../src';

describe('diffFile', () => {
  const pathToFixtures = path.join(__dirname, '__fixtures__');

  const actual = '{\n host: hexlet.io\n + verbose: true\n - timeout: 50\n + timeout: 20\n - proxy: 123.234.53.22\n - follow: false\n}';

  it('test json', () => {
    const filePathBefore = path.join(pathToFixtures, 'before.json');
    const filePathAfter = path.join(pathToFixtures, 'after.json');
    const diff = getDiff(filePathBefore, filePathAfter);
    expect(diff).toBe(actual);
  });

  it('test yml', () => {
    const filePathBefore = path.join(pathToFixtures, 'before.yml');
    const filePathAfter = path.join(pathToFixtures, 'after.yml');
    const diff = getDiff(filePathBefore, filePathAfter);
    expect(diff).toBe(actual);
  });

  it('test ini', () => {
    const filePathBefore = path.join(pathToFixtures, 'before.ini');
    const filePathAfter = path.join(pathToFixtures, 'after.ini');
    const diff = getDiff(filePathBefore, filePathAfter);
    expect(diff).toBe(actual);
  });
});
