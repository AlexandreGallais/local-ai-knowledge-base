---
title: "mailbox --- Manipulate mailboxes in various formats (part 5 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/mailbox.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# mailbox --- Manipulate mailboxes in various formats (part 5 of 6)

### class `MHMessage(message=None)`

A message with MH-specific behaviors. Parameter *message* has the same meaning
as with the `Message` constructor.

MH messages do not support marks or flags in the traditional sense, but they
do support sequences, which are logical groupings of arbitrary messages. Some
mail reading programs (although not the standard `mh` and
`nmh`) use sequences in much the same way flags are used with other
formats, as follows:

```text
+----------+------------------------------------------+
| Sequence | Explanation                              |
+==========+==========================================+
| unseen   | Not read, but previously detected by MUA |
+----------+------------------------------------------+
| replied  | Replied to                               |
+----------+------------------------------------------+
| flagged  | Marked as important                      |
+----------+------------------------------------------+
```

`MHMessage` instances offer the following methods:

### `get_sequences()`

Return a list of the names of sequences that include this message.

### `set_sequences(sequences)`

Set the list of sequences that include this message.

### `add_sequence(sequence)`

Add *sequence* to the list of sequences that include this message.

### `remove_sequence(sequence)`

Remove *sequence* from the list of sequences that include this message.

When an `MHMessage` instance is created based upon a
`MaildirMessage` instance, the following conversions take place:

```text
+--------------------+-------------------------------+
| Resulting state    | :class:`MaildirMessage` state |
+====================+===============================+
| "unseen" sequence  | no S flag                     |
+--------------------+-------------------------------+
| "replied" sequence | R flag                        |
+--------------------+-------------------------------+
| "flagged" sequence | F flag                        |
+--------------------+-------------------------------+
```

When an `MHMessage` instance is created based upon an
`mboxMessage` or `MMDFMessage` instance, the Status
and X-Status headers are omitted and the following conversions
take place:

```text
+--------------------+----------------------------------------------+
| Resulting state    | :class:`mboxMessage` or :class:`MMDFMessage` |
|                    | state                                        |
+====================+==============================================+
| "unseen" sequence  | no R flag                                    |
+--------------------+----------------------------------------------+
| "replied" sequence | A flag                                       |
+--------------------+----------------------------------------------+
| "flagged" sequence | F flag                                       |
+--------------------+----------------------------------------------+
```

When an `MHMessage` instance is created based upon a
`BabylMessage` instance, the following conversions take place:

```text
+--------------------+-----------------------------+
| Resulting state    | :class:`BabylMessage` state |
+====================+=============================+
| "unseen" sequence  | "unseen" label              |
+--------------------+-----------------------------+
| "replied" sequence | "answered" label            |
+--------------------+-----------------------------+
```

### class `BabylMessage(message=None)`

A message with Babyl-specific behaviors. Parameter *message* has the same
meaning as with the `Message` constructor.

Certain message labels, called attributes, are defined by convention
to have special meanings. The attributes are as follows:

```text
+-----------+------------------------------------------+
| Label     | Explanation                              |
+===========+==========================================+
| unseen    | Not read, but previously detected by MUA |
+-----------+------------------------------------------+
| deleted   | Marked for subsequent deletion           |
+-----------+------------------------------------------+
| filed     | Copied to another file or mailbox        |
+-----------+------------------------------------------+
| answered  | Replied to                               |
+-----------+------------------------------------------+
| forwarded | Forwarded                                |
+-----------+------------------------------------------+
| edited    | Modified by the user                     |
+-----------+------------------------------------------+
| resent    | Resent                                   |
+-----------+------------------------------------------+
```

By default, Rmail displays only visible headers. The `BabylMessage`
class, though, uses the original headers because they are more
complete. Visible headers may be accessed explicitly if desired.

`BabylMessage` instances offer the following methods:

### `get_labels()`

Return a list of labels on the message.

### `set_labels(labels)`

Set the list of labels on the message to *labels*.

### `add_label(label)`

Add *label* to the list of labels on the message.

### `remove_label(label)`

Remove *label* from the list of labels on the message.

### `get_visible()`

Return a `Message` instance whose headers are the message's
visible headers and whose body is empty.

### `set_visible(visible)`

Set the message's visible headers to be the same as the headers in
*message*.  Parameter *visible* should be a `Message` instance, an
`email.message.Message` instance, a string, or a file-like object
(which should be open in text mode).

### `update_visible()`

When a `BabylMessage` instance's original headers are modified, the
visible headers are not automatically modified to correspond. This method
updates the visible headers as follows: each visible header with a
corresponding original header is set to the value of the original header,
each visible header without a corresponding original header is removed,
and any of Date, From, Reply-To,
To, CC, and Subject that are
present in the original headers but not the visible headers are added to
the visible headers.

When a `BabylMessage` instance is created based upon a
`MaildirMessage` instance, the following conversions take place:

```text
+-------------------+-------------------------------+
| Resulting state   | :class:`MaildirMessage` state |
+===================+===============================+
| "unseen" label    | no S flag                     |
+-------------------+-------------------------------+
| "deleted" label   | T flag                        |
+-------------------+-------------------------------+
| "answered" label  | R flag                        |
+-------------------+-------------------------------+
| "forwarded" label | P flag                        |
+-------------------+-------------------------------+
```

When a `BabylMessage` instance is created based upon an
`mboxMessage` or `MMDFMessage` instance, the Status
and X-Status headers are omitted and the following conversions
take place:

```text
+------------------+----------------------------------------------+
| Resulting state  | :class:`mboxMessage` or :class:`MMDFMessage` |
|                  | state                                        |
+==================+==============================================+
| "unseen" label   | no R flag                                    |
+------------------+----------------------------------------------+
| "deleted" label  | D flag                                       |
+------------------+----------------------------------------------+
| "answered" label | A flag                                       |
+------------------+----------------------------------------------+
```

When a `BabylMessage` instance is created based upon an
`MHMessage` instance, the following conversions take place:

```text
+------------------+--------------------------+
| Resulting state  | :class:`MHMessage` state |
+==================+==========================+
| "unseen" label   | "unseen" sequence        |
+------------------+--------------------------+
| "answered" label | "replied" sequence       |
+------------------+--------------------------+
```

### class `MMDFMessage(message=None)`

A message with MMDF-specific behaviors. Parameter *message* has the same meaning
as with the `Message` constructor.

As with message in an mbox mailbox, MMDF messages are stored with the
sender's address and the delivery date in an initial line beginning with
"From ".  Likewise, flags that indicate the state of the message are
typically stored in Status and X-Status headers.

Conventional flags for MMDF messages are identical to those of mbox message
and are as follows:

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

`MMDFMessage` instances offer the following methods, which are
identical to those offered by `mboxMessage`:

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

When an `MMDFMessage` instance is created based upon a
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

When an `MMDFMessage` instance is created based upon an
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

When an `MMDFMessage` instance is created based upon a
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

When an `MMDFMessage` instance is created based upon an
`mboxMessage` instance, the "From " line is copied and all flags directly
correspond:

```text
+-----------------+----------------------------+
| Resulting state | :class:`mboxMessage` state |
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
