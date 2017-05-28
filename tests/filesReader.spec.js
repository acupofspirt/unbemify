const files = require('../lib/utils/filesReader');

describe('Files loader', () => {
  it('should correctly read file content', () => {
    const parsedFiles = Promise.all(files(['tests/resources/file1.txt', 'tests/resources/file2.txt']));

    return expect(parsedFiles).resolves.toEqual(['Some content', 'Some another content']);
  });

  it('should reject on nonexistent file path', () => {
    const parsedFiles = Promise.all(files(['tests/resources/file1.txt', 'tests/resources/file3.txt']));

    return expect(parsedFiles).rejects.toMatch('No such file: tests/resources/file3.txt');
  });
});