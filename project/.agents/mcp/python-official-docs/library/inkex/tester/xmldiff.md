# inkex.tester.xmldiff

Allow two xml files/lxml etrees to be compared, returning their differences.

## text_compare

```python
def text_compare(test1, test2)
```

Compare two text strings while allowing for '*' to match
anything on either lhs or rhs.

## class DeltaLogger

```python
class DeltaLogger(list)
```

A record keeper of the delta between two svg files

## DeltaLogger.append_tag

```python
def append_tag(self, tag_a, tag_b)
```

Record a tag difference

## DeltaLogger.append_attr

```python
def append_attr(self, attr, value_a, value_b)
```

Record an attribute difference

## DeltaLogger.append_text

```python
def append_text(self, text_a, text_b)
```

Record a text difference

## to_xml

```python
def to_xml(data)
```

Convert string or bytes to xml parsed root node

## xmldiff

```python
def xmldiff(data1, data2)
```

Create an xml difference, will modify the first xml structure with a diff