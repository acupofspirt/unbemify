const escapeRegExp = /[.*+?^${}()|[\]\\]/g

/**
 * Generates regular expression from string
 * @param {String} selector Selector
 * @param {Boolean} withDot Must be a dot char included in regexp
 * @return {RegExp} RegExp object
 */
function generateRegExp (selector, withDot) {
  const preparedSelector = selector.replace(escapeRegExp, '\\$&')

  if (!withDot) {
    // This regexp has all limitations of
    // word boundries in JS,
    // e.g. don't work with non-ascii chars
    return new RegExp(`((?:^|['"().]|\\b([^-_])))(${preparedSelector})(\\b(?![-_])|[])`, 'g')
  }

  return new RegExp(`(?:\\.\\b)(${preparedSelector})(\\b(?![-_])|[])`, 'g')
}

module.exports = generateRegExp