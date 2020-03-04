import path from 'path';
import getDiff from '../src';

describe('diffFile', () => {
  const pathToFixtures = path.join(__dirname, '__fixtures__');

  it('test json', () => {
    const filePathBefore = path.join(pathToFixtures, 'before.test.json');
    const filePathAfter = path.join(pathToFixtures, 'after.test.json');
    const diff = getDiff(filePathBefore, filePathAfter);
    expect(diff).toBe('{\nhost: hexlet.io\n+ verbose: true\n- timeout: 50\n+ timeout: 20\n- proxy: 123.234.53.22\n- follow: false\n}');
  });
});
