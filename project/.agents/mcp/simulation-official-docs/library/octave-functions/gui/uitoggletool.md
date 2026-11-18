# uitoggletool

```octave
function hui = uitoggletool (varargin)
```

@deftypefn  {} {@var{hui} =} uitoggletool ()
@deftypefnx {} {@var{hui} =} uitoggletool (@var{property}, @var{value}, @dots{})
@deftypefnx {} {@var{hui} =} uitoggletool (@var{parent})
@deftypefnx {} {@var{hui} =} uitoggletool (@var{parent}, @var{property}, @var{value}, @dots{})

Create a uitoggletool object.

uitoggletool are togglebuttons that appear on a figure toolbar.  The
button is created with a border that is shown when the user hovers over
the button.  An image can be set using the cdata property.

If @var{parent} is omitted then a uitoggletool for the current figure is
created.  If no figure is available, a new figure is created first.  If a
figure is available, but does not contain a uitoolbar, a uitoolbar will be
created.

If @var{parent} is given then a uitoggletool is created on the
@var{parent} uitoolbar.

Any provided property value pairs will override the default values of the
created uitoggletool object.

The full list of properties is documented at @ref{Uitoggletool Properties}.

The optional return value @var{hui} is a graphics handle to the created
uitoggletool object.

Examples:

@example
@group
% create figure without a default toolbar
f = figure ("toolbar", "none");
% create empty toolbar
t = uitoolbar (f);
% create a 19x19x3 black square
img=zeros(19,19,3);
% add uitoggletool button to toolbar
b = uitoggletool (t, "cdata", img);
@end group
@end example
@seealso{figure, uitoolbar, uipushtool}
@end deftypefn
