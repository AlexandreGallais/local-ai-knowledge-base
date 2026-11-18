# dialog

```octave
function h = dialog (varargin)
```

@deftypefn  {} {@var{h} =} dialog ()
@deftypefnx {} {@var{h} =} dialog ("@var{property}", @var{value}, @dots{})

Create an empty modal dialog window to which other uicontrols can be added.

The dialog box is a figure object with properties as recommended for a
dialog box.

The default properties differing from a figure are:

@table @asis
@item buttondownfcn
@code{if isempty (allchild(gcbf)), close (gcbf), endif}

@item colormap
[]

@item color
defaultuicontrolbackgroundcolor

@item dockcontrols
off

@item handlevisibility
callback

@item integerhandle
off

@item inverthardcopy
off

@item menubar
none

@item numbertitle
off

@item paperpositionmode
auto

@item resize
off

@item windowstyle
modal

@end table


Multiple property-value pairs may be specified for the dialog object, but
they must appear in pairs.  The full list of properties is documented at
@ref{Figure Properties}.

The return value @var{h} is a graphics handle to the created figure.

Example:

@example
@group
## create an empty dialog window titled "Dialog Example"
h = dialog ("name", "Dialog Example");

## create a button (default style)
b = uicontrol (h, "string", "OK",
                  "position", [10 10 150 40],
                  "callback", "delete (gcf)");

## wait for dialog to resume or close
uiwait (h);
@end group
@end example

@seealso{errordlg, msgbox, questdlg, warndlg, figure, uiwait}
@end deftypefn
