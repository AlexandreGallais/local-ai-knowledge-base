---
title: "inkex.colors"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/colors.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.colors

Basic color controls

## is_color

```python
def is_color(color)
```

Determine if it is a color that we can use. If not, leave it unchanged.

## constrain

```python
def constrain(minim, value, maxim, channel)
```

Returns the value so long as it is between min and max values

## class ColorError

```python
class ColorError(KeyError)
```

Specific color parsing error

## class ColorIdError

```python
class ColorIdError(ColorError)
```

Special color error for gradient and color stop ids

## class Color

```python
class Color(list)
```

An RGB array for the color

Can be constructed from valid CSS color attributes, as well as
tuple/list + color space. Percentage values are supported.

> *Changed in version 1.2.*
> Clarification with respect to values denoting unity: For RGB color channels,
> "1.0", 1.0 and "100%" are treated as 255, while "1" and 1 are treated as 1.

## Color.append

```python
def append(self, val)
```

Append a value to the local list

## Color.parse_str

```python
def parse_str(color)
```

Creates a rgb int array

## Color.parse_int

```python
def parse_int(color)
```

Creates an rgb or rgba from a long int

## Color.to

```python
def to(self, space): # pylint: disable=invalid-name """Dynamic caller for to_hsl, to_rgb, etc""" return getattr(self, "to_" + space)() def to_hsl(self)
```

Turn this color into a Hue/Saturation/Lightness colour space

## Color.to_hsl

```python
def to_hsl(self)
```

Turn this color into a Hue/Saturation/Lightness colour space

## Color.to_rgb

```python
def to_rgb(self)
```

Turn this color into a Red/Green/Blue colour space

## Color.to_rgba

```python
def to_rgba(self, alpha=1.0)
```

Turn this color isn't an RGB with Alpha colour space

## Color.to_floats

```python
def to_floats(self)
```

Returns the colour values as percentage floats (0.0 - 1.0)

## Color.to_named

```python
def to_named(self)
```

Convert this color to a named color if possible

## Color.interpolate

```python
def interpolate(self, other, fraction)
```

Interpolate two colours by the given fraction

> *Added in version 1.1.*

## Color.isnone

```python
def isnone(x)
```

Checks if a given color is none

> *Added in version 1.2.*

## Color.iscolor

```python
def iscolor(x, accept_none=False)
```

Checks if a given value can be parsed as a color

> *Added in version 1.2.*

## rgb_to_hsl

```python
def rgb_to_hsl(red, green, blue)
```

RGB to HSL colour conversion

## hsl_to_rgb

```python
def hsl_to_rgb(hue, sat, light)
```

HSL to RGB Color Conversion

## hsv_to_hsl

```python
def hsv_to_hsl(hue, saturation, value)
```

Conversion according to
https://en.wikipedia.org/wiki/HSL_and_HSV#HSV_to_HSL

> *Added in version 1.5.*
