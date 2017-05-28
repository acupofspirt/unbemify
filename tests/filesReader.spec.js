const filesReader = require('../lib/utils/filesReader');

describe('Files reader', () => {
  it('should correctly read file content', () => {
    const options = {
      style: {
        path: 'tests/resources/file1.txt',
        content: ''
      },
      files: [{
        path: 'tests/resources/file2.txt',
        content: ''
      }]
    };

    return filesReader(options)
      .then(() => {
        expect(options.style.content).toBe('Some content');
        expect(options.files[0].content).toBe('Some another content');
      });
  });

  it('should reject on nonexistent file path', () => {
    const options = {
      style: {
        path: 'tests/resources/file1.txt',
        content: ''
      },
      files: [{
        path: 'tests/resources/file3.txt',
        content: ''
      }]
    };

    return expect(filesReader(options)).rejects.toMatch('No such file: tests/resources/file3.txt');
  });
});