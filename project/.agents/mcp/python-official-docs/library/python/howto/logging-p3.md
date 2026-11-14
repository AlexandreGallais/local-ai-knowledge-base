---
title: "Logging HOWTO (part 3 of 4)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/logging.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Logging HOWTO (part 3 of 4)

### Configuring Logging

Programmers can configure logging in three ways:

1. Creating loggers, handlers, and formatters explicitly using Python
code that calls the configuration methods listed above.
1. Creating a logging config file and reading it using the `fileConfig()`
function.
1. Creating a dictionary of configuration information and passing it
to the `dictConfig()` function.

For the reference documentation on the last two options, see
logging-config-api.  The following example configures a very simple
logger, a console handler, and a simple formatter using Python code:

```
import logging

# create logger
logger = logging.getLogger('simple_example')
logger.setLevel(logging.DEBUG)

# create console handler and set level to debug
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)

# create formatter
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# add formatter to ch
ch.setFormatter(formatter)

# add ch to logger
logger.addHandler(ch)

# 'application' code
logger.debug('debug message')
logger.info('info message')
logger.warning('warn message')
logger.error('error message')
logger.critical('critical message')
```

Running this module from the command line produces the following output:

```shell-session
$ python simple_logging_module.py
2005-03-19 15:10:26,618 - simple_example - DEBUG - debug message
2005-03-19 15:10:26,620 - simple_example - INFO - info message
2005-03-19 15:10:26,695 - simple_example - WARNING - warn message
2005-03-19 15:10:26,697 - simple_example - ERROR - error message
2005-03-19 15:10:26,773 - simple_example - CRITICAL - critical message
```

The following Python module creates a logger, handler, and formatter nearly
identical to those in the example listed above, with the only difference being
the names of the objects:

```
import logging
import logging.config

logging.config.fileConfig('logging.conf')

# create logger
logger = logging.getLogger('simpleExample')

# 'application' code
logger.debug('debug message')
logger.info('info message')
logger.warning('warn message')
logger.error('error message')
logger.critical('critical message')
```

Here is the logging.conf file:

```ini
[loggers]
keys=root,simpleExample

[handlers]
keys=consoleHandler

[formatters]
keys=simpleFormatter

[logger_root]
level=DEBUG
handlers=consoleHandler

[logger_simpleExample]
level=DEBUG
handlers=consoleHandler
qualname=simpleExample
propagate=0

[handler_consoleHandler]
class=StreamHandler
level=DEBUG
formatter=simpleFormatter
args=(sys.stdout,)

[formatter_simpleFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(message)s
```

The output is nearly identical to that of the non-config-file-based example:

```shell-session
$ python simple_logging_config.py
2005-03-19 15:38:55,977 - simpleExample - DEBUG - debug message
2005-03-19 15:38:55,979 - simpleExample - INFO - info message
2005-03-19 15:38:56,054 - simpleExample - WARNING - warn message
2005-03-19 15:38:56,055 - simpleExample - ERROR - error message
2005-03-19 15:38:56,130 - simpleExample - CRITICAL - critical message
```

You can see that the config file approach has a few advantages over the Python
code approach, mainly separation of configuration and code and the ability of
noncoders to easily modify the logging properties.

> **Warning:** The `fileConfig()` function takes a default parameter,
> `disable_existing_loggers`, which defaults to `True` for reasons of
> backward compatibility. This may or may not be what you want, since it
> will cause any non-root loggers existing before the `fileConfig()`
> call to be disabled unless they (or an ancestor) are explicitly named in
> the configuration. Please refer to the reference documentation for more
> information, and specify `False` for this parameter if you wish.
>
> The dictionary passed to `dictConfig()` can also specify a Boolean
> value with key `disable_existing_loggers`, which if not specified
> explicitly in the dictionary also defaults to being interpreted as
> `True`. This leads to the logger-disabling behaviour described above,
> which may not be what you want - in which case, provide the key
> explicitly with a value of `False`.

Note that the class names referenced in config files need to be either relative
to the logging module, or absolute values which can be resolved using normal
import mechanisms. Thus, you could use either
`WatchedFileHandler` (relative to the logging module) or
`mypackage.mymodule.MyHandler` (for a class defined in package `mypackage`
and module `mymodule`, where `mypackage` is available on the Python import
path).

In Python 3.2, a new means of configuring logging has been introduced, using
dictionaries to hold configuration information. This provides a superset of the
functionality of the config-file-based approach outlined above, and is the
recommended configuration method for new applications and deployments. Because
a Python dictionary is used to hold configuration information, and since you
can populate that dictionary using different means, you have more options for
configuration. For example, you can use a configuration file in JSON format,
or, if you have access to YAML processing functionality, a file in YAML
format, to populate the configuration dictionary. Or, of course, you can
construct the dictionary in Python code, receive it in pickled form over a
socket, or use whatever approach makes sense for your application.

Here's an example of the same configuration as above, in YAML format for
the new dictionary-based approach:

```yaml
version: 1
formatters:
  simple:
    format: '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
handlers:
  console:
    class: logging.StreamHandler
    level: DEBUG
    formatter: simple
    stream: ext://sys.stdout
loggers:
  simpleExample:
    level: DEBUG
    handlers: [console]
    propagate: no
root:
  level: DEBUG
  handlers: [console]
```

For more information about logging using a dictionary, see
logging-config-api.

### What happens if no configuration is provided

If no logging configuration is provided, it is possible to have a situation
where a logging event needs to be output, but no handlers can be found to
output the event.

The event is output using a 'handler of last resort', stored in
`lastResort`. This internal handler is not associated with any
logger, and acts like a `StreamHandler` which writes the
event description message to the current value of `sys.stderr` (therefore
respecting any redirections which may be in effect). No formatting is
done on the message - just the bare event description message is printed.
The handler's level is set to `WARNING`, so all events at this and
greater severities will be output.

> *Changed in version 3.2.*
> For versions of Python prior to 3.2, the behaviour is as follows:
>
> - If `raiseExceptions` is `False` (production mode), the event is
> silently dropped.
>
> - If `raiseExceptions` is `True` (development mode), a message
> 'No handlers could be found for logger X.Y.Z' is printed once.
>
> To obtain the pre-3.2 behaviour,
> `lastResort` can be set to `None`.

### Configuring Logging for a Library

When developing a library which uses logging, you should take care to
document how the library uses logging - for example, the names of loggers
used. Some consideration also needs to be given to its logging configuration.
If the using application does not use logging, and library code makes logging
calls, then (as described in the previous section) events of severity
`WARNING` and greater will be printed to `sys.stderr`. This is regarded as
the best default behaviour.

If for some reason you *don't* want these messages printed in the absence of
any logging configuration, you can attach a do-nothing handler to the top-level
logger for your library. This avoids the message being printed, since a handler
will always be found for the library's events: it just doesn't produce any
output. If the library user configures logging for application use, presumably
that configuration will add some handlers, and if levels are suitably
configured then logging calls made in library code will send output to those
handlers, as normal.

A do-nothing handler is included in the logging package:
`NullHandler` (since Python 3.1). An instance of this handler
could be added to the top-level logger of the logging namespace used by the
library (*if* you want to prevent your library's logged events being output to
`sys.stderr` in the absence of logging configuration). If all logging by a
library *foo* is done using loggers with names matching 'foo.x', 'foo.x.y',
etc. then the code:

```
import logging
logging.getLogger('foo').addHandler(logging.NullHandler())
```

should have the desired effect. If an organisation produces a number of
libraries, then the logger name specified can be 'orgname.foo' rather than
just 'foo'.

> **Note:** It is strongly advised that you *do not log to the root logger*
> in your library. Instead, use a logger with a unique and easily
> identifiable name, such as the `__name__` for your library's top-level package
> or module. Logging to the root logger will make it difficult or impossible for
> the application developer to configure the logging verbosity or handlers of
> your library as they wish.

> **Note:** It is strongly advised that you *do not add any handlers other
> than* `NullHandler` *to your library's loggers*. This is
> because the configuration of handlers is the prerogative of the application
> developer who uses your library. The application developer knows their
> target audience and what handlers are most appropriate for their
> application: if you add handlers 'under the hood', you might well interfere
> with their ability to carry out unit tests and deliver logs which suit their
> requirements.

## Logging Levels

The numeric values of logging levels are given in the following table. These are
primarily of interest if you want to define your own levels, and need them to
have specific values relative to the predefined levels. If you define a level
with the same numeric value, it overwrites the predefined value; the predefined
name is lost.

```text
+--------------+---------------+
| Level        | Numeric value |
+==============+===============+
| ``CRITICAL`` | 50            |
+--------------+---------------+
| ``ERROR``    | 40            |
+--------------+---------------+
| ``WARNING``  | 30            |
+--------------+---------------+
| ``INFO``     | 20            |
+--------------+---------------+
| ``DEBUG``    | 10            |
+--------------+---------------+
| ``NOTSET``   | 0             |
+--------------+---------------+
```

Levels can also be associated with loggers, being set either by the developer or
through loading a saved logging configuration. When a logging method is called
on a logger, the logger compares its own level with the level associated with
the method call. If the logger's level is higher than the method call's, no
logging message is actually generated. This is the basic <example-value> controlling
the verbosity of logging output.

Logging messages are encoded as instances of the `LogRecord`
class. When a logger decides to actually log an event, a
`LogRecord` instance is created from the logging message.

Logging messages are subjected to a dispatch mechanism through the use of
handlers, which are instances of subclasses of the `Handler`
class. Handlers are responsible for ensuring that a logged message (in the form
of a `LogRecord`) ends up in a particular location (or set of locations)
which is useful for the target audience for that message (such as end users,
support desk staff, system administrators, developers). Handlers are passed
`LogRecord` instances intended for particular destinations. Each logger
can have zero, one or more handlers associated with it (via the
`addHandler()` method of `Logger`). In addition to any
handlers directly associated with a logger, *all handlers associated with all
ancestors of the logger* are called to dispatch the message (unless the
*propagate* flag for a logger is set to a false value, at which point the
passing to ancestor handlers stops).

Just as for loggers, handlers can have levels associated with them. A handler's
level acts as a filter in the same way as a logger's level does. If a handler
decides to actually dispatch an event, the `emit()` method is used
to send the message to its destination. Most user-defined subclasses of
`Handler` will need to override this `emit()`.

### Custom Levels

Defining your own levels is possible, but should not be necessary, as the
existing levels have been chosen on the basis of practical experience.
However, if you are convinced that you need custom levels, great care should
be exercised when doing this, and it is possibly *a very bad idea to define
custom levels if you are developing a library*. That's because if multiple
library authors all define their own custom levels, there is a chance that
the logging output from such multiple libraries used together will be
difficult for the using developer to control and/or interpret, because a
given numeric value might mean different things for different libraries.
