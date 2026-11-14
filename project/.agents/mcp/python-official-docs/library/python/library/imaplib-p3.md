---
title: "imaplib --- IMAP4 protocol client (part 3 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/imaplib.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# imaplib --- IMAP4 protocol client (part 3 of 3)

### `IMAP4.thread(threading_algorithm, charset, search_criterion[, ...])`

The `thread` command is a variant of `search` with threading semantics for
the results.  Returned data contains a space separated list of thread members.

Thread members consist of zero or more messages numbers, delimited by spaces,
indicating successive parent and child.

Thread has two arguments before the *search_criterion* argument(s); a
*threading_algorithm*, and the searching *charset*.  Note that unlike
`search`, the searching *charset* argument is mandatory.  There is also a
`uid thread` command which corresponds to `thread` the way that ``uid
search` corresponds to `search`.  The `thread`` command first searches the
mailbox for messages that match the given searching criteria using the *charset*
argument for the interpretation of strings in the searching criteria. It then
returns the matching messages threaded according to the specified threading
algorithm.

This is an `IMAP4rev1` extension command.

### `IMAP4.uid(command, arg[, ...])`

Execute command args with messages identified by UID, rather than message
number.  Returns response appropriate to command.  At least one argument must be
supplied; if none are provided, the server will return an error and an exception
will be raised.

### `IMAP4.unsubscribe(mailbox)`

Unsubscribe from old mailbox.

### `IMAP4.unselect()`

`imaplib.IMAP4.unselect()` frees server's resources associated with the
selected mailbox and returns the server to the authenticated
state. This command performs the same actions as `imaplib.IMAP4.close()`, except
that no messages are permanently removed from the currently
selected mailbox.

> *Added in version 3.9.*

### `IMAP4.xatom(name[, ...])`

Allow simple extension commands notified by server in `CAPABILITY` response.

The following attributes are defined on instances of `IMAP4`:

### `IMAP4.capabilities`

A tuple of the capabilities advertised by the server, in upper case.

It is set when the connection is established,
and refreshed after a successful `login()`,
`authenticate()` or `starttls()`,
because the server can advertise different capabilities
in different connection states.

> *Changed in version 3.14.7.*
> Refreshed after `login()` and `authenticate()`.

### `IMAP4.PROTOCOL_VERSION`

The most recent supported protocol in the `CAPABILITY` response from the
server.

### `IMAP4.debug`

Integer value to control debugging output.  The initialize value is taken from
the module variable `Debug`.  Values greater than three trace each command.

### `IMAP4.utf8_enabled`

Boolean value that is normally `False`, but is set to `True` if an
`enable()` command is successfully issued for the `UTF8=ACCEPT`
capability.

> *Added in version 3.5.*

### property `IMAP4.file`

Internal `BufferedReader` associated with the underlying socket.
This property is documented for legacy purposes but not part of the public
interface. The caller is responsible to ensure that the current file is
closed before changing it.

> *Deprecated since version 3.15, removed in version 3.19.*

## IMAP4 Example

Here is a minimal example (without error checking) that opens a mailbox and
retrieves and prints all messages:

```
import getpass, imaplib

M = imaplib.IMAP4(host='example.org')
M.login(getpass.getuser(), getpass.getpass())
M.select()
typ, data = M.search(None, 'ALL')
for num in data[0].split():
    typ, data = M.fetch(num, '(RFC822)')
    print('Message %s\n%s\n' % (num, data[0][1]))
M.close()
M.logout()
```

> **Note:** A `FETCH` response may contain additional or unsolicited data
> (see RFC 3501, section 7.4.2),
> so production code should inspect the whole response
> rather than rely on `data0`.
