---
title: "Logging Cookbook (part 2 of 14)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/logging-cookbook.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Logging Cookbook (part 2 of 14)

## Custom handling of levels

Sometimes, you might want to do something slightly different from the standard
handling of levels in handlers, where all levels above a threshold get
processed by a handler. To do this, you need to use filters. Let's look at a
scenario where you want to arrange things as follows:

- Send messages of severity `INFO` and `WARNING` to `sys.stdout`
- Send messages of severity `ERROR` and above to `sys.stderr`
- Send messages of severity `DEBUG` and above to file `app.log`

Suppose you configure logging with the following JSON:

```json
{
    "version": 1,
    "disable_existing_loggers": false,
    "formatters": {
        "simple": {
            "format": "%(levelname)-8s - %(message)s"
        }
    },
    "handlers": {
        "stdout": {
            "class": "logging.StreamHandler",
            "level": "INFO",
            "formatter": "simple",
            "stream": "ext://sys.stdout"
        },
        "stderr": {
            "class": "logging.StreamHandler",
            "level": "ERROR",
            "formatter": "simple",
            "stream": "ext://sys.stderr"
        },
        "file": {
            "class": "logging.FileHandler",
            "formatter": "simple",
            "filename": "app.log",
            "mode": "w"
        }
    },
    "root": {
        "level": "DEBUG",
        "handlers": [
            "stderr",
            "stdout",
            "file"
        ]
    }
}
```

This configuration does *almost* what we want, except that `sys.stdout` would show messages
of severity `ERROR` and only events of this severity and higher will be tracked
as well as `INFO` and `WARNING` messages. To prevent this, we can set up a filter which
excludes those messages and add it to the relevant handler. This can be configured by
adding a `filters` section parallel to `formatters` and `handlers`:

```json
{
    "filters": {
        "warnings_and_below": {
            "()" : "__main__.filter_maker",
            "level": "WARNING"
        }
    }
}
```

and changing the section on the `stdout` handler to add it:

```json
{
    "stdout": {
        "class": "logging.StreamHandler",
        "level": "INFO",
        "formatter": "simple",
        "stream": "ext://sys.stdout",
        "filters": ["warnings_and_below"]
    }
}
```

A filter is just a function, so we can define the `filter_maker` (a factory
function) as follows:

```python
def filter_maker(level):
    level = getattr(logging, level)

    def filter(record):
        return record.levelno <= level

    return filter
```

This converts the string argument passed in to a numeric level, and returns a
function which only returns `True` if the level of the passed in record is
at or below the specified level. Note that in this example I have defined the
`filter_maker` in a test script `main.py` that I run from the command line,
so its module will be `__main__` - hence the `__main__.filter_maker` in the
filter configuration. You will need to change that if you define it in a
different module.

With the filter added, we can run `main.py`, which in full is:

```python
import json
import logging
import logging.config

CONFIG = '''
{
    "version": 1,
    "disable_existing_loggers": false,
    "formatters": {
        "simple": {
            "format": "%(levelname)-8s - %(message)s"
        }
    },
    "filters": {
        "warnings_and_below": {
            "()" : "__main__.filter_maker",
            "level": "WARNING"
        }
    },
    "handlers": {
        "stdout": {
            "class": "logging.StreamHandler",
            "level": "INFO",
            "formatter": "simple",
            "stream": "ext://sys.stdout",
            "filters": ["warnings_and_below"]
        },
        "stderr": {
            "class": "logging.StreamHandler",
            "level": "ERROR",
            "formatter": "simple",
            "stream": "ext://sys.stderr"
        },
        "file": {
            "class": "logging.FileHandler",
            "formatter": "simple",
            "filename": "app.log",
            "mode": "w"
        }
    },
    "root": {
        "level": "DEBUG",
        "handlers": [
            "stderr",
            "stdout",
            "file"
        ]
    }
}
'''

def filter_maker(level):
    level = getattr(logging, level)

    def filter(record):
        return record.levelno <= level

    return filter

logging.config.dictConfig(json.loads(CONFIG))
logging.debug('A DEBUG message')
logging.info('An INFO message')
logging.warning('A WARNING message')
logging.error('An ERROR message')
logging.critical('A CRITICAL message')
```

And after running it like this:

```shell
python main.py 2>stderr.log >stdout.log
```

We can see the results are as expected:

```shell
$ more *.log
::::::::::::::
app.log
::::::::::::::
DEBUG    - A DEBUG message
INFO     - An INFO message
WARNING  - A WARNING message
ERROR    - An ERROR message
CRITICAL - A CRITICAL message
::::::::::::::
stderr.log
::::::::::::::
ERROR    - An ERROR message
CRITICAL - A CRITICAL message
::::::::::::::
stdout.log
::::::::::::::
INFO     - An INFO message
WARNING  - A WARNING message
```

## Configuration server example

Here is an example of a module using the logging configuration server:

```
import logging
import logging.config
import time
import os

# read initial config file
logging.config.fileConfig('logging.conf')

# create and start listener on port 9999
t = logging.config.listen(9999)
t.start()

logger = logging.getLogger('simpleExample')

try:
    # loop through logging calls to see the difference
    # new configurations make, until Ctrl+C is pressed
    while True:
        logger.debug('debug message')
        logger.info('info message')
        logger.warning('warn message')
        logger.error('error message')
        logger.critical('critical message')
        time.sleep(5)
except KeyboardInterrupt:
    # cleanup
    logging.config.stopListening()
    t.join()
```

And here is a script that takes a filename and sends that file to the server,
properly preceded with the binary-encoded length, as the new logging
configuration:

```
#!/usr/bin/env python
import socket, sys, struct

with open(sys.argv[1], 'rb') as f:
    data_to_send = f.read()

HOST = 'localhost'
PORT = 9999
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
print('connecting...')
s.connect((HOST, PORT))
print('sending config...')
s.send(struct.pack('>L', len(data_to_send)))
s.send(data_to_send)
s.close()
print('complete')
```

## Dealing with handlers that block

Sometimes you have to get your logging handlers to do their work without
blocking the thread you're logging from. This is common in web applications,
though of course it also occurs in other scenarios.

A common culprit which demonstrates sluggish behaviour is the
`SMTPHandler`: sending emails can take a long time, for a
number of reasons outside the developer's control (for example, a poorly
performing mail or network infrastructure). But almost any network-based
handler can block: Even a `SocketHandler` operation may do a
DNS query under the hood which is too slow (and this query can be deep in the
socket library code, below the Python layer, and outside your control).

One solution is to use a two-part approach. For the first part, attach only a
`QueueHandler` to those loggers which are accessed from
performance-critical threads. They simply write to their queue, which can be
sized to a large enough capacity or initialized with no upper bound to their
size. The write to the queue will typically be accepted quickly, though you
will probably need to catch the `queue.Full` exception as a precaution
in your code. If you are a library developer who has performance-critical
threads in their code, be sure to document this (together with a suggestion to
attach only `QueueHandlers` to your loggers) for the benefit of other
developers who will use your code.

The second part of the solution is `QueueListener`, which has been
designed as the counterpart to `QueueHandler`.  A
`QueueListener` is very simple: it's passed a queue and some handlers,
and it fires up an internal thread which listens to its queue for LogRecords
sent from `QueueHandlers` (or any other source of `LogRecords`, for that
matter). The `LogRecords` are removed from the queue and passed to the
handlers for processing.

The advantage of having a separate `QueueListener` class is that you
can use the same instance to service multiple `QueueHandlers`. This is more
resource-friendly than, say, having threaded versions of the existing handler
classes, which would eat up one thread per handler for no particular benefit.

An example of using these two classes follows (imports omitted):

```
que = queue.Queue(-1)  # no limit on size
queue_handler = QueueHandler(que)
handler = logging.StreamHandler()
listener = QueueListener(que, handler)
root = logging.getLogger()
root.addHandler(queue_handler)
formatter = logging.Formatter('%(threadName)s: %(message)s')
handler.setFormatter(formatter)
listener.start()
# The log output will display the thread which generated
# the event (the main thread) rather than the internal
# thread which monitors the internal queue. This is what
# you want to happen.
root.warning('Look out!')
listener.stop()
```

which, when run, will produce:

```none
MainThread: Look out!
```

> **Note:** Although the earlier discussion wasn't specifically talking about
> async code, but rather about slow logging handlers, it should be noted that
> when logging from async code, network and even file handlers could lead to
> problems (blocking the event loop) because some logging is done from
> `asyncio` internals. It might be best, if any async code is used in an
> application, to use the above approach for logging, so that any blocking code
> runs only in the `QueueListener` thread.

> *Changed in version 3.5.*
> Prior to Python 3.5, the `QueueListener` always passed every message
> received from the queue to every handler it was initialized with. (This was
> because it was assumed that level filtering was all done on the other side,
> where the queue is filled.) From 3.5 onwards, this behaviour can be changed
> by passing a keyword argument `respect_handler_level=True` to the
> listener's constructor. When this is done, the listener compares the level
> of each message with the handler's level, and only passes a message to a
> handler if it's appropriate to do so.

> *Changed in version 3.14.*
> The `QueueListener` can be started (and stopped) via the
> `with` statement. For example:
>
> ```python
> with QueueListener(que, handler) as listener:
>     # The queue listener automatically starts
>     # when the 'with' block is entered.
>     pass
> # The queue listener automatically stops once
> # the 'with' block is exited.
> ```
>
