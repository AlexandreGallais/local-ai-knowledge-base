---
title: "Benchmark runner (part 3 of 3)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/bench.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Benchmark runner (part 3 of 3)

## Class: `BenchmarksStream`

`BenchmarksStream` is an object-mode {stream.Readable}. Each lifecycle record is
both emitted as a named event and made available on the stream as
`{ type, data }`.

The events are emitted in execution order:

* `'bench:plan'`
* `'bench:start'`
* `'bench:sample'`
* `'bench:complete'`
* `'bench:diagnostic'`
* `'bench:summary'`

Named event payloads, readable records, and benchmark completion values are
independent snapshots. Mutating a value received through one delivery mechanism
does not change values received through the others. As with other
{EventEmitter} events, multiple listeners for the same named event receive the
same event payload. Memory referenced through a {SharedArrayBuffer} remains
shared, following structured clone semantics.

Once a consumer starts reading, the runner honors the stream's object-mode
high-water mark and waits between records when the consumer is slower than the
producer. These waits occur after sample timing has ended, and records are not
dropped. Snapshot creation and delivery waits are excluded from benchmark
timeout accounting. Before readable consumption starts, records accumulate in
the standard readable buffer and are included in `readableLength`. This keeps an
unread stream and a consumer using only named events from deadlocking, but the
buffer can grow without bound. A named-event-only consumer that does not need
readable records should call `stream.resume()` to discard them. Destroying the
stream stops readable delivery but does not cancel benchmark execution, so
benchmark completion promises still settle. Automatically scheduled
module-level runs drain their stream internally.

With process isolation, each record sent by a child is acknowledged only after
the parent has accepted it. A child sends no additional record until it receives
that acknowledgement, bounding the IPC relay when a reporter is slow.

Every benchmark-scoped event contains `runId`, `fileRunId`, `entryFile`,
`benchId`, `parentId`, and `namePath`. `runId` and `fileRunId` are opaque and
change between runs. `entryFile` identifies the top-level benchmark file whose
loading caused the declaration, while `file` identifies the source location of
the declaration itself. `parentId` is based on the containing suite's source
file and hierarchical name path.

After asynchronous suite declarations settle, an in-process runner emits one
`'bench:plan'` event for every benchmark it collected, in declaration order.
All plans from that runner are emitted before its suite hooks or benchmark
callbacks run. With process isolation, files run in separate children, so plans
for a later file are emitted after an earlier child has completed. With no
isolation, all files share one runner and their plans are emitted before any
benchmark executes. Plan data contains the benchmark-scoped identity, location,
tags, and parameters described in benchmark result, together with:

* `diagnosticChannels` {string\[]} The inherited string channel names
  subscribed to during each callback.
* `samples` {number} The effective maximum number of measured callback
  invocations after run-level overrides.
* `warmup` {number} The effective number of unreported warmup callback
  invocations after run-level overrides.
* `timeout` {number|null} The timeout in milliseconds, or `null` when no timeout
  is configured.
* `yieldBetweenSamples` {boolean} Whether an event loop turn is scheduled between
  sample callbacks.
* `selected` {boolean} Whether the benchmark is eligible to run after applying
  `skip`, `only`, and `namePattern` selection. Execution can still be prevented
  by a duplicate declaration, suite build, hook, abort, or other runtime failure.
* `skip` {boolean|string} When `selected` is `false`, the explicit skip value or
  the selection reason, such as `'only'` or `'name pattern'`.

The plan contains execution settings known to the runner. Runtime version,
operating system, processor, and other environment metadata are intentionally
left for reporters and higher-level tools to collect.

`'bench:complete'` data contains a benchmark result. A failed result has an
additional `error` property and may contain samples recorded before the error.
A skipped result has an additional `skip` property and an empty `samples`
array. `'bench:diagnostic'` reports loading, suite, and hook errors as well as
public context diagnostics. A context diagnostic contains the benchmark-scoped
identity fields, `phase`, `index`, `message`, `level`, source location, and
optional `detail`. `'bench:summary'` contains overall `runId`, `fileRunId`,
`entryFile`, `success`, `counts`, `duration_ns`, and `file` properties.
`fileRunId`, `entryFile`, and `file` are {string|null}; they are `null` when the
summary aggregates multiple files.

## Sample result

Each measured sample has the following properties:

* `operations` {number} The positive operation count passed to
  `context.end()` or `context.record()`.
* `duration_ns` {bigint} The measured duration in nanoseconds.
* `rate` {number} Operations per second.
* `detail` {any} The optional cloned sample detail.

## Benchmark result

A completed benchmark result contains:

* `runId` {string} The opaque logical run identity.
* `fileRunId` {string} The opaque file runner or child execution identity.
* `entryFile` {string|null} The top-level file that caused this declaration.
* `benchId` {string} The stable declaration identity within the same source
  layout.
* `parentId` {string|null} The stable containing suite identity.
* `name` {string} The benchmark name.
* `namePath` {string\[]} The hierarchical suite and benchmark names.
* `file` {string} The declaration source file.
* `line` {number} The source line.
* `column` {number} The source column.
* `tags` {string\[]} The inherited canonical tags.
* `params` {Object} The canonical parameter metadata.
* `samples` {Object\[]} The exact measured samples in measurement invocation
  order.
* `summary` {Object}
  * `mean` {number} The equally weighted arithmetic mean of per-sample rates,
    not pooled throughput across all operations and durations.
  * `median` {number} The median per-sample rate.
  * `min` {number} The minimum per-sample rate.
  * `max` {number} The maximum per-sample rate.
  * `stddev` {number} The population standard deviation of rates.
  * `coefficientOfVariation` {number} `stddev / mean`.
  * `confidenceInterval` {Object} The 95% Student's t confidence interval for
    the mean rate, with `lower` and `upper` properties.
  * `medianConfidenceInterval` {Object} The 95% nonparametric confidence
    interval for the median rate, with `lower` and `upper` properties.
  * `skewness` {number} The skewness of the scaled rate histogram.
