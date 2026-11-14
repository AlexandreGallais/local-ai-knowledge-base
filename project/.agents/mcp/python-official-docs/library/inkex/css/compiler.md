---
title: "inkex.css.compiler"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/css/compiler.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.css.compiler

CSS evaluation logic, forked from cssselect2 (rewritten without eval, targeted to
our data structure). CSS selectors are compiled into boolean evaluator functions.
All HTML-specific code has been removed, and we don't duplicate the tree data structure
but work on the normal tree.

## ascii_lower

```python
def ascii_lower(string): # from webencodings r"""Transform (only) ASCII letters to lower case: A-Z is mapped to a-z.""" return string.encode("utf8").lower().decode("utf8") # pylint: disable=protected-access,comparison-with-callable,invalid-name,bad-super-call # pylint: disable=unnecessary-lambda-assignment ## Iterators without comments. def iterancestors(element)
```

Iterate over ancestors but ignore comments.

## iterancestors

```python
def iterancestors(element)
```

Iterate over ancestors but ignore comments.

## iterdescendants

```python
def iterdescendants(element)
```

Iterate over descendants but ignore comments

## itersiblings

```python
def itersiblings(element, preceding=False)
```

Iterate over descendants but ignore comments

## iterchildren

```python
def iterchildren(element)
```

Iterate over children but ignore comments

## getprevious

```python
def getprevious(element)
```

Get the previous non-comment element

## getnext

```python
def getnext(element)
```

Get the next non-comment element

## FALSE

```python
def FALSE(_el)
```

Always returns 0

## TRUE

```python
def TRUE(_el)
```

Always returns 1

## BooleanCompiler.compile_node

```python
def compile_node(self, selector)
```

Return a boolean expression, as a callable.

When evaluated in a context where the `el` variable is an
`cssselect2.tree.Element` object, tells whether the element is a
subject of `selector`.
