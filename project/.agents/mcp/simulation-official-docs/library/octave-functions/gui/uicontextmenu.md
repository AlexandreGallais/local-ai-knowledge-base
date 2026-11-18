# uicontextmenu

```octave
function hui = uicontextmenu (varargin)
```

@deftypefn  {} {@var{hui} =} uicontextmenu (@var{property}, @var{value}, @dots{})
@deftypefnx {} {@var{hui} =} uicontextmenu (@var{h}, @var{property}, @var{value}, @dots{})

Create a uicontextmenu object and return a handle to it.

If @var{h} is omitted then a uicontextmenu for the current figure is
created.  If no figure is available, a new figure is created first.

If @var{h} is given then a uicontextmenu relative to @var{h} is created.

Any provided property value pairs will override the default values of the
created uicontextmenu object.

The full list of properties is documented at @ref{Uicontextmenu Properties}.

Examples:

@example
@group
## create figure and uicontextmenu
f = figure ();
c = uicontextmenu (f);

## create menus in the context menu
m1 = uimenu ("parent", c, "label", "Menu item 1", ...
             "callback", "disp('menu item 1')");
m2 = uimenu ("parent", c, "label", "Menu item 2", ...
             "callback", "disp('menu item 2')");

## set the context menu for the figure
set (f, "uicontextmenu", c);
@end group
@end example
@seealso{figure, uimenu}
@end deftypefn
