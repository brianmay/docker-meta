const core = require('@actions/core');
const github = require('@actions/github');

try {
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = github.context.payload;
  const time = (new Date()).toISOString();

  const prefix = "refs/tags/v";
  let version = "beta";
  if (payload.ref.indexOf(PREFIX) == 0) {
    // PREFIX is exactly at the beginning
    version = payload.ref.slice(PREFIX.length);
  }

  const vcs_ref = payload.head_commit.id.substr(0,8);

  core.setOutput("build-args", `BUILD_DATE=${time} VERSION=${version} VCS_REF=${vcs_ref}`);
} catch (error) {
  core.setFailed(error.message);
}
