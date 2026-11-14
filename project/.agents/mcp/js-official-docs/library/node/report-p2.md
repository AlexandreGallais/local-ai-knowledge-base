---
title: "Diagnostic report (part 2 of 2)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/report.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Diagnostic report (part 2 of 2)

## Usage

```bash
node --report-uncaught-exception --report-on-signal \
--report-on-fatalerror app.js
```

* `--report-uncaught-exception` Enables report to be generated on
  un-caught exceptions. Useful when inspecting JavaScript stack in conjunction
  with native stack and other runtime environment data.

* `--report-on-signal` Enables report to be generated upon receiving
  the specified (or predefined) signal to the running Node.js process. (See
  below on how to modify the signal that triggers the report.) Default signal is
  `SIGUSR2`. Useful when a report needs to be triggered from another program.
  Application monitors may leverage this feature to collect report at regular
  intervals and plot rich set of internal runtime data to their views.

Signal based report generation is not supported in Windows.

Under normal circumstances, there is no need to modify the report triggering
signal. However, if `SIGUSR2` is already used for other purposes, then this
flag helps to change the signal for report generation and preserve the original
meaning of `SIGUSR2` for the said purposes.

* `--report-on-fatalerror` Enables the report to be triggered on fatal errors
  (internal errors within the Node.js runtime, such as out of memory)
  that leads to termination of the application. Useful to inspect various
  diagnostic data elements such as heap, stack, event loop state, resource
  consumption etc. to reason about the fatal error.

* `--report-on-process-timeout` Enables the report to be triggered when the
  duration set with `--process-timeout` elapses before the process exits.
  Useful to reason about why the process did not exit.

* `--report-compact` Write reports in a compact format, single-line JSON, more
  easily consumable by log processing systems than the default multi-line format
  designed for human consumption.

* `--report-directory` Location at which the report will be
  generated.

* `--report-filename` Name of the file to which the report will be
  written.

* `--report-signal` Sets or resets the signal for report generation
  (not supported on Windows). Default signal is `SIGUSR2`.

* `--report-exclude-network` Exclude `header.networkInterfaces` and disable the reverse DNS queries
  in `libuv.*.(remote|local)Endpoint.host` from the diagnostic report.
  By default this is not set and the network interfaces are included.

* `--report-exclude-env` Exclude `environmentVariables` from the
  diagnostic report. By default this is not set and the environment
  variables are included.

A report can also be triggered via an API call from a JavaScript application:

```js
process.report.writeReport();
```

This function takes an optional additional argument `filename`, which is
the name of a file into which the report is written.

```js
process.report.writeReport('./foo.json');
```

This function takes an optional additional argument `err` which is an `Error`
object that will be used as the context for the JavaScript stack printed in the
report. When using report to handle errors in a callback or an exception
handler, this allows the report to include the location of the original error as
well as where it was handled.

```js
try {
  process.chdir('/non-existent-path');
} catch (err) {
  process.report.writeReport(err);
}
// Any other code
```

If both filename and error object are passed to `writeReport()` the
error object must be the second parameter.

```js
try {
  process.chdir('/non-existent-path');
} catch (err) {
  process.report.writeReport(filename, err);
}
// Any other code
```

The content of the diagnostic report can be returned as a JavaScript Object
via an API call from a JavaScript application:

```js
const report = process.report.getReport();
console.log(typeof report === 'object'); // true

// Similar to process.report.writeReport() output
console.log(JSON.stringify(report, null, 2));
```

This function takes an optional additional argument `err`, which is an `Error`
object that will be used as the context for the JavaScript stack printed in the
report.

```js
const report = process.report.getReport(new Error('custom error'));
console.log(typeof report === 'object'); // true
```

The API versions are useful when inspecting the runtime state from within
the application, in expectation of self-adjusting the resource consumption,
load balancing, monitoring etc.

The content of the report consists of a header section containing the event
type, date, time, PID, and Node.js version, sections containing JavaScript and
native stack traces, a section containing V8 heap information, a section
containing `libuv` handle information, and an OS platform information section
showing CPU and memory usage and system limits. An example report can be
triggered using the Node.js REPL:

```console
$ node
> process.report.writeReport();
Writing Node.js report to file: report.20181126.091102.8480.0.001.json
Node.js report completed
>
```

When a report is written, start and end messages are issued to stderr
and the filename of the report is returned to the caller. The default filename
includes the date, time, PID, and a sequence number. The sequence number helps
in associating the report dump with the runtime state if generated multiple
times for the same Node.js process.

## Report Version

Diagnostic report has an associated single-digit version number (`report.header.reportVersion`),
uniquely representing the report format. The version number is bumped
when new key is added or removed, or the data type of a value is changed.
Report version definitions are consistent across LTS releases.

### Version history

#### Version 5

Replace the keys `data_seg_size_kbytes`, `max_memory_size_kbytes`, and `virtual_memory_kbytes`
with `data_seg_size_bytes`, `max_memory_size_bytes`, and `virtual_memory_bytes`
respectively in the `userLimits` section, as these values are given in bytes.

```json
{
  "userLimits": {
    // Skip some keys ...
    "data_seg_size_bytes": { // replacing data_seg_size_kbytes
      "soft": "unlimited",
      "hard": "unlimited"
    },
    // ...
    "max_memory_size_bytes": { // replacing max_memory_size_kbytes
      "soft": "unlimited",
      "hard": "unlimited"
    },
    // ...
    "virtual_memory_bytes": { // replacing virtual_memory_kbytes
      "soft": "unlimited",
      "hard": "unlimited"
    }
  }
}
```

#### Version 4

New fields `ipv4` and `ipv6` are added to `tcp` and `udp` libuv handles endpoints. Examples:

```json
{
  "libuv": [
    {
      "type": "tcp",
      "is_active": true,
      "is_referenced": true,
      "address": "0x000055e70fcb85d8",
      "localEndpoint": {
        "host": "localhost",
        "ip4": "127.0.0.1", // new key
        "port": 48986
      },
      "remoteEndpoint": {
        "host": "localhost",
        "ip4": "127.0.0.1", // new key
        "port": 38573
      },
      "sendBufferSize": 2626560,
      "recvBufferSize": 131072,
      "fd": 24,
      "writeQueueSize": 0,
      "readable": true,
      "writable": true
    },
    {
      "type": "tcp",
      "is_active": true,
      "is_referenced": true,
      "address": "0x000055e70fcd68c8",
      "localEndpoint": {
        "host": "ip6-localhost",
        "ip6": "::1", // new key
        "port": 52266
      },
      "remoteEndpoint": {
        "host": "ip6-localhost",
        "ip6": "::1", // new key
        "port": 38573
      },
      "sendBufferSize": 2626560,
      "recvBufferSize": 131072,
      "fd": 25,
      "writeQueueSize": 0,
      "readable": false,
      "writable": false
    }
  ]
}
```

#### Version 3

The following memory usage keys are added to the `resourceUsage` section.

```json
{
  "resourceUsage": {
    "rss": "35766272",
    "free_memory": "1598337024",
    "total_memory": "17179869184",
    "available_memory": "1598337024",
    "constrained_memory": "36624662528"
  }
}
```

#### Version 2

Added `Worker` support. Refer to Interaction with workers section for more details.

#### Version 1

This is the first version of the diagnostic report.

## Configuration

Additional runtime configuration of report generation is available via
the following properties of `process.report`:

`reportOnFatalError` triggers diagnostic reporting on fatal errors when `true`.
Defaults to `false`.

`reportOnSignal` triggers diagnostic reporting on signal when `true`. This is
not supported on Windows. Defaults to `false`.

`reportOnUncaughtException` triggers diagnostic reporting on uncaught exception
when `true`. Defaults to `false`.

`signal` specifies the POSIX signal identifier that will be used
to intercept external triggers for report generation. Defaults to
`'SIGUSR2'`.

`filename` specifies the name of the output file in the file system.
Special meaning is attached to `stdout` and `stderr`. Usage of these
will result in report being written to the associated standard streams.
In cases where standard streams are used, the value in `directory` is ignored.
URLs are not supported. Defaults to a composite filename that contains
timestamp, PID, and sequence number.

`directory` specifies the file system directory where the report will be
written. URLs are not supported. Defaults to the current working directory of
the Node.js process.

`excludeNetwork` excludes `header.networkInterfaces` from the diagnostic report.

```js
// Trigger report only on uncaught exceptions.
process.report.reportOnFatalError = false;
process.report.reportOnSignal = false;
process.report.reportOnUncaughtException = true;

// Trigger report for both internal errors as well as external signal.
process.report.reportOnFatalError = true;
process.report.reportOnSignal = true;
process.report.reportOnUncaughtException = false;

// Change the default signal to 'SIGQUIT' and enable it.
process.report.reportOnFatalError = false;
process.report.reportOnUncaughtException = false;
process.report.reportOnSignal = true;
process.report.signal = 'SIGQUIT';

// Disable network interfaces reporting
process.report.excludeNetwork = true;
```

Configuration on module initialization is also available via
environment variables:

```bash
NODE_OPTIONS="--report-uncaught-exception \
  --report-on-fatalerror --report-on-signal \
  --report-signal=SIGUSR2  --report-filename=./report.json \
  --report-directory=/home/nodeuser"
```

Specific API documentation can be found under
`process API documentation` section.

## Interaction with workers

`Worker` threads can create reports in the same way that the main thread
does.

Reports will include information on any Workers that are children of the current
thread as part of the `workers` section, with each Worker generating a report
in the standard report format.

The thread which is generating the report will wait for the reports from Worker
threads to finish. However, the latency for this will usually be low, as both
running JavaScript and the event loop are interrupted to generate the report.
