---
title: "expiring-todo-comments (part 2 of 2)"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/expiring-todo-comments.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# expiring-todo-comments (part 2 of 2)

## Options

### checkDates

Type: `boolean`\
Default: `false`

Whether to check expiration dates.

This option does not disable date argument validation. For example, TODO comments with multiple dates are still reported as invalid.

```js
'unicorn/expiring-todo-comments': [
	'error',
	{
		checkDates: false,
	},
]
```

### checkDatesOnPullRequests

Type: `boolean`\
Default: `false`

Whether to check expiration dates on pull requests.

Sometimes developers may send Pull Requests at a time when TODO expiry dates are triggered. This means that their code would fail to pass <example-value>, causing a false-positive.

When date checks are enabled, this rule will not trigger expiry dates while on Pull Requests by default so that the one responsible for the fix will be the maintainer not the contributor.

```js
'unicorn/expiring-todo-comments': [
	'error',
	{
		checkDates: true,
		checkDatesOnPullRequests: true,
	},
]
```

### terms

Type: `string[]`\
Default: `['todo', 'fixme', 'xxx']`

Add or remove TODO verbs.

The defaults come from the `eslint/no-warning-comments` rule.

If you just want to add a verb, make sure to explicitly include the default ones like `['todo', 'fixme', 'xxx', 'mytodo']` or otherwise any default TODO verb will be ignored. Similarly, when you want to remove a verb, leave the others in like `['todo', 'fixme']`.

```js
'unicorn/expiring-todo-comments': [
	'error',
	{
		terms: [
			'todo',
			'fixme',
			'xxx',
		],
	},
]
```

### allowWarningComments

Type: `boolean`\
Default: `true`

Ignore TODOs without conditions.

As mentioned before, the `eslint/no-warning-comments` rule will be triggered when there are no valid conditions on a TODO comment.

This is helpful if you want to use **both** this rule and the `eslint/no-warning-comments` rule, **but want different warning levels**, as it's not possible to set multiple warning levels on the same rule.

If you want this rule to trigger on stray TODO conditions, you can enable this fallback rule with this option.

```js
'unicorn/expiring-todo-comments': [
	'error',
	{
		allowWarningComments: false,
	},
]
```

### ignore

Type: `Array<string | RegExp>`\
Default: `[]`

Ignore TODOs matching any of the given regex patterns. This option is only useful if you have `allowWarningComments` set to `false`.

When a string is given, it will be interpreted as a regular expression inside of a string.

Don't forget that you must escape special characters in string regexes. If you want to ignore numbers with `\d` for example, to match `#\d`, you must use `/#\d/` or `'#\\d'`.

As an example of this option, if you want this rule to **completely ignore** comments containing references to GitHub issues, you can do so by ignoring `"#\\d+"`:

```js
'unicorn/expiring-todo-comments': [
	'error',
	{
		allowWarningComments: false,
		ignore: [
			'#\\d+',
			/issue-\d+/i,
		],
	},
]
```

### date

Type: `string` (`date` format)\
Default: `<today>`

For TODOs with date deadlines, this option makes them trigger only if the deadline is later than the specified date. You could set this to a date in the future to find TODOs that expire soon, or set it far in the past if you want to ignore recently-expired TODOs.

The format must match json-schema's date.

### examples

Find tech debt that has grown up and gone to college by triggering the rule only for incredibly old TODOs:

```js
'unicorn/expiring-todo-comments': [
	'error',
	{
		checkDates: true,
		date: '2000-01-01',
	},
]
```

Prepare for the future by triggering the rule on known Y3K bugs:

```js
'unicorn/expiring-todo-comments': [
	'error',
	{
		checkDates: true,
		date: '3000-01-01',
	},
]
```
