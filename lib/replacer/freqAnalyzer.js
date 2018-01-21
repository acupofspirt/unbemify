function freqAnalyzer (selectors, resources) {
  const selectorsData = selectors.map(value => ({
          name: value, count: 0, newName: ''
        })),
        selectorsCount = selectorsData.length,
        resourcesCount = resources.length

  for (let i = 0; i < selectorsCount; i++) {
    const selector = selectorsData[i]

    for (let j = 0; j < resourcesCount; j++) {
      const file = resources[j],
            match = file.match(new RegExp(selector.name, 'g'))

      if (match !== null) {
        selector.count += match.length
      }
    }
  }

  return selectorsData
    .sort((a, b) => b.count * b.name.length - a.count * a.name.length)
}

module.exports = freqAnalyzer