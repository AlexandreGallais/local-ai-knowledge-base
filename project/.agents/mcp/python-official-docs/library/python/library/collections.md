---
title: "collections --- Container datatypes (part 1 of 5)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/library/collections.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# `collections` --- Container datatypes

Module `collections`.

**Source code:** Lib/collections/__init__.py

This module implements specialized container datatypes providing alternatives to
Python's general purpose built-in containers, `dict`, `list`,
`set`, and `tuple`.

```text
=====================   ====================================================================
:func:`namedtuple`      factory function for creating tuple subclasses with named fields
:class:`deque`          list-like container with fast appends and pops on either end
:class:`ChainMap`       dict-like class for creating a single view of multiple mappings
:class:`Counter`        dict subclass for counting :term:`hashable` objects
:class:`OrderedDict`    dict subclass that remembers the order entries were added
:class:`defaultdict`    dict subclass that calls a factory function to supply missing values
:class:`UserDict`       wrapper around dictionary objects for easier dict subclassing
:class:`UserList`       wrapper around list objects for easier list subclassing
:class:`UserString`     wrapper around string objects for easier string subclassing
=====================   ====================================================================
```

## `ChainMap` objects

> *Added in version 3.3.*

A `ChainMap` class is provided for quickly linking a number of mappings
so they can be treated as a single unit.  It is often much faster than creating
a new dictionary and running multiple `update()` calls.

The class can be used to simulate nested scopes and is useful in templating.

### class `ChainMap(*maps)`

A `ChainMap` groups multiple dicts or other mappings together to
create a single, updateable view.  If no *maps* are specified, a single empty
dictionary is provided so that a new chain always has at least one mapping.

The underlying mappings are stored in a list.  That list is public and can
be accessed or updated using the *maps* attribute.  There is no other state.

Lookups search the underlying mappings successively until a key is found.  In
contrast, writes, updates, and deletions only operate on the first mapping.

A `ChainMap` incorporates the underlying mappings by reference.  So, if
one of the underlying mappings gets updated, those changes will be reflected
in `ChainMap`.

All of the usual dictionary methods are supported.  In addition, there is a
*maps* attribute, a method for creating new subcontexts, and a property for
accessing all but the first mapping:

### `maps`

A user updateable list of mappings.  The list is ordered from
first-searched to last-searched.  It is the only stored state and can
be modified to change which mappings are searched.  The list should
always contain at least one mapping.

### `new_child(m=None, **kwargs)`

Returns a new `ChainMap` containing a new map followed by
all of the maps in the current instance.  If `m` is specified,
it becomes the new map at the front of the list of mappings; if not
specified, an empty dict is used, so that a call to `d.new_child()`
is equivalent to: `ChainMap({}, *d.maps)`. If any keyword arguments
are specified, they update passed map or new empty dict. This method
is used for creating subcontexts that can be updated without altering
values in any of the parent mappings.

> *Changed in version 3.4.*
> The optional `m` parameter was added.

> *Changed in version 3.10.*
> Keyword arguments support was added.

### `parents`

Property returning a new `ChainMap` containing all of the maps in
the current instance except the first one.  This is useful for skipping
the first map in the search.  Use cases are similar to those for the
`nonlocal` keyword used in :term:`nested scopes <nested
scope>`.  The use cases also parallel those for the built-in
`super()` function.  A reference to `d.parents` is equivalent to:
`ChainMap(*d.maps[1:])`.

Note, the iteration order of a `ChainMap` is determined by
scanning the mappings last to first:

```
>>> baseline = {'music': 'bach', 'art': 'rembrandt'}
>>> adjustments = {'art': 'van gogh', 'opera': 'carmen'}
>>> list(ChainMap(adjustments, baseline))
['music', 'art', 'opera']
```

This gives the same ordering as a series of `dict.update()` calls
starting with the last mapping:

```
>>> combined = baseline.copy()
>>> combined.update(adjustments)
>>> list(combined)
['music', 'art', 'opera']
```

> *Changed in version 3.9.*
> Added support for `|` and `|=` operators, specified in PEP 584.

> **See also:** - The `MultiContext class
> <https://github.com/enthought/codetools/blob/4.0.0/codetools/contexts/multi_context.py>`_
> in the Enthought `CodeTools package
> <https://github.com/enthought/codetools>`_ has options to support
> writing to any mapping in the chain.
>
> - Django's `Context class
> <https://github.com/django/django/blob/main/django/template/context.py>`_
> for templating is a read-only chain of mappings.  It also features
> pushing and popping of contexts similar to the
> `new_child()` method and the
> `parents` property.
>
> - The `Nested Contexts recipe
> <https://code.activestate.com/recipes/577434-nested-contexts-a-chain-of-mapping-objects/>`_ has options to control
> whether writes and other mutations apply only to the first mapping or to
> any mapping in the chain.
>
> - A `greatly simplified read-only version of Chainmap
> <https://code.activestate.com/recipes/305268/>`_.

### `ChainMap` Examples and Recipes

This section shows various approaches to working with chained maps.

Example of simulating Python's internal lookup chain:

```
import builtins
pylookup = ChainMap(locals(), globals(), vars(builtins))
```

Example of letting user specified command-line arguments take precedence over
environment variables which in turn take precedence over default values:

```
import os, argparse

defaults = {'color': 'red', 'user': 'guest'}

parser = argparse.ArgumentParser()
parser.add_argument('-u', '--user')
parser.add_argument('-c', '--color')
namespace = parser.parse_args()
command_line_args = {k: v for k, v in vars(namespace).items() if v is not None}

combined = ChainMap(command_line_args, os.environ, defaults)
print(combined['color'])
print(combined['user'])
```

Example patterns for using the `ChainMap` class to simulate nested
contexts:

```
c = ChainMap()        # Create root context
d = c.new_child()     # Create nested child context
e = c.new_child()     # Child of c, independent from d
e.maps[0]             # Current context dictionary -- like Python's locals()
e.maps[-1]            # Root context -- like Python's globals()
e.parents             # Enclosing context chain -- like Python's nonlocals

d['x'] = 1            # Set value in current context
d['x']                # Get first key in the chain of contexts
del d['x']            # Delete from current context
list(d)               # All nested values
k in d                # Check all nested values
len(d)                # Number of nested values
d.items()             # All nested items
dict(d)               # Flatten into a regular dictionary
```

The `ChainMap` class only makes updates (writes and deletions) to the
first mapping in the chain while lookups will search the full chain.  However,
if deep writes and deletions are desired, it is easy to make a subclass that
updates keys found deeper in the chain:

```
class DeepChainMap(ChainMap):
    'Variant of ChainMap that allows direct updates to inner scopes'

    def __setitem__(self, key, value):
        for mapping in self.maps:
            if key in mapping:
                mapping[key] = value
                return
        self.maps[0][key] = value

    def __delitem__(self, key):
        for mapping in self.maps:
            if key in mapping:
                del mapping[key]
                return
        raise KeyError(key)

>>> d = DeepChainMap({'zebra': 'black'}, {'elephant': 'blue'}, {'lion': 'yellow'})
>>> d['lion'] = 'orange'         # update an existing key two levels down
>>> d['snake'] = 'red'           # new keys get added to the topmost dict
>>> del d['elephant']            # remove an existing key one level down
>>> d                            # display result
DeepChainMap({'zebra': 'black', 'snake': 'red'}, {}, {'lion': 'orange'})
```
