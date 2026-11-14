---
title: "mailbox --- Manipulate mailboxes in various formats (part 1 of 6)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/mailbox.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `mailbox` --- Manipulate mailboxes in various formats

Module `mailbox`.

**Source code:** Lib/mailbox.py

This module defines two classes, `Mailbox` and `Message`, for
accessing and manipulating on-disk mailboxes and the messages they contain.
`Mailbox` offers a dictionary-like mapping from keys to messages.
`Message` extends the `email.message` module's
`Message` class with format-specific state and behavior.
Supported mailbox formats are Maildir, mbox, MH, Babyl, and MMDF.

> **Warning:** The `mailbox` module is designed for use in trusted environments,
> where data from untrusted sources is never passed to the module's API
> calls and only trusted users have access to the filesystems accessible
> to the module.

> **See also:** Module `email`
> Represent and manipulate messages.
