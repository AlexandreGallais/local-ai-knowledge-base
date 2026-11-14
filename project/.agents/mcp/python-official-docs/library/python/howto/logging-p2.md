---
title: "Logging HOWTO (part 2 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/logging.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Logging HOWTO (part 2 of 4)

## Advanced Logging Tutorial

The logging library takes a modular approach and offers several categories
of components: loggers, handlers, filters, and formatters.

- Loggers expose the interface that application code directly uses.
- Handlers send the log records (created by loggers) to the appropriate
destination.
- Filters provide a finer grained facility for determining which log records
to output.
- Formatters specify the layout of log records in the final output.

Log event information is passed between loggers, handlers, filters and
formatters in a `LogRecord` instance.

Logging is performed by calling methods on instances of the `Logger`
class (hereafter called loggers). Each instance has a name, and they are
conceptually arranged in a namespace hierarchy using dots (periods) as
separators. For example, a logger named 'scan' is the parent of loggers
'scan.text', 'scan.html' and 'scan.pdf'. Logger names can be anything you want,
and indicate the area of an application in which a logged message originates.

A good convention to use when naming loggers is to use a module-level logger,
in each module which uses logging, named as follows:

```
logger = logging.getLogger(__name__)
```

This means that logger names track the package/module hierarchy, and it's
intuitively obvious where events are logged just from the logger name.

The root of the hierarchy of loggers is called the root logger. That's the
logger used by the functions `debug()`, `info()`, `warning()`,
`error()` and `critical()`, which just call the same-named method of
the root logger. The functions and the methods have the same signatures. The
root logger's name is printed as 'root' in the logged output.

It is, of course, possible to log messages to different destinations. Support
is included in the package for writing log messages to files, HTTP GET/POST
locations, email via SMTP, generic sockets, queues, or OS-specific logging
mechanisms such as syslog or the Windows NT event log. Destinations are served
by handler classes. You can create your own log destination class if
you have special requirements not met by any of the built-in handler classes.

By default, no destination is set for any logging messages. You can specify
a destination (such as console or file) by using `basicConfig()` as in the
tutorial examples. If you call the functions  `debug()`, `info()`,
`warning()`, `error()` and `critical()`, they will check to see
if no destination is set; and if one is not set, they will set a destination
of the console (`sys.stderr`) and a default format for the displayed
message before delegating to the root logger to do the actual message output.

The default format set by `basicConfig()` for messages is:

```none
severity:logger name:message
```

You can change this by passing a format string to `basicConfig()` with the
*format* keyword argument. For all options regarding how a format string is
constructed, see formatter-objects.

### Logging Flow

The flow of log event information in loggers and handlers is illustrated in the
following diagram.

not html

### Loggers

`Logger` objects have a threefold job.  First, they expose several
methods to application code so that applications can log messages at runtime.
Second, logger objects determine which log messages to act upon based upon
severity (the default filtering facility) or filter objects.  Third, logger
objects pass along relevant log messages to all interested log handlers.

The most widely used methods on logger objects fall into two categories:
configuration and message sending.

These are the most common configuration methods:

- `Logger.setLevel()` specifies the lowest-severity log message a logger
will handle, where debug is the lowest built-in severity level and critical
is the highest built-in severity.  For example, if the severity level is
INFO, the logger will handle only INFO, WARNING, ERROR, and CRITICAL messages
and will ignore DEBUG messages.

- `Logger.addHandler()` and `Logger.removeHandler()` add and remove
handler objects from the logger object.  Handlers are covered in more detail
in handler-basic.

- `Logger.addFilter()` and `Logger.removeFilter()` add and remove filter
objects from the logger object.  Filters are covered in more detail in
filter.

You don't need to always call these methods on every logger you create. See the
last two paragraphs in this section.

With the logger object configured, the following methods create log messages:

- `Logger.debug()`, `Logger.info()`, `Logger.warning()`,
`Logger.error()`, and `Logger.critical()` all create log records with
a message and a level that corresponds to their respective method names. The
message is actually a format string, which may contain the standard string
substitution syntax of `%s`, `%d`, `%f`, and so on.  The
rest of their arguments is a list of objects that correspond with the
substitution fields in the message.  With regard to `**kwargs`, the
logging methods care only about a keyword of `exc_info` and use it to
determine whether to log exception information.

- `Logger.exception()` creates a log message similar to
`Logger.error()`.  The difference is that `Logger.exception()` dumps a
stack trace along with it.  Call this method only from an exception handler.

- `Logger.log()` takes a log level as an explicit argument.  This is a
little more verbose for logging messages than using the log level convenience
methods listed above, but this is how to log at custom log levels.

`getLogger()` returns a reference to a logger instance with the specified
name if it is provided, or `root` if not.  The names are period-separated
hierarchical structures.  Multiple calls to `getLogger()` with the same name
will return a reference to the same logger object.  Loggers that are further
down in the hierarchical list are children of loggers higher up in the list.
For example, given a logger with a name of `foo`, loggers with names of
`foo.bar`, `foo.bar.baz`, and `foo.bam` are all descendants of `foo`.

Loggers have a concept of *effective level*. If a level is not explicitly set
on a logger, the level of its parent is used instead as its effective level.
If the parent has no explicit level set, *its* parent is examined, and so on -
all ancestors are searched until an explicitly set level is found. The root
logger always has an explicit level set (`WARNING` by default). When deciding
whether to process an event, the effective level of the logger is used to
determine whether the event is passed to the logger's handlers.

Child loggers propagate messages up to the handlers associated with their
ancestor loggers. Because of this, it is unnecessary to define and configure
handlers for all the loggers an application uses. It is sufficient to
configure handlers for a top-level logger and create child loggers as needed.
(You can, however, turn off propagation by setting the *propagate*
attribute of a logger to `False`.)

### Handlers

`Handler` objects are responsible for dispatching the
appropriate log messages (based on the log messages' severity) to the handler's
specified destination.  `Logger` objects can add zero or more handler
objects to themselves with an `addHandler()` method.  As an example
scenario, an application may want to send all log messages to a log file, all
log messages of error or higher to stdout, and all messages of critical to an
email address. This scenario requires three individual handlers where each
handler is responsible for sending messages of a specific severity to a specific
location.

The standard library includes quite a few handler types (see
useful-handlers); the tutorials use mainly `StreamHandler` and
`FileHandler` in its examples.

There are very few methods in a handler for application developers to concern
themselves with.  The only handler methods that seem relevant for application
developers who are using the built-in handler objects (that is, not creating
custom handlers) are the following configuration methods:

- The `setLevel()` method, just as in logger objects, specifies the
lowest severity that will be dispatched to the appropriate destination.  Why
are there two `setLevel()` methods?  The level set in the logger
determines which severity of messages it will pass to its handlers.  The level
set in each handler determines which messages that handler will send on.

- `setFormatter()` selects a Formatter object for this handler to
use.

- `addFilter()` and `removeFilter()` respectively
configure and deconfigure filter objects on handlers.

Application code should not directly instantiate and use instances of
`Handler`.  Instead, the `Handler` class is a base class that
defines the interface that all handlers should have and establishes some
default behavior that child classes can use (or override).

### Formatters

Formatter objects configure the final order, structure, and contents of the log
message.  Unlike the base `logging.Handler` class, application code may
instantiate formatter classes, although you could likely subclass the formatter
if your application needs special behavior.  The constructor takes three
optional arguments -- a message format string, a date format string and a style
indicator.

### `logging.Formatter.__init__(fmt=None, datefmt=None, style='%')`

If there is no message format string, the default is to use the
raw message.  If there is no date format string, the default date format is:

```none
%Y-%m-%d %H:%M:%S
```

with the milliseconds tacked on at the end. The `style` is one of `'%'`,
`'{'`, or `'$'`. If one of these is not specified, then `'%'` will be used.

If the `style` is `'%'`, the message format string uses
`%(<dictionary key>)s` styled string substitution; the possible keys are
documented in logrecord-attributes. If the style is `'{'`, the message
format string is assumed to be compatible with `str.format()` (using
keyword arguments), while if the style is `'$'` then the message format string
should conform to what is expected by `string.Template.substitute()`.

> *Changed in version 3.2.*
> Added the `style` parameter.

The following message format string will log the time in a human-readable
format, the severity of the message, and the contents of the message, in that
order:

```
'%(asctime)s - %(levelname)s - %(message)s'
```

Formatters use a user-configurable function to convert the creation time of a
record to a tuple. By default, `time.localtime()` is used; to change this
for a particular formatter instance, set the `converter` attribute of the
instance to a function with the same signature as `time.localtime()` or
`time.gmtime()`. To change it for all formatters, for example if you want
all logging times to be shown in GMT, set the `converter` attribute in the
Formatter class (to `time.gmtime` for GMT display).
