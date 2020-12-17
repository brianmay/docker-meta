const core = require('@actions/core');
const github = require('@actions/github');

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = github.context.payload;
  const time = (new Date()).toISOString();

  let version = "beta";

  if (payload.ref) {
    const version_prefix = "refs/tags/v";
    if (payload.ref.indexOf(version_prefix) == 0) {
      version = payload.ref.slice(version_prefix.length);
    }

    const branch_prefix = "refs/heads/";
    if (payload.ref.indexOf(branch_prefix) == 0) {
      version = payload.ref.slice(branch_prefix.length);
    }
  } else if (payload.head_ref) {
      // pull requests
      version = payload.head_ref;
  }

  const vcs_ref = payload.sha.substr(0,8);

  core.startGroup(`Context info`);
  core.info(`BUILD_DATA: ${time}`);
  core.info(`VERSION: ${version}`);
  core.info(`VCS_REF: ${vcs_ref}`);
  core.endGroup();

  core.setOutput("build-args", `BUILD_DATE=${time}\nVERSION=${version}\nVCS_REF=${vcs_ref}`);
} catch (error) {
  core.setFailed(error.message);
}
