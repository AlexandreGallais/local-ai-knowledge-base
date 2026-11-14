---
title: "inkex.gui.listview"
tool: "inkex"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/inkex/gui/listview.py"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# inkex.gui.listview

Wraps the gtk treeview and iconview in something a little nicer.

## default

```python
def default(item, attr, d=None)
```

Python logic to choose an attribute, call it if required and return

## cmp

```python
def cmp(a, b)
```

Compare two objects

## class BaseView

```python
class BaseView
```

Controls for tree and icon views, a base class

## BaseView.get_model

```python
def get_model(self)
```

Returns the current data store model

## BaseView.create_model

```python
def create_model(self, liststore)
```

Setup the model and list

## BaseView.refresh

```python
def refresh(self)
```

Attempt to refresh the listview

## BaseView.setup

```python
def setup(self)
```

Setup columns, views, sorting etc

## BaseView.get_item_id

```python
def get_item_id(self, item)
```

Return an id set against this item.

If item.get_id() is set then duplicates will be ignored.

## BaseView.replace

```python
def replace(self, new_item, item_iter=None)
```

Replace all items, or a single item with object

## BaseView.item_selected

```python
def item_selected(self, item=None, *others)
```

Base method result, called as an item is selected

## BaseView.remove_item

```python
def remove_item(self, item=None)
```

Remove an item from this view

## BaseView.check_item_id

```python
def check_item_id(self, item)
```

Item id is recorded to guard against duplicates

## BaseView.set_sensitive

```python
def set_sensitive(self, sen=True)
```

Proxy the GTK property for sensitivity

## BaseView.clear

```python
def clear(self)
```

Clear all items from this treeview

## BaseView.item_double_clicked

```python
def item_double_clicked(self, *items)
```

What happens when you double click an item

## BaseView.get_item

```python
def get_item(self, item_iter)
```

Return the object of attention from an iter

## BaseView.get_iter

```python
def get_iter(self, item, path=False)
```

Return the iter given the item

## class TreeView

```python
class TreeView(BaseView)
```

Controls and operates a tree view.

## TreeView.setup

```python
def setup(self)
```

Setup the treeview

## TreeView.is_separator

```python
def is_separator(model, item_iter, data)
```

Internal function for seperator checking

## TreeView.get_selected_items

```python
def get_selected_items(self)
```

Return a list of selected item objects

## TreeView.set_selected_items

```python
def set_selected_items(self, *items)
```

Select the given items

## TreeView.is_selected

```python
def is_selected(self, item)
```

Return true if the item is selected

## TreeView.add

```python
def add(self, target, parent=None)
```

Add all items from the target to the treeview

## TreeView.add_item

```python
def add_item(self, item, parent=None)
```

Add a single item image to the control, returns the TreePath

## TreeView.item_selected_signal

```python
def item_selected_signal(self, *args, **kwargs)
```

Signal for selecting an item

## TreeView.item_button_clicked

```python
def item_button_clicked(self, _, event)
```

Signal for mouse button click

## TreeView.expand_item

```python
def expand_item(self, item, expand=True)
```

Expand one of our nodes

## TreeView.create_model

```python
def create_model(self, liststore=None)
```

Set up an icon view for showing gallery images

## TreeView.create_column

```python
def create_column(self, name, expand=True)
```

Create and pack a new column to this list.

Args:
name: Label in the column header
expand: Should the column expand

## TreeView.create_sort

```python
def create_sort(self, *args, **kwargs)
```

Create and attach a sorting view to this list.

see `ViewSort` arguments for details.

## class ComboBox

```python
class ComboBox(TreeView)
```

Controls and operates a combo box list.

## ComboBox.get_selected_item

```python
def get_selected_item(self)
```

Return the selected item of this combo box

## ComboBox.set_selected_item

```python
def set_selected_item(self, item)
```

Set the given item as the selected item

## ComboBox.is_selected

```python
def is_selected(self, item)
```

Returns true if this item is the selected item

## ComboBox.get_selected_items

```python
def get_selected_items(self)
```

Return a list of selected items (one)

## class IconView

```python
class IconView(BaseView)
```

Allows a simpler IconView for DBus List Objects

## IconView.set_selected_item

```python
def set_selected_item(self, item)
```

Sets the selected item to this item

## IconView.get_selected_items

```python
def get_selected_items(self)
```

Return the seleced item

## IconView.create_model

```python
def create_model(self, liststore)
```

Setup the icon view control and model

## IconView.setup

```python
def setup(self)
```

Setup the columns for the iconview

## IconView.add

```python
def add(self, target)
```

Add all items from the target to the iconview

## IconView.add_item

```python
def add_item(self, item)
```

Add a single item image to the control

## IconView.get_markup

```python
def get_markup(self, item)
```

Default text return for markup.

## IconView.get_icon

```python
def get_icon(self, item)
```

Default icon return, pixbuf or gnome theme name

## IconView.item_selected_signal

```python
def item_selected_signal(self, *args, **kwargs)
```

Item has been selected

## class ViewSort

```python
class ViewSort(object)
```

A sorting function for use is ListViews

ascending - Boolean which direction to sort
contains - Contains this string
data - A string or function to get data from each item.
exact - Compare to this exact string instead.

## ViewSort.get_data

```python
def get_data(self, model, list_iter)
```

Generate sortable data from the item

## ViewSort.sort_func

```python
def sort_func(self, model, iter1, iter2, data)
```

Called by Gtk to sort items

## class ViewColumn

```python
class ViewColumn(object)
```

Add a column to a gtk treeview.

Args:
name: The column name used as a label.
expand: Set column expansion.

## ViewColumn.add_renderer

```python
def add_renderer(self, renderer, func, expand=True)
```

Set a custom renderer

## ViewColumn.add_image_renderer

```python
def add_image_renderer(self, icon, pad=0, pixmaps=None, size=None)
```

Set the image renderer

Args:
icon: The function that returns the image to be displayed.
pad: The amount of padding around the image.
pixmaps: The pixmap manager to use to get images.
size: Restrict the images to this size.

## ViewColumn.add_text_renderer

```python
def add_text_renderer(self, text, wrap=None, template=None)
```

Set the text renderer.

Args:
text: The function that returns the text to be displayed.
wrap: The wrapping setting for this renderer.
template: A standard template used for this text markup.

## ViewColumn.clean

```python
def clean(cls, text, markup=False)
```

Clean text of any pango markup confusing chars

## ViewColumn.get_callout

```python
def get_callout(self, call, default=None)
```

Returns the right kind of method

## ViewColumn.text_func

```python
def text_func(self, call, template=None)
```

Wrap up our text functionality

## ViewColumn.image_func

```python
def image_func(self, call, pixmaps=None)
```

Wrap, wrap wrap the func

## ViewColumn.default_text

```python
def default_text(self, item)
```

Default text return for markup.

## ViewColumn.default_icon

```python
def default_icon(self, item)
```

Default icon return, pixbuf or gnome theme name

## class Separator

```python
class Separator
```

Representation of a separator in a list
