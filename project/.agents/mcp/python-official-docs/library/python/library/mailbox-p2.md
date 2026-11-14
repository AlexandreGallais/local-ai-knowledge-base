---
title: "mailbox --- Manipulate mailboxes in various formats (part 2 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/mailbox.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# mailbox --- Manipulate mailboxes in various formats (part 2 of 6)

## `Mailbox` objects

### class `Mailbox`

A mailbox, which may be inspected and modified.

The `Mailbox` class defines an interface and is not intended to be
instantiated.  Instead, format-specific subclasses should inherit from
`Mailbox` and your code should instantiate a particular subclass.

The `Mailbox` interface is dictionary-like, with small keys
corresponding to messages. Keys are issued by the `Mailbox` instance
with which they will be used and are only meaningful to that `Mailbox`
instance. A key <example-value> to identify a message even if the corresponding
message is modified, such as by replacing it with another message.

Messages may be added to a `Mailbox` instance using the set-like
method `add()` and removed using a `del` statement or the set-like
methods `remove()` and `discard()`.

`Mailbox` interface semantics differ from dictionary semantics in some
noteworthy ways. Each time a message is requested, a new representation
(typically a `Message` instance) is generated based upon the current
state of the mailbox. Similarly, when a message is added to a
`Mailbox` instance, the provided message representation's contents are
copied. In neither case is a reference to the message representation kept by
the `Mailbox` instance.

The default `Mailbox` iterator iterates over message
representations, not keys as the default `dictionary`
iterator does. Moreover, modification of a
mailbox during iteration is safe and well-defined. Messages added to the
mailbox after an iterator is created will not be seen by the
iterator. Messages removed from the mailbox before the iterator yields them
will be silently skipped, though using a key from an iterator may result in a
`KeyError` exception if the corresponding message is subsequently
removed.

> **Warning:** Be very cautious when modifying mailboxes that might be simultaneously
> changed by some other process.  The safest mailbox format to use for such
> tasks is `Maildir`; try to avoid using single-file formats such as
> `mbox` for
> concurrent writing.  If you're modifying a mailbox, you *must* lock it by
> calling the `lock()` and `unlock()` methods *before* reading any
> messages in the file or making any changes by adding or deleting a
> message.  Failing to lock the mailbox runs the risk of losing messages or
> corrupting the entire mailbox.

The `Mailbox` class supports the `with` statement.  When used
as a context manager, `Mailbox` calls `lock()` when the context is entered,
returns the mailbox object as the context object, and at context end calls `close()`,
thereby releasing the lock.

> *Changed in version 3.15.*
> Support for the `with` statement was added.

`Mailbox` instances have the following methods:

### `add(message)`

Add *message* to the mailbox and return the key that has been assigned to
it.

Parameter *message* may be a `Message` instance, an
`email.message.Message` instance, a string, a byte string, or a
file-like object (which should be open in binary mode). If *message* is
an instance of the
appropriate format-specific `Message` subclass (e.g., if it's an
`mboxMessage` instance and this is an `mbox` instance), its
format-specific information is used. Otherwise, reasonable defaults for
format-specific information are used.

> *Changed in version 3.2.*
> Support for binary input was added.

### `remove(key)`

```python
__delitem__(key)
discard(key)
```

Delete the message corresponding to *key* from the mailbox.

If no such message exists, a `KeyError` exception is raised if the
method was called as `remove() or delitem__()` but no
exception is raised if the method was called as `discard()`. The
behavior of `discard()` may be preferred if the underlying mailbox
format supports concurrent modification by other processes.

### `__setitem__(key, message)`

Replace the message corresponding to *key* with *message*. Raise a
`KeyError` exception if no message already corresponds to *key*.

As with `add()`, parameter *message* may be a `Message`
instance, an `email.message.Message` instance, a string, a byte
string, or a file-like object (which should be open in binary mode). If
*message* is an
instance of the appropriate format-specific `Message` subclass
(e.g., if it's an `mboxMessage` instance and this is an
`mbox` instance), its format-specific information is
used. Otherwise, the format-specific information of the message that
currently corresponds to *key* is left unchanged.

### `iterkeys()`

Return an iterator over all keys

### `keys()`

The same as `iterkeys()`, except that a `list` is returned
rather than an iterator

### `itervalues()`

```python
__iter__()
```

Return an iterator over representations of all messages.
The messages are represented
as instances of the appropriate format-specific `Message` subclass
unless a custom message factory was specified when the `Mailbox`
instance was initialized.

> **Note:** The behavior of `__iter__()` is unlike that of dictionaries, which
> iterate over keys.

### `values()`

The same as `itervalues()`, except that a `list` is returned
rather than an iterator

### `iteritems()`

Return an iterator over (*key*, *message*) pairs, where *key* is
a key and *message* is a message representation. The messages are
represented as instances of the appropriate format-specific
`Message` subclass unless a custom message factory was specified
when the `Mailbox` instance was initialized.

### `items()`

The same as `iteritems()`, except that a `list` of pairs is
returned rather than an iterator of pairs.

### `get(key, default=None)`

```python
__getitem__(key)
```

Return a representation of the message corresponding to *key*. If no such
message exists, *default* is returned if the method was called as
`get()` and a `KeyError` exception is raised if the method was
called as `__getitem__()`. The message is represented as an instance
of the appropriate format-specific `Message` subclass unless a
custom message factory was specified when the `Mailbox` instance
was initialized.

### `get_message(key)`

Return a representation of the message corresponding to *key* as an
instance of the appropriate format-specific `Message` subclass, or
raise a `KeyError` exception if no such message exists.

### `get_bytes(key)`

Return a byte representation of the message corresponding to *key*, or
raise a `KeyError` exception if no such message exists.

> *Added in version 3.2.*

### `get_string(key)`

Return a string representation of the message corresponding to *key*, or
raise a `KeyError` exception if no such message exists.  The
message is processed through `email.message.Message` to
convert it to a 7bit clean representation.

### `get_file(key)`

Return a file-like representation of the
message corresponding to *key*,
or raise a `KeyError` exception if no such message exists.  The
file-like object behaves as if open in binary mode.  This file should be
closed once it is no longer needed.

> *Changed in version 3.2.*
> The file object really is a binary file; previously it was
> incorrectly returned in text mode.  Also, the file-like object
> now supports the context manager protocol: you can use a
> `with` statement to automatically close it.

> **Note:** Unlike other representations of messages,
> file-like representations are not
> necessarily independent of the `Mailbox` instance that
> created them or of the underlying mailbox.  More specific documentation
> is provided by each subclass.

### `__contains__(key)`

Return `True` if *key* corresponds to a message, `False` otherwise.

### `__len__()`

Return a count of messages in the mailbox.

### `clear()`

Delete all messages from the mailbox.

### `pop(key, default=None)`

Return a representation of the message corresponding to *key* and delete
the message. If no such message exists, return *default*. The message is
represented as an instance of the appropriate format-specific
`Message` subclass unless a custom message factory was specified
when the `Mailbox` instance was initialized.

### `popitem()`

Return an arbitrary (*key*, *message*) pair, where *key* is a key and
*message* is a message representation, and delete the corresponding
message. If the mailbox is empty, raise a `KeyError` exception. The
message is represented as an instance of the appropriate format-specific
`Message` subclass unless a custom message factory was specified
when the `Mailbox` instance was initialized.

### `update(arg)`

Parameter *arg* should be a *key*-to-*message* mapping or an iterable of
(*key*, *message*) pairs. Updates the mailbox so that, for each given
*key* and *message*, the message corresponding to *key* is set to
*message* as if by using `__setitem__(). As with setitem__()`,
each *key* must already correspond to a message in the mailbox or else a
`KeyError` exception will be raised, so in general it is incorrect
for *arg* to be a `Mailbox` instance.

> **Note:** Unlike with dictionaries, keyword arguments are not supported.

### `flush()`

Write any pending changes to the filesystem. For some `Mailbox`
subclasses, changes are always written immediately and `flush()` does
nothing, but you should still make a habit of calling this method.

### `lock()`

Acquire an exclusive advisory lock on the mailbox so that other processes
know not to modify it. An `ExternalClashError` is raised if the lock
is not available. The particular locking mechanisms used depend upon the
mailbox format.  You should *always* lock the mailbox before making any
modifications to its contents.

### `unlock()`

Release the lock on the mailbox, if any.

### `close()`

Flush the mailbox, unlock it if necessary, and close any open files. For
some `Mailbox` subclasses, this method does nothing.

### class `Maildir(dirname, factory=None, create=True)`

A subclass of `Mailbox` for mailboxes in Maildir format. Parameter
*factory* is a callable object that accepts a file-like message representation
(which behaves as if opened in binary mode) and returns a custom representation.
If *factory* is `None`, `MaildirMessage` is used as the default message
representation. If *create* is `True`, the mailbox is created if it does not
exist.

If *create* is `True` and the *dirname* path exists, it will be treated as
an existing maildir without attempting to verify its directory layout.

It is for historical reasons that *dirname* is named as such rather than *path*.

Maildir is a directory-based mailbox format invented for the qmail mail
transfer agent and now widely supported by other programs. Messages in a
Maildir mailbox are stored in separate files within a common directory
structure. This design allows Maildir mailboxes to be accessed and modified
by multiple unrelated programs without data corruption, so file locking is
unnecessary.

Maildir mailboxes contain three subdirectories, namely: `tmp`,
`new`, and `cur`. Messages are created momentarily in the
`tmp` subdirectory and then moved to the `new` subdirectory to
finalize delivery. A mail user agent may subsequently move the message to the
`cur` subdirectory and store information about the state of the message
in a special "info" section appended to its file name.

Folders of the style introduced by the Courier mail transfer agent are also
supported. Any subdirectory of the main mailbox is considered a folder if
`'.'` is the first character in its name. Folder names are represented by
`Maildir` without the leading `'.'`. Each folder is itself a Maildir
mailbox but should not contain other folders. Instead, a logical nesting is
indicated using `'.'` to delimit levels, e.g., "Archived.2005.07".

### `Maildir.colon`

The Maildir specification requires the use of a colon (`':'`) in certain
message file names. However, some operating systems do not permit this
character in file names, If you wish to use a Maildir-like format on such
an operating system, you should specify another character to use
instead. The exclamation point (`'!'`) is a popular choice. For
example:

```
import mailbox
mailbox.Maildir.colon = '!'
```

The `colon` attribute may also be set on a per-instance basis.

> *Changed in version 3.13.*
> `Maildir` now ignores files with a leading dot.

`Maildir` instances have all of the methods of `Mailbox` in
addition to the following:

### `list_folders()`

Return a list of the names of all folders.

### `get_folder(folder)`

Return a `Maildir` instance representing the folder whose name is
*folder*. A `NoSuchMailboxError` exception is raised if the folder
does not exist.

### `add_folder(folder)`

Create a folder whose name is *folder* and return a `Maildir`
instance representing it.

### `remove_folder(folder)`

Delete the folder whose name is *folder*. If the folder contains any
messages, a `NotEmptyError` exception will be raised and the folder
will not be deleted.

### `clean()`

Delete temporary files from the mailbox that have not been accessed in the
last 36 hours. The Maildir specification says that mail-reading programs
should do this occasionally.

### `get_flags(key)`

Return as a string the flags that are set on the message
corresponding to *key*.
This is the same as `get_message(key).get_flags()` but much
faster, because it does not open the message file.
Use this method when iterating over the keys to determine which
messages are interesting to get.

If you do have a `MaildirMessage` object, use
its `get_flags()` method instead, because
changes made by the message's `set_flags()`,
`add_flag()` and `remove_flag()`
methods are not reflected here until the mailbox's
`__setitem__()` method is called.

> *Added in version 3.13.*

### `set_flags(key, flags)`

On the message corresponding to *key*, set the flags specified
by *flags* and unset all others.
Calling `some_mailbox.set_flags(key, flags)` is similar to:

```
one_message = some_mailbox.get_message(key)
one_message.set_flags(flags)
some_mailbox[key] = one_message
```

but faster, because it does not open the message file.

If you do have a `MaildirMessage` object, use
its `set_flags()` method instead, because
changes made with this mailbox method will not be visible to the
message object's method, `get_flags()`.

> *Added in version 3.13.*

### `add_flag(key, flag)`

On the message corresponding to *key*, set the flags specified
by *flag* without changing other flags. To add more than one
flag at a time, *flag* may be a string of more than one character.

Considerations for using this method versus the message object's
`add_flag()` method are similar to
those for `set_flags()`; see the discussion there.

> *Added in version 3.13.*

### `remove_flag(key, flag)`

On the message corresponding to *key*, unset the flags specified
by *flag* without changing other flags. To remove more than one
flag at a time, *flag* may be a string of more than one character.

Considerations for using this method versus the message object's
`remove_flag()` method are similar to
those for `set_flags()`; see the discussion there.

> *Added in version 3.13.*
