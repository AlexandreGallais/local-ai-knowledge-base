---
title: "inkex.tester.filters"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/tester/filters.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.tester.filters

Comparison filters for use with the ComparisonMixin.

Each filter should be initialised in the list of
filters that are being used.

```python
compare_filters = [
    CompareNumericFuzzy(),
    CompareOrderIndependentLines(option=yes),
]
```

## class Compare

```python
class Compare
```

Comparison base class, this acts as a passthrough unless
the filter staticmethod is overwritten.

## Compare.filter

```python
def filter(contents)
```

Replace this filter method with your own filtering

## class CompareNumericFuzzy

```python
class CompareNumericFuzzy(Compare)
```

Turn all numbers into shorter standard formats

- 1.2345678 -> 1.2346
- 1.2300 -> 1.23, 50.0000 -> 50.0
- 50.0 -> 50

## class CompareWithoutIds

```python
class CompareWithoutIds(Compare)
```

Remove all ids from the svg

## class CompareWithPathSpace

```python
class CompareWithPathSpace(Compare)
```

Make sure that path segment commands have spaces around them

## class CompareSize

```python
class CompareSize(Compare)
```

Compare the length of the contents instead of the contents

## class CompareOrderIndependentBytes

```python
class CompareOrderIndependentBytes(Compare)
```

Take all the bytes and sort them

## class CompareOrderIndependentLines

```python
class CompareOrderIndependentLines(Compare)
```

Take all the lines and sort them

## class CompareOrderIndependentStyle

```python
class CompareOrderIndependentStyle(Compare)
```

Take all styles and sort the results

## class CompareOrderIndependentStyleAndPath

```python
class CompareOrderIndependentStyleAndPath(Compare)
```

Take all styles and paths and sort them both

## class CompareOrderIndependentTags

```python
class CompareOrderIndependentTags(Compare)
```

Sorts all the XML tags

## class CompareReplacement

```python
class CompareReplacement(Compare)
```

Replace pieces to make output more comparable

> *Added in version 1.1.*

## class WindowsTextCompat

```python
class WindowsTextCompat(CompareReplacement)
```

Normalize newlines so tests comparing plain text work

> *Added in version 1.2.*
