const args = require('../lib/parsers/argsParser');

describe('Arguments parser', () => {
  it('should correctly parse arguments in usual order', () => {
    const parsedArgs = args(['node', 'unbemify', '--style', '../dist/css/main.css', '--files', '../dist/js/main.js']);

    expect(parsedArgs.mistake).toBe('');
    expect(parsedArgs.style.path).toBe('../dist/css/main.css');
    expect(parsedArgs.files[0].path).toBe('../dist/js/main.js');
  });

  it('should correctly parse arguments in reverse order', () => {
    const parsedArgs = args(['node', 'unbemify', '--F', '../dist/js/main.js', '--S', '../dist/css/main.css']);

    expect(parsedArgs.mistake).toBe('');
    expect(parsedArgs.style.path).toBe('../dist/css/main.css');
    expect(parsedArgs.files[0].path).toBe('../dist/js/main.js');
  });

  it('should correctly parse arguments with many files', () => {
    const parsedArgs = args(['node', 'unbemify', '--S', '../dist/css/main.css', '--F', '../dist/js/main.js', '../dist/html/index.js']);

    expect(parsedArgs.mistake).toBe('');
    expect(parsedArgs.style.path).toBe('../dist/css/main.css');
    expect(parsedArgs.files[0].path).toBe('../dist/js/main.js');
    expect(parsedArgs.files[1].path).toBe('../dist/html/index.js');
  });

  it('should warn if there are no arguments', () => {
    const parsedArgs = args(['node', 'unbemify']);

    expect(parsedArgs.mistake).toBe('Not passed any arguments');
  });

  it('should warn if incorrect style path on full style flag', () => {
    const parsedArgs = args(['node', 'unbemify', '--files', '../dist/js/main.js', '--style', '567890']);

    expect(parsedArgs.mistake).toBe('Incorrect style path: 567890');
  });

  it('should warn if incorrect file path on full file flag', () => {
    const parsedArgs = args(['node', 'unbemify', '--files', '567890', '--style', '567890']);

    expect(parsedArgs.mistake).toBe('Incorrect file path: 567890');
  });

  it('should warn if there are multiple style flags on full style flag', () => {
    const parsedArgs = args(['node', 'unbemify', '--style', '../dist/css/main.css', '--style', '../dist/css/main.css']);

    expect(parsedArgs.mistake).toBe('Multiple style flags are not allowed');
  });

  it('should warn if there are multiple style paths on full style flag', () => {
    const parsedArgs = args(['node', 'unbemify', '--style', '../dist/css/main.css', '../dist/css/main.css', '--files', '../dist/js/main.js']);

    expect(parsedArgs.mistake).toBe('Multiple style paths are not supported');
  });

  it('should warn if there are multiple file flags on full file flag', () => {
    const parsedArgs = args(['node', 'unbemify', '--files', '../dist/js/main.js', '--files', '../dist/js/main.js']);

    expect(parsedArgs.mistake).toBe('Multiple file flags are not allowed');
  });
});