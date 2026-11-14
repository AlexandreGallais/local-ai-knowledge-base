---
title: "inkex.extensions"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/extensions.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.extensions

A helper module for creating Inkscape effect extensions

This provides the basic <example-value> types of extensions which most writers should
use in their code. See below for the different types.

## class EffectExtension

```python
class EffectExtension(SvgThroughMixin, InkscapeExtension, ABC)
```

Takes the SVG from Inkscape, modifies the selection or the document
and returns an SVG to Inkscape.

## class OutputExtension

```python
class OutputExtension(SvgInputMixin, TempDirMixin, InkscapeExtension)
```

Takes the SVG from Inkscape and outputs it to something that's not an SVG.

Used in functions for `Save As`

## OutputExtension.effect

```python
def effect(self)
```

Effect isn't needed for a lot of Output extensions

## OutputExtension.save

```python
def save(self, stream)
```

But save certainly is, we give a more exact message here

## OutputExtension.preprocess

```python
def preprocess(self, types_to_path=None, unlink_clones=True)
```

Preprocess the SVG into an export-friendly document by converting
certain objects to path beforehand.

Args:
types_to_path (List[str], optional): List of element types to convert to
path. Defaults to all text elements and all non-path shape elements.
unlink_clones (bool, optional): If clones should be unlinked. Defaults to
True.

Returns:
_type_: _description_

## class RasterOutputExtension

```python
class RasterOutputExtension(InkscapeExtension)
```

Takes a PNG from Inkscape and outputs it to another raster format.

> *Added in version 1.1.*

## RasterOutputExtension.effect

```python
def effect(self)
```

Not needed since image isn't being changed

## RasterOutputExtension.save

```python
def save(self, stream)
```

Implement raster image saving here from PIL

## class InputExtension

```python
class InputExtension(SvgOutputMixin, InkscapeExtension)
```

Takes any type of file as input and outputs SVG which Inkscape can read.

Used in functions for `Open`

## InputExtension.effect

```python
def effect(self)
```

Effect isn't needed for a lot of Input extensions

## InputExtension.load

```python
def load(self, stream)
```

But load certainly is, we give a more exact message here

## class CallExtension

```python
class CallExtension(TempDirMixin, InputExtension)
```

Call an external program to get the output

## CallExtension.call

```python
def call(self, input_file, output_file)
```

Call whatever programs are needed to get the desired result.

## class GenerateExtension

```python
class GenerateExtension(EffectExtension)
```

Does not need any SVG, but instead just outputs an SVG fragment which is
inserted into Inkscape, centered on the selection.

## GenerateExtension.generate

```python
def generate(self)
```

Return an SVG fragment to be inserted into the selected layer of the document
OR yield multiple elements which will be grouped into a container group
element which will be given an automatic label and transformation.

## GenerateExtension.container_transform

```python
def container_transform(self)
```

Generate the transformation for the container group, the default is
to return the center position of the svg document or view port.

## GenerateExtension.create_container

```python
def create_container(self)
```

Return the container the generated elements will go into.

Default is a new layer or current layer depending on the `container_layer`
flag.

> *Added in version 1.1.*

## class TemplateExtension

```python
class TemplateExtension(EffectExtension)
```

Provide a standard way of creating templates.

## TemplateExtension.get_template

```python
def get_template(self, **kwargs)
```

Can be over-ridden with custom svg loading here

## TemplateExtension.arg_size

```python
def arg_size(self, unit="px")
```

Argument is a string of the form X[unit]xY[unit], default units apply
when missing

## TemplateExtension.get_size

```python
def get_size(self)
```

Get the size of the new template (defaults to size options)

## TemplateExtension.effect

```python
def effect(self)
```

Creates a template, do not over-ride

## TemplateExtension.set_namedview

```python
def set_namedview(self, width, height, unit)
```

Setup the document namedview

## class ColorExtension

```python
class ColorExtension(EffectExtension)
```

A standard way to modify colours in an svg document.

## ColorExtension.process_elements

```python
def process_elements(self, elem)
```

Process multiple elements (gradients)

## ColorExtension.process_element

```python
def process_element(self, elem, gradients=None)
```

Process one of the selected elements

## ColorExtension.modify_color

```python
def modify_color(self, name, color)
```

Replace this method with your colour modifier method

## ColorExtension.modify_opacity

```python
def modify_opacity(self, name, opacity): # pylint: disable=no-self-use, unused-argument """Optional opacity modification""" return opacity class TextExtension(EffectExtension)
```

A base effect for changing text in a document.

## class TextExtension

```python
class TextExtension(EffectExtension)
```

A base effect for changing text in a document.

## TextExtension.process_element

```python
def process_element(self, node)
```

Reverse the node text

## TextExtension.process_chardata

```python
def process_chardata(self, text)
```

Replaceable chardata method for processing the text

## TextExtension.map_char

```python
def map_char(char)
```

Replaceable map_char method for processing each letter
