---
title: "Logging Cookbook (part 14 of 14)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/logging-cookbook.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Logging Cookbook (part 14 of 14)

## How to treat a logger like an output stream

Sometimes, you need to interface to a third-party API which expects a file-like
object to write to, but you want to direct the API's output to a logger. You
can do this using a class which wraps a logger with a file-like API.
Here's a short script illustrating such a class:

```python
import logging

class LoggerWriter:
    def __init__(self, logger, level):
        self.logger = logger
        self.level = level

    def write(self, message):
        if message != '\n':  # avoid printing bare newlines, if you like
            self.logger.log(self.level, message)

    def flush(self):
        # doesn't actually do anything, but might be expected of a file-like
        # object - so optional depending on your situation
        pass

    def close(self):
        # doesn't actually do anything, but might be expected of a file-like
        # object - so optional depending on your situation. You might want
        # to set a flag so that later calls to write raise an exception
        pass

def main():
    logging.basicConfig(level=logging.DEBUG)
    logger = logging.getLogger('demo')
    info_fp = LoggerWriter(logger, logging.INFO)
    debug_fp = LoggerWriter(logger, logging.DEBUG)
    print('An INFO message', file=info_fp)
    print('A DEBUG message', file=debug_fp)

if __name__ == "__main__":
    main()
```

When this script is run, it prints

```text
INFO:demo:An INFO message
DEBUG:demo:A DEBUG message
```

You could also use `LoggerWriter` to redirect `sys.stdout` and
`sys.stderr` by doing something like this:

```python
import sys

sys.stdout = LoggerWriter(logger, logging.INFO)
sys.stderr = LoggerWriter(logger, logging.WARNING)
```

You should do this *after* configuring logging for your needs. In the above
example, the `basicConfig()` call does this (using the
`sys.stderr` value *before* it is overwritten by a `LoggerWriter`
instance). Then, you'd get this kind of result:

```pycon
>>> print('Foo')
INFO:demo:Foo
>>> print('Bar', file=sys.stderr)
WARNING:demo:Bar
>>>
```

Of course, the examples above show output according to the format used by
`basicConfig()`, but you can use a different formatter when you
configure logging.

Note that with the above scheme, you are somewhat at the mercy of buffering and
the sequence of write calls which you are intercepting. For example, with the
definition of `LoggerWriter` above, if you have the snippet

```python
sys.stderr = LoggerWriter(logger, logging.WARNING)
1 / 0
```

then running the script results in

```text
WARNING:demo:Traceback (most recent call last):

WARNING:demo:  File "/home/runner/cookbook-loggerwriter/test.py", line 53, in <module>

WARNING:demo:
WARNING:demo:main()
WARNING:demo:  File "/home/runner/cookbook-loggerwriter/test.py", line 49, in main

WARNING:demo:
WARNING:demo:1 / 0
WARNING:demo:ZeroDivisionError
WARNING:demo::
WARNING:demo:division by zero
```

As you can see, this output isn't ideal. That's because the underlying code
which writes to `sys.stderr` makes multiple writes, each of which results in a
separate logged line (for example, the last three lines above). To get around
this problem, you need to buffer things and only output log lines when newlines
are seen. Let's use a slightly better implementation of `LoggerWriter`:

```python
class BufferingLoggerWriter(LoggerWriter):
    def __init__(self, logger, level):
        super().__init__(logger, level)
        self.buffer = ''

    def write(self, message):
        if '\n' not in message:
            self.buffer += message
        else:
            parts = message.split('\n')
            if self.buffer:
                s = self.buffer + parts.pop(0)
                self.logger.log(self.level, s)
            self.buffer = parts.pop()
            for part in parts:
                self.logger.log(self.level, part)
```

This just buffers up stuff until a newline is seen, and then logs complete
lines. With this approach, you get better output:

```text
WARNING:demo:Traceback (most recent call last):
WARNING:demo:  File "/home/runner/cookbook-loggerwriter/main.py", line 55, in <module>
WARNING:demo:    main()
WARNING:demo:  File "/home/runner/cookbook-loggerwriter/main.py", line 52, in main
WARNING:demo:    1/0
WARNING:demo:ZeroDivisionError: division by zero
```

## How to uniformly handle newlines in logging output

Usually, messages that are logged (say to console or file) consist of a single
line of text. However, sometimes there is a need to handle messages with
multiple lines - whether because a logging format string contains newlines, or
logged data contains newlines. If you want to handle such messages uniformly, so
that each line in the logged message appears uniformly formatted as if it was
logged separately, you can do this using a handler mixin, as in the following
snippet:

```python
# Assume this is in a module mymixins.py
import copy

class MultilineMixin:
    def emit(self, record):
        s = record.getMessage()
        if '\n' not in s:
            super().emit(record)
        else:
            lines = s.splitlines()
            rec = copy.copy(record)
            rec.args = None
            for line in lines:
                rec.msg = line
                super().emit(rec)
```

You can use the mixin as in the following script:

```python
import logging

from mymixins import MultilineMixin

logger = logging.getLogger(__name__)

class StreamHandler(MultilineMixin, logging.StreamHandler):
    pass

if __name__ == '__main__':
    logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(levelname)-9s %(message)s',
                        handlers = [StreamHandler()])
    logger.debug('Single line')
    logger.debug('Multiple lines:\nfool me once ...')
    logger.debug('Another single line')
    logger.debug('Multiple lines:\n%s', 'fool me ...\ncan\'t get fooled again')
```

The script, when run, prints something like:

```text
2025-07-02 13:54:47,234 DEBUG     Single line
2025-07-02 13:54:47,234 DEBUG     Multiple lines:
2025-07-02 13:54:47,234 DEBUG     fool me once ...
2025-07-02 13:54:47,234 DEBUG     Another single line
2025-07-02 13:54:47,234 DEBUG     Multiple lines:
2025-07-02 13:54:47,234 DEBUG     fool me ...
2025-07-02 13:54:47,234 DEBUG     can't get fooled again
```

If, on the other hand, you are concerned about `log injection
<https://owasp.org/www-community/attacks/Log_Injection>`_, you can use a
formatter which escapes newlines, as per the following example:

```python
import logging

logger = logging.getLogger(__name__)

class EscapingFormatter(logging.Formatter):
    def format(self, record):
        s = super().format(record)
        return s.replace('\n', r'\n')

if __name__ == '__main__':
    h = logging.StreamHandler()
    h.setFormatter(EscapingFormatter('%(asctime)s %(levelname)-9s %(message)s'))
    logging.basicConfig(level=logging.DEBUG, handlers = [h])
    logger.debug('Single line')
    logger.debug('Multiple lines:\nfool me once ...')
    logger.debug('Another single line')
    logger.debug('Multiple lines:\n%s', 'fool me ...\ncan\'t get fooled again')
```

You can, of course, use whatever escaping scheme makes the most sense for you.
The script, when run, should produce output like this:

```text
2025-07-09 06:47:33,783 DEBUG     Single line
2025-07-09 06:47:33,783 DEBUG     Multiple lines:\nfool me once ...
2025-07-09 06:47:33,783 DEBUG     Another single line
2025-07-09 06:47:33,783 DEBUG     Multiple lines:\nfool me ...\ncan't get fooled again
```

Escaping behaviour can't be the stdlib default , as it would break backwards
compatibility.

## Patterns to avoid

Although the preceding sections have described ways of doing things you might
need to do or deal with, it is worth mentioning some usage patterns which are
*unhelpful*, and which should therefore be avoided in most cases. The following
sections are in no particular order.

### Opening the same log file multiple times

On Windows, you will generally not be able to open the same file multiple times
as this will lead to a "file is in use by another process" error. However, on
POSIX platforms you'll not get any errors if you open the same file multiple
times. This could be done accidentally, for example by:

- Adding a file handler more than once which references the same file (e.g. by
a copy/paste/forget-to-change error).

- Opening two files that look different, as they have different names, but are
the same because one is a symbolic link to the other.

- Forking a process, following which both parent and child have a reference to
the same file. This might be through use of the `multiprocessing` module,
for example.

Opening a file multiple times might *appear* to work most of the time, but can
lead to a number of problems in practice:

- Logging output can be garbled because multiple threads or processes try to
write to the same file. Although logging guards against concurrent use of the
same handler instance by multiple threads, there is no such protection if
concurrent writes are attempted by two different threads using two different
handler instances which happen to point to the same file.

- An attempt to delete a file (e.g. during file rotation) silently fails,
because there is another reference pointing to it. This can lead to confusion
and wasted debugging time - log entries end up in unexpected places, or are
lost altogether. Or a file that was supposed to be moved remains in place,
and grows in size unexpectedly despite size-based rotation being supposedly
in place.

Use the techniques outlined in multiple-processes to circumvent such
issues.

### Using loggers as attributes in a class or passing them as parameters

While there might be unusual cases where you'll need to do this, in general
there is no point because loggers are singletons. Code can always access a
given logger instance by name using `logging.getLogger(name)`, so passing
instances around and holding them as instance attributes is pointless. Note
that in other languages such as Java and C#, loggers are often static class
attributes. However, this pattern doesn't make sense in Python, where the
module (and not the class) is the unit of software decomposition.

### Adding handlers other than `NullHandler` to a logger in a library

Configuring logging by adding handlers, formatters and filters is the
responsibility of the application developer, not the library developer. If you
are maintaining a library, ensure that you don't add handlers to any of your
loggers other than a `NullHandler` instance.

### Creating a lot of loggers

Loggers are singletons that are never freed during a script execution, and so
creating lots of loggers will use up memory which can't then be freed. Rather
than create a logger per e.g. file processed or network connection made, use
the existing mechanisms for passing contextual
information into your logs and restrict the loggers created to those describing
areas within your application (generally modules, but occasionally slightly
more fine-grained than that).

## Other resources

> **See also:** Module `logging`
> API reference for the logging module.
>
> Module `logging.config`
> Configuration API for the logging module.
>
> Module `logging.handlers`
> Useful handlers included with the logging module.
>
> Basic <example-value>
>
> Advanced Tutorial
