# uitoolbar

```octave
function hui = uitoolbar (varargin)
```

@deftypefn  {} {@var{hui} =} uitoolbar ()
@deftypefnx {} {@var{hui} =} uitoolbar (@var{property}, @var{value}, @dots{})
@deftypefnx {} {@var{hui} =} uitoolbar (@var{parent})
@deftypefnx {} {@var{hui} =} uitoolbar (@var{parent}, @var{property}, @var{value}, @dots{})

Create a uitoolbar object.  A uitoolbar displays uitoggletool and uipushtool
buttons.

If @var{parent} is omitted then a uitoolbar for the current figure is
created.  If no figure is available, a new figure is created first.

If @var{parent} is given then a uitoolbar relative to @var{parent} is
created.

Any provided property value pairs will override the default values of the
created uitoolbar object.

The full list of properties is documented at @ref{Uitoolbar Properties}.

The optional return value @var{hui} is a graphics handle to the created
uitoolbar object.

Examples:

@example
@group
% create figure without a default toolbar
f = figure ("toolbar", "none");
% create empty toolbar
t = uitoolbar (f);
@end group
@end example
@seealso{figure, uitoggletool, uipushtool}
@end deftypefn
