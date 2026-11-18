# uicontrol

```octave
function hui = uicontrol (varargin)
```

@deftypefn  {} {@var{hui} =} uicontrol ()
@deftypefnx {} {@var{hui} =} uicontrol (@var{property}, @var{value}, @dots{})
@deftypefnx {} {@var{hui} =} uicontrol (@var{parent})
@deftypefnx {} {@var{hui} =} uicontrol (@var{parent}, @var{property}, @var{value}, @dots{})
@deftypefnx {} {} uicontrol (@var{h})

Create a uicontrol object and return a handle to it.

A uicontrol object is used to create simple interactive controls such as
push buttons, checkboxes, edit and list controls.

If @var{parent} is omitted then a uicontrol for the current figure is
created.  If no figure is available, a new figure is created first.

If @var{parent} is given then a uicontrol relative to @var{parent} is
created.

Any provided property value pairs will override the default values of the
created uicontrol object.

The full list of properties is documented at @ref{Uicontrol Properties}.

The type of uicontrol created is specified by the @var{style} property.  If
no style property is provided, a push button will be created.

Valid styles for uicontrol are:

@table @asis
@item @qcode{"checkbox"}
Create a checkbox control that allows user on/off selection.

@item @qcode{"edit"}
Create an edit control that allows user input of single or multiple lines
of text.

@item @qcode{"listbox"}
Create a listbox control that displays a list of items and allows user
selection of single or multiple items.

@item @qcode{"popupmenu"}
Create a popupmenu control that displays a list of options that can be
selected when the user clicks on the control.

@item @qcode{"pushbutton"}
Create a push button control that allows user to press to cause an action.

@item @qcode{"radiobutton"}
Create a radio button control intended to be used for mutually exclusive
input in a group of radiobutton controls.

@item @qcode{"slider"}
Create a slider control that allows user selection from a range of values
by sliding knob on the control.

@item @qcode{"text"}
Create a static text control to display single or multiple lines of text.

@item @qcode{"togglebutton"}
Create a toggle button control that appears like a push button but allows
the user to select between two states.

@end table

Note: For the @qcode{"edit"} and @qcode{"listbox"} styles, the single or
multiple line/selection behavior is determined by the @qcode{"Min"} and
@qcode{"Max"} properties, permitting multiple lines/selections when the
values are set such that @w{@code{Max - Min > 1}}.

Examples:

@example
@group
## Create figure and panel on it
f = figure;
## Create a button (default style)
b1 = uicontrol (f, "string", "A Button", ...
                   "position", [10 10 150 40]);
## Create an edit control
e1 = uicontrol (f, "style", "edit", "string", "editable text", ...
                   "position", [10 60 300 40]);
## Create a checkbox
c1 = uicontrol (f, "style", "checkbox", "string", "a checkbox", ...
                   "position", [10 120 150 40]);
@end group
@end example

When called with a single argument @var{h} which is a handle to an existing
uicontrol object, switch the keyboard focus to the specified
uicontrol.  As a result, the uicontrol object will receive keyboard
events that can be processed using the @qcode{"keypressfcn"} callback.
@seealso{figure, uipanel}
@end deftypefn
