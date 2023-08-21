const core = require('@actions/core')
const newman = require('newman');

init();

async function init() {
  try {
    const apiBase = 'https://api.getpostman.com';
    const args = process.argv.slice(2);
    const apiKey = core.getInput('apiKey');
    const options = {
      collection: core.getInput('collection'),
      environment: core.getInput('environment'),
      reporters: 'cli',
    };

    
    const allInputs = core.getInputsWithDefaults();
    console.log('INPUTS :::', allInputs);
    core.setOutput('INPUTS :::', allInputs);


    options.collection = `${apiBase}/collections/${options.collection}?apikey=${apiKey}`;
    options.bail = true;
    options.environment = `${apiBase}/environments/${options.environment}?apikey=${apiKey}`;

    runNewman(options);
  } catch (error) {
    core.setFailed(error.message);
  }
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
