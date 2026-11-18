# uibuttongroup

```octave
function hui = uibuttongroup (varargin)
```

@deftypefn  {} {@var{hui} =} uibuttongroup ()
@deftypefnx {} {@var{hui} =} uibuttongroup (@var{property}, @var{value}, @dots{})
@deftypefnx {} {@var{hui} =} uibuttongroup (@var{parent})
@deftypefnx {} {@var{hui} =} uibuttongroup (@var{parent}, @var{property}, @var{value}, @dots{})
@c FIXME: 3rd form is not documented by Matlab nor implemented in Octave.
@c        Should it be removed?  (1/9/2022).
@deftypefnx {} {} uibuttongroup (@var{h})

Create a uibuttongroup object and return a handle to it.

A uibuttongroup is used to group uicontrol objects.

If @var{parent} is omitted then a uibuttongroup for the current figure is
created.  If no figure is available, a new figure is created first.

If @var{parent} is given then a uibuttongroup relative to @var{parent} is
created.

Any provided property value pairs will override the default values of the
created uibuttongroup object.

The full list of properties is documented at @ref{Uibuttongroup Properties}.

Examples:

@example
@group
## Create figure and panel on it
f = figure;
## Create a button group
gp = uibuttongroup (f, "Position", [ 0 0.5 1 1])
## Create a buttons in the group
b1 = uicontrol (gp, "style", "radiobutton", ...
                "string", "Choice 1", ...
                "Position", [ 10 150 100 50 ]);
b2 = uicontrol (gp, "style", "radiobutton", ...
                "string", "Choice 2", ...
                "Position", [ 10 50 100 30 ]);
## Create a button not in the group
b3 = uicontrol (f, "style", "radiobutton", ...
                "string", "Not in the group", ...
                "Position", [ 10 50 100 50 ]);
@end group
@end example

When called with a single argument @var{h} which is a handle to an existing
uibuttongroup object, switch the focus to the specified uibuttongroup.  This
functionality is not currently implemented.
@seealso{figure, uipanel}
@end deftypefn
