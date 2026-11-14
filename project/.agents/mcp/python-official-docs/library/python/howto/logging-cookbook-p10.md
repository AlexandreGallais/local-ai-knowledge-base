---
title: "Logging Cookbook (part 10 of 14)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/logging-cookbook.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Logging Cookbook (part 10 of 14)

## Customizing handlers with `dictConfig()`

There are times when you want to customize logging handlers in particular ways,
and if you use `dictConfig()` you may be able to do this without
subclassing. As an example, consider that you may want to set the ownership of a
log file. On POSIX, this is easily done using `shutil.chown()`, but the file
handlers in the stdlib don't offer built-in support. You can customize handler
creation using a plain function such as:

```
def owned_file_handler(filename, mode='a', encoding=None, owner=None):
    if owner:
        if not os.path.exists(filename):
            open(filename, 'a').close()
        shutil.chown(filename, *owner)
    return logging.FileHandler(filename, mode, encoding)
```

You can then specify, in a logging configuration passed to `dictConfig()`,
that a logging handler be created by calling this function:

```
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'default': {
            'format': '%(asctime)s %(levelname)s %(name)s %(message)s'
        },
    },
    'handlers': {
        'file':{
            # The values below are popped from this dictionary and
            # used to create the handler, set the handler's level and
            # its formatter.
            '()': owned_file_handler,
            'level':'DEBUG',
            'formatter': 'default',
            # The values below are passed to the handler creator callable
            # as keyword arguments.
            'owner': ['pulse', 'pulse'],
            'filename': 'chowntest.log',
            'mode': 'w',
            'encoding': 'utf-8',
        },
    },
    'root': {
        'handlers': ['file'],
        'level': 'DEBUG',
    },
}
```

In this example I am setting the ownership using the `pulse` user and group,
just for the purposes of illustration. Putting it together into a working
script, `chowntest.py`:

```
import logging, logging.config, os, shutil

def owned_file_handler(filename, mode='a', encoding=None, owner=None):
    if owner:
        if not os.path.exists(filename):
            open(filename, 'a').close()
        shutil.chown(filename, *owner)
    return logging.FileHandler(filename, mode, encoding)

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'default': {
            'format': '%(asctime)s %(levelname)s %(name)s %(message)s'
        },
    },
    'handlers': {
        'file':{
            # The values below are popped from this dictionary and
            # used to create the handler, set the handler's level and
            # its formatter.
            '()': owned_file_handler,
            'level':'DEBUG',
            'formatter': 'default',
            # The values below are passed to the handler creator callable
            # as keyword arguments.
            'owner': ['pulse', 'pulse'],
            'filename': 'chowntest.log',
            'mode': 'w',
            'encoding': 'utf-8',
        },
    },
    'root': {
        'handlers': ['file'],
        'level': 'DEBUG',
    },
}

logging.config.dictConfig(LOGGING)
logger = logging.getLogger('mylogger')
logger.debug('A debug message')
```

To run this, you will probably need to run as `root`:

```shell-session
$ sudo python3.3 chowntest.py
$ cat chowntest.log
2013-11-05 09:34:51,128 DEBUG mylogger A debug message
$ ls -l chowntest.log
-rw-r--r-- 1 pulse pulse 55 2013-11-05 09:34 chowntest.log
```

Note that this example uses Python 3.3 because that's where `shutil.chown()`
makes an appearance. This approach should work with any Python version that
supports `dictConfig()` - namely, Python 2.7, 3.2 or later. With pre-3.3
versions, you would need to implement the actual ownership change using e.g.
`os.chown()`.

In practice, the handler-creating function may be in a utility module somewhere
in your project. Instead of the line in the configuration:

```
'()': owned_file_handler,
```

you could use e.g.:

```
'()': 'ext://project.util.owned_file_handler',
```

where `project.util` can be replaced with the actual name of the package
where the function resides. In the above working script, using
`'ext://__main__.owned_file_handler'` should work. Here, the actual callable
is resolved by `dictConfig()` from the `ext://` specification.

This example hopefully also points the way to how you could implement other
types of file change - e.g. setting specific POSIX permission bits - in the
same way, using `os.chmod()`.

Of course, the approach could also be extended to types of handler other than a
`FileHandler` - for example, one of the rotating file handlers,
or a different type of handler altogether.

## Using particular formatting styles throughout your application

In Python 3.2, the `Formatter` gained a `style` keyword
parameter which, while defaulting to `%` for backward compatibility, allowed
the specification of `{` or `$` to support the formatting approaches
supported by `str.format()` and `string.Template`. Note that this
governs the formatting of logging messages for final output to logs, and is
completely orthogonal to how an individual logging message is constructed.

Logging calls (`debug()`, `info()` etc.) only take
positional parameters for the actual logging message itself, with keyword
parameters used only for determining options for how to handle the logging call
(e.g. the `exc_info` keyword parameter to indicate that traceback information
should be logged, or the `extra` keyword parameter to indicate additional
contextual information to be added to the log). So you cannot directly make
logging calls using `str.format()` or `string.Template` syntax,
because internally the logging package uses %-formatting to merge the format
string and the variable arguments. There would be no changing this while preserving
backward compatibility, since all logging calls which are out there in existing
code will be using %-format strings.

There have been suggestions to associate format styles with specific loggers,
but that approach also runs into backward compatibility problems because any
existing code could be using a given logger name and using %-formatting.

For logging to work interoperably between any third-party libraries and your
code, decisions about formatting need to be made at the level of the
individual logging call. This opens up a couple of ways in which alternative
formatting styles can be accommodated.

### Using LogRecord factories

In Python 3.2, along with the `Formatter` changes mentioned
above, the logging package gained the ability to allow users to set their own
`LogRecord` subclasses, using the `setLogRecordFactory()` function.
You can use this to set your own subclass of `LogRecord`, which does the
Right Thing by overriding the `getMessage()` method. The base
class implementation of this method is where the `msg % args` formatting
happens, and where you can substitute your alternate formatting; however, you
should be careful to support all formatting styles and allow %-formatting as
the default, to ensure interoperability with other code. Care should also be
taken to call `str(self.msg)`, just as the base implementation does.

Refer to the reference documentation on `setLogRecordFactory()` and
`LogRecord` for more information.

### Using custom message objects

There is another, perhaps simpler way that you can use {}- and $- formatting to
construct your individual log messages. You may recall (from
arbitrary-object-messages) that when logging you can use an arbitrary
object as a message format string, and that the logging package will call
`str()` on that object to get the actual format string. Consider the
following two classes:

```
class BraceMessage:
    def __init__(self, fmt, /, *args, **kwargs):
        self.fmt = fmt
        self.args = args
        self.kwargs = kwargs

    def __str__(self):
        return self.fmt.format(*self.args, **self.kwargs)

class DollarMessage:
    def __init__(self, fmt, /, **kwargs):
        self.fmt = fmt
        self.kwargs = kwargs

    def __str__(self):
        from string import Template
        return Template(self.fmt).substitute(**self.kwargs)
```

Either of these can be used in place of a format string, to allow {}- or
$-formatting to be used to build the actual "message" part which appears in the
formatted log output in place of “%(message)s” or “{message}” or “$message”.
If you find it a little unwieldy to use the class names whenever you want to log
something, you can make it more palatable if you use an alias such as `M` or
`_` for the message (or perhaps `__`, if you are using `_` for
localization).

Examples of this approach are given below. Firstly, formatting with
`str.format()`:

```
>>> __ = BraceMessage
>>> print(__('Message with {0} {1}', 2, 'placeholders'))
Message with 2 placeholders
>>> class Point: pass
...
>>> p = Point()
>>> p.x = 0.5
>>> p.y = 0.5
>>> print(__('Message with coordinates: ({point.x:.2f}, {point.y:.2f})', point=p))
Message with coordinates: (0.50, 0.50)
```

Secondly, formatting with `string.Template`:

```
>>> __ = DollarMessage
>>> print(__('Message with $num $what', num=2, what='placeholders'))
Message with 2 placeholders
>>>
```

One thing to note is that you pay no significant performance penalty with this
approach: the actual formatting happens not when you make the logging call, but
when (and if) the logged message is actually about to be output to a log by a
handler. So the only slightly unusual thing which might trip you up is that the
parentheses go around the format string and the arguments, not just the format
string. That’s because the __ notation is just syntax sugar for a constructor
call to one of the `{XXX}Message` classes shown above.

## Configuring filters with `dictConfig()`

You *can* configure filters using `dictConfig()`, though it
might not be obvious at first glance how to do it (hence this recipe). Since
`Filter` is the only filter class included in the standard
library, and it is unlikely to cater to many requirements (it's only there as a
base class), you will typically need to define your own `Filter`
subclass with an overridden `filter()` method. To do this,
specify the `()` key in the configuration dictionary for the filter,
specifying a callable which will be used to create the filter (a class is the
most obvious, but you can provide any callable which returns a
`Filter` instance). Here is a complete example:

```
import logging
import logging.config
import sys

class MyFilter(logging.Filter):
    def __init__(self, param=None):
        self.param = param

    def filter(self, record):
        if self.param is None:
            allow = True
        else:
            allow = self.param not in record.msg
        if allow:
            record.msg = 'changed: ' + record.msg
        return allow

LOGGING = {
    'version': 1,
    'filters': {
        'myfilter': {
            '()': MyFilter,
            'param': 'noshow',
        }
    },
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
            'filters': ['myfilter']
        }
    },
    'root': {
        'level': 'DEBUG',
        'handlers': ['console']
    },
}

if __name__ == '__main__':
    logging.config.dictConfig(LOGGING)
    logging.debug('hello')
    logging.debug('hello - noshow')
```

This example shows how you can pass <example-value> data to the callable which
constructs the instance, in the form of keyword parameters. When run, the above
script will print:

```none
changed: hello
```

which shows that the filter is working as configured.

A couple of extra points to note:

- If you can't refer to the callable directly in the configuration (e.g. if it
lives in a different module, and you can't import it directly where the
configuration dictionary is), you can use the form `ext://...` as described
in logging-config-dict-externalobj. For example, you could have used
the text `'ext://__main__.MyFilter'` instead of `MyFilter` in the above
example.

- As well as for filters, this technique can also be used to configure custom
handlers and formatters. See logging-config-dict-userdef for more
information on how logging supports using user-defined objects in its
configuration, and see the other cookbook recipe custom-handlers above.

## Customized exception formatting

There might be times when you want to do customized exception formatting - for
argument's sake, let's say you want exactly one line per logged event, even
when exception information is present. You can do this with a custom formatter
class, as shown in the following example:

```
import logging

class OneLineExceptionFormatter(logging.Formatter):
    def formatException(self, exc_info):
        """
        Format an exception so that it prints on a single line.
        """
        result = super().formatException(exc_info)
        return repr(result)  # or format into one line however you want to

    def format(self, record):
        s = super().format(record)
        if record.exc_text:
            s = s.replace('\n', '') + '|'
        return s

def configure_logging():
    fh = logging.FileHandler('output.txt', 'w')
    f = OneLineExceptionFormatter('%(asctime)s|%(levelname)s|%(message)s|',
                                  '%d/%m/%Y %H:%M:%S')
    fh.setFormatter(f)
    root = logging.getLogger()
    root.setLevel(logging.DEBUG)
    root.addHandler(fh)

def main():
    configure_logging()
    logging.info('Sample message')
    try:
        x = 1 / 0
    except ZeroDivisionError as e:
        logging.exception('ZeroDivisionError: %s', e)

if __name__ == '__main__':
    main()
```

When run, this produces a file with exactly two lines:

```none
28/01/2015 07:21:23|INFO|Sample message|
28/01/2015 07:21:23|ERROR|ZeroDivisionError: division by zero|'Traceback (most recent call last):\n  File "logtest7.py", line 30, in main\n    x = 1 / 0\nZeroDivisionError: division by zero'|
```

While the above treatment is simplistic, it points the way to how exception
information can be formatted to your liking. The `traceback` module may be
helpful for more specialized needs.
