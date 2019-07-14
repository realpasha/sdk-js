workflow "Test, Build and Publish to NPM" {
  on = "push"
  resolves = ["Publish"]
}

# Install
action "Install" {
  uses = "actions/npm@master"
  args = "install"
}

# Run tests
action "Test" {
  uses = "actions/npm@master"
  needs = ["Install"]
  args = "test"
}

# Run build
action "Build" {
  uses = "actions/npm@master"
  needs = ["Install","Test"]
  runs = "build"
}

# Filter for master branch
action "Master" {
  needs = ["Build"]
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Publish" {
  uses = "actions/npm@master"
  needs = ["Master"]
  args = "publish --access public"
  secrets = ["NPM_AUTH_TOKEN"]
}
