---
title: "pwd --- The password <example-value>"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/pwd.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `pwd` --- The password <example-value>

Module `pwd`.

This module provides access to the Unix user account and password database.  It
is available on all Unix versions.

> **Availability:** Unix, not WASI, not iOS.

Password <example-value> entries are reported as a tuple-like object, whose attributes
correspond to the members of the `passwd` structure (Attribute field below,
see `<pwd.h>`):

```text
+-------+---------------+-----------------------------+
| Index | Attribute     | Meaning                     |
+=======+===============+=============================+
| 0     | ``pw_name``   | Login name                  |
+-------+---------------+-----------------------------+
| 1     | ``pw_passwd`` | Optional encrypted password |
+-------+---------------+-----------------------------+
| 2     | ``pw_uid``    | Numerical user ID           |
+-------+---------------+-----------------------------+
| 3     | ``pw_gid``    | Numerical group ID          |
+-------+---------------+-----------------------------+
| 4     | ``pw_gecos``  | User name or comment field  |
+-------+---------------+-----------------------------+
| 5     | ``pw_dir``    | User home directory         |
+-------+---------------+-----------------------------+
| 6     | ``pw_shell``  | User command interpreter    |
+-------+---------------+-----------------------------+
```

The uid and gid items are integers, all others are strings. `KeyError` is
raised if the entry asked for cannot be found.

> **Note:** In traditional Unix the field `pw_passwd` usually contains a password
> encrypted with a DES derived algorithm.  However most
> modern unices  use a so-called *shadow password* system.  On those unices the
> *pw_passwd* field only contains an asterisk (`'<example-value>'`) or the  letter `'<example-value>'`
> where the encrypted password is stored in a file `/etc/shadow` which is
> not world readable.  Whether the *pw_passwd* field contains anything useful is
> system-dependent.

It defines the following items:

### `getpwuid(uid)`

Return the password <example-value> entry for the given numeric user ID.

### `getpwnam(name)`

Return the password <example-value> entry for the given user name.

### `getpwall()`

Return a list of all available password <example-value> entries, in arbitrary order.

> **See also:** Module `grp`
> An interface to the group database, similar to this.
