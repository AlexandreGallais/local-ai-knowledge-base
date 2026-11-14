---
title: "logging.config --- Logging configuration (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/logging.config.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# logging.config --- Logging configuration (part 2 of 3)

## Configuration dictionary schema

Describing a logging configuration requires listing the various
objects to create and the connections between them; for example, you
may create a handler named 'console' and then say that the logger
named 'startup' will send its messages to the 'console' handler.
These objects aren't limited to those provided by the `logging`
module because you might write your own formatter or handler class.
The parameters to these classes may also need to include external
objects such as `sys.stderr`.  The syntax for describing these
objects and connections is defined in logging-config-dict-connections
below.

### Dictionary Schema Details

The dictionary passed to `dictConfig()` must contain the following
keys:

- *version* - to be set to an integer value representing the schema
version.  The only valid value at present is 1, but having this key
allows the schema to evolve while still preserving backwards
compatibility.

All other keys are optional, but if present they will be interpreted
as described below.  In all cases below where a 'configuring dict' is
mentioned, it will be checked for the special `'()'` key to see if a
custom instantiation is required.  If so, the mechanism described in
logging-config-dict-userdef below is used to create an instance;
otherwise, the context is used to determine what to instantiate.

- *formatters* - the corresponding value will be a dict in which each
key is a formatter id and each value is a dict describing how to
configure the corresponding `Formatter` instance.

The configuring dict is searched for the following optional keys
which correspond to the arguments passed to create a
`Formatter` object:

- `format`
- `datefmt`
- `style`
- `validate` (since version >=3.8)
- `defaults` (since version >=3.12)

An optional `class` key <example-value> the name of the formatter's
class (as a dotted module and class name).  The instantiation
arguments are as for `Formatter`, thus this key is
most useful for instantiating a customised subclass of
`Formatter`.  For example, the alternative class
might present exception tracebacks in an expanded or condensed
format.  If your formatter requires different or extra configuration
keys, you should use logging-config-dict-userdef.

- *filters* - the corresponding value will be a dict in which each key
is a filter id and each value is a dict describing how to configure
the corresponding Filter instance.

The configuring dict is searched for the key `name` (defaulting to the
empty string) and this is used to construct a `logging.Filter`
instance.

- *handlers* - the corresponding value will be a dict in which each
key is a handler id and each value is a dict describing how to
configure the corresponding Handler instance.

The configuring dict is searched for the following keys:

- `class` (mandatory).  This is the fully qualified name of the
handler class.

- `level` (optional).  The level of the handler.

- `formatter` (optional).  The id of the formatter for this
handler.

- `filters` (optional).  A list of ids of the filters for this
handler.

> *Changed in version 3.11.*
> `filters` can take filter instances in addition to ids.

All *other* keys are passed through as keyword arguments to the
handler's constructor.  For example, given the snippet:

```yaml
handlers:
  console:
    class : logging.StreamHandler
    formatter: brief
    level   : INFO
    filters: [allow_foo]
    stream  : ext://sys.stdout
  file:
    class : logging.handlers.RotatingFileHandler
    formatter: precise
    filename: logconfig.log
    maxBytes: 1024
    backupCount: 3
```

the handler with id `console` is instantiated as a
`logging.StreamHandler`, using `sys.stdout` as the underlying
stream.  The handler with id `file` is instantiated as a
`logging.handlers.RotatingFileHandler` with the keyword arguments
`filename='logconfig.log', maxBytes=1024, backupCount=3`.

- *loggers* - the corresponding value will be a dict in which each key
is a logger name and each value is a dict describing how to
configure the corresponding Logger instance.

The configuring dict is searched for the following keys:

- `level` (optional).  The level of the logger.

- `propagate` (optional).  The propagation setting of the logger.

- `filters` (optional).  A list of ids of the filters for this
logger.

> *Changed in version 3.11.*
> `filters` can take filter instances in addition to ids.

- `handlers` (optional).  A list of ids of the handlers for this
logger.

The specified loggers will be configured according to the level,
propagation, filters and handlers specified.

- *root* - this will be the configuration for the root logger.
Processing of the configuration will be as for any logger, except
that the `propagate` setting will not be applicable.

- *incremental* - whether the configuration is to be interpreted as
incremental to the existing configuration.  This value defaults to
`False`, which means that the specified configuration replaces the
existing configuration with the same semantics as used by the
existing `fileConfig()` API.

If the specified value is `True`, the configuration is processed
as described in the section on logging-config-dict-incremental.

- *disable_existing_loggers* - whether any existing non-root loggers are
to be disabled. This setting mirrors the parameter of the same name in
`fileConfig()`. If absent, this parameter defaults to `True`.
This value is ignored if *incremental* is `True`.

### Incremental Configuration

It is difficult to provide complete flexibility for incremental
configuration.  For example, because objects such as filters
and formatters are anonymous, once a configuration is set up, it is
not possible to refer to such anonymous objects when augmenting a
configuration.

Furthermore, there is not a compelling case for arbitrarily altering
the object graph of loggers, handlers, filters, formatters at
run-time, once a configuration is set up; the verbosity of loggers and
handlers can be controlled just by setting levels (and, in the case of
loggers, propagation flags).  Changing the object graph arbitrarily in
a safe way is problematic in a multi-threaded environment; while not
impossible, the benefits are not worth the complexity it adds to the
implementation.

Thus, when the `incremental` key of a configuration dict is present
and is `True`, the system will completely ignore any `formatters` and
`filters` entries, and process only the `level`
settings in the `handlers` entries, and the `level` and
`propagate` settings in the `loggers` and `root` entries.

Using a value in the configuration dict lets configurations to be sent
over the wire as pickled dicts to a socket listener. Thus, the logging
verbosity of a long-running application can be altered over time with
no need to stop and restart the application.

### Object connections

The schema describes a set of logging objects - loggers,
handlers, formatters, filters - which are connected to each other in
an object graph.  Thus, the schema needs to represent connections
between the objects.  For example, say that, once configured, a
particular logger has attached to it a particular handler.  For the
purposes of this discussion, we can say that the logger represents the
source, and the handler the destination, of a connection between the
two.  Of course in the configured objects this is represented by the
logger holding a reference to the handler.  In the configuration dict,
this is done by giving each destination object an id which identifies
it unambiguously, and then using the id in the source object's
configuration to indicate that a connection exists between the source
and the destination object with that id.

So, for example, consider the following YAML snippet:

```yaml
formatters:
  brief:
    # configuration for formatter with id 'brief' goes here
  precise:
    # configuration for formatter with id 'precise' goes here
handlers:
  h1: #This is an id
   # configuration of handler with id 'h1' goes here
   formatter: brief
  h2: #This is another id
   # configuration of handler with id 'h2' goes here
   formatter: precise
loggers:
  foo.bar.baz:
    # other configuration for logger 'foo.bar.baz'
    handlers: [h1, h2]
```

(Note: YAML used here because it's a little more readable than the
equivalent Python source form for the dictionary.)

The ids for loggers are the logger names which would be used
programmatically to obtain a reference to those loggers, e.g.
`foo.bar.baz`.  The ids for Formatters and Filters can be any string
value (such as `brief`, `precise` above) and they are transient,
in that they are only meaningful for processing the configuration
dictionary and used to determine connections between objects, and are
not persisted anywhere when the configuration call is complete.

The above snippet indicates that logger named `foo.bar.baz` should
have two handlers attached to it, which are described by the handler
ids `h1` and `h2`. The formatter for `h1` is that described by id
`brief`, and the formatter for `h2` is that described by id
`precise`.

### User-defined objects

The schema supports user-defined objects for handlers, filters and
formatters.  (Loggers do not need to have different types for
different instances, so there is no support in this configuration
schema for user-defined logger classes.)

Objects to be configured are described by dictionaries
which detail their configuration.  In some places, the logging system
will be able to infer from the context how an object is to be
instantiated, but when a user-defined object is to be instantiated,
the system will not know how to do this.  In order to provide complete
flexibility for user-defined object instantiation, the user needs
to provide a 'factory' - a callable which is called with a
configuration dictionary and which returns the instantiated object.
This is signalled by an absolute import path to the factory being
made available under the special key `'()'`.  Here's a concrete
example:

```yaml
formatters:
  brief:
    format: '%(message)s'
  default:
    format: '%(asctime)s %(levelname)-8s %(name)-15s %(message)s'
    datefmt: '%Y-%m-%d %H:%M:%S'
  custom:
      (): my.package.customFormatterFactory
      bar: baz
      spam: 99.9
      answer: 42
```

The above YAML snippet defines three formatters.  The first, with id
`brief`, is a standard `logging.Formatter` instance with the
specified format string.  The second, with id `default`, has a
longer format and also defines the time format explicitly, and will
result in a `logging.Formatter` initialized with those two format
strings.  Shown in Python source form, the `brief` and `default`
formatters have configuration sub-dictionaries:

```
{
  'format' : '%(message)s'
}
```

and:

```
{
  'format' : '%(asctime)s %(levelname)-8s %(name)-15s %(message)s',
  'datefmt' : '%Y-%m-%d %H:%M:%S'
}
```

respectively, and as these dictionaries do not contain the special key
`'()'`, the instantiation is inferred from the context: as a result,
standard `logging.Formatter` instances are created.  The
configuration sub-dictionary for the third formatter, with id
`custom`, is:

```
{
  '()' : 'my.package.customFormatterFactory',
  'bar' : 'baz',
  'spam' : 99.9,
  'answer' : 42
}
```

and this contains the special key `'()'`, which means that
user-defined instantiation is wanted.  In this case, the specified
factory callable will be used. If it is an actual callable it will be
used directly - otherwise, if you specify a string (as in the example)
the actual callable will be located using normal import mechanisms.
The callable will be called with the **remaining** items in the
configuration sub-dictionary as keyword arguments.  In the above
example, the formatter with id `custom` will be assumed to be
returned by the call:

```
my.package.customFormatterFactory(bar='baz', spam=99.9, answer=42)
```

> **Warning:** The values for keys such as `bar`, `spam` and `answer` in
> the above example should not be configuration dictionaries or references such
> as `cfg://foo` or `ext://bar`, because they will not be processed by the
> configuration machinery, but passed to the callable as-is.

The key `'()'` has been used as the special key <example-value> it is not a
valid keyword parameter name, and so will not clash with the names of
the keyword arguments used in the call.  The `'()'` also serves as a
mnemonic that the corresponding value is a callable.

> *Changed in version 3.11.*
> The `filters` member of `handlers` and `loggers` can take
> filter instances in addition to ids.

You can also specify a special key `'.'` whose value is a
mapping of attribute names to values. If found, the specified attributes will
be set on the user-defined object before it is returned. Thus, with the
following configuration:

```
{
  '()' : 'my.package.customFormatterFactory',
  'bar' : 'baz',
  'spam' : 99.9,
  'answer' : 42,
  '.' : {
    'foo': 'bar',
    'baz': 'bozz'
  }
}
```

the returned formatter will have attribute `foo` set to `'bar'` and
attribute `baz` set to `'bozz'`.

> **Warning:** The values for attributes such as `foo` and `baz` in
> the above example should not be configuration dictionaries or references such
> as `cfg://foo` or `ext://bar`, because they will not be processed by the
> configuration machinery, but set as attribute values as-is.

### Handler configuration order

Handlers are configured in alphabetical order of their keys, and a configured
handler replaces the configuration dictionary in (a working copy of) the
`handlers` dictionary in the schema. If you use a construct such as
`cfg://handlers.foo`, then initially `handlers['foo']` points to the
configuration dictionary for the handler named `foo`, and later (once that
handler has been configured) it points to the configured handler instance.
Thus, `cfg://handlers.foo` could resolve to either a dictionary or a handler
instance. In general, it is wise to name handlers in a way such that dependent
handlers are configured *after* any handlers they depend on; that allows
something like `cfg://handlers.foo` to be used in configuring a handler that
depends on handler `foo`. If that dependent handler were named `bar`,
problems would result, because the configuration of `bar` would be attempted
before that of `foo`, and `foo` would not yet have been configured.
However, if the dependent handler were named `foobar`, it would be configured
after `foo`, with the result that `cfg://handlers.foo` would resolve to
configured handler `foo`, and not its configuration dictionary.
