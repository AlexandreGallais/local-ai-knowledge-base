---
title: "datetime --- Basic date and time types (part 8 of 10)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/datetime.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# datetime --- Basic date and time types (part 8 of 10)

## `strftime()` and `strptime()` behavior

`date`, `.datetime`, and `.time` objects all support a
`strftime(format)` method, to create a string representing the time under the
control of an explicit format string.

Conversely, the `date.strptime()`, `datetime.strptime()` and
`time.strptime()` class methods create an object from a string
representing the time and a corresponding format string.

The table below provides a high-level comparison of `strftime()`
versus `strptime()`:

```text
+----------------+--------------------------------------------------------+------------------------------------------------------------+
|                | ``strftime``                                           | ``strptime``                                               |
+================+========================================================+============================================================+
| Usage          | Convert object to a string according to a given format | Parse a string into an object given a corresponding format |
+----------------+--------------------------------------------------------+------------------------------------------------------------+
| Type of method | Instance method                                        | Class method                                               |
+----------------+--------------------------------------------------------+------------------------------------------------------------+
| Signature      | ``strftime(format)``                                   | ``strptime(date_string, format)``                          |
+----------------+--------------------------------------------------------+------------------------------------------------------------+
```
