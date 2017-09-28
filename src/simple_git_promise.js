const git = require('simple-git')

function Git(baseDir) {
	this.client = git(baseDir)
}

;[
	'add',
	'addAnnotatedTag',
	'addConfig',
	'addRemote',
	'addTag',
	'branch',
	'branchLocal',
	'catFile',
	'checkout',
	'checkoutBranch',
	'checkoutLocalBranch',
	'deleteLocalBranch',
	'checkoutLatestTag',
	'clone',
	'commit',
	'customBinary',
	'diff',
	'diffSummary',
	'fetch',
	'init',
	'log',
	'mergeFromTo',
	'mirror',
	'mv',
	'pull',
	'pushTags',
	'rebase',
	'removeRemote',
	'rm',
	'rmKeepLocal',
	'stashList',
	'stash',
	'subModule',
	'submoduleAdd',
	'submoduleInit',
	'submoduleUpdate',
	'tag',
	'tags',
	'getRemotes',
	'reset',
	'revparse',
	'status',
	'show',
	'checkIgnore',
	'listRemote',
	'outputHandler',
	'clean',
	'raw',
	'revert',
	'exec'
].forEach(command => {
	Git.prototype[command] = function(...args) {
		return new Promise((resolve, reject) => {
			this.client[command](...args, (response, error) => {
				if (error) {
					reject(error)
				} else {
					resolve(response)
				}
			})
		})
	}
})
;['clearQueue', 'customBinary', 'cwd', 'silent'].forEach(command => {
	Git.prototype[command] = function(...args) {
		return this.client[command](...args)
	}
})

module.exports = {
	Git
}
