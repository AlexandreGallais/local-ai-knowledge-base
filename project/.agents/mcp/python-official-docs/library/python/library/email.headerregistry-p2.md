---
title: "email.headerregistry: Custom Header Objects (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/email.headerregistry.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# email.headerregistry: Custom Header Objects (part 2 of 2)

### class `Group(display_name=None, addresses=None)`

The class used to represent an address group.  The general form of an
address group is:

```
display_name: [address-list];
```

As a convenience for processing lists of addresses that consist of a mixture
of groups and single addresses, a `Group` may also be used to represent
single addresses that are not part of a group by setting *display_name* to
`None` and providing a list of the single address as *addresses*.

### `display_name`

The `display_name` of the group.  If it is `None` and there is
exactly one `Address` in `addresses`, then the `Group` represents a
single address that is not in a group.

### `addresses`

A possibly empty tuple of `.Address` objects representing the
addresses in the group.

### `__str__()`

The `str` value of a `Group` is formatted according to RFC 5322,
but with no Content Transfer Encoding of any non-ASCII characters.  If
`display_name` is none and there is a single `Address` in the
`addresses` list, the `str` value will be the same as the `str` of
that single `Address`.

**Footnotes**
