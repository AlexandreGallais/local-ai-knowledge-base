---
title: "Logging Cookbook (part 3 of 14)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/logging-cookbook.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Logging Cookbook (part 3 of 14)

## Sending and receiving logging events across a network

Let's say you want to send logging events across a network, and handle them at
the receiving end. A simple way of doing this is attaching a
`SocketHandler` instance to the root logger at the sending end:

```
import logging, logging.handlers

rootLogger = logging.getLogger()
rootLogger.setLevel(logging.DEBUG)
socketHandler = logging.handlers.SocketHandler('localhost',
                    logging.handlers.DEFAULT_TCP_LOGGING_PORT)
# don't bother with a formatter, since a socket handler sends the event as
# an unformatted pickle
rootLogger.addHandler(socketHandler)

# Now, we can log to the root logger, or any other logger. First the root...
logging.info('Jackdaws love my big sphinx of quartz.')

# Now, define a couple of other loggers which might represent areas in your
# application:

logger1 = logging.getLogger('myapp.area1')
logger2 = logging.getLogger('myapp.area2')

logger1.debug('Quick zephyrs blow, vexing daft Jim.')
logger1.info('How quickly daft jumping zebras vex.')
logger2.warning('Jail zesty vixen who grabbed pay from quack.')
logger2.error('The five boxing wizards jump quickly.')
```

At the receiving end, you can set up a receiver using the `socketserver`
module. Here is a basic <example-value> example:

```
import pickle
import logging
import logging.handlers
import socketserver
import struct

class LogRecordStreamHandler(socketserver.StreamRequestHandler):
    """Handler for a streaming logging request.

    This basically logs the record using whatever logging policy is
    configured locally.
    """

    def handle(self):
        """
        Handle multiple requests - each expected to be a 4-byte length,
        followed by the LogRecord in pickle format. Logs the record
        according to whatever policy is configured locally.
        """
        while True:
            chunk = self.connection.recv(4)
            if len(chunk) < 4:
                break
            slen = struct.unpack('>L', chunk)[0]
            chunk = self.connection.recv(slen)
            while len(chunk) < slen:
                chunk = chunk + self.connection.recv(slen - len(chunk))
            obj = self.unPickle(chunk)
            record = logging.makeLogRecord(obj)
            self.handleLogRecord(record)

    def unPickle(self, data):
        return pickle.loads(data)

    def handleLogRecord(self, record):
        # if a name is specified, we use the named logger rather than the one
        # implied by the record.
        if self.server.logname is not None:
            name = self.server.logname
        else:
            name = record.name
        logger = logging.getLogger(name)
        # N.B. EVERY record gets logged. This is because Logger.handle
        # is normally called AFTER logger-level filtering. If you want
        # to do filtering, do it at the client end to save wasting
        # cycles and network bandwidth!
        logger.handle(record)

class LogRecordSocketReceiver(socketserver.ThreadingTCPServer):
    """
    Simple TCP socket-based logging receiver suitable for testing.
    """

    allow_reuse_address = True

    def __init__(self, host='localhost',
                 port=logging.handlers.DEFAULT_TCP_LOGGING_PORT,
                 handler=LogRecordStreamHandler):
        socketserver.ThreadingTCPServer.__init__(self, (host, port), handler)
        self.abort = 0
        self.timeout = 1
        self.logname = None

    def serve_until_stopped(self):
        import select
        abort = 0
        while not abort:
            rd, wr, ex = select.select([self.socket.fileno()],
                                       [], [],
                                       self.timeout)
            if rd:
                self.handle_request()
            abort = self.abort

def main():
    logging.basicConfig(
        format='%(relativeCreated)5d %(name)-15s %(levelname)-8s %(message)s')
    tcpserver = LogRecordSocketReceiver()
    print('About to start TCP server...')
    tcpserver.serve_until_stopped()

if __name__ == '__main__':
    main()
```

First run the server, and then the client. On the client side, nothing is
printed on the console; on the server side, you should see something like:

```none
About to start TCP server...
   59 root            INFO     Jackdaws love my big sphinx of quartz.
   59 myapp.area1     DEBUG    Quick zephyrs blow, vexing daft Jim.
   69 myapp.area1     INFO     How quickly daft jumping zebras vex.
   69 myapp.area2     WARNING  Jail zesty vixen who grabbed pay from quack.
   69 myapp.area2     ERROR    The five boxing wizards jump quickly.
```

Note that there are some security issues with pickle in some scenarios. If
these affect you, you can use an alternative serialization scheme by overriding
the `makePickle()` method and implementing your
alternative there, as well as adapting the above script to use your alternative
serialization.

### Running a logging socket listener in production

To run a logging listener in production, you may need to use a
process-management tool such as Supervisor.
Here is a Gist
which provides the bare-bones files to run the above functionality using
Supervisor. It consists of the following files:

```text
+-------------------------+----------------------------------------------------+
| File                    | Purpose                                            |
+=========================+====================================================+
| :file:`prepare.sh`      | A Bash script to prepare the environment for       |
|                         | testing                                            |
+-------------------------+----------------------------------------------------+
| :file:`supervisor.conf` | The Supervisor configuration file, which has       |
|                         | entries for the listener and a multi-process web   |
|                         | application                                        |
+-------------------------+----------------------------------------------------+
| :file:`ensure_app.sh`   | A Bash script to ensure that Supervisor is running |
|                         | with the above configuration                       |
+-------------------------+----------------------------------------------------+
| :file:`log_listener.py` | The socket listener program which receives log     |
|                         | events and records them to a file                  |
+-------------------------+----------------------------------------------------+
| :file:`main.py`         | A simple web application which performs logging    |
|                         | via a socket connected to the listener             |
+-------------------------+----------------------------------------------------+
| :file:`webapp.json`     | A JSON configuration file for the web application  |
+-------------------------+----------------------------------------------------+
| :file:`client.py`       | A Python script to exercise the web application    |
+-------------------------+----------------------------------------------------+
```

The web application uses Gunicorn, which is a
popular web application server that starts multiple worker processes to handle
requests. This example setup shows how the workers can write to the same log file
without conflicting with one another --- they all go through the socket listener.

To test these files, do the following in a POSIX environment:

1. Download the Gist
as a ZIP archive using the Download ZIP button.

1. Unzip the above files from the archive into a scratch directory.

1. In the scratch directory, run `bash prepare.sh` to get things ready.
This creates a `run` subdirectory to contain Supervisor-related and
log files, and a `venv` subdirectory to contain a virtual environment
into which `bottle`, `gunicorn` and `supervisor` are installed.

1. Run `bash ensure_app.sh` to ensure that Supervisor is running with
the above configuration.

1. Run `venv/bin/python client.py` to exercise the web application,
which will lead to records being written to the log.

1. Inspect the log files in the `run` subdirectory. You should see the
most recent log lines in files matching the pattern `app.log*`. They
won't be in any particular order, since they have been handled concurrently
by different worker processes in a non-deterministic way.

1. You can shut down the listener and the web application by running
`venv/bin/supervisorctl -c supervisor.conf shutdown`.

You may need to tweak the configuration files in the unlikely event that the
configured ports clash with something else in your test environment.

The default configuration uses a TCP socket on port 9020. You can use a Unix
Domain socket instead of a TCP socket by doing the following:

1. In `listener.json`, add a `socket` key with the path to the domain
socket you want to use. If this key is present, the listener listens on the
corresponding domain socket and not on a TCP socket (the `port` key is
ignored).

1. In `webapp.json`, change the socket handler configuration dictionary
so that the `host` value is the path to the domain socket, and set the
`port` value to `null`.
