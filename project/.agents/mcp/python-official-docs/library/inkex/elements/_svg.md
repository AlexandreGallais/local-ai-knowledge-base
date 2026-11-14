# inkex.elements._svg

Provide a way to load lxml attributes with an svg API on top.

## class SvgDocumentElement

```python
class SvgDocumentElement(DeprecatedSvgMixin, ISVGDocumentElement, BaseElement, ViewboxMixin)
```

Provide access to the document level svg functionality

## SvgDocumentElement.tostring

```python
def tostring(self)
```

Convert document to string

## SvgDocumentElement.get_ids

```python
def get_ids(self)
```

Returns a set of unique document ids

## SvgDocumentElement.get_unique_id

```python
def get_unique_id(self, prefix: str, size: Optional[int] = None, blacklist: Optional[List[str]] = None,)
```

Generate a new id from an existing old_id

The id consists of a prefix and an appended random integer with size digits.

If size is not given, it is determined automatically from the length of
existing ids, i.e. those in the document plus those in the blacklist.

Args:
    prefix (str): the prefix of the new ID.
    size (Optional[int], optional): number of digits of the second part of the
        id. If None, the length is chosen based on the amount of existing
        objects. Defaults to None.

        .. versionchanged:: 1.1
            The default of this parameter has been changed from 4 to None.
    blacklist (Optional[Iterable[str]], optional): An additional iterable of ids
        that are not allowed to be used. This is useful when bulk inserting
        objects.
        Defaults to None.

        .. versionadded:: 1.2

Returns:
    _type_: _description_

## SvgDocumentElement.get_page_bbox

```python
def get_page_bbox(self, page=None) -> BoundingBox
```

Gets the page dimensions as a bbox. For single-page documents, the viewbox
dimensions are returned.

Args:
    page (int, optional): Page number. Defaults to the first page.

        .. versionadded:: 1.3

Raises:
    IndexError: if the page number provided does not exist in the document.

Returns:
    BoundingBox: the bounding box of the page

## SvgDocumentElement.get_current_layer

```python
def get_current_layer(self)
```

Returns the currently selected layer

## SvgDocumentElement.add_namespace

```python
def add_namespace(self, prefix, url)
```

Adds an xml namespace to the xml parser with the desired prefix.

If the prefix or url are already in use with different values, this
function will raise an error. Remove any attributes or elements using
this namespace before calling this function in order to rename it.

.. versionadded:: 1.3

## SvgDocumentElement.name

```python
def name(self)
```

Returns the Document Name

## SvgDocumentElement.namedview

```python
def namedview(self) -> NamedView
```

Return the sp namedview meta information element

## SvgDocumentElement.metadata

```python
def metadata(self)
```

Return the svg metadata meta element container

## SvgDocumentElement.defs

```python
def defs(self)
```

Return the svg defs meta element container

## SvgDocumentElement.get_viewbox

```python
def get_viewbox(self) -> List[float]
```

Parse and return the document's viewBox attribute

## SvgDocumentElement.viewbox_width

```python
def viewbox_width(self) -> float: # getDocumentWidth(self)
```

Returns the width of the `user coordinate system
<https://www.w3.org/TR/SVG2/coords.html#Introduction>`_ in user units, i.e.
the width of the viewbox, as defined in the SVG file. If no viewbox is defined,
the value of the width attribute is returned. If the height is not defined,
returns 0.

.. versionadded:: 1.2

## SvgDocumentElement.viewport_width

```python
def viewport_width(self) -> float
```

Returns the width of the `viewport coordinate system
<https://www.w3.org/TR/SVG2/coords.html#Introduction>`_ in user units, i.e. the
width attribute of the svg element converted to px

.. versionadded:: 1.2

## SvgDocumentElement.viewbox_height

```python
def viewbox_height(self) -> float: # getDocumentHeight(self)
```

Returns the height of the `user coordinate system
<https://www.w3.org/TR/SVG2/coords.html#Introduction>`_ in user units, i.e. the
height of the viewbox, as defined in the SVG file. If no viewbox is defined, the
value of the height attribute is returned. If the height is not defined,
returns 0.

.. versionadded:: 1.2

## SvgDocumentElement.viewport_height

```python
def viewport_height(self) -> float
```

Returns the width of the `viewport coordinate system
<https://www.w3.org/TR/SVG2/coords.html#Introduction>`_ in user units, i.e. the
height attribute of the svg element converted to px

.. versionadded:: 1.2

## SvgDocumentElement.scale

```python
def scale(self)
```

Returns the ratio between the viewBox width and the page width.

.. versionchanged:: 1.2
    Previously, the scale as shown by the document properties was computed,
    but the computation of this in core Inkscape changed in Inkscape 1.2, so
    this was moved to :attr:`inkscape_scale`.

## SvgDocumentElement.inkscape_scale

```python
def inkscape_scale(self)
```

Returns the ratio between the viewBox width (in width/height units) and the
page width, which is displayed as "scale" in the Inkscape document
properties.

.. versionadded:: 1.2

## SvgDocumentElement.equivalent_transform_scale

```python
def equivalent_transform_scale(self) -> float
```

Return the scale of the equivalent transform of the svg tag, as defined by
https://www.w3.org/TR/SVG2/coords.html#ComputingAViewportsTransform
(highly simplified)

.. versionadded:: 1.2

## SvgDocumentElement.unit

```python
def unit(self)
```

Returns the unit used for in the SVG document.

In the case the SVG document lacks an attribute that explicitly
defines what units are used for SVG coordinates, it tries to calculate
the unit from the SVG width and viewBox attributes.
Defaults to 'px' units.

## SvgDocumentElement.document_unit

```python
def document_unit(self)
```

Returns the display unit (Inkscape-specific attribute) of the document

.. versionadded:: 1.2

## SvgDocumentElement.stylesheets

```python
def stylesheets(self)
```

Get all the stylesheets, bound together to one, (for reading)

## SvgDocumentElement.stylesheet

```python
def stylesheet(self)
```

Return the first stylesheet or create one if needed (for writing)

## SvgDocumentElement.add_to_tree_callback

```python
def add_to_tree_callback(self, element)
```

Callback called automatically when adding an element to the tree.
Updates the list of stylesheets and the ID tracker with the subtree of element.

.. versionadded:: 1.4

Args:
    element (BaseElement): element added to the tree.

## SvgDocumentElement.remove_from_tree_callback

```python
def remove_from_tree_callback(self, element)
```

Callback called automatically when removing an element from the tree.
Remove elements in the subtree of element from the the list of stylesheets
and the ID tracker.

.. versionadded:: 1.4

Args:
    element (BaseElement): element added to the tree.

## width

```python
def width(self)
```

Use :func:`viewport_width` instead

## height

```python
def height(self)
```

Use :func:`viewport_height` instead