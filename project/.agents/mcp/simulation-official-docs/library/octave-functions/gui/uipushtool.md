# uipushtool

```octave
function hui = uipushtool (varargin)
```

@deftypefn  {} {@var{hui} =} uipushtool ()
@deftypefnx {} {@var{hui} =} uipushtool (@var{property}, @var{value}, @dots{})
@deftypefnx {} {@var{hui} =} uipushtool (@var{parent})
@deftypefnx {} {@var{hui} =} uipushtool (@var{parent}, @var{property}, @var{value}, @dots{})

Create a uipushtool object.

uipushtools are buttons that appear on a figure toolbar.  The button is
created with a border that is shown when the user hovers over the button.
An image can be set using the cdata property.

If @var{parent} is omitted then a uipushtool for the current figure is
created.  If no figure is available, a new figure is created first.  If a
figure is available, but does not contain a uitoolbar, a uitoolbar will be
created.

If @var{parent} is given then a uipushtool is created on the @var{parent}
uitoolbar.

Any provided property value pairs will override the default values of the
created uipushtool object.

The full list of properties is documented at @ref{Uipushtool Properties}.

The optional return value @var{hui} is a graphics handle to the created
uipushtool object.

Examples:

@example
@group
% create figure without a default toolbar
f = figure ("toolbar", "none");
% create empty toolbar
t = uitoolbar (f);
% create a 19x19x3 black square
img=zeros(19,19,3);
% add pushtool button to toolbar
b = uipushtool (t, "cdata", img);
@end group
@end example
@seealso{figure, uitoolbar, uitoggletool}
@end deftypefn
