---
title: "Diagnostics Channel (part 6 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/diagnostics_channel.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Diagnostics Channel (part 6 of 6)

### Built-in Channels

#### Console

> Stability: 1 - Experimental

##### Event: `'console.log'`

* `args` {any\[]}

Emitted when `console.log()` is called. Receives and array of the arguments
passed to `console.log()`.

##### Event: `'console.info'`

* `args` {any\[]}

Emitted when `console.info()` is called. Receives and array of the arguments
passed to `console.info()`.

##### Event: `'console.debug'`

* `args` {any\[]}

Emitted when `console.debug()` is called. Receives and array of the arguments
passed to `console.debug()`.

##### Event: `'console.warn'`

* `args` {any\[]}

Emitted when `console.warn()` is called. Receives and array of the arguments
passed to `console.warn()`.

##### Event: `'console.error'`

* `args` {any\[]}

Emitted when `console.error()` is called. Receives and array of the arguments
passed to `console.error()`.

#### Crypto

> Stability: 1 - Experimental

##### Event: `'crypto.fips.indicator'`

* `operation` {string} The provider-defined operation type.
* `reason` {string} The provider-defined description of why the operation is
  not approved.
* `blocked` {boolean} Whether an indicator callback blocked the operation.
* `count` {number} The number of matching pending indicator invocations
  represented by this message.
* `dropped` {number} The number of additional indicator invocations dropped
  before this message was delivered.

Emitted when the OpenSSL FIPS provider used by Node.js detects an operation that
is not FIPS approved after the corresponding provider check was relaxed. Such
operations are possible when the provider is configured for backwards
compatibility. The `operation` and `reason` values come from the provider and
should be treated as opaque strings rather than stable enumerations.

Start Node.js with `--enable-fips-indicator-events` to enable this channel.
Without the option, subscribing does not install the OpenSSL callback and no
messages are published.

Subscribing to the channel is observation-only and never changes the result of
an operation. Node.js preserves the result from any native indicator callback
installed before Node.js initializes its crypto support. When
`--force-fips=strict` is used, Node.js rejects callback-indicated
non-approved operations whether or not indicator events are enabled or the
channel has subscribers.

Messages are published asynchronously on the main thread because OpenSSL
indicators can originate from Workers or other threads. Only subscriptions on
the main thread receive messages. Delivery order relative to the originating
operation is not defined, and a message cannot be correlated with a particular
call or Worker.

One cryptographic operation can invoke the OpenSSL indicator more than once.
Matching pending invocations are coalesced and reflected in `count`, which does
not necessarily represent a number of cryptographic operations. At most 256
distinct messages are queued. Additional invocations are reported in `dropped`
on the first queued message. Queued messages do not keep the event loop active,
so this channel is best-effort diagnostics rather than an authoritative audit
log.

This channel observes the default OpenSSL library context used by Node.js. It
does not observe native addons or other code that uses another `OSSL_LIB_CTX`
or another copy of `libcrypto`. It is active with OpenSSL 3.4 and later and is
not available with BoringSSL. A provider configured to reject a check directly,
including a pedantic OpenSSL FIPS provider, can reject an operation without
emitting an indicator. Receiving or not receiving a message does not establish
that Node.js or a cryptographic operation is FIPS validated.

```mjs
import diagnosticsChannel from 'node:diagnostics_channel';

diagnosticsChannel.subscribe('crypto.fips.indicator', (message) => {
  console.error('Non-approved cryptographic operation', message);
});
```

#### HTTP

> Stability: 1 - Experimental

##### Event: `'http.client.request.created'`

* `request` {http.ClientRequest}

Emitted when client creates a request object.
Unlike `http.client.request.start`, this event is emitted before the request has been sent.

##### Event: `'http.client.request.start'`

* `request` {http.ClientRequest}

Emitted when client starts a request.

##### Event: `'http.client.request.error'`

* `request` {http.ClientRequest}
* `error` {Error}

Emitted when an error occurs during a client request.

##### Event: `'http.client.response.finish'`

* `request` {http.ClientRequest}
* `response` {http.IncomingMessage}

Emitted when client receives a response.

##### Event: `'http.server.request.start'`

* `request` {http.IncomingMessage}
* `response` {http.ServerResponse}
* `socket` {net.Socket}
* `server` {http.Server}

Emitted when server receives a request.

##### Event: `'http.server.response.created'`

* `request` {http.IncomingMessage}
* `response` {http.ServerResponse}

Emitted when server creates a response.
The event is emitted before the response is sent.

##### Event: `'http.server.response.finish'`

* `request` {http.IncomingMessage}
* `response` {http.ServerResponse}
* `socket` {net.Socket}
* `server` {http.Server}

Emitted when server sends a response.

#### HTTP/2

> Stability: 1 - Experimental

##### Event: `'http2.client.stream.created'`

* `stream` {ClientHttp2Stream}
* `headers` {HTTP/2 Headers Object}

Emitted when a stream is created on the client.

##### Event: `'http2.client.stream.start'`

* `stream` {ClientHttp2Stream}
* `headers` {HTTP/2 Headers Object}

Emitted when a stream is started on the client.

##### Event: `'http2.client.stream.error'`

* `stream` {ClientHttp2Stream}
* `error` {Error}

Emitted when an error occurs during the processing of a stream on the client.

##### Event: `'http2.client.stream.finish'`

* `stream` {ClientHttp2Stream}
* `headers` {HTTP/2 Headers Object}
* `flags` {number}

Emitted when a stream is received on the client.

##### Event: `'http2.client.stream.bodyChunkSent'`

* `stream` {ClientHttp2Stream}
* `writev` {boolean}
* `data` {Buffer | string | Buffer\[] | Object\[]}
  * `chunk` {Buffer|string}
  * `encoding` {string}
* `encoding` {string}

Emitted when a chunk of the client stream body is being sent.

##### Event: `'http2.client.stream.bodySent'`

* `stream` {ClientHttp2Stream}

Emitted after the client stream body has been fully sent.

##### Event: `'http2.client.stream.close'`

* `stream` {ClientHttp2Stream}

Emitted when a stream is closed on the client. The HTTP/2 error code used when
closing the stream can be retrieved using the `stream.rstCode` property.

##### Event: `'http2.server.stream.created'`

* `stream` {ServerHttp2Stream}
* `headers` {HTTP/2 Headers Object}

Emitted when a stream is created on the server.

##### Event: `'http2.server.stream.start'`

* `stream` {ServerHttp2Stream}
* `headers` {HTTP/2 Headers Object}

Emitted when a stream is started on the server.

##### Event: `'http2.server.stream.error'`

* `stream` {ServerHttp2Stream}
* `error` {Error}

Emitted when an error occurs during the processing of a stream on the server.

##### Event: `'http2.server.stream.finish'`

* `stream` {ServerHttp2Stream}
* `headers` {HTTP/2 Headers Object}
* `flags` {number}

Emitted when a stream is sent on the server.

##### Event: `'http2.server.stream.close'`

* `stream` {ServerHttp2Stream}

Emitted when a stream is closed on the server. The HTTP/2 error code used when
closing the stream can be retrieved using the `stream.rstCode` property.

#### Modules

> Stability: 1 - Experimental

##### Event: `'tracing:module.require:start'`

* `event` {Object} containing the following properties
  * `id` Argument passed to `require()`. Module name.
  * `parentFilename` Name of the module that attempted to require(id).

Emitted when `require()` is executed. See `start` event.

##### Event: `'tracing:module.require:end'`

* `event` {Object} containing the following properties
  * `id` Argument passed to `require()`. Module name.
  * `parentFilename` Name of the module that attempted to require(id).

Emitted when a `require()` call returns. See `end` event.

##### Event: `'tracing:module.require:error'`

* `event` {Object} containing the following properties
  * `id` Argument passed to `require()`. Module name.
  * `parentFilename` Name of the module that attempted to require(id).
* `error` {Error}

Emitted when a `require()` throws an error. See `error` event.

##### Event: `'tracing:module.import:asyncStart'`

* `event` {Object} containing the following properties
  * `id` Argument passed to `import()`. Module name.
  * `parentURL` URL object of the module that attempted to import(id).

Emitted when `import()` is invoked. See `asyncStart` event.

##### Event: `'tracing:module.import:asyncEnd'`

* `event` {Object} containing the following properties
  * `id` Argument passed to `import()`. Module name.
  * `parentURL` URL object of the module that attempted to import(id).

Emitted when `import()` has completed. See `asyncEnd` event.

##### Event: `'tracing:module.import:error'`

* `event` {Object} containing the following properties
  * `id` Argument passed to `import()`. Module name.
  * `parentURL` URL object of the module that attempted to import(id).
* `error` {Error}

Emitted when a `import()` throws an error. See `error` event.

#### NET

> Stability: 1 - Experimental

##### Event: `'net.client.socket'`

* `socket` {net.Socket|tls.TLSSocket}

Emitted when a new TCP or pipe client socket connection is created.

##### Event: `'net.server.socket'`

* `socket` {net.Socket}

Emitted when a new TCP or pipe connection is received.

##### Event: `'tracing:net.server.listen:asyncStart'`

* `server` {net.Server}
* `options` {Object}

Emitted when `net.Server.listen()` is invoked, before the port or pipe is actually setup.

##### Event: `'tracing:net.server.listen:asyncEnd'`

* `server` {net.Server}

Emitted when `net.Server.listen()` has completed and thus the server is ready to accept connection.

##### Event: `'tracing:net.server.listen:error'`

* `server` {net.Server}
* `error` {Error}

Emitted when `net.Server.listen()` is returning an error.

#### UDP

> Stability: 1 - Experimental

##### Event: `'udp.socket'`

* `socket` {dgram.Socket}

Emitted when a new UDP socket is created.

#### Process

> Stability: 1 - Experimental

##### Event: `'child_process'`

* `process` {ChildProcess}

Emitted when a new process is created.

`tracing:child_process.spawn:start`

* `process` {ChildProcess}
* `options` {Object}

Emitted when `child_process.spawn()` is invoked, before the process is
actually spawned.

`tracing:child_process.spawn:end`

* `process` {ChildProcess}

Emitted when `child_process.spawn()` has completed successfully and the
process has been created.

`tracing:child_process.spawn:error`

* `process` {ChildProcess}
* `error` {Error}

Emitted when `child_process.spawn()` encounters an error.

##### Event: `'process.execve'`

* `execPath` {string}
* `args` {string\[]}
* `env` {string\[]}

Emitted when `process.execve()` is invoked.

#### Test Runner

See Test instrumentation and OpenTelemetry for details.

#### Web Locks

> Stability: 1 - Experimental

These channels are emitted for each `locks.request()` call. See
`worker_threads.locks` for details on Web Locks.

##### Event: `'locks.request.start'`

* `name` {string} The name of the requested lock resource.
* `mode` {string} The lock mode: `'exclusive'` or `'shared'`.

Emitted when a lock request is initiated, before the lock is granted.

##### Event: `'locks.request.grant'`

* `name` {string} The name of the requested lock resource.
* `mode` {string} The lock mode: `'exclusive'` or `'shared'`.

Emitted when a lock is successfully granted and the callback is about to run.

##### Event: `'locks.request.miss'`

* `name` {string} The name of the requested lock resource.
* `mode` {string} The lock mode: `'exclusive'` or `'shared'`.

Emitted when `ifAvailable` is `true` and the lock is not immediately available,
and the request callback is invoked with `null` instead of a `Lock` object.

##### Event: `'locks.request.end'`

* `name` {string} The name of the requested lock resource.
* `mode` {string} The lock mode: `'exclusive'` or `'shared'`.
* `steal` {boolean} Whether the request uses steal semantics.
* `ifAvailable` {boolean} Whether the request uses ifAvailable semantics.
* `error` {Error|undefined} The error thrown by the callback, if any.

Emitted when a lock request has finished, whether the callback succeeded,
threw an error, or the lock was stolen.

#### Worker Thread

> Stability: 1 - Experimental

##### Event: `'worker_threads'`

* `worker` {Worker}

Emitted when a new thread is created.

#### SQLite

> Stability: 1 - Experimental

##### Event: `'sqlite.db.query'`

* `sql` {string} The expanded SQL with bound parameter values substituted.
  If expansion fails, the source SQL with unsubstituted placeholders is used
  instead.
* `database` {Database} The `Database` instance that executed the
  statement.
* `duration` {number} SQLite's internal estimate of the statement run time in
  nanoseconds. This reflects C-layer execution time only and does not include
  JavaScript binding overhead such as argument marshaling or result-row
  construction.

Emitted after a SQL statement finishes executing against a `Database`
instance. This is a **profiling** event: it fires once per statement upon
completion and reports an estimated duration from SQLite's internal profiler.
It is not a distributed-tracing span. There is no corresponding start event,
no async context propagation, and no parent-span linkage. If you need
OpenTelemetry-compatible spans or async context propagation, wrap your SQLite
calls with a `TracingChannel` at the JavaScript layer instead.

Publishing is zero-overhead when there are no subscribers.

No event is emitted for a statement that is abandoned mid-iteration and later
finalized, either explicitly through `statement.close()` or when the
statement is garbage collected. Subscribers must not close the database or the
statement, since both are still in use while the event is being delivered; see
`database.close()` and `statement.close()`.
