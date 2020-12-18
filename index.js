const core = require('@actions/core');
const github = require('@actions/github');

try {
  // Get the JSON webhook context for the event that triggered the workflow
  const context = github.context;
  const time = (new Date()).toISOString();

  let version = "beta";

  if (context.ref) {
    const version_prefix = "refs/tags/v";
    if (context.ref.indexOf(version_prefix) == 0) {
      version = context.ref.slice(version_prefix.length);
    }

    const branch_prefix = "refs/heads/";
    if (context.ref.indexOf(branch_prefix) == 0) {
      version = context.ref.slice(branch_prefix.length);
    }
  } else if (context.head_ref) {
      // pull requests
      version = context.head_ref;
  }

  const vcs_ref = context.sha.substr(0,8);

  core.startGroup(`Context info`);
  core.info(`BUILD_DATE: ${time}`);
  core.info(`VERSION: ${version}`);
  core.info(`VCS_REF: ${vcs_ref}`);
  core.endGroup();

  core.setOutput("build-args", `BUILD_DATE=${time}\nVERSION=${version}\nVCS_REF=${vcs_ref}`);
} catch (error) {
  core.setFailed(error.message);
}
