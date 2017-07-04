const styleParser = require('../lib/parsers/styleParser')

describe('Style parser', () => {
  const styles = `
    /* 8 unique classes, 10 overall */

    .some-class-1 {
      color: tomato;
    }

    .some-class-2, .some-class-3 {
      color: teal;
    }

    @media (max-width: 300px) {
      .some-media-class-1 {
        color: chocolate;
      }
    }

    .some-class-4 {
      color: crimson;
    }

    @media (min-width: 100500px) {
      .some-class-4  {
        color: chocolate;
      }

      .some-media-class-2 {
        color: gold;
      }
    }

    .some-class-5:after {
      color: darkolivegreen;
    }

    .some-class-5:not(.some-class-6) {
      color: indianred;
    }
  `

  it('should correctly parse all classes', () => {
    const selectors = styleParser(styles),
          expectedResult = [
            'some-class-1',
            'some-class-2',
            'some-class-3',
            'some-media-class-1',
            'some-class-4',
            'some-media-class-2',
            'some-class-5',
            'some-class-6'
          ]

    expect(selectors).toEqual(expectedResult)
  })

  it('should correctly parse all unique classes', () => {
    const selectors = styleParser(styles)

    expect(selectors.length).toBe(8)
  })
})