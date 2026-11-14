---
title: "ftplib --- FTP protocol client (part 2 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/ftplib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# ftplib --- FTP protocol client (part 2 of 3)

## Reference

### class `FTP(host='', user='', passwd='', acct='', timeout=None, \`

```python
source_address=None, *, encoding='utf-8')
```

Return a new instance of the `FTP` class.

- **param `str host`:**
The hostname to connect to.
If given, `connect(host)` is implicitly called by the constructor.

- **param `str user`:**
param_doc_user
If given, `login(host, passwd, acct)` is implicitly called
by the constructor.

- **param `str passwd`:**
param_doc_passwd

- **param `str acct`:**
param_doc_acct

- **param `timeout`:**
A timeout in seconds for blocking operations like `connect()`
(default: the global default timeout setting).
- **type `timeout`:** float | None

- **param `source_address`:**
param_doc_source_address
- **type `source_address`:** tuple | None

- **param `str encoding`:**
param_doc_encoding

The `FTP` class supports the `with` statement, e.g.:

```python
>>> from ftplib import FTP
>>> with FTP("ftp1.at.proftpd.org") as ftp:
...     ftp.login()
...     ftp.dir()
... # doctest: +SKIP
'230 Anonymous login ok, restrictions apply.'
dr-xr-xr-x   9 ftp      ftp           154 May  6 10:43 .
dr-xr-xr-x   9 ftp      ftp           154 May  6 10:43 ..
dr-xr-xr-x   5 ftp      ftp          4096 May  6 10:43 CentOS
dr-xr-xr-x   3 ftp      ftp            18 Jul 10  2008 Fedora
>>>
```

> *Changed in version 3.2.*
> Support for the `with` statement was added.

> *Changed in version 3.3.*
> *source_address* parameter was added.

> *Changed in version 3.9.*
> If the *timeout* parameter is set to be zero, it will raise a
> `ValueError` to prevent the creation of a non-blocking socket.
> The *encoding* parameter was added, and the default was changed from
> Latin-1 to UTF-8 to follow RFC 2640.

Several `FTP` methods are available in two flavors:
one for handling text files and another for binary files.
The methods are named for the command which is used followed by
`lines` for the text version or `binary` for the binary version.

`FTP` instances have the following methods:

### `FTP.set_debuglevel(level)`

Set the instance's debugging level as an `int`.
This controls the amount of debugging output printed.
The debug levels are:

- `0` (default): No debug output.
- `1`: Produce a moderate amount of debug output,
generally a single line per request.
- `2` or higher: Produce the maximum amount of debugging output,
logging each line sent and received on the control connection.

### `FTP.connect(host='', port=0, timeout=None, source_address=None)`

Connect to the given host and port.
This function should be called only once for each instance;
it should not be called if a *host* argument was given
when the `FTP` instance was created.
All other `FTP` methods can only be called
after a connection has successfully been made.

- **param `str host`:**
The host to connect to.

- **param `int port`:**
The TCP port to connect to (default: `21`,
as specified by the FTP protocol specification).
It is rarely needed to specify a different port number.

- **param `timeout`:**
A timeout in seconds for the connection attempt
(default: the global default timeout setting).
- **type `timeout`:** float | None

- **param `source_address`:**
param_doc_source_address
- **type `source_address`:** tuple | None

> *Changed in version 3.3.*
> *source_address* parameter was added.

### `FTP.getwelcome()`

Return the welcome message sent by the server in reply to the initial
connection.  (This message sometimes contains disclaimers or help information
that may be relevant to the user.)

### `FTP.login(user='<example-value>', passwd='', acct='')`

Log on to the connected FTP server.
This function should be called only once for each instance,
after a connection has been established;
it should not be called if the *host* and *user* arguments were given
when the `FTP` instance was created.
Most FTP commands are only allowed after the client has logged in.

- **param `str user`:**
param_doc_user

- **param `str passwd`:**
param_doc_passwd

- **param `str acct`:**
param_doc_acct

### `FTP.abort()`

Abort a file transfer that is in progress.  Using this does not always work, but
it's worth a try.

### `FTP.sendcmd(cmd)`

Send a simple command string to the server and return the response string.

### `FTP.voidcmd(cmd)`

Send a simple command string to the server and handle the response.  Return
the response string if the response code corresponds to success (codes in
the range 200--299).  Raise `error_reply` otherwise.

### `FTP.retrbinary(cmd, callback, blocksize=8192, rest=None)`

Retrieve a file in binary transfer mode.

- **param `str cmd`:**
An appropriate `RETR` command: `"RETR {filename}"`.

- **param `callback`:**
A single parameter callable that is called
for each block of data received,
with its single argument being the data as `bytes`.
- **type `callback`:** callable

- **param `int blocksize`:**
The maximum chunk size to read on the low-level
`socket` object created to do the actual transfer.
This also corresponds to the largest size of data
that will be passed to *callback*.
Defaults to `8192`.

- **param `int rest`:**
A `REST` command to be sent to the server.
See the documentation for the *rest* parameter of the `transfercmd()` method.

### `FTP.retrlines(cmd, callback=None)`

Retrieve a file or directory listing in the encoding specified by the
*encoding* parameter at initialization.
*cmd* should be an appropriate `RETR` command (see `retrbinary()`) or
a command such as `LIST` or `NLST` (usually just the string `'LIST'`).
`LIST` retrieves a list of files and information about those files.
`NLST` retrieves a list of file names.
The *callback* function is called for each line with a string argument
containing the line with the trailing CRLF stripped.  The default *callback*
prints the line to `sys.stdout`.

### `FTP.set_pasv(val)`

Enable "passive" mode if *val* is true, otherwise disable passive mode.
Passive mode is on by default.

### `FTP.storbinary(cmd, fp, blocksize=8192, callback=None, rest=None)`

Store a file in binary transfer mode.

- **param `str cmd`:**
An appropriate `STOR` command: `"STOR {filename}"`.

- **param `fp`:**
A file object (opened in binary mode) which is read until EOF,
using its `read()` method in blocks of size *blocksize*
to provide the data to be stored.
- **type `fp`:** file object

- **param `int blocksize`:**
The read block size.
Defaults to `8192`.

- **param `callback`:**
A single parameter callable that is called
for each block of data sent,
with its single argument being the data as `bytes`.
- **type `callback`:** callable

- **param `int rest`:**
A `REST` command to be sent to the server.
See the documentation for the *rest* parameter of the `transfercmd()` method.

> *Changed in version 3.2.*
> The *rest* parameter was added.

### `FTP.storlines(cmd, fp, callback=None)`

Store a file in line mode.  *cmd* should be an appropriate
`STOR` command (see `storbinary()`).  Lines are read until EOF from the
file object *fp* (opened in binary mode) using its `readline()`
method to provide the data to be stored.  *callback* is an optional single
parameter callable that is called on each line after it is sent.

### `FTP.transfercmd(cmd, rest=None)`

Initiate a transfer over the data connection.  If the transfer is active, send an
`EPRT` or  `PORT` command and the transfer command specified by *cmd*, and
accept the connection.  If the server is passive, send an `EPSV` or `PASV`
command, connect to it, and start the transfer command.  Either way, return the
socket for the connection.

If optional *rest* is given, a `REST` command is sent to the server, passing
*rest* as an argument.  *rest* is usually a byte offset into the requested file,
telling the server to restart sending the file's bytes at the requested offset,
skipping over the initial bytes.  Note however that the `transfercmd()`
method converts *rest* to a string with the *encoding* parameter specified
at initialization, but no check is performed on the string's contents.  If the
server does not recognize the `REST` command, an `error_reply` exception
will be raised.  If this happens, simply call `transfercmd()` without a
*rest* argument.

### `FTP.ntransfercmd(cmd, rest=None)`

Like `transfercmd()`, but returns a tuple of the data connection and the
expected size of the data.  If the expected size could not be computed, `None`
will be returned as the expected size.  *cmd* and *rest* means the same thing as
in `transfercmd()`.

### `FTP.mlsd(path="", facts=[])`

List a directory in a standardized format by using `MLSD` command
(RFC 3659).  If *path* is omitted the current directory is assumed.
*facts* is a list of strings representing the type of information desired
(e.g. `["type", "size", "perm"]`).  Return a generator object yielding a
tuple of two elements for every file found in path.  First element is the
file name, the second one is a dictionary containing facts about the file
name.  Content of this dictionary might be limited by the *facts* argument
but server is not guaranteed to return all requested facts.

> *Added in version 3.3.*

### `FTP.nlst(argument[, ...])`

Return a list of file names as returned by the `NLST` command.  The
optional *argument* is a directory to list (default is the current server
directory).  Multiple arguments can be used to pass <example-value> options to
the `NLST` command.

> **Note:** If your server supports the command, `mlsd()` offers a better API.

### `FTP.dir(argument[, ...])`

Produce a directory listing as returned by the `LIST` command, printing it to
standard output.  The optional *argument* is a directory to list (default is the
current server directory).  Multiple arguments can be used to pass <example-value>
options to the `LIST` command.  If the last argument is a function, it is used
as a *callback* function as for `retrlines()`; the default prints to
`sys.stdout`.  This method returns `None`.

> **Note:** If your server supports the command, `mlsd()` offers a better API.

### `FTP.rename(fromname, toname)`

Rename file *fromname* on the server to *toname*.

### `FTP.delete(filename)`

Remove the file named *filename* from the server.  If successful, returns the
text of the response, otherwise raises `error_perm` on permission errors or
`error_reply` on other errors.

### `FTP.cwd(pathname)`

Set the current directory on the server.

### `FTP.mkd(pathname)`

Create a new directory on the server.

### `FTP.pwd()`

Return the pathname of the current directory on the server.

### `FTP.rmd(dirname)`

Remove the directory named *dirname* on the server.

### `FTP.size(filename)`

Request the size of the file named *filename* on the server.  On success, the
size of the file is returned as an integer, otherwise `None` is returned.
Note that the `SIZE` command is not  standardized, but is supported by many
common server implementations.

### `FTP.quit()`

Send a `QUIT` command to the server and close the connection. This is the
"polite" way to close a connection, but it may raise an exception if the server
responds with an error to the `QUIT` command.  This implies a call to the
`close()` method which renders the `FTP` instance useless for
subsequent calls (see below).

### `FTP.close()`

Close the connection unilaterally.  This should not be applied to an already
closed connection such as after a successful call to `quit()`.
After this call the `FTP` instance should not be used any more (after
a call to `close()` or `quit()` you cannot reopen the
connection by issuing another `login()` method).

### class `FTP_TLS(host='', user='', passwd='', acct='', *, context=None, \`

```python
timeout=None, source_address=None, encoding='utf-8')
```

An `FTP` subclass which adds TLS support to FTP as described in
RFC 4217.
Connect to port 21 implicitly securing the FTP control connection
before authenticating.

> **Note:** The user must explicitly secure the data connection
> by calling the `prot_p()` method.

- **param `str host`:**
The hostname to connect to.
If given, `connect(host)` is implicitly called by the constructor.

- **param `str user`:**
param_doc_user
If given, `login(host, passwd, acct)` is implicitly called
by the constructor.

- **param `str passwd`:**
param_doc_passwd

- **param `str acct`:**
param_doc_acct

- **param `context`:**
An SSL context object which allows bundling SSL configuration options,
certificates and private keys into a single, potentially long-lived,
structure.
Please read ssl-security for best practices.
- **type `context`:** `ssl.SSLContext`

- **param `timeout`:**
A timeout in seconds for blocking operations like `connect()`
(default: the global default timeout setting).
- **type `timeout`:** float | None

- **param `source_address`:**
param_doc_source_address
- **type `source_address`:** tuple | None

- **param `str encoding`:**
param_doc_encoding

> *Added in version 3.2.*

> *Changed in version 3.3.*
> Added the *source_address* parameter.

> *Changed in version 3.4.*
> The class now supports hostname check with
> `ssl.SSLContext.check_hostname` and *Server Name Indication* (see
> `ssl.HAS_SNI`).

> *Changed in version 3.9.*
> If the *timeout* parameter is set to be zero, it will raise a
> `ValueError` to prevent the creation of a non-blocking socket.
> The *encoding* parameter was added, and the default was changed from
> Latin-1 to UTF-8 to follow RFC 2640.

> *Changed in version 3.12.*
> The deprecated *keyfile* and *certfile* parameters have been removed.

Here's a sample session using the `FTP_TLS` class:

```
>>> ftps = FTP_TLS('ftp.pureftpd.org')
>>> ftps.login()
'230 Anonymous user logged in'
>>> ftps.prot_p()
'200 Data protection level set to "private"'
>>> ftps.nlst()
['6jack', 'OpenBSD', 'antilink', 'blogbench', 'bsdcam', 'clockspeed', 'djbdns-jedi', 'docs', 'eaccelerator-jedi', 'favicon.ico', 'francotone', 'fugu', 'ignore', 'libpuzzle', 'metalog', 'minidentd', 'misc', 'mysql-udf-global-user-variables', 'php-jenkins-hash', 'php-skein-hash', 'php-webdav', 'phpaudit', 'phpbench', 'pincaster', 'ping', 'posto', 'pub', 'public', 'public_keys', 'pure-ftpd', 'qscan', 'qtc', 'sharedance', 'skycache', 'sound', 'tmp', 'ucarp']
```

`FTP_TLS` class inherits from `FTP`,
defining these additional methods and attributes:

### `FTP_TLS.auth()`

Set up a secure control connection by using TLS.

> *Changed in version 3.4.*
> The method now supports hostname check with
> `ssl.SSLContext.check_hostname` and *Server Name Indication* (see
> `ssl.HAS_SNI`).

### `FTP_TLS.ccc()`

Revert control channel back to plaintext.  This can be useful to take
advantage of firewalls that know how to handle NAT with non-secure FTP
without opening fixed ports.

> *Added in version 3.3.*

### `FTP_TLS.prot_p()`

Set up secure data connection by using TLS.

### `FTP_TLS.prot_c()`

Set up clear text data connection.

### exception `error_reply`

Exception raised when an unexpected reply is received from the server.
