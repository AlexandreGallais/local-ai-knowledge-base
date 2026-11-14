---
title: "Library and Extension FAQ (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/faq/library.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# Library and Extension FAQ (part 2 of 2)

## Input and Output

### How do I delete a file? (And other file questions...)

Use `os.remove(filename)` or `os.unlink(filename)`; for documentation, see
the `os` module.  The two functions are identical; `unlink()` is simply
the name of the Unix system call for this function.

To remove a directory, use `os.rmdir()`; use `os.mkdir()` to create one.
`os.makedirs(path)` will create any intermediate directories in `path` that
don't exist. `os.removedirs(path)` will remove intermediate directories as
long as they're empty; if you want to delete an entire directory tree and its
contents, use `shutil.rmtree()`.

To rename a file, use `os.rename(old_path, new_path)`.

To truncate a file, open it using `f = open(filename, "rb+")`, and use
`f.truncate(offset)`; offset defaults to the current seek position.  There's
also `os.ftruncate(fd, offset)` for files opened with `os.open()`, where
*fd* is the file descriptor (a small integer).

The `shutil` module also contains a number of functions to work on files
including `copyfile()`, `copytree()`, and
`rmtree()`.

### How do I copy a file?

The `shutil` module contains a `copyfile()` function.
Note that on Windows NTFS volumes, it does not copy
`alternate data streams
<https://en.wikipedia.org/wiki/NTFS#Alternate_data_stream_(ADS)>`_
nor resource forks
on macOS HFS+ volumes, though both are now rarely used.
It also doesn't copy file permissions and metadata, though using
`shutil.copy2()` instead will preserve most (though not all) of it.

### How do I read (or write) binary data?

To read or write complex binary data formats, it's best to use the `struct`
module.  It allows you to take a string containing binary data (usually numbers)
and convert it to Python objects; and vice versa.

For example, the following code reads two 2-byte integers and one 4-byte integer
in big-endian format from a file:

```
import struct

with open(filename, "rb") as f:
    s = f.read(8)
    x, y, z = struct.unpack(">hhl", s)
```

The '>' in the format string forces big-endian data; the letter 'h' reads one
"short integer" (2 bytes), and 'l' reads one "long integer" (4 bytes) from the
string.

For data that is more regular (e.g. a homogeneous list of ints or floats),
you can also use the `array` module.

> **Note:** To read and write binary data, it is mandatory to open the file in
> binary mode (here, passing `"rb"` to `open()`).  If you use
> `"r"` instead (the default), the file will be open in text mode
> and `f.read()` will return `str` objects rather than
> `bytes` objects.

### I can't seem to use os.read() on a pipe created with os.popen(); why?

`os.read()` is a low-level function which takes a file descriptor, a small
integer representing the opened file.  `os.popen()` creates a high-level
file object, the same type returned by the built-in `open()` function.
Thus, to read *n* bytes from a pipe *p* created with `os.popen()`, you need to
use `p.read(n)`.

### How do I access the serial (RS232) port?

For Win32, OSX, Linux, BSD, Jython, IronPython:

pyserial

For Unix, see a Usenet post by Mitch Chapman:

https://groups.google.com/groups?selm=user@example.com

### Why doesn't closing sys.stdout (stdin, stderr) really close it?

Python file objects are a high-level layer of
abstraction on low-level C file descriptors.

For most file objects you create in Python via the built-in `open()`
function, `f.close()` marks the Python file object as being closed from
Python's point of view, and also arranges to close the underlying C file
descriptor.  This also happens automatically in `f`'s destructor, when
`f` becomes garbage.

But stdin, stdout and stderr are treated specially by Python, because of the
special status also given to them by C.  Running `sys.stdout.close()` marks
the Python-level file object as being closed, but does *not* close the
associated C file descriptor.

To close the underlying C file descriptor for one of these three, you should
first be sure that's what you really want to do (e.g., you may confuse
extension modules trying to do I/O).  If it is, use `os.close()`:

```
os.close(stdin.fileno())
os.close(stdout.fileno())
os.close(stderr.fileno())
```

Or you can use the numeric constants 0, 1 and 2, respectively.

## Network/Internet Programming

### What WWW tools are there for Python?

See the chapters titled internet and netdata in the Library
Reference Manual.  Python has many modules that will help you build server-side
and client-side web systems.

A summary of available frameworks is maintained by Paul Boddie at
https://wiki.python.org/moin/WebProgramming.

### What module should I use to help with generating HTML?

You can find a collection of useful links on the `Web Programming wiki page
<https://wiki.python.org/moin/WebProgramming>`_.

### How do I send mail from a Python script?

Use the standard library module `smtplib`.

Here's a very simple interactive mail sender that uses it.  This method will
work on any host that supports an SMTP listener.:

```
import sys, smtplib

fromaddr = input("From: ")
toaddrs  = input("To: ").split(',')
print("Enter message, end with ^D:")
msg = ''
while True:
    line = sys.stdin.readline()
    if not line:
        break
    msg += line

# The actual mail send
server = smtplib.SMTP('localhost')
server.sendmail(fromaddr, toaddrs, msg)
server.quit()
```

A Unix-only alternative uses sendmail.  The location of the sendmail program
varies between systems; sometimes it is `/usr/lib/sendmail`, sometimes
`/usr/sbin/sendmail`.  The sendmail manual page will help you out.  Here's
some sample code:

```
import os

SENDMAIL = "/usr/sbin/sendmail"  # sendmail location
p = os.popen("%s -t -i" % SENDMAIL, "w")
p.write("To: user@example.com\n")
p.write("Subject: test\n")
p.write("\n")  # blank line separating headers from body
p.write("Some text\n")
p.write("some more text\n")
sts = p.close()
if sts != 0:
    print("Sendmail exit status", sts)
```

### How do I avoid blocking in the connect() method of a socket?

The `select` module is commonly used to help with asynchronous I/O on
sockets.

To prevent the TCP connect from blocking, you can set the socket to non-blocking
mode.  Then when you do the `connect()`,
you will either connect immediately
(unlikely) or get an exception that contains the error number as `.errno`.
`errno.EINPROGRESS` indicates that the connection is in progress, but hasn't
finished yet.  Different OSes will return different values, so you're going to
have to check what's returned on your system.

You can use the `connect_ex()` method
to avoid creating an exception.
It will just return the errno value.
To poll, you can call `connect_ex()` again later
-- `0` or `errno.EISCONN` indicate that you're connected -- or you can pass this
socket to `select.select()` to check if it's writable.

> **Note:** The `asyncio` module provides a general purpose single-threaded and
> concurrent asynchronous library, which can be used for writing non-blocking
> network code.
> The third-party Twisted library is
> a popular and feature-rich alternative.

## Databases

### Are there any interfaces to database packages in Python?

Yes.

Interfaces to disk-based hashes such as `DBM` and :mod:`GDBM
<dbm.gnu>` are also included with standard Python.  There is also the
`sqlite3` module, which provides a lightweight disk-based relational
database.

Support for most relational databases is available.  See the
`DatabaseProgramming wiki page
<https://wiki.python.org/moin/DatabaseProgramming>`_ for details.

### How do you implement persistent objects in Python?

The `pickle` library module solves this in a very general way (though you
still can't store things like open files, sockets or windows), and the
`shelve` library module uses pickle and (g)dbm to create persistent
mappings containing arbitrary Python objects.

## Mathematics and Numerics

### How do I generate random numbers in Python?

The standard module `random` implements a random number generator.  Usage
is simple:

```
import random
random.random()
```

This returns a random floating-point number in the range [0, 1).

There are also many other specialized generators in this module, such as:

- `randrange(a, b)` chooses an integer in the range [a, b).
- `uniform(a, b)` chooses a floating-point number in the range [a, b).
- `normalvariate(mean, sdev)` samples the normal (Gaussian) distribution.

Some higher-level functions operate on sequences directly, such as:

- `choice(S)` chooses a random element from a given sequence.
- `shuffle(L)` shuffles a list in-place, i.e. permutes it randomly.

There's also a `Random` class you can instantiate to create independent
multiple random number generators.
