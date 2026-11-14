# inkex.gui.pixmap

Provides wrappers for pixmap access.

## class PixmapLoadError

```python
class PixmapLoadError(ValueError)
```

Failed to load a pixmap

## PixmapFilter.filter

```python
def filter(self, img, **kwargs)
```

Run filter, replace this method by your own

## PixmapFilter.to_size

```python
def to_size(dat)
```

Tries to calculate a size that will work for the data

## class OverlayFilter

```python
class OverlayFilter(PixmapFilter)
```

Adds an overlay to output images, overlay can be any name that
the owning pixmap manager can find.

    * overlay  : Name of overlay image
    * position : Location of the image:
        * 0      - Full size (1 to 1 overlay, default)
        * (x,y)  - Percentage from one end to the other position 0-1
    * alpha    : Blending alpha, 0 - 255

## OverlayFilter.set_position

```python
def set_position(self, overlay, img)
```

Sets the position of img on the given width and height

## class SizeFilter

```python
class SizeFilter(PixmapFilter)
```

Resizes images to a certain size:

:attr:`resize_mode` - Way in which the size is calculated

* 0 - Best Aspect, don't grow
* 1 - Best Aspect, grow
* 2 - Cropped Aspect
* 3 - Stretch

## SizeFilter.aspect

```python
def aspect(self, img_w, img_h)
```

Get the aspect ratio of the image resized

## class PadFilter

```python
class PadFilter(SizeFilter)
```

Add padding to the image to make it a standard size

## class PixmapManager

```python
class PixmapManager
```

Manage a set of cached pixmaps, returns the default image
if it can't find one or the missing image if that's available.

## PixmapManager.get

```python
def get(self, *args, **kwargs)
```

Get a pixmap of any kind

## PixmapManager.get_missing_image

```python
def get_missing_image(self)
```

Get a missing image when other images aren't found

## PixmapManager.data_is_file

```python
def data_is_file(data)
```

Test the file to see if it's a filename or not

## PixmapManager.get_pixmap

```python
def get_pixmap(self, data, **kwargs)
```

There are three types of images this might return.

#. A named gtk-image such as "gtk-stop"
#. A file on the disk such as "/tmp/a.png"
#. Data as either svg or binary png

All pixmaps are cached for multiple use.

## PixmapManager.apply_filters

```python
def apply_filters(self, img, **kwargs)
```

Apply all the filters to the given image

## PixmapManager.load_from_data

```python
def load_from_data(self, data)
```

Load in memory picture file (jpeg etc)

## PixmapManager.load_from_name

```python
def load_from_name(self, name)
```

Load a pixbuf from a name, filename or theme icon name

## PixmapManager.theme_pixmap

```python
def theme_pixmap(self, name, size=32)
```

Internal user: get image from gnome theme

## PixmapManager.pixmap_path

```python
def pixmap_path(self, name)
```

Returns the pixmap path based on stored location