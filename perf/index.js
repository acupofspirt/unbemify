const modules = [
  'replacer',
  'identifiers'
]

function invokeModule(name) {
  require(`./${name}.js`)
}

modules.forEach(invokeModule)