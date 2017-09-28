declare module 'yale-simple-git-promise' {
	interface DiffResult {
		files: {
			file: string
			changes: number
			insertions: number
			deletions: number
		}[]
		insertions: number
		deletions: number
	}

	interface FetchResult {
		raw: string
		remote: string | null
		branches: {
			name: string
			tracking: string
		}[]
		tags: {
			name: string
			tracking: string
		}[]
	}

	interface PullResult {
		files: string[]
		insertions: any
		deletions: any
		summary: {
			changes: number
			insertions: number
			deletions: number
		}
	}

	interface StatusResult {
		not_added: string[]
		conflicted: string[]
		created: string[]
		deleted: string[]
		modified: string[]
		renamed: string[]
		files: {
			path: string
			index: string
			working_dir: string
		}[]
		ahead: number
		behind: number
		current: string
		tracking: string

		/**
         * Gets whether this represents a clean working branch.
         */
		isClean(): boolean
	}

	export interface TagResult {
		all: string[]
		latest: string
	}

	interface ListLogLine {
		hash: string
		date: string
		message: string
		author_name: string
		author_email: string
	}

	interface ListLogSummary {
		all: Array<ListLogLine>
		latest: ListLogLine
	}

	class Git {
		constructor(baseDir?: string)

		/**
         * adds one or more files to be under source control
         */
		add(...files: Array<string>): Promise<void>

		/**
         * adds an annotated tag to the head of the current branch
         */
		addAnnotatedTag(tagName: string, tagMessage: string): Promise<void>

		/**
         * 	add a local configuration property
         */
		addConfig(key: string, value: string): Promise<void>

		/**
         * adds a new named remote to be tracked as name at the path repo
         */
		addRemote(name: string, repo: string): Promise<void>

		/**
         * adds a lightweight tag to the head of the current branch
         */
		addTag(name: string)

		/**
         * gets a list of all branches, calls handlerFn with two arguments, 
         * an error object and BranchSummary instance. When supplied, the 
         * options can be either an array of arguments supported by the 
         * branch command or a standard options object.
         */
		branch(options?: object): Promise<void>

		/**
         * 	gets a list of local branches, calls handlerFn with two arguments,
         *  an error object and BranchSummary instance
         */
		branchLocal(): Promise<void>

		/**
         * generate cat-file detail, options should be an array of strings 
         * as supported arguments to the cat-file command
         */
		catFile(options?: object): Promise<void>

		/**
         * checks out the supplied tag, revision or branch. checkoutWhat 
         * can be one or more strings to be used as parameters appended to the git checkout command.
         */
		checkout(checkoutWhat: string | Array<string>): Promise<void>

		/**
         * checks out a new branch from the supplied start point
         */
		checkoutBranch(branchName: string, startPoint: string): Promise<void>

		/**
         * checks out a new local branch
         */
		checkoutLocalBranch(branchName: string): Promise<void>

		/**
         * deletes a local branch
         */
		deleteLocalBranch(branchName: string): Promise<void>

		/**
         * convenience method to pull then checkout the latest tag
         */
		checkoutLatestTag(): Promise<void>

		/**
         * clone a remote repo at repoPath to a local directory at 
         * localPath (can be omitted to use the default of a 
         * directory with the same name as the repo name) with 
         * an optional array of additional arguments to include 
         * between git clone and the trailing repo local arguments
         */
		clone(repoPath: string, localPath: string, options?: string): Promise<void>

		/**
         * immediately clears the queue of pending tasks (note: any 
         * command currently in progress will still call its 
         * completion callback)
         */
		clearQueue(): void

		/**
         * commits changes in the current working directory with 
         * the supplied message where the message can be either a 
         * single string or array of strings to be passed as 
         * separate arguments (the git command line interface 
         * converts these to be separated by double line breaks)
         */
		commit(message: string): Promise<void>

		/**
         * commits changes on the named files with the supplied
         * message, when supplied, the optional options object 
         * can contain any other parameters to pass to the commit 
         * command, setting the value of the property to be a 
         * string will add name=value to the command string,
         *  setting any other type of value will result in just 
         * the key from the object being passed (ie: just name), 
         * an example of setting the author is below
         */
		commit(message: string, ...files: Array<string>): Promise<void>

		/**
         * sets the command to use to reference git, allows for 
         * using a git binary not available on the path 
         * environment variable
         */
		customBinary(gitPath: string): void

		/**
         * Sets the current working directory for all commands after 
         * this step in the chain
         */
		cwd(workingDirectory: string): void

		/**
         * get the diff of the current repo compared to the last 
         * commit with a set of options supplied as a string
         */
		diff(options: Array<string>): Promise<string>

		/**
         * get the diff for all file in the current repo compared to 
         * the last commit
         */
		diff(): Promise<void>

		/**
         * gets a summary of the diff for files in the repo, uses the
         * git diff --stat format to calculate changes. Handler is 
         * called with a nullable error object and an instance of the 
         * DiffSummary
         */
		diffSummary(): Promise<DiffResult>

		/**
         * includes options in the call to diff --stat options and 
         * returns a DiffSummary
         */
		diffSummary(options: Array<string>): Promise<DiffResult>

		/**
         * update the local working copy database with changes from 
         * the default remote repo and branch, when supplied the 
         * options argument can be a standard options object either 
         * an array of string commands as supported by the git 
         * fetch. On success, the returned data will be an instance 
         * of the FetchSummary
         */
		fetch(options?: Array<string>): Promise<FetchResult>

		/**
         * update the local working copy database with changes from 
         * a remote repo
         */
		fetch(remote, branch): Promise<FetchResult>

		/**
         * update the local working copy database with changes from 
         * the default remote repo and branch
         */
		fetch(): Promise<FetchResult>

		/**
         * initialize a repository, optional bare parameter makes 
         * intialized repository bare
         */
		init(bare: boolean): Promise<void>

		/**
         * list commits between options.from and options.to tags 
         * or branch (if not specified will show all history). 
         * Additionally you can provide options.file, which is 
         * the path to a file in your repository. Then only this 
         * file will be considered. For any other set of options, 
         * supply options as an array of strings to be appended to 
         * the git log command. To use a custom splitter in the 
         * log format, set options.splitter to be the string the 
         * log should be split on. Options can also be supplied 
         * as a standard options object for adding custom 
         * properties supported by the git log command.
         */
		log(options?: object): Promise<void>

		/**
         * merge from one branch to another, when supplied the 
         * options should be an array of additional parameters 
         * to pass into the git merge command
         */
		mergeFromTo(from: string, to: string, options?: Array<string>): Promise<string>

		/**
         * clone and mirror the repo to local
         */
		mirror(repoPath: string, localPath: string): Promise<void>

		/**
         * move all files in the from array to the to directory. On 
         * success the handlerFn will be called with a MoveSummary 
         */
		mv(from: string, to: string): Promise<void>

		/**
         * Pulls all updates from the default tracked repo
         */
		pull(): Promise<PullResult>

		/**
         * pull all updates from the specified remote branch (eg 'origin'/'master')
         */
		pull(remote: string, branch: string): Promise<PullResult>

		/**
         * Pulls from named remote with any necessary options
         */
		pull(remote: string, branch: string, options: Array<string>): Promise<PullResult>

		/**
         * pushes to a named remote/branch, supports additional 
         * options from the git push command.
         */
		push(remote: string, branch: string, options?: object): Promise<void>

		/**
         * pushes tags to a named remote
         */
		pushTags(remote: string): Promise<void>

		/**
         * Rebases the repo, options should be supplied as an 
         * array of string parameters supported by the git 
         * rebase command, or an object of options (see 
         * details below for option formats). 
         */
		rebase(options?: object): Promise<void>

		/**
         * removes the named remote 
         */
		removeRemote(name: string): Promise<void>

		/**
         * removes any number of files from source control
         */
		rm(...files: Array<string>): Promise<void>

		/**
         * removes files from source control but leaves them on disk 
         */
		rmKeepLocal(...files: Array<string>): Promise<void>

		/**
         * sets whether the console should be used for logging
         *  errors (defaults to true when the NODE_ENV contains the string prod)
         */
		silent(isSilent: boolean): void

		/**
         * Retrieves the stash list, optional first argument 
         * can be an object specifying options.splitter to 
         * override the default value of :, alternatively options 
         * can be a set of arguments as supported by the git 
         * stash list command.
         */
		stashList(options?: object): Promise<void>

		/**
         * Stash the working directory, optional first argument 
         * can be an array of string arguments or options 
         * object to pass to the git stash command.
         */
		stash(options?: object): Promise<void>

		/**
         * Run a git submodule command with on or more arguments passed in as an args array
         */
		subModule(args: Array<string>): Promise<void>

		/**
         * adds a new sub module
         */
		submoduleAdd(repo: string, path: string): Promise<void>

		/**
         * inits sub modules, args should be an array of 
         * string arguments to pass to the git submodule 
         * init command
         */
		submoduleInit(args?: Array<string>): Promise<void>

		/**
         * updates sub modules, args should be an array 
         * of string arguments to pass to the git submodule 
         * update command
         */
		submoduleUpdate(args?: Array<string>): Promise<void>

		/**
         * Runs any supported git tag commands with arguments passed 
         * as an array of strings .
         */
		tag(args: Array<string>): Promise<void>

		/**
         * list all tags, use the optional options object to set any 
         * options allows by the git tag command. Tags will be sorted 
         * by semantic version number by default, for git versions 
         * 2.7 and above, use the --sort option to set a custom sort.
         */
		tags(options?: object): Promise<TagResult>

		/**
         * gets a list of the named remotes, when the verbose option 
         * is supplied as true, includes the URLs and purpose of 
         * each ref
         */
		getRemotes(verbose?: boolean): Promise<void>

		/**
         * resets the repository, the optional first argument 
         * can either be an array of options supported by the 
         * git reset command or one of the string constants 
         * hard or soft, if omitted the reset will be a soft 
         * reset to head, handlerFn: (err) 
         */
		reset(resetMode: Array<string>): Promise<void>

		/**
         * resets the repository, the optional first argument 
         * can either be an array of options supported by the 
         * git reset command or one of the string constants 
         * hard or soft, if omitted the reset will be a soft 
         * reset to head, handlerFn: (err) 
         */
		reset(resetMode: string): Promise<void>

		/**
         * wraps git rev-parse. Primarily used to convert friendly 
         * commit references (ie branch names) to SHA1 hashes. 
         * Options should be an array of string options compatible 
         * with the git rev-parse
         */
		revparse(options?: object): Promise<void>

		/**
         * gets the status of the current repo
         */
		status(): Promise<StatusResult>

		/**
         * Show various types of objects, for example the 
         * file content at a certain commit. options is 
         * the single value string or array of string 
         * commands you want to run
         */
		show(): Promise<void>

		/**
         * Show various types of objects, for example the 
         * file content at a certain commit. options is 
         * the single value string or array of string 
         * commands you want to run
         */
		show(options: string | Array<String>): Promise<void>

		/**
         * checks if filepath excluded by .gitignore rules
         */
		checkIgnore(...filepath): Promise<void>

		/**
         * lists remote repositories - there are so many optional 
         * arguments in the underlying git ls-remote call, just 
         * supply any you want to use as the optional args array 
         * of strings eg: git.listRemote(['--heads', '--tags'], 
         * console.log.bind(console))
         */
		listRemote(args?: Array<string>): Promise<void>

		/**
         * attaches a handler that will be called with the name 
         * of the command being run and the stdout and stderr 
         * readable streams created by the child process running 
         * that command
         */
		outputHandler(): Promise<void>

		/**
         * clean the working tree. Mode should be "n" - dry 
         * run or "f" - force
         */
		clean(mode: string, options?: object): Promise<void>

		/**
         * Execute any arbitrary array of commands supported
         * by the underlying git binary. When the git process 
         * returns a non-zero signal on exit and it printed 
         * something to stderr, the commmand will be treated 
         * as an error, otherwise treated as a success.
         */
		raw(args: Array<string>): Promise<void>

		/**
         * reverts one or more commits in the working copy. 
         * The commit can be any regular commit-ish value 
         * (hash, name or offset such as HEAD~2) or a range 
         * of commits (eg: master~5..master~2). When supplied 
         * the options argument contain any options accepted 
         * by git-revert.
         */
		revert(commit: string, options?: object): Promise<void>

		/**
         * calls a simple function in the current step
         */
		exec(): Promise<void>
	}
}
