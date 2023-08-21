const core = require('@actions/core')
const newman = require('newman');

const getOptions = () => {
  try {
    const apiBase = 'https://api.getpostman.com';
    const required = { required: true }

    const apiKey = core.getInput('apiKey', required);
    return {
      collection:    `${apiBase}/collections/${core.getInput('collection', required)}?apikey=${apiKey}`,
      environment: `${apiBase}/environments/${core.getInput('environment', required)}?apikey=${apiKey}`,
      reporters: 'cli',
      bail: true
    };
  } catch (error) {
    core.setFailed(error.message);
    return null;
  }
}

const runNewman = async () => {
  const options = getOptions();
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
runNewman();
