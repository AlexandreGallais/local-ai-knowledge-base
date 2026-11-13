---
title: "changed | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/changed.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# changed | Config

### changed <CRoot />

- **Type:** `boolean | string`
- **Default:** `false`
- **CLI:** `--changed`, `--changed=HEAD~1`

Run tests only against changed files. If no value is provided, it will run tests against uncommitted changes (including staged and unstaged).

To run tests against changes made in the last commit, you can use `--changed HEAD~1`. You can also pass <example-value> hash (e.g. `--changed 09a9920`) or branch name (e.g. `--changed origin/develop`).

When used with code coverage the report will contain only the files that were related to the changes.

Changes to files that every test file in a project depends on rerun all tests of that project: `setupFiles`, `globalSetup`, a custom `runner` or `environment`, `snapshotSerializers`, the `.env` files loaded from `envDir`, and the project's config file with everything it imports. Vitest also follows the environment set in a `@vitest-environment` comment, the `__mocks__` files used by `vi.mock` calls without a factory, and the snapshot file of each test. Files passed to `toMatchFileSnapshot` are not tracked.

If paired with the `forceRerunTriggers` config option it will run the whole test suite if at least one of the files listed in the `forceRerunTriggers` list changes. By default, changes to the Vitest config file and `package.json` will always rerun the whole suite.
