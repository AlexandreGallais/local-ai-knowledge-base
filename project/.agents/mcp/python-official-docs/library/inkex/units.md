# inkex.units

Convert to and from various units and find the closest matching unit.

## parse_unit

```python
def parse_unit(value, default_unit="px", default_value=None)
```

Takes a value such as 55.32px and returns (55.32, 'px')
Returns default (None) if no match can be found

## are_near_relative

```python
def are_near_relative(point_a, point_b, eps=0.01)
```

Return true if the points are near to eps

## discover_unit

```python
def discover_unit(value, viewbox, default="px")
```

Attempt to detect the unit being used based on the viewbox

## convert_unit

```python
def convert_unit(value, to_unit, default="px")
```

Returns userunits given a string representation of units in another system

Args:
    value: <length> string
    to_unit: unit to convert to
    default: if ``value`` contains no unit, what unit should be assumed.

        .. versionadded:: 1.1

## render_unit

```python
def render_unit(value, unit)
```

Checks and then renders a number with its unit