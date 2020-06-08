module.exports = api => {
    const pkg = require('../package');

    api.addTask({
        name: 'createRouter',
        command: 'vue-cli-service createRouter',
        description: 'create router',
        link: pkg.homepage,
        prompts: [
            {
                name: 'async',
                type: 'confirm',
                default: false,
                description: '启用 Async'
            }
        ],
        onBeforeRun: async ({ answers, args }) => {
            answers.async && args.push('--async')
        }
    })
}