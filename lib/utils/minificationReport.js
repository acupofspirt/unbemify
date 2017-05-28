const logger = require('./logger');

function minificationReport (selectors, options, startTime) {
  const initialSize = options.files
          .reduce((acc, i) => acc + i.size, 0) + options.style.size,
        compressedSize = options.files
          .reduce((acc, i) => acc + i.minifiedSize, 0) + options.style.minifiedSize,
        minifiedBytes = initialSize - compressedSize,
        minifiedPercentageDifference = minifiedBytes * 100 / initialSize,
        identifiersUnused = selectors
          .filter(selector => selector.count === 0).length,
        identifiersUnique = selectors.length,
        unusedIdentifiersDifference = identifiersUnused * 100 / identifiersUnique,
        endTime = process.hrtime(startTime),
        endTimeMs = (endTime[0] * 1e9 + endTime[1]) / 1000000;

  /** @todo There is some issue with identifiersUnused count */

  logger.log(`Successfully finished in ${endTimeMs.toFixed(1)} ms!`);
  logger.info('==== Statistics ====');
  logger.info(`Minified: ${parseFloat(minifiedBytes / 1024).toFixed(3)}kb (${parseInt(minifiedPercentageDifference, 10)}%)`);
  logger.info(`Unique classes: ${identifiersUnique}`);
  logger.info(`Unused classes: ${identifiersUnused} (${parseInt(unusedIdentifiersDifference, 10)}%)`);
}

module.exports = minificationReport;