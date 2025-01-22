import semver from 'semver';

import * as core from '@actions/core';

const main = () => {
  const tagRegex = /^@([a-zA-Z0-9-]*)\/([a-zA-Z0-9-]*)-v(.*)$/;
  const serviceVersionSuffixRegex = /^.*-(v[0-9]+)$/;

  try {
    const tag = core.getInput('tag');
    const [, service, app, version] = tag.match(tagRegex);

    console.log('extracted', {service, app, version});

    const semVersion = semver.parse(version);

    // format: [name, version]
    const [prerelease] = semVersion.prerelease;

    // we might improve, but need to know which kind of "deployment" to use
    const type = app === 'web' ? 'frontend' : 'backend';

    const serviceVersionSuffixMatch = service.match(serviceVersionSuffixRegex);
    if (serviceVersionSuffixMatch) {
      const [, serviceVersionSuffix] = serviceVersionSuffixMatch;
      console.log('service version suffix:', serviceVersionSuffix);
      core.setOutput('service_version_suffix', serviceVersionSuffix);
    }

    core.setOutput('service', service);
    core.setOutput('app', app);
    core.setOutput('version', version);
    core.setOutput('type', type);
    core.setOutput('prerelease', prerelease);
  } catch (error) {
    console.error(error);
    core.setFailed(error.message);
  }
};

main();
