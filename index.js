const core = require('@actions/core')
const newman = require('newman');

function get(key, opts) {
  const val = core.getInput(key, opts)
  return val !== '' ? val : null
}

function runNewman(options) {
  console.log(options);
  console.log(':::::::::::::::');
  const allInputs = core.getInputsWithDefaults();
  console.log('INPUTS :::', allInputs);
  newman
    .run(options, (err) => {
      if (err) {
        core.setFailed('Newman run error!! ' + (err || ''), err);
      }
    })
    .on('done', (err, summary) => {
      if (!options.suppressExitCode && (err || summary.run.failures.length)) {
        core.setFailed('Newman run failed! ' + (err || ''), summary?.run?.failures);
      }
    });
}


async function init() {
  try {
    core.notice('This is a message that will also emit an annotation');
    core.info('This is a message that will also emit an annotation');
    core.warming('warning message');

    const apiBase = 'https://api.getpostman.com';


    const required = { required: true }


    const apiKey = get('apiKey');
    const optionsO = {
      collection: get('collection', required),
      environment: get('environment', required),
      reporters: 'cli',
    };


    const allInputs = core.getInputsWithDefaults();
    console.log('INPUTS :::', allInputs);
    core.setOutput('result', core.getInputsWithDefaults());



    options.collection = `${apiBase}/collections/${optionsO.collection}?apikey=${apiKey}`;
    options.bail = true;
    options.environment = `${apiBase}/environments/${optionsO.environment}?apikey=${apiKey}`;
    options.reporters = 'cli',

      console.log(options);
    console.log(':::::::::::::::');
    
    console.log('INPUTS :::', allInputs);
    runNewman(options);
  } catch (error) {
    core.setFailed(error.message);
  }
}

init();
