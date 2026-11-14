---
title: "Reporters | Guide (part 3 of 3)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/reporters.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Reporters | Guide (part 3 of 3)

### TAP Flat Reporter

Outputs a TAP flat report. Like the `tap` reporter, test results are formatted to follow TAP standards, but test suites are formatted as a flat list rather than a nested hierarchy.

:::code-group

```bash
npx vitest --reporter=tap-flat
```

```ts
export default defineConfig({
  test: {
    reporters: ['tap-flat']
  },
})
```

Example of a TAP flat report:

```bash
TAP version 13
1..2
not ok 1 - __tests__/test-file-1.test.ts > first test file > 2 + 2 should equal 4 # time=11.00ms
    ---
    error:
        name: "AssertionError"
        message: "expected 5 to be 4 // Object.is equality"
    at: "/root-directory/__tests__/test-file-1.test.ts:20:28"
    actual: "5"
    expected: "4"
    ...
ok 2 - __tests__/test-file-1.test.ts > first test file > 4 - 2 should equal 2 # time=0.00ms
```

### Hanging Process Reporter

Displays a list of hanging processes, if any are preventing Vitest from exiting safely. The `hanging-process` reporter does not itself display test results, but can be used in conjunction with another reporter to monitor processes while tests run. Using this reporter can be resource-intensive, so should generally be reserved for debugging purposes in situations where Vitest consistently cannot exit the process.

:::code-group

```bash
npx vitest --reporter=hanging-process
```

```ts
export default defineConfig({
  test: {
    reporters: ['hanging-process']
  },
})
```

### GitHub Actions Reporter {#github-actions-reporter}

Output workflow commands
to provide annotations for test failures. This reporter is enabled automatically when `process.env.GITHUB_ACTIONS === 'true'` (on GitHub Actions environment).

You can customize the file paths that are printed in GitHub's annotation command format by using the `onWritePath` option. This is useful when running Vitest in a containerized environment, such as Docker, where the file paths may not match the paths in the GitHub Actions environment.

```ts
export default defineConfig({
  test: {
    reporters: process.env.GITHUB_ACTIONS === 'true'
      ? [
          'default',
          ['github-actions', { onWritePath(path) {
            return path.replace(/^\/app\//, `${process.env.GITHUB_WORKSPACE}/`)
          } }],
        ]
      : ['default'],
  },
})
```

If you are using Annotations API, the reporter will automatically inline them in the GitHub UI. You can disable this by setting `displayAnnotations` option to `false`:

```ts
export default defineConfig({
  test: {
    reporters: [
      ['github-actions', { displayAnnotations: false }],
    ],
  },
})
```

The GitHub Actions reporter automatically generates a Job Summary with an overview of your test results. The summary includes test file and test case statistics, and highlights flaky tests that required retries.

The job summary is enabled by default and writes to the path specified by `$GITHUB_STEP_SUMMARY`. You can override it by using the `jobSummary.outputPath` option:

```ts
export default defineConfig({
  test: {
    reporters: [
      ['github-actions', {
        jobSummary: {
          outputPath: '/home/runner/jobs/summary/step',
        },
      }],
    ],
  },
})
```

To disable the job summary:

```ts
export default defineConfig({
  test: {
    reporters: [
      ['github-actions', { jobSummary: { enabled: false } }],
    ],
  },
})
```

The job summary title defaults to `Vitest Test Report` or `(${test.name}) Vitest Test Report` when `test.name` is set.

You can customize the title by setting `jobSummary.title` to distinguish multiple Vitest invocations that append to the same job summary. Please note that `test.name` will not be displayed when using a custom title.

```ts
export default defineConfig({
  test: {
    reporters: [
      ['github-actions', {
        jobSummary: {
          title: 'My Test Report',
        },
      }],
    ],
  },
})
```

The flaky tests section of the summary includes permalink URLs that link test names directly to the relevant source lines on GitHub. These links are generated automatically using environment variables that GitHub Actions provides (`$GITHUB_REPOSITORY`, `$GITHUB_SHA`, and `$GITHUB_WORKSPACE`), so no configuration is needed in most cases.

If you need to override these values — for example, when running in a container or a custom environment — you can customize them via the `fileLinks` option:

- `repository`: the GitHub repository in `owner/repo` format. Defaults to `process.env.GITHUB_REPOSITORY`.
- `commitHash`: the commit SHA to use in permalink URLs. Defaults to `process.env.GITHUB_SHA`.
- `workspacePath`: the absolute path to the root of the repository on disk. Used to compute relative file paths for the permalink URLs. Defaults to `process.env.GITHUB_WORKSPACE`.

All three values must be available for the links to be generated.

```ts
export default defineConfig({
  test: {
    reporters: [
      ['github-actions', {
        jobSummary: {
          fileLinks: {
            repository: 'owner/repo',
            commitHash: 'abcdefg',
            workspacePath: '/home/runner/work/repo/',
          },
        },
      }],
    ],
  },
})
```

### Minimal Reporter

- **Alias:** `agent`

Outputs a minimal report containing only failed tests and their error messages. Console logs from passing tests and the summary section are also suppressed.

**Agent Reporter**
This reporter is well optimized for AI coding assistants and LLM-based workflows to reduce token usage. It is enabled automatically when Vitest detects it is running inside an AI coding agent.

:::code-group

```bash
npx vitest --reporter=minimal
```

```ts
export default defineConfig({
  test: {
    reporters: ['minimal']
  },
})
```

### Blob Reporter

Stores test results on the machine so they can be later merged using `--merge-reports` command.
By default, stores all results in `.vitest/blob/` folder, but can be overridden with `--outputFile` or `--outputFile.blob` flags.

```bash
npx vitest --reporter=blob --outputFile=reports/blob-1.json
```

We recommend using this reporter if you are running Vitest on different machines with the `--shard` flag or across multiple environments (e.g., linux/macos/windows). All blob reports can be merged into any report by using `--merge-reports` command at the end of your CI pipeline:

```bash
npx vitest --merge-reports=reports --reporter=json --reporter=default
```

When running the same tests across multiple environments, use the `VITEST_BLOB_LABEL` environment variable to distinguish each environment's blob. Vitest reads labels at merge time and displays results separately:

```bash
VITEST_BLOB_LABEL=linux vitest run --reporter=blob
```

You can also provide the label via the blob reporter option. This has higher priority than `VITEST_BLOB_LABEL`.

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    reporters: [
      ['blob', { label: 'linux' }],
    ],
  },
})
```

Blob reporter output doesn't include file-based attachments.
Make sure to merge `attachmentsDir` separately alongside blob reports on CI when using this feature.

**Tip:**
Both `--reporter=blob` and `--merge-reports` do not work in watch mode.

## Custom Reporters

You can use third-party custom reporters installed from NPM by specifying their package name in the reporters' option:

:::code-group

```bash
npx vitest --reporter=some-published-vitest-reporter
```

```ts
export default defineConfig({
  test: {
    reporters: ['some-published-vitest-reporter']
  },
})
```

Additionally, you can define your own custom reporters and use them by specifying their file path:

```bash
npx vitest --reporter=./path/to/reporter.ts
```

Custom reporters should implement the Reporter interface.
