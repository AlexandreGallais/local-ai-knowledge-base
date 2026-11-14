---
title: "logging.handlers --- Logging handlers (part 4 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/logging.handlers.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# logging.handlers --- Logging handlers (part 4 of 4)

## HTTPHandler

The `HTTPHandler` class, located in the `logging.handlers` module,
supports sending logging messages to a web server, using either `GET` or
`POST` semantics.

### class `HTTPHandler(host, url, method='GET', secure=False, credentials=None, context=None)`

Returns a new instance of the `HTTPHandler` class. The *host* can be
of the form `host:port`, should you need to use a specific port number.  If
no *method* is specified, `GET` is used. If *secure* is true, a HTTPS
connection will be used. The *context* parameter may be set to a
`ssl.SSLContext` instance to configure the SSL settings used for the
HTTPS connection. If *credentials* is specified, it should be a 2-tuple
consisting of userid and password, which will be placed in a HTTP
'Authorization' header using Basic authentication. If you specify
credentials, you should also specify secure=True so that your userid and
password are not passed in cleartext across the wire.

> *Changed in version 3.5.*
> The *context* parameter was added.

### `mapLogRecord(record)`

Provides a dictionary, based on `record`, which is to be URL-encoded
and sent to the web server. The default implementation just returns
`record.__dict__`. This method can be overridden if e.g. only a
subset of `LogRecord` is to be sent to the web server, or
if more specific customization of what's sent to the server is required.

### `emit(record)`

Sends the record to the web server as a URL-encoded dictionary. The
`mapLogRecord()` method is used to convert the record to the
dictionary to be sent.

> **Note:** Since preparing a record for sending it to a web server is not
> the same as a generic formatting operation, using
> `setFormatter()` to specify a
> `Formatter` for a `HTTPHandler` has no effect.
> Instead of calling `format()`, this handler calls
> `mapLogRecord()` and then `urllib.parse.urlencode()` to encode the
> dictionary in a form suitable for sending to a web server.

## QueueHandler

> *Added in version 3.2.*

The `QueueHandler` class, located in the `logging.handlers` module,
supports sending logging messages to a queue, such as those implemented in the
`queue` or `multiprocessing` modules.

Along with the `QueueListener` class, `QueueHandler` can be used
to let handlers do their work on a separate thread from the one which does the
logging. This is important in web applications and also other service
applications where threads servicing clients need to respond as quickly as
possible, while any potentially slow operations (such as sending an email via
`SMTPHandler`) are done on a separate thread.

### class `QueueHandler(queue)`

Returns a new instance of the `QueueHandler` class. The instance is
initialized with the queue to send messages to. The *queue* can be any
queue-like object; it's used as-is by the `enqueue()` method, which
needs to know how to send messages to it. The queue is not *required* to
have the task tracking API, which means that you can use
`SimpleQueue` instances for *queue*.

> **Note:** If you are using `multiprocessing`, you should avoid using
> `SimpleQueue` and instead use `multiprocessing.Queue`.

> **Warning:** The `multiprocessing` module uses an internal logger created and
> accessed via `get_logger()`.
> `multiprocessing.Queue` will log `DEBUG` level messages upon
> items being queued. If those log messages are processed by a
> `QueueHandler` using the same `multiprocessing.Queue` instance,
> it will cause a deadlock or infinite recursion.

### `emit(record)`

Enqueues the result of preparing the LogRecord. Should an exception
occur (e.g. because a bounded queue has filled up), the
`handleError()` method is called to handle the
error. This can result in the record silently being dropped (if
`logging.raiseExceptions` is `False`) or a message printed to
`sys.stderr` (if `logging.raiseExceptions` is `True`).

### `prepare(record)`

Prepares a record for queuing. The object returned by this
method is enqueued.

The base implementation formats the record to merge the message,
arguments, exception and stack information, if present.  It also removes
unpickleable items from the record in-place. Specifically, it overwrites
the record's `msg` and `message` attributes with the merged
message (obtained by calling the handler's `format()` method), and
sets the `args`, `exc_info` and `exc_text` attributes
to `None`.

You might want to override this method if you want to convert
the record to a dict or JSON string, or send a modified copy
of the record while leaving the original intact.

> **Note:** The base implementation formats the message with arguments, sets
> the `message` and `msg` attributes to the formatted message and
> sets the `args` and `exc_text` attributes to `None` to allow
> pickling and to prevent further attempts at formatting. This means
> that a handler on the `QueueListener` side won't have the
> information to do custom formatting, e.g. of exceptions. You may wish
> to subclass `QueueHandler` and override this method to e.g. avoid
> setting `exc_text` to `None`. Note that the `message` / `msg`
> / `args` changes are related to ensuring the record is pickleable,
> and you might or might not be able to avoid doing that depending on
> whether your `args` are pickleable. (Note that you may have to
> consider not only your own code but also code in any libraries that
> you use.)

### `enqueue(record)`

Enqueues the record on the queue using `put_nowait()`; you may
want to override this if you want to use blocking behaviour, or a
timeout, or a customized queue implementation.

### `listener`

When created via configuration using `dictConfig()`, this
attribute will contain a `QueueListener` instance for use with this
handler. Otherwise, it will be `None`.

> *Added in version 3.12.*

## QueueListener

> *Added in version 3.2.*

The `QueueListener` class, located in the `logging.handlers`
module, supports receiving logging messages from a queue, such as those
implemented in the `queue` or `multiprocessing` modules. The
messages are received from a queue in an internal thread and passed, on
the same thread, to one or more handlers for processing. While
`QueueListener` is not itself a handler, it is documented here
because it works hand-in-hand with `QueueHandler`.

Along with the `QueueHandler` class, `QueueListener` can be used
to let handlers do their work on a separate thread from the one which does the
logging. This is important in web applications and also other service
applications where threads servicing clients need to respond as quickly as
possible, while any potentially slow operations (such as sending an email via
`SMTPHandler`) are done on a separate thread.

### class `QueueListener(queue, *handlers, respect_handler_level=False)`

Returns a new instance of the `QueueListener` class. The instance is
initialized with the queue to send messages to and a list of handlers which
will handle entries placed on the queue. The queue can be any queue-like
object; it's passed as-is to the `dequeue()` method, which needs
to know how to get messages from it. The queue is not *required* to have the
task tracking API (though it's used if available), which means that you can
use `SimpleQueue` instances for *queue*.

> **Note:** If you are using `multiprocessing`, you should avoid using
> `SimpleQueue` and instead use `multiprocessing.Queue`.

If `respect_handler_level` is `True`, a handler's level is respected
(compared with the level for the message) when deciding whether to pass
messages to that handler; otherwise, the behaviour is as in previous Python
versions - to always pass each message to each handler.

> *Changed in version 3.5.*
> The `respect_handler_level` argument was added.

> *Changed in version 3.14.*
> `QueueListener` can now be used as a context manager via
> `with`. When entering the context, the listener is started. When
> exiting the context, the listener is stopped.
> `__enter__()` returns the
> `QueueListener` object.

### `dequeue(block)`

Dequeues a record and return it, optionally blocking.

The base implementation uses `get()`. You may want to override this
method if you want to use timeouts or work with custom queue
implementations.

### `prepare(record)`

Prepare a record for handling.

This implementation just returns the passed-in record. You may want to
override this method if you need to do any custom marshalling or
manipulation of the record before passing it to the handlers.

### `handle(record)`

Handle a record.

This just loops through the handlers offering them the record
to handle. The actual object passed to the handlers is that which
is returned from `prepare()`.

### `start()`

Starts the listener.

This starts up a background thread to monitor the queue for
LogRecords to process.

> *Changed in version 3.14.*
> Raises `RuntimeError` if called and the listener is already
> running.

### `stop()`

Stops the listener.

This asks the thread to terminate, and then waits for it to do so.
Note that if you don't call this before your application exits, there
may be some records still left on the queue, which won't be processed.

### `enqueue_sentinel()`

Writes a sentinel to the queue to tell the listener to quit. This
implementation uses `put_nowait()`.  You may want to override this
method if you want to use timeouts or work with custom queue
implementations.

> *Added in version 3.3.*

> **See also:** Module `logging`
> API reference for the logging module.
>
> Module `logging.config`
> Configuration API for the logging module.
