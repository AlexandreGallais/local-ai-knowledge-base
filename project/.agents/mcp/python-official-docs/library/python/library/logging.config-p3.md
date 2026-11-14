---
title: "logging.config --- Logging configuration (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/logging.config.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# logging.config --- Logging configuration (part 3 of 3)

### Access to external objects

There are times where a configuration needs to refer to objects
external to the configuration, for example `sys.stderr`.  If the
configuration dict is constructed using Python code, this is
straightforward, but a problem arises when the configuration is
provided via a text file (e.g. JSON, YAML).  In a text file, there is
no standard way to distinguish `sys.stderr` from the literal string
`'sys.stderr'`.  To facilitate this distinction, the configuration
system looks for certain special prefixes in string values and
treat them specially.  For example, if the literal string
`'ext://sys.stderr'` is provided as a value in the configuration,
then the `ext://` will be stripped off and the remainder of the
value processed using normal import mechanisms.

The handling of such prefixes is done in a way analogous to protocol
handling: there is a generic mechanism to look for prefixes which
match the regular expression `^(?P<prefix>[a-z]+)://(?P<suffix>.*)$`
whereby, if the `prefix` is recognised, the `suffix` is processed
in a prefix-dependent manner and the result of the processing replaces
the string value.  If the prefix is not recognised, then the string
value will be left as-is.

### Access to internal objects

As well as external objects, there is sometimes also a need to refer
to objects in the configuration.  This will be done implicitly by the
configuration system for things that it knows about.  For example, the
string value `'DEBUG'` for a `level` in a logger or handler will
automatically be converted to the value `logging.DEBUG`, and the
`handlers`, `filters` and `formatter` entries will take an
object id and resolve to the appropriate destination object.

However, a more generic mechanism is needed for user-defined
objects which are not known to the `logging` module.  For
example, consider `logging.handlers.MemoryHandler`, which takes
a `target` argument which is another handler to delegate to. Since
the system already knows about this class, then in the configuration,
the given `target` just needs to be the object id of the relevant
target handler, and the system will resolve to the handler from the
id.  If, however, a user defines a `my.package.MyHandler` which has
an `alternate` handler, the configuration system would not know that
the `alternate` referred to a handler.  To cater for this, a generic
resolution system allows the user to specify:

```yaml
handlers:
  file:
    # configuration of file handler goes here

  custom:
    (): my.package.MyHandler
    alternate: cfg://handlers.file
```

The literal string `'cfg://handlers.file'` will be resolved in an
analogous way to strings with the `ext://` prefix, but looking
in the configuration itself rather than the import namespace.  The
mechanism allows access by dot or by index, in a similar way to
that provided by `str.format`.  Thus, given the following snippet:

```yaml
handlers:
  email:
    class: logging.handlers.SMTPHandler
    mailhost: localhost
    fromaddr: user@example.com
    toaddrs:
      - user@example.com
      - user@example.com
    subject: Houston, we have a problem.
```

in the configuration, the string `'cfg://handlers'` would resolve to
the dict with key `handlers`, the string `'cfg://handlers.email`
would resolve to the dict with key `email` in the `handlers` dict,
and so on.  The string `'cfg://handlers.email.toaddrs[1]` would
resolve to `'user@example.com'` and the string
`'cfg://handlers.email.toaddrs[0]'` would resolve to the value
`'user@example.com'`. The `subject` value could be accessed
using either `'cfg://handlers.email.subject'` or, equivalently,
`'cfg://handlers.email[subject]'`.  The latter form only needs to be
used if the key <example-value> spaces or non-alphanumeric characters. Please note
that the characters `[` and `]` are not allowed in the keys. If an
index value consists only of decimal digits, access will be attempted
using the corresponding integer value, falling back to the string
value if needed.

Given a string `cfg://handlers.myhandler.mykey.123`, this will
resolve to `config_dict'handlers''mykey'`.
If the string is specified as `cfg://handlers.myhandler.mykey[123]`,
the system will attempt to retrieve the value from
`config_dict'handlers''mykey'`, and fall back
to `config_dict'handlers''mykey'` if that
fails.

### Import resolution and custom importers

Import resolution, by default, uses the builtin `__import__()` function
to do its importing. You may want to replace this with your own importing
mechanism: if so, you can replace the `importer` attribute of the
`DictConfigurator` or its superclass, the
`BaseConfigurator` class. However, you need to be
careful because of the way functions are accessed from classes via
descriptors. If you are using a Python callable to do your imports, and you
want to define it at class level rather than instance level, you need to wrap
it with `staticmethod()`. For example:

```
from importlib import import_module
from logging.config import BaseConfigurator

BaseConfigurator.importer = staticmethod(import_module)
```

You don't need to wrap with `staticmethod()` if you're setting the import
callable on a configurator *instance*.

### Configuring QueueHandler and QueueListener

If you want to configure a `QueueHandler`, noting that this
is normally used in conjunction with a `QueueListener`, you
can configure both together. After the configuration, the `QueueListener` instance
will be available as the `listener` attribute of
the created handler, and that in turn will be available to you using
`getHandlerByName()` and passing the name you have used for the
`QueueHandler` in your configuration. The dictionary schema for configuring the pair
is shown in the example YAML snippet below.

```yaml
handlers:
  qhand:
    class: logging.handlers.QueueHandler
    queue: my.module.queue_factory
    listener: my.package.CustomListener
    handlers:
      - hand_name_1
      - hand_name_2
      ...
```

The `queue` and `listener` keys are optional.

If the `queue` key is present, the corresponding value can be one of the following:

- An object implementing the `Queue.put_nowait()`
and `Queue.get()` public API. For instance, this may be
an actual instance of `queue.Queue` or a subclass thereof, or a proxy
obtained by `multiprocessing.managers.SyncManager.Queue()`.

This is of course only possible if you are constructing or modifying
the configuration dictionary in code.

- A string that resolves to a callable which, when called with no arguments, returns
the queue instance to use. That callable could be a `queue.Queue` subclass
or a function which returns a suitable queue instance,
such as `my.module.queue_factory()`.

- A dict with a `'()'` key which is constructed in the usual way as discussed in
logging-config-dict-userdef. The result of this construction should be a
`queue.Queue` instance.

If the  `queue` key is absent, a standard unbounded `queue.Queue` instance is
created and used.

If the `listener` key is present, the corresponding value can be one of the following:

- A subclass of `logging.handlers.QueueListener`. This is of course only
possible if you are constructing or modifying the configuration dictionary in
code.

- A string which resolves to a class which is a subclass of `QueueListener`, such as
`'my.package.CustomListener'`.

- A dict with a `'()'` key which is constructed in the usual way as discussed in
logging-config-dict-userdef. The result of this construction should be a
callable with the same signature as the `QueueListener` initializer.

If the `listener` key is absent, `logging.handlers.QueueListener` is used.

The values under the `handlers` key are the names of other handlers in the
configuration (not shown in the above snippet) which will be passed to the queue
listener.

Any custom queue handler and listener classes will need to be defined with the same
initialization signatures as `QueueHandler` and
`QueueListener`.

> *Added in version 3.12.*

## Configuration file format

The configuration file format understood by `fileConfig()` is based on
`configparser` functionality. The file must contain sections called
`[loggers]`, `[handlers]` and `[formatters]` which identify by name the
entities of each type which are defined in the file. For each such entity, there
is a separate section which identifies how that entity is configured.  Thus, for
a logger named `log01` in the `[loggers]` section, the relevant
configuration details are held in a section `[logger_log01]`. Similarly, a
handler called `hand01` in the `[handlers]` section will have its
configuration held in a section called `[handler_hand01]`, while a formatter
called `form01` in the `[formatters]` section will have its configuration
specified in a section called `[formatter_form01]`. The root logger
configuration must be specified in a section called `[logger_root]`.

> **Note:** The `fileConfig()` API is older than the `dictConfig()` API and does
> not provide functionality to cover certain aspects of logging. For example,
> you cannot configure `Filter` objects, which provide for
> filtering of messages beyond simple integer levels, using `fileConfig()`.
> If you need to have instances of `Filter` in your logging
> configuration, you will need to use `dictConfig()`. Note that future
> enhancements to configuration functionality will be added to
> `dictConfig()`, so it's worth considering transitioning to this newer
> API when it's convenient to do so.

Examples of these sections in the file are given below.

```ini
[loggers]
keys=root,log02,log03,log04,log05,log06,log07

[handlers]
keys=hand01,hand02,hand03,hand04,hand05,hand06,hand07,hand08,hand09

[formatters]
keys=form01,form02,form03,form04,form05,form06,form07,form08,form09
```

The root logger must specify a level and a list of handlers. An example of a
root logger section is given below.

```ini
[logger_root]
level=NOTSET
handlers=hand01
```

The `level` entry can be one of `DEBUG, INFO, WARNING, ERROR, CRITICAL` or
`NOTSET`. For the root logger only, `NOTSET` means that all messages will be
logged. Level values are evaluated in the context of the `logging`
package's namespace.

The `handlers` entry is a comma-separated list of handler names, which must
appear in the `[handlers]` section. These names must appear in the
`[handlers]` section and have corresponding sections in the configuration
file.

For loggers other than the root logger, some additional information is required.
This is illustrated by the following example.

```ini
[logger_parser]
level=DEBUG
handlers=hand01
propagate=1
qualname=compiler.parser
```

The `level` and `handlers` entries are interpreted as for the root logger,
except that if a non-root logger's level is specified as `NOTSET`, the system
consults loggers higher up the hierarchy to determine the effective level of the
logger. The `propagate` entry is set to 1 to indicate that messages must
propagate to handlers higher up the logger hierarchy from this logger, or 0 to
indicate that messages are **not** propagated to handlers up the hierarchy. The
`qualname` entry is the hierarchical channel name of the logger, that is to
say the name used by the application to get the logger.

Sections which specify handler configuration are exemplified by the following.

```ini
[handler_hand01]
class=StreamHandler
level=NOTSET
formatter=form01
args=(sys.stdout,)
```

The `class` entry indicates the handler's class (as determined by `eval()`
in the `logging` package's namespace). The `level` is interpreted as for
loggers, and `NOTSET` is taken to mean 'log everything'.

The `formatter` entry indicates the key name of the formatter for this
handler. If blank, a default formatter (`logging._defaultFormatter`) is used.
If a name is specified, it must appear in the `[formatters]` section and have
a corresponding section in the configuration file.

The `args` entry, when evaluated in the context of the `logging`
package's namespace, is the list of arguments to the constructor for the handler
class. Refer to the constructors for the relevant handlers, or to the examples
below, to see how typical entries are constructed. If not provided, it defaults
to `()`.

The optional `kwargs` entry, when evaluated in the context of the
`logging` package's namespace, is the keyword argument dict to the constructor
for the handler class. If not provided, it defaults to `{}`.

```ini
[handler_hand02]
class=FileHandler
level=DEBUG
formatter=form02
args=('python.log', 'w')

[handler_hand03]
class=handlers.SocketHandler
level=INFO
formatter=form03
args=('localhost', handlers.DEFAULT_TCP_LOGGING_PORT)

[handler_hand04]
class=handlers.DatagramHandler
level=WARN
formatter=form04
args=('localhost', handlers.DEFAULT_UDP_LOGGING_PORT)

[handler_hand05]
class=handlers.SysLogHandler
level=ERROR
formatter=form05
args=(('localhost', handlers.SYSLOG_UDP_PORT), handlers.SysLogHandler.LOG_USER)

[handler_hand06]
class=handlers.NTEventLogHandler
level=CRITICAL
formatter=form06
args=('Python Application', '', 'Application')

[handler_hand07]
class=handlers.SMTPHandler
level=WARN
formatter=form07
args=('localhost', 'from@abc', ['user1@abc', 'user2@xyz'], 'Logger Subject')
kwargs={'timeout': 10.0}

[handler_hand08]
class=handlers.MemoryHandler
level=NOTSET
formatter=form08
target=
args=(10, ERROR)

[handler_hand09]
class=handlers.HTTPHandler
level=NOTSET
formatter=form09
args=('localhost:9022', '/log', 'GET')
kwargs={'secure': True}
```

Sections which specify formatter configuration are typified by the following.

```ini
[formatter_form01]
format=F1 %(asctime)s %(levelname)s %(message)s %(customfield)s
datefmt=
style=%
validate=True
defaults={'customfield': 'defaultvalue'}
class=logging.Formatter
```

The arguments for the formatter configuration are the same as the keys
in the dictionary schema :ref:`formatters section
<logging-config-dictschema-formatters>`.

The `defaults` entry, when evaluated in the context of
the `logging` package's namespace, is a dictionary of default values for
custom formatting fields. If not provided, it defaults to `None`.

> **Note:** Due to the use of `eval()` as described above, there are
> potential security risks which result from using the `listen()` to send
> and receive configurations via sockets. The risks are limited to where
> multiple users with no mutual trust run code on the same machine; see the
> `listen()` documentation for more information.

> **See also:** Module `logging`
> API reference for the logging module.
>
> Module `logging.handlers`
> Useful handlers included with the logging module.
