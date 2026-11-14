---
title: "mailbox --- Manipulate mailboxes in various formats (part 4 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/mailbox.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# mailbox --- Manipulate mailboxes in various formats (part 4 of 6)

## `Message` objects

### class `Message(message=None)`

A subclass of the `email.message` module's
`Message`. Subclasses of `mailbox.Message` add
mailbox-format-specific state and behavior.

If *message* is omitted, the new instance is created in a default, empty state.
If *message* is an `email.message.Message` instance, its contents are
copied; furthermore, any format-specific information is converted insofar as
possible if *message* is a `Message` instance. If *message* is a string,
a byte string,
or a file, it should contain an RFC 5322-compliant message, which is read
and parsed.  Files should be open in binary mode, but text mode files
are accepted for backward compatibility.

The format-specific state and behaviors offered by subclasses vary, but in
general it is only the properties that are not specific to a particular
mailbox that are supported (although presumably the properties are specific
to a particular mailbox format). For example, file offsets for single-file
mailbox formats and file names for directory-based mailbox formats are not
retained, because they are only applicable to the original mailbox. But state
such as whether a message has been read by the user or marked as important is
retained, because it applies to the message itself.

There is no requirement that `Message` instances be used to represent
messages retrieved using `Mailbox` instances. In some situations, the
time and memory required to generate `Message` representations might
not be acceptable. For such situations, `Mailbox` instances also
offer string and file-like representations, and a custom message factory may
be specified when a `Mailbox` instance is initialized.

### class `MaildirMessage(message=None)`

A message with Maildir-specific behaviors. Parameter *message* has the same
meaning as with the `Message` constructor.

Typically, a mail user agent application moves all of the messages in the
`new` subdirectory to the `cur` subdirectory after the first time
the user opens and closes the mailbox, recording that the messages are old
whether or not they've actually been read. Each message in `cur` has an
"info" section added to its file name to store information about its state.
(Some mail readers may also add an "info" section to messages in
`new`.)  The "info" section may take one of two forms: it may contain
"2," followed by a list of standardized flags (e.g., "2,FR") or it may
contain "1," followed by so-called experimental information. Standard flags
for Maildir messages are as follows:

```text
+------+---------+--------------------------------+
| Flag | Meaning | Explanation                    |
+======+=========+================================+
| D    | Draft   | Under composition              |
+------+---------+--------------------------------+
| F    | Flagged | Marked as important            |
+------+---------+--------------------------------+
| P    | Passed  | Forwarded, resent, or bounced  |
+------+---------+--------------------------------+
| R    | Replied | Replied to                     |
+------+---------+--------------------------------+
| S    | Seen    | Read                           |
+------+---------+--------------------------------+
| T    | Trashed | Marked for subsequent deletion |
+------+---------+--------------------------------+
```

`MaildirMessage` instances offer the following methods:

### `get_subdir()`

Return either "new" (if the message should be stored in the `new`
subdirectory) or "cur" (if the message should be stored in the `cur`
subdirectory).

> **Note:** A message is typically moved from `new` to `cur` after its
> mailbox has been accessed, whether or not the message has been
> read. A message `msg` has been read if `"S" in msg.get_flags()` is
> `True`.

### `set_subdir(subdir)`

Set the subdirectory the message should be stored in. Parameter *subdir*
must be either "new" or "cur".

### `get_flags()`

Return a string specifying the flags that are currently set. If the
message complies with the standard Maildir format, the result is the
concatenation in alphabetical order of zero or one occurrence of each of
`'D'`, `'F'`, `'P'`, `'R'`, `'S'`, and `'T'`. The empty string
is returned if no flags are set or if "info" contains experimental
semantics.

### `set_flags(flags)`

Set the flags specified by *flags* and unset all others.

### `add_flag(flag)`

Set the flag(s) specified by *flag* without changing other flags. To add
more than one flag at a time, *flag* may be a string of more than one
character. The current "info" is overwritten whether or not it contains
experimental information rather than flags.

### `remove_flag(flag)`

Unset the flag(s) specified by *flag* without changing other flags. To
remove more than one flag at a time, *flag* may be a string of more than
one character.  If "info" contains experimental information rather than
flags, the current "info" is not modified.

### `get_date()`

Return the delivery date of the message as a floating-point number
representing seconds since the epoch.

### `set_date(date)`

Set the delivery date of the message to *date*, a floating-point number
representing seconds since the epoch.

### `get_info()`

Return a string containing the "info" for a message. This is useful for
accessing and modifying "info" that is experimental (i.e., not a list of
flags).

### `set_info(info)`

Set "info" to *info*, which should be a string.

When a `MaildirMessage` instance is created based upon an
`mboxMessage` or `MMDFMessage` instance, the Status
and X-Status headers are omitted and the following conversions
take place:

```text
+--------------------+----------------------------------------------+
| Resulting state    | :class:`mboxMessage` or :class:`MMDFMessage` |
|                    | state                                        |
+====================+==============================================+
| "cur" subdirectory | O flag                                       |
+--------------------+----------------------------------------------+
| F flag             | F flag                                       |
+--------------------+----------------------------------------------+
| R flag             | A flag                                       |
+--------------------+----------------------------------------------+
| S flag             | R flag                                       |
+--------------------+----------------------------------------------+
| T flag             | D flag                                       |
+--------------------+----------------------------------------------+
```

When a `MaildirMessage` instance is created based upon an
`MHMessage` instance, the following conversions take place:

```text
+-------------------------------+--------------------------+
| Resulting state               | :class:`MHMessage` state |
+===============================+==========================+
| "cur" subdirectory            | "unseen" sequence        |
+-------------------------------+--------------------------+
| "cur" subdirectory and S flag | no "unseen" sequence     |
+-------------------------------+--------------------------+
| F flag                        | "flagged" sequence       |
+-------------------------------+--------------------------+
| R flag                        | "replied" sequence       |
+-------------------------------+--------------------------+
```

When a `MaildirMessage` instance is created based upon a
`BabylMessage` instance, the following conversions take place:

```text
+-------------------------------+-------------------------------+
| Resulting state               | :class:`BabylMessage` state   |
+===============================+===============================+
| "cur" subdirectory            | "unseen" label                |
+-------------------------------+-------------------------------+
| "cur" subdirectory and S flag | no "unseen" label             |
+-------------------------------+-------------------------------+
| P flag                        | "forwarded" or "resent" label |
+-------------------------------+-------------------------------+
| R flag                        | "answered" label              |
+-------------------------------+-------------------------------+
| T flag                        | "deleted" label               |
+-------------------------------+-------------------------------+
```

### class `mboxMessage(message=None)`

A message with mbox-specific behaviors. Parameter *message* has the same meaning
as with the `Message` constructor.

Messages in an mbox mailbox are stored together in a single file. The
sender's envelope address and the time of delivery are typically stored in a
line beginning with "From " that is used to indicate the start of a message,
though there is considerable variation in the exact format of this data among
mbox implementations. Flags that indicate the state of the message, such as
whether it has been read or marked as important, are typically stored in
Status and X-Status headers.

Conventional flags for mbox messages are as follows:

```text
+------+----------+--------------------------------+
| Flag | Meaning  | Explanation                    |
+======+==========+================================+
| R    | Read     | Read                           |
+------+----------+--------------------------------+
| O    | Old      | Previously detected by MUA     |
+------+----------+--------------------------------+
| D    | Deleted  | Marked for subsequent deletion |
+------+----------+--------------------------------+
| F    | Flagged  | Marked as important            |
+------+----------+--------------------------------+
| A    | Answered | Replied to                     |
+------+----------+--------------------------------+
```

The "R" and "O" flags are stored in the Status header, and the
"D", "F", and "A" flags are stored in the X-Status header. The
flags and headers typically appear in the order mentioned.

`mboxMessage` instances offer the following methods:

### `get_from()`

Return a string representing the "From " line that marks the start of the
message in an mbox mailbox. The leading "From " and the trailing newline
are excluded.

### `set_from(from_, time_=None)`

Set the "From " line to *from_*, which should be specified without a
leading "From " or trailing newline. For convenience, *time_* may be
specified and will be formatted appropriately and appended to *from_*. If
*time_* is specified, it should be a `time.struct_time` instance, a
tuple suitable for passing to `time.strftime()`, or `True` (to use
`time.gmtime()`).

### `get_flags()`

Return a string specifying the flags that are currently set. If the
message complies with the conventional format, the result is the
concatenation in the following order of zero or one occurrence of each of
`'R'`, `'O'`, `'D'`, `'F'`, and `'A'`.

### `set_flags(flags)`

Set the flags specified by *flags* and unset all others. Parameter *flags*
should be the concatenation in any order of zero or more occurrences of
each of `'R'`, `'O'`, `'D'`, `'F'`, and `'A'`.

### `add_flag(flag)`

Set the flag(s) specified by *flag* without changing other flags. To add
more than one flag at a time, *flag* may be a string of more than one
character.

### `remove_flag(flag)`

Unset the flag(s) specified by *flag* without changing other flags. To
remove more than one flag at a time, *flag* may be a string of more than
one character.

When an `mboxMessage` instance is created based upon a
`MaildirMessage` instance, a "From " line is generated based upon the
`MaildirMessage` instance's delivery date, and the following conversions
take place:

```text
+-----------------+-------------------------------+
| Resulting state | :class:`MaildirMessage` state |
+=================+===============================+
| R flag          | S flag                        |
+-----------------+-------------------------------+
| O flag          | "cur" subdirectory            |
+-----------------+-------------------------------+
| D flag          | T flag                        |
+-----------------+-------------------------------+
| F flag          | F flag                        |
+-----------------+-------------------------------+
| A flag          | R flag                        |
+-----------------+-------------------------------+
```

When an `mboxMessage` instance is created based upon an
`MHMessage` instance, the following conversions take place:

```text
+-------------------+--------------------------+
| Resulting state   | :class:`MHMessage` state |
+===================+==========================+
| R flag and O flag | no "unseen" sequence     |
+-------------------+--------------------------+
| O flag            | "unseen" sequence        |
+-------------------+--------------------------+
| F flag            | "flagged" sequence       |
+-------------------+--------------------------+
| A flag            | "replied" sequence       |
+-------------------+--------------------------+
```

When an `mboxMessage` instance is created based upon a
`BabylMessage` instance, the following conversions take place:

```text
+-------------------+-----------------------------+
| Resulting state   | :class:`BabylMessage` state |
+===================+=============================+
| R flag and O flag | no "unseen" label           |
+-------------------+-----------------------------+
| O flag            | "unseen" label              |
+-------------------+-----------------------------+
| D flag            | "deleted" label             |
+-------------------+-----------------------------+
| A flag            | "answered" label            |
+-------------------+-----------------------------+
```

When a `mboxMessage` instance is created based upon an
`MMDFMessage`
instance, the "From " line is copied and all flags directly correspond:

```text
+-----------------+----------------------------+
| Resulting state | :class:`MMDFMessage` state |
+=================+============================+
| R flag          | R flag                     |
+-----------------+----------------------------+
| O flag          | O flag                     |
+-----------------+----------------------------+
| D flag          | D flag                     |
+-----------------+----------------------------+
| F flag          | F flag                     |
+-----------------+----------------------------+
| A flag          | A flag                     |
+-----------------+----------------------------+
```
