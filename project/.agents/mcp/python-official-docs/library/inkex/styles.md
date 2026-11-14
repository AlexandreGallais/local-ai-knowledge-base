---
title: "inkex.styles"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/styles.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.styles

Functions for handling styles and embedded css

## class Classes

```python
class Classes(NotifyList)
```

A list of classes applied to an element (used in css and js)

## class StyleValue

```python
class StyleValue
```

Encapsulates a single parsed style value + its importance state

## StyleValue.is_inherit

```python
def is_inherit(self)
```

Checks if the value is "inherit"

## class Style

```python
class Style(NotifyOrderedDict)
```

A list of style directives

> *Changed in version 1.2.*
> The Style API now allows for access to parsed / processed styles via the
> `call()` method.

## Style.parse_str

```python
def parse_str(style: str, element=None)
```

Parse a style passed as string

## Style.to_str

```python
def to_str(self, sep=";")
```

Convert to string using a custom delimiter

## Style.copy

```python
def copy(self)
```

Create a copy of the style.

> *Added in version 1.2.*

## Style.update

```python
def update(self, other)
```

Update, while respecting `!important` declarations, and simplifying
shorthands

## Style.add_inherited

```python
def add_inherited(self, parent)
```

Creates a new Style containing all parent styles with importance "!important"
and current styles with importance "!important"

> *Added in version 1.2.*

Args:
parent: the parent style that will be merged into this one (will not be
altered)

Returns:
Style: the merged Style object

## Style.get_store

```python
def get_store(self, key)
```

Gets the `BaseStyleValue` of this key, since the
other interfaces - `__getitem__() and call__()` - return the
original and parsed value, respectively.

> *Added in version 1.2.*

Args:
key (str): the attribute name

Returns:
BaseStyleValue: the BaseStyleValue struct of this attribute

## Style.items

```python
def items(self)
```

The styles's items as string

> *Added in version 1.2.*

## Style.get_importance

```python
def get_importance(self, key, default=False)
```

Returns whether the declaration with `key` is marked as `!important`

> *Added in version 1.2.*

## Style.set_importance

```python
def set_importance(self, key, importance)
```

Sets the `!important` state of a declaration with key `key`

> *Added in version 1.2.*

## Style.get_color

```python
def get_color(self, name="fill")
```

Get the color AND opacity as one Color object

## Style.set_color

```python
def set_color(self, color, name="fill")
```

Sets the given color AND opacity as rgba to the fill or stroke style
properties.

## Style.update_urls

```python
def update_urls(self, old_id, new_id)
```

Find urls in this style and replace them with the new id

## Style.cascaded_style

```python
def cascaded_style(cls, element: BaseElement)
```

Returns the cascaded style of an element (all rules that apply the element
itself), based on the stylesheets, the presentation attributes and the inline
style using the respective specificity of the style

see https://www.w3.org/TR/CSS22/cascade.html#cascading-order

> *Added in version 1.2.*

Args:
element (BaseElement): the element that the cascaded style will be
computed for

Returns:
Style: the cascaded style

## Style.specified_style

```python
def specified_style(cls, element)
```

Returns the specified style of an element, i.e. the cascaded style +
inheritance, see https://www.w3.org/TR/CSS22/cascade.html#specified-value

> *Added in version 1.2.*

Args:
element (BaseElement): the element that the specified style will be computed
for

Returns:
Style: the specified style

## class StyleSheets

```python
class StyleSheets(list)
```

Special mechanism which contains all the stylesheets for an svg document
while also caching lookups for specific elements.

This caching is needed because data can't be attached to elements as they are
re-created on the fly by lxml so lookups have to be centralised.

## StyleSheets.lookup

```python
def lookup(self, element)
```

Find all styles for this element.

## StyleSheets.lookup_specificity

```python
def lookup_specificity(self, element)
```

Find all styles for this element and return the specificity of the match.

> *Added in version 1.2.*

## class StyleSheet

```python
class StyleSheet(list)
```

A style sheet, usually the CDATA contents of a style tag, but also
a css file used with a css. Will yield multiple Style() classes.

## StyleSheet.add

```python
def add(self, rule, style)
```

Append a rule and style combo to this stylesheet

## StyleSheet.append

```python
def append(self, other: str | tinycss2.ast.QualifiedRule)
```

Make sure callback is called when updating

## StyleSheet.lookup

```python
def lookup(self, element)
```

Lookup the element against all the styles in this sheet

## StyleSheet.lookup_specificity

```python
def lookup_specificity(self, element)
```

Lookup the element_id against all the styles in this sheet
and return the specificity of the match

Args:
element: the element of the element that styles are being queried for

Yields:
Tuple[ConditionalStyle, Tuple[int, int, int]]: all matched styles and the
specificity of the match

## class ConditionalStyle

```python
class ConditionalStyle(Style)
```

Just like a Style object, but includes one or more
conditional rules which places this style in a stylesheet
rather than being an attribute style.

## ConditionalStyle.matches

```python
def matches(self, element: etree.Element)
```

Checks if an individual element matches this selector.

> *Added in version 1.4.*

## ConditionalStyle.all_matches

```python
def all_matches(self, document: etree.Element)
```

Get all matches of this selector in document as iterator.

> *Added in version 1.4.*

## ConditionalStyle.get_specificities

```python
def get_specificities(self, element: Optional[BaseElement] = None)
```

Gets an iterator of the specificity of all rules in this ConditionalStyle

> *Added in version 1.2.*
