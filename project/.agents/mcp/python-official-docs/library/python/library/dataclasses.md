---
title: "dataclasses --- Data Classes (part 1 of 3)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/dataclasses.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `dataclasses` --- Data Classes

Module `dataclasses`.

**Source code:** Lib/dataclasses.py

This module provides a decorator and functions for automatically
adding generated special methods such as `__init__()` and
`__repr__()` to user-defined classes.  It was originally described
in PEP 557.

The member variables to use in these generated methods are defined
using PEP 526 type annotations.  For example, this code:

```
from dataclasses import dataclass

@dataclass
class InventoryItem:
    """Class for keeping track of an item in inventory."""
    name: str
    unit_price: float
    quantity_on_hand: int = 0

    def total_cost(self) -> float:
        return self.unit_price * self.quantity_on_hand
```

will add, among other things, a `__init__()` that looks like:

```
def __init__(self, name: str, unit_price: float, quantity_on_hand: int = 0):
    self.name = name
    self.unit_price = unit_price
    self.quantity_on_hand = quantity_on_hand
```

Note that this method is automatically added to the class: it is not
directly specified in the `InventoryItem` definition shown above.

> *Added in version 3.7.*
