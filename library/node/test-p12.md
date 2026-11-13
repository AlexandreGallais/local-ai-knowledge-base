---
title: "Test runner (part 12 of 14)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/test.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Test runner (part 12 of 14)

## Test instrumentation and OpenTelemetry

The test runner publishes test execution events through the Node.js
`diagnostics_channel` module, enabling integration with observability tools
like OpenTelemetry without requiring changes to the test runner itself.

### Tracing events

The test runner publishes events to the `'node.test'` tracing channel. Subscribers
can use the `TracingChannel` API to bind context or perform custom
instrumentation.

#### Channel: `'tracing:node.test:start'`

* `data` {Object}
  * `name` {string} The name of the test.
  * `nesting` {number} The nesting level of the test.
  * `file` {string|undefined} The path to the test file, or `undefined` when
    running in the REPL.
  * `type` {string} The type of test. Either `'test'` or `'suite'`.

Emitted when a test or suite starts execution. The test's span encompasses all
of its before, beforeEach, and afterEach hooks, as well as the test body.

#### Channel: `'tracing:node.test:end'`

* `data` {Object}
  * `name` {string} The name of the test.
  * `nesting` {number} The nesting level of the test.
  * `file` {string|undefined} The path to the test file, or `undefined` when
    running in the REPL.
  * `type` {string} The type of test. Either `'test'` or `'suite'`.

Emitted when a test or suite finishes execution.

#### Channel: `'tracing:node.test:error'`

* `data` {Object}
  * `name` {string} The name of the test.
  * `nesting` {number} The nesting level of the test.
  * `file` {string|undefined} The path to the test file, or `undefined` when
    running in the REPL.
  * `type` {string} The type of test. Either `'test'` or `'suite'`.
  * `error` {Error} The error that was thrown.

Emitted when a test or suite throws an error.

### Context propagation with `bindStore()`

The tracing channel can be used to propagate context through test execution by
binding an `AsyncLocalStorage` instance. This allows context to be automatically
available in the test function and all async operations within the test.

```mjs
import dc from 'node:diagnostics_channel';
import { AsyncLocalStorage } from 'node:async_hooks';

const testStorage = new AsyncLocalStorage();
const testChannel = dc.tracingChannel('node.test');

// Bind context to test execution — the returned value becomes the store
testChannel.start.bindStore(testStorage, (data) => {
  return { testName: data.name, startTime: Date.now() };
});

// Optionally handle errors and cleanup
testChannel.error.subscribe((data) => {
  const store = testStorage.getStore();
  console.log(`Test "${data.name}" failed after ${Date.now() - store.startTime}ms`);
});

testChannel.end.subscribe((data) => {
  const store = testStorage.getStore();
  console.log(`Test "${data.name}" completed in ${Date.now() - store.startTime}ms`);
});
```

When using `bindStore()`, the context provided will be automatically propagated
to the test function and all async operations within the test, without requiring
any additional instrumentation in the test code.
