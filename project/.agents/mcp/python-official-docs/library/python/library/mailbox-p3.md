---
title: "mailbox --- Manipulate mailboxes in various formats (part 3 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/mailbox.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# mailbox --- Manipulate mailboxes in various formats (part 3 of 6)

### `get_info(key)`

Return a string containing the info for the message
corresponding to *key*.
This is the same as `get_message(key).get_info()` but much
faster, because it does not open the message file.
Use this method when iterating over the keys to determine which
messages are interesting to get.

If you do have a `MaildirMessage` object, use
its `get_info()` method instead, because
changes made by the message's `set_info()` method
are not reflected here until the mailbox's `__setitem__()` method
is called.

> *Added in version 3.13.*

### `set_info(key, info)`

Set the info of the message corresponding to *key* to *info*.
Calling `some_mailbox.set_info(key, flags)` is similar to:

```
one_message = some_mailbox.get_message(key)
one_message.set_info(info)
some_mailbox[key] = one_message
```

but faster, because it does not open the message file.

If you do have a `MaildirMessage` object, use
its `set_info()` method instead, because
changes made with this mailbox method will not be visible to the
message object's method, `get_info()`.

> *Added in version 3.13.*

Some `Mailbox` methods implemented by `Maildir` deserve special
remarks:

### `add(message)`

```python
__setitem__(key, message)
update(arg)
```

> **Warning:** These methods generate unique file names based upon the current process
> ID. When using multiple threads, undetected name clashes may occur and
> cause corruption of the mailbox unless threads are coordinated to avoid
> using these methods to manipulate the same mailbox simultaneously.

### `flush()`

All changes to Maildir mailboxes are immediately applied, so this method
does nothing.

### `lock()`

```python
unlock()
```

Maildir mailboxes do not support (or require) locking, so these methods do
nothing.

### `close()`

`Maildir` instances do not keep any open files and the underlying
mailboxes do not support locking, so this method does nothing.

### `get_file(key)`

Depending upon the host platform, it may not be possible to modify or
remove the underlying message while the returned file remains open.

> **See also:** maildir man page from Courier
> A specification of the format. Describes a common extension for
> supporting folders.
>
> Using maildir format
> Notes on Maildir by its inventor. Includes an updated name-creation scheme and
> details on "info" semantics.

### class `mbox(path, factory=None, create=True)`

A subclass of `Mailbox` for mailboxes in mbox format. Parameter *factory*
is a callable object that accepts a file-like message representation (which
behaves as if opened in binary mode) and returns a custom representation. If
*factory* is `None`, `mboxMessage` is used as the default message
representation. If *create* is `True`, the mailbox is created if it does not
exist.

The mbox format is the classic format for storing mail on Unix systems. All
messages in an mbox mailbox are stored in a single file with the beginning of
each message indicated by a line whose first five characters are "From ".

Several variations of the mbox format exist to address perceived shortcomings in
the original. In the interest of compatibility, `mbox` implements the
original format, which is sometimes referred to as mboxo. This means that
the Content-Length header, if present, is ignored and that any
occurrences of "From " at the beginning of a line in a message body are
transformed to ">From " when storing the message, although occurrences of ">From
" are not transformed to "From " when reading the message.

Some `Mailbox` methods implemented by `mbox` deserve special
remarks:

### `get_bytes(key, from_=False)`

Note: This method has an extra parameter (*from_*) compared with other classes.
The first line of an mbox file entry is the Unix "From " line.
If *from_* is False, the first line of the file is dropped.

### `get_file(key, from_=False)`

Using the file after calling `flush()` or
`close()` on the `mbox` instance may yield
unpredictable results or raise an exception.

Note: This method has an extra parameter (*from_*) compared with other classes.
The first line of an mbox file entry is the Unix "From " line.
If *from_* is False, the first line of the file is dropped.

### `get_string(key, from_=False)`

Note: This method has an extra parameter (*from_*) compared with other classes.
The first line of an mbox file entry is the Unix "From " line.
If *from_* is False, the first line of the file is dropped.

### `lock()`

```python
unlock()
```

Three locking mechanisms are used---dot locking and, if available, the
`flock` and `lockf` system calls.

> **See also:** mbox man page from tin
> A specification of the format, with details on locking.
>
> Configuring Netscape Mail on Unix: Why The Content-Length Format is Bad
> An argument for using the original mbox format rather than a variation.
>
> "mbox" is a family of several mutually incompatible mailbox formats
> A history of mbox variations.

### class `MH(path, factory=None, create=True)`

A subclass of `Mailbox` for mailboxes in MH format. Parameter *factory*
is a callable object that accepts a file-like message representation (which
behaves as if opened in binary mode) and returns a custom representation. If
*factory* is `None`, `MHMessage` is used as the default message
representation. If *create* is `True`, the mailbox is created if it does not
exist.

MH is a directory-based mailbox format invented for the MH Message Handling
System, a mail user agent. Each message in an MH mailbox resides in its own
file. An MH mailbox may contain other MH mailboxes (called folders) in
addition to messages. Folders may be nested indefinitely. MH mailboxes also
support sequences, which are named lists used to logically group
messages without moving them to sub-folders. Sequences are defined in a file
called `.mh_sequences` in each folder.

The `MH` class manipulates MH mailboxes, but it does not attempt to
emulate all of `mh`'s behaviors. In particular, it does not modify
and is not affected by the `context` or `.mh_profile` files that
are used by `mh` to store its state and configuration.

`MH` instances have all of the methods of `Mailbox` in addition
to the following:

> *Changed in version 3.13.*
> Supported folders that don't contain a `.mh_sequences` file.

### `list_folders()`

Return a list of the names of all folders.

### `get_folder(folder)`

Return an `MH` instance representing the folder whose name is
*folder*. A `NoSuchMailboxError` exception is raised if the folder
does not exist.

### `add_folder(folder)`

Create a folder whose name is *folder* and return an `MH` instance
representing it.

### `remove_folder(folder)`

Delete the folder whose name is *folder*. If the folder contains any
messages, a `NotEmptyError` exception will be raised and the folder
will not be deleted.

### `get_sequences()`

Return a dictionary of sequence names mapped to key lists. If there are no
sequences, the empty dictionary is returned.

### `set_sequences(sequences)`

Re-define the sequences that exist in the mailbox based upon *sequences*,
a dictionary of names mapped to key lists, like returned by
`get_sequences()`.

### `pack()`

Rename messages in the mailbox as necessary to eliminate gaps in
numbering.  Entries in the sequences list are updated correspondingly.

> **Note:** Already-issued keys are invalidated by this operation and should not be
> subsequently used.

Some `Mailbox` methods implemented by `MH` deserve special
remarks:

### `remove(key)`

```python
__delitem__(key)
discard(key)
```

These methods immediately delete the message. The MH convention of marking
a message for deletion by prepending a comma to its name is not used.

### `lock()`

```python
unlock()
```

Three locking mechanisms are used---dot locking and, if available, the
`flock` and `lockf` system calls. For MH mailboxes, locking
the mailbox means locking the `.mh_sequences` file and, only for the
duration of any operations that affect them, locking individual message
files.

### `get_file(key)`

Depending upon the host platform, it may not be possible to remove the
underlying message while the returned file remains open.

### `flush()`

All changes to MH mailboxes are immediately applied, so this method does
nothing.

### `close()`

`MH` instances do not keep any open files, so this method is
equivalent to `unlock()`.

> **See also:** nmh - Message Handling System
> Home page of `nmh`, an updated version of the original `mh`.
>
> MH & nmh: Email for Users & Programmers
> A GPL-licensed book on `mh` and `nmh`, with some information
> on the mailbox format.

### class `Babyl(path, factory=None, create=True)`

A subclass of `Mailbox` for mailboxes in Babyl format. Parameter
*factory* is a callable object that accepts a file-like message representation
(which behaves as if opened in binary mode) and returns a custom representation.
If *factory* is `None`, `BabylMessage` is used as the default message
representation. If *create* is `True`, the mailbox is created if it does not
exist.

Babyl is a single-file mailbox format used by the Rmail mail user agent
included with Emacs. The beginning of a message is indicated by a line
containing the two characters Control-Underscore (`'\037'`) and Control-L
(`'\014'`). The end of a message is indicated by the start of the next
message or, in the case of the last message, a line containing a
Control-Underscore (`'\037'`) character.

Messages in a Babyl mailbox have two sets of headers, original headers and
so-called visible headers. Visible headers are typically a subset of the
original headers that have been reformatted or abridged to be more
attractive. Each message in a Babyl mailbox also has an accompanying list of
labels, or short strings that record extra information about the
message, and a list of all user-defined labels found in the mailbox is kept
in the Babyl options section.

`Babyl` instances have all of the methods of `Mailbox` in
addition to the following:

### `get_labels()`

Return a list of the names of all user-defined labels used in the mailbox.

> **Note:** The actual messages are inspected to determine which labels exist in
> the mailbox rather than consulting the list of labels in the Babyl
> options section, but the Babyl section is updated whenever the mailbox
> is modified.

Some `Mailbox` methods implemented by `Babyl` deserve special
remarks:

### `get_file(key)`

In Babyl mailboxes, the headers of a message are not stored contiguously
with the body of the message. To generate a file-like representation, the
headers and body are copied together into an `io.BytesIO` instance,
which has an API identical to that of a
file. As a result, the file-like object is truly independent of the
underlying mailbox but does not save memory compared to a string
representation.

### `lock()`

```python
unlock()
```

Three locking mechanisms are used---dot locking and, if available, the
`flock` and `lockf` system calls.

> **See also:** Format of Version 5 Babyl Files
> A specification of the Babyl format.
>
> Reading Mail with Rmail
> The Rmail manual, with some information on Babyl semantics.

### class `MMDF(path, factory=None, create=True)`

A subclass of `Mailbox` for mailboxes in MMDF format. Parameter *factory*
is a callable object that accepts a file-like message representation (which
behaves as if opened in binary mode) and returns a custom representation. If
*factory* is `None`, `MMDFMessage` is used as the default message
representation. If *create* is `True`, the mailbox is created if it does not
exist.

MMDF is a single-file mailbox format invented for the Multichannel Memorandum
Distribution Facility, a mail transfer agent. Each message is in the same
form as an mbox message but is bracketed before and after by lines containing
four Control-A (`'\001'`) characters. As with the mbox format, the
beginning of each message is indicated by a line whose first five characters
are "From ", but additional occurrences of "From " are not transformed to
">From " when storing messages because the extra message separator lines
prevent mistaking such occurrences for the starts of subsequent messages.

Some `Mailbox` methods implemented by `MMDF` deserve special
remarks:

### `get_bytes(key, from_=False)`

Note: This method has an extra parameter (*from_*) compared with other classes.
The first line of an mbox file entry is the Unix "From " line.
If *from_* is False, the first line of the file is dropped.

### `get_file(key, from_=False)`

Using the file after calling `flush()` or
`close()` on the `MMDF` instance may yield
unpredictable results or raise an exception.

Note: This method has an extra parameter (*from_*) compared with other classes.
The first line of an mbox file entry is the Unix "From " line.
If *from_* is False, the first line of the file is dropped.

### `lock()`

```python
unlock()
```

Three locking mechanisms are used---dot locking and, if available, the
`flock` and `lockf` system calls.

> **See also:** mmdf man page from tin
> A specification of MMDF format from the documentation of tin, a newsreader.
>
> MMDF
> A Wikipedia article describing the Multichannel Memorandum Distribution
> Facility.
