---
title: "logging --- Logging facility for Python (part 1 of 7)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/logging.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `logging` --- Logging facility for Python

Module `logging`.

**Source code:** Lib/logging/__init__.py

Important

This page contains the API reference information. For tutorial
information and discussion of more advanced topics, see

- Basic <example-value>
- Advanced Tutorial
- Logging Cookbook

This module defines functions and classes which implement a flexible event
logging system for applications and libraries.

The key <example-value> of having the logging API provided by a standard library module
is that all Python modules can participate in logging, so your application log
can include your own messages integrated with messages from third-party
modules.

Here's a simple example of idiomatic usage::

```
# myapp.py
import logging
import mylib
logger = logging.getLogger(__name__)

def main():
    logging.basicConfig(filename='myapp.log', level=logging.INFO)
    logger.info('Started')
    mylib.do_something()
    logger.info('Finished')

if __name__ == '__main__':
    main()
```

```
# mylib.py
import logging
logger = logging.getLogger(__name__)

def do_something():
    logger.info('Doing something')
```

If you run *myapp.py*, you should see this in *myapp.log*:

```none
INFO:__main__:Started
INFO:mylib:Doing something
INFO:__main__:Finished
```

The key <example-value> of this idiomatic usage is that the majority of code is simply
creating a module level logger with `getLogger(__name__)`, and using that
logger to do any needed logging. This is concise, while allowing downstream
code fine-grained control if needed. Logged messages to the module-level logger
get forwarded to handlers of loggers in higher-level modules, all the way up to
the highest-level logger known as the root logger; this approach is known as
hierarchical logging.

For logging to be useful, it needs to be configured: setting the levels and
destinations for each logger, potentially changing how specific modules log,
often based on command-line arguments or application configuration. In most
cases, like the one above, only the root logger needs to be so configured, since
all the lower level loggers at module level eventually forward their messages to
its handlers.  `basicConfig()` provides a quick way to configure
the root logger that handles many use cases.

The module provides a lot of functionality and flexibility.  If you are
unfamiliar with logging, the best way to get to grips with it is to view the
tutorials (**see the links above and on the right**).

The basic <example-value> defined by the module, together with their attributes and
methods, are listed in the sections below.

- Loggers expose the interface that application code directly uses.
- Handlers send the log records (created by loggers) to the appropriate
destination.
- Filters provide a finer grained facility for determining which log records
to output.
- Formatters specify the layout of log records in the final output.
