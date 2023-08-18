const core = require('@actions/core')
const newman = require('newman');

init();

async function init() {
  try {
    const apiBase = 'https://api.getpostman.com';
    const args = process.argv.slice(2);
    const options = {
      collection: args[0],
      environment: args[1],
      reporters: 'cli',
    };

    options.collection = `${apiBase}/collections/${options.collection}?apikey=${args[2]}`;
    options.bail = true;
    options.environment = `${apiBase}/environments/${options.environment}?apikey=${args[2]}`;

    runNewman(options);
  } catch (error) {
    core.setFailed(error.message);
  }
}

function runNewman(options) {
  console.log(options);
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
