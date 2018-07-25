const logger = require('./logger')

function logTime (startTime) {
  const endTime = process.hrtime(startTime),
        endTimeMs = (endTime[0] * 1e9 + endTime[1]) / 1e6

  logger.log(`Successfully minified in ${endTimeMs.toFixed(1)}ms`)
}

function logMinification (data) {
  function toKB (num) {
    return parseFloat(num / 1024).toFixed(2)
  }

  function logFileMinification ({fileName, size, minifiedSize}) {
    const sizeKb = toKB(size),
          minifiedSizeKb = toKB(minifiedSize),
          diff = (sizeKb - minifiedSizeKb).toFixed(2)

    logger.info(`${fileName}  ${sizeKb}KB -> ${minifiedSizeKb}KB | diff: ${diff}KB`)
  }

  const totalSize = toKB(data.files
          .reduce((acc, f) => acc + f.size, 0) + data.style.size),
        totalMinifiedSize = toKB(data.files
          .reduce((acc, f) => acc + f.minifiedSize, 0) + data.style.minifiedSize),
        totalDiff = (totalSize - totalMinifiedSize).toFixed(2)


  logFileMinification(data.style)
  data.files.forEach(logFileMinification)

  logger.info(`Total  ${totalSize}KB -> ${totalMinifiedSize}KB | diff: ${totalDiff}KB`)
}

function logClassUsage (selectorsData, data) {
  const classesCount = selectorsData.length,
        unusedClassesCount = data.report.unusedSelectorsCount
  let logMsg = `Found ${classesCount} unique classes`

  if (unusedClassesCount) {
    logMsg += `, of which ${unusedClassesCount} are unused`
  }

  logger.info(logMsg)
}

function minificationReport (selectorsData, data, startTime) {
  logTime(startTime)
  logClassUsage(selectorsData, data)
  logMinification(data)
}

module.exports = minificationReport