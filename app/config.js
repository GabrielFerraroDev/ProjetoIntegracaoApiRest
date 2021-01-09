const convict = require('convict')

convict.addFormat(require('convict-format-with-validator').ipaddress)

// Define a schema
var config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
})

// Load environment dependent configuration

var env = config.get('env')
config.loadFile('./config/' + env + '.json')

module.exports = config
