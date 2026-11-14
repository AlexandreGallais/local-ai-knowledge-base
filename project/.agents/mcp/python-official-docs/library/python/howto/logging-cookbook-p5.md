---
title: "Logging Cookbook (part 5 of 14)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/logging-cookbook.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Logging Cookbook (part 5 of 14)

## Use of `contextvars`

Since Python 3.7, the `contextvars` module has provided context-local storage
which works for both `threading` and `asyncio` processing needs. This type
of storage may thus be generally preferable to thread-locals. The following example
shows how, in a multi-threaded environment, logs can populated with contextual
information such as, for example, request attributes handled by web applications.

For the purposes of illustration, say that you have different web applications, each
independent of the other but running in the same Python process and using a library
common to them. How can each of these applications have their own log, where all
logging messages from the library (and other request processing code) are directed to
the appropriate application's log file, while including in the log additional
contextual information such as client IP, HTTP request method and client username?

Let's assume that the library can be simulated by the following code:

```python
# webapplib.py
import logging
import time

logger = logging.getLogger(__name__)

def useful():
    # Just a representative event logged from the library
    logger.debug('Hello from webapplib!')
    # Just sleep for a bit so other threads get to run
    time.sleep(0.01)
```

We can simulate the multiple web applications by means of two simple classes,
`Request` and `WebApp`. These simulate how real threaded web applications work -
each request is handled by a thread:

```python
# main.py
import argparse
from contextvars import ContextVar
import logging
import os
from random import choice
import threading
import webapplib

logger = logging.getLogger(__name__)
root = logging.getLogger()
root.setLevel(logging.DEBUG)

class Request:
    """
    A simple dummy request class which just holds dummy HTTP request method,
    client IP address and client username
    """
    def __init__(self, method, ip, user):
        self.method = method
        self.ip = ip
        self.user = user

# A dummy set of requests which will be used in the simulation - we'll just pick
# from this list randomly. Note that all GET requests are from 192.168.2.XXX
# addresses, whereas POST requests are from 192.16.3.XXX addresses. Three users
# are represented in the sample requests.

REQUESTS = [
    Request('GET', '192.168.2.20', 'jim'),
    Request('POST', '192.168.3.20', 'fred'),
    Request('GET', '192.168.2.21', 'sheila'),
    Request('POST', '192.168.3.21', 'jim'),
    Request('GET', '192.168.2.22', 'fred'),
    Request('POST', '192.168.3.22', 'sheila'),
]

# Note that the format string includes references to request context information
# such as HTTP method, client IP and username

formatter = logging.Formatter('%(threadName)-11s %(appName)s %(name)-9s %(user)-6s %(ip)s %(method)-4s %(message)s')

# Create our context variables. These will be filled at the start of request
# processing, and used in the logging that happens during that processing

ctx_request = ContextVar('request')
ctx_appname = ContextVar('appname')

class InjectingFilter(logging.Filter):
    """
    A filter which injects context-specific information into logs and ensures
    that only information for a specific webapp is included in its log
    """
    def __init__(self, app):
        self.app = app

    def filter(self, record):
        request = ctx_request.get()
        record.method = request.method
        record.ip = request.ip
        record.user = request.user
        record.appName = appName = ctx_appname.get()
        return appName == self.app.name

class WebApp:
    """
    A dummy web application class which has its own handler and filter for a
    webapp-specific log.
    """
    def __init__(self, name):
        self.name = name
        handler = logging.FileHandler(name + '.log', 'w')
        f = InjectingFilter(self)
        handler.setFormatter(formatter)
        handler.addFilter(f)
        root.addHandler(handler)
        self.num_requests = 0

    def process_request(self, request):
        """
        This is the dummy method for processing a request. It's called on a
        different thread for every request. We store the context information into
        the context vars before doing anything else.
        """
        ctx_request.set(request)
        ctx_appname.set(self.name)
        self.num_requests += 1
        logger.debug('Request processing started')
        webapplib.useful()
        logger.debug('Request processing finished')

def main():
    fn = os.path.splitext(os.path.basename(__file__))[0]
    adhf = argparse.ArgumentDefaultsHelpFormatter
    ap = argparse.ArgumentParser(formatter_class=adhf, prog=fn,
                                 description='Simulate a couple of web '
                                             'applications handling some '
                                             'requests, showing how request '
                                             'context can be used to '
                                             'populate logs')
    aa = ap.add_argument
    aa('--count', '-c', type=int, default=100, help='How many requests to simulate')
    options = ap.parse_args()

    # Create the dummy webapps and put them in a list which we can use to select
    # from randomly
    app1 = WebApp('app1')
    app2 = WebApp('app2')
    apps = [app1, app2]
    threads = []
    # Add a common handler which will capture all events
    handler = logging.FileHandler('app.log', 'w')
    handler.setFormatter(formatter)
    root.addHandler(handler)

    # Generate calls to process requests
    for i in range(options.count):
        try:
            # Pick an app at random and a request for it to process
            app = choice(apps)
            request = choice(REQUESTS)
            # Process the request in its own thread
            t = threading.Thread(target=app.process_request, args=(request,))
            threads.append(t)
            t.start()
        except KeyboardInterrupt:
            break

    # Wait for the threads to terminate
    for t in threads:
        t.join()

    for app in apps:
        print('%s processed %s requests' % (app.name, app.num_requests))

if __name__ == '__main__':
    main()
```

If you run the above, you should find that roughly half the requests go
into `app1.log` and the rest into `app2.log`, and the all the requests are
logged to `app.log`. Each webapp-specific log will contain only log entries for
only that webapp, and the request information will be displayed consistently in the
log (i.e. the information in each dummy request will always appear together in a log
line). This is illustrated by the following shell output:

```shell
~/logging-contextual-webapp$ python main.py
app1 processed 51 requests
app2 processed 49 requests
~/logging-contextual-webapp$ wc -l *.log
  153 app1.log
  147 app2.log
  300 app.log
  600 total
~/logging-contextual-webapp$ head -3 app1.log
Thread-3 (process_request) app1 __main__  jim    192.168.3.21 POST Request processing started
Thread-3 (process_request) app1 webapplib jim    192.168.3.21 POST Hello from webapplib!
Thread-5 (process_request) app1 __main__  jim    192.168.3.21 POST Request processing started
~/logging-contextual-webapp$ head -3 app2.log
Thread-1 (process_request) app2 __main__  sheila 192.168.2.21 GET  Request processing started
Thread-1 (process_request) app2 webapplib sheila 192.168.2.21 GET  Hello from webapplib!
Thread-2 (process_request) app2 __main__  jim    192.168.2.20 GET  Request processing started
~/logging-contextual-webapp$ head app.log
Thread-1 (process_request) app2 __main__  sheila 192.168.2.21 GET  Request processing started
Thread-1 (process_request) app2 webapplib sheila 192.168.2.21 GET  Hello from webapplib!
Thread-2 (process_request) app2 __main__  jim    192.168.2.20 GET  Request processing started
Thread-3 (process_request) app1 __main__  jim    192.168.3.21 POST Request processing started
Thread-2 (process_request) app2 webapplib jim    192.168.2.20 GET  Hello from webapplib!
Thread-3 (process_request) app1 webapplib jim    192.168.3.21 POST Hello from webapplib!
Thread-4 (process_request) app2 __main__  fred   192.168.2.22 GET  Request processing started
Thread-5 (process_request) app1 __main__  jim    192.168.3.21 POST Request processing started
Thread-4 (process_request) app2 webapplib fred   192.168.2.22 GET  Hello from webapplib!
Thread-6 (process_request) app1 __main__  jim    192.168.3.21 POST Request processing started
~/logging-contextual-webapp$ grep app1 app1.log | wc -l
153
~/logging-contextual-webapp$ grep app2 app2.log | wc -l
147
~/logging-contextual-webapp$ grep app1 app.log | wc -l
153
~/logging-contextual-webapp$ grep app2 app.log | wc -l
147
```

## Imparting contextual information in handlers

Each `Handler` has its own chain of filters.
If you want to add contextual information to a `LogRecord` without leaking
it to other handlers, you can use a filter that returns
a new `LogRecord` instead of modifying it in-place, as shown in the following script:

```
import copy
import logging

def filter(record: logging.LogRecord):
    record = copy.copy(record)
    record.user = 'jim'
    return record

if __name__ == '__main__':
    logger = logging.getLogger()
    logger.setLevel(logging.INFO)
    handler = logging.StreamHandler()
    formatter = logging.Formatter('%(message)s from %(user)-8s')
    handler.setFormatter(formatter)
    handler.addFilter(filter)
    logger.addHandler(handler)

    logger.info('A log message')
```
