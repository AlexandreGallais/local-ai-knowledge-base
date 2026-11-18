# uimenu

```octave
function hui = uimenu (varargin)
```

@deftypefn  {} {@var{hui} =} uimenu (@var{property}, @var{value}, @dots{})
@deftypefnx {} {@var{hui} =} uimenu (@var{h}, @var{property}, @var{value}, @dots{})
Create a uimenu object and return a handle to it.

If @var{h} is omitted then a top-level menu for the current figure is
created.  If @var{h} is given then a submenu relative to @var{h} is created.

uimenu objects have the following specific properties:

@table @asis
@item @qcode{"accelerator"}
A string containing the key, together with CTRL, to execute this
menu entry (e.g., @qcode{"x"} for CTRL+x).

@item @qcode{"checked"}
Can be set @qcode{"on"} or @qcode{"off"}.  Sets a mark at this menu entry.

@item @qcode{"enable"}
Can be set @qcode{"on"} or @qcode{"off"}.  If disabled then the menu entry
cannot be selected and is grayed out.

@item @qcode{"foregroundcolor"}
A color value for the text of the menu entry.

@item @qcode{"menuselectedfcn"}
The function called when this menu entry is executed.  It can be either a
function string (e.g., @qcode{"@nospell{myfcn}"}), a function handle (e.g.,
@@@nospell{myfcn}) or a cell array containing the function handle and
arguments for the callback function (e.g., @{@@@nospell{myfcn}, arg1,
arg2@}).

@item @qcode{"position"}
A scalar value containing the relative menu position.  The first position
has value 1 and will be either the left or top depending on the orientation
of the uimenu.

@item @qcode{"separator"}
Can be set @qcode{"on"} or @qcode{"off"}.  If enabled, a separator
line is drawn above the current position.  This property is ignored for
top-level entries.

@item @qcode{"text"}
A string containing the text for this menu entry.  A @qcode{"&"}-symbol
can be used to mark the @qcode{"accelerator"} character (e.g.,
@nospell{@qcode{"E&xit"}}).

@end table

The full list of properties is documented at @ref{Uimenu Properties}.

Examples:

@example
@group
f = uimenu ("text", "&File", "accelerator", "f");
e = uimenu ("text", "&Edit", "accelerator", "e");
uimenu (f, "text", "Close", "accelerator", "q", ...
           "menuselectedfcn", "close (gcf)");
uimenu (e, "text", "Toggle &Grid", "accelerator", "g", ...
           "menuselectedfcn", "grid (gca)");
@end group
@end example
@seealso{figure}
@end deftypefn
