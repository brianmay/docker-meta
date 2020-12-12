const core = require('@actions/core');
const github = require('@actions/github');

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = github.context.payload;
  const time = (new Date()).toISOString();

  let version = "beta";

  const version_prefix = "refs/tags/v";
  if (payload.ref.indexOf(version_prefix) == 0) {
    version = payload.ref.slice(version_prefix.length);
  }

  const branch_prefix = "refs/heads/";
  if (payload.ref.indexOf(branch_prefix) == 0) {
    version = payload.ref.slice(branch_prefix.length);
  }

  const vcs_ref = payload.head_commit.id.substr(0,8);

  core.setOutput("build-args", `BUILD_DATE=${time},VERSION=${version},VCS_REF=${vcs_ref}`);
} catch (error) {
  core.setFailed(error.message);
}
