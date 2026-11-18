# uifigure

```octave
function h = uifigure (varargin)
```

@deftypefn  {} {@var{h} =} uifigure ()
@deftypefnx {} {@var{h} =} uifigure ("@var{property}", @var{value}, @dots{})
Create a new figure window for applications.

Multiple property-value pairs may be specified for the figure object, but
they must occur in pairs.

The return value @var{h} is a graphics handle to the created figure object.

Programming Note: The full list of properties is documented at
@ref{Figure Properties}.  This function differs from @code{figure} in that
the created figure is optimized for application development, rather than
plotting.  This means features such as menubars and toolbars are turned off.
This is not perfect replacement for the @sc{matlab} uifigure object as the
properties @qcode{"AutoResizeChildren"}, @qcode{"Icon"}, and
@qcode{"Scrollable"} are not implemented.
@seealso{uipanel, uibuttongroup}
@end deftypefn
