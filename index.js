const CreateRouter = require('./createRouter')

module.exports = (api, projectOptions) => {
    const createRouter = new CreateRouter(api, projectOptions);

    api.registerCommand('createRouter', {
        description: 'createRouter plugin for vue cli 3',
        usage: 'vue-cli-service createRouter [options]',
        options: {
            '--async': 'set router async mode'
        }
    }, args => {
        createRouter.run();
    });
}

module.exports.defaultModes = {
    createRouter: 'development'
}