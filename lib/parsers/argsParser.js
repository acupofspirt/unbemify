const path = require('path')

function isPathValid (pth) {
  let parsedPath = {}

  parsedPath = path.parse(pth)

  if (
    parsedPath.name !== '' &&
    parsedPath.ext !== ''
  ) {
    return true
  }

  return false
}

function argsParser (argv) {
  const styleFlag = '--style',
        altStyleFlag = '--S',
        filesFlag = '--files',
        altFilesFlag = '--F',
        argsList = argv.slice(2),
        argsLength = argsList.length,
        options = {
          style: {
            path: '',
            content: '',
            size: 0,
            minifiedSize: 0
          },
          files: [],
          mistake: ''
        }

  if (argsLength) {
    const slices = [],
          slicePoints = []

    for (let i = 0; i < argsLength; i++) {
      const item = argsList[i]

      if (item.startsWith('--')) {
        slicePoints.push(i)
      }
      else if (i === 0) {
        options.mistake = 'Incorrect arguments'

        break
      }
    }

    const slicePointsLength = slicePoints.length

    if (slicePointsLength === 2) {
      slicePoints.forEach((point, index) => {
        if (index === slicePointsLength - 1) {
          slices.push(argsList.slice(point))
        }
        else {
          slices.push(argsList.slice(point, slicePoints[index + 1]))
        }
      })

      const slicesLength = slices.length
      let filesPathsParsed = false

      if (slicesLength === 2) {
        for (let i = 0; i < slicesLength; i++) {
          const currentSlice = slices[i],
                flag = currentSlice.splice(0, 1)[0],
                currentSliceLength = currentSlice.length

          if (flag === styleFlag || flag === altStyleFlag) {
            if (options.style.path === '') {
              if (currentSliceLength === 1) {
                const stylePath = currentSlice[0]

                if (isPathValid(stylePath)) {
                  options.style.path = stylePath
                }
                else {
                  options.mistake = `Incorrect style path: ${stylePath}`

                  break
                }
              }
              else {
                options.mistake = 'Multiple style paths are not supported'

                break
              }
            }
            else {
              options.mistake = 'Multiple style flags are not allowed'

              break
            }
          }
          else if (flag === filesFlag || flag === altFilesFlag) {
            if (!filesPathsParsed) {
              for (let j = 0; j < currentSliceLength; j++) {
                const currentPath = currentSlice[j]

                if (isPathValid(currentPath)) {
                  options.files.push({
                    path: currentPath,
                    content: '',
                    size: 0,
                    minifiedSize: 0
                  })
                }
                else {
                  options.mistake = `Incorrect file path: ${currentPath}`
                  i = slicesLength

                  break
                }
              }

              filesPathsParsed = true
            }
            else {
              options.mistake = 'Multiple file flags are not allowed'

              break
            }
          }
          else {
            options.mistake = `Incorrect flag: ${flag}`

            break
          }
        }
      }
      else {
        options.mistake = 'Incorrect arguments'
      }
    }
    else {
      options.mistake = 'Incorrect arguments'
    }
  }
  else {
    options.mistake = 'Not passed any arguments'
  }

  return options
}

module.exports = argsParser