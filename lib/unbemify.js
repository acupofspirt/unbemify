const logger = require('./utils/logger'),
      argsParser = require('./parsers/argsParser'),
      styleParser = require('./parsers/styleParser'),
      filesReader = require('./utils/filesReader'),
      filesWriter = require('./utils/filesWriter'),
      minificationReport = require('./utils/minificationReport'),
      replacer = require('./replacer');

function unbemify () {
  logger.log('Unbemify started ...');

  const startTime = process.hrtime(),
        options = argsParser(process.argv);


  if (options.mistake) {
    logger.error(options.mistake);
  }
  else {
    filesReader(options)
      .then(() => {
        const selectors = styleParser(options.style.content);

        replacer(selectors, options);

        filesWriter(options)
          .then(() => minificationReport(selectors, options, startTime))
          .catch(e => logger.error(e));
      })
      .catch(e => logger.error(e));
  }
}

module.exports = unbemify;