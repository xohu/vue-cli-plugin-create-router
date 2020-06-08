module.exports = api => {
  api.extendPackage({
    scripts: {
      'createRouter': 'vue-cli-service createRouter'
    }
  })
}
