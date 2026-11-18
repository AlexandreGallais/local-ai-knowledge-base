# waitbar

```octave
function h = waitbar (varargin)
```

@deftypefn  {} {@var{h} =} waitbar (@var{frac})
@deftypefnx {} {@var{h} =} waitbar (@var{frac}, @var{msg})
@deftypefnx {} {@var{h} =} waitbar (@dots{}, "createcancelbtn", @var{fcn}, @dots{})
@deftypefnx {} {@var{h} =} waitbar (@dots{}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {} waitbar (@var{frac})
@deftypefnx {} {} waitbar (@var{frac}, @var{h})
@deftypefnx {} {} waitbar (@var{frac}, @var{h}, @var{msg})
Return a handle @var{h} to a new progress indicator ("waitbar") object.

The waitbar is filled to fraction @var{frac} which must be in the range
[0, 1].

The optional message @var{msg} is centered and displayed above the waitbar.

A cancel button can be added to the bottom of the waitbar using the
@qcode{"createcancelbtn"} property of waitbar figures.  The action to be
executed when the user presses the button is specified using a string or
function handle @var{fcn}.

The appearance of the waitbar figure window can be configured by passing
@var{prop}/@var{val} pairs to the function.  The full list of properties is
documented at @ref{Figure Properties}.

When called with a single input the current waitbar, if it exists, is
updated to the new value @var{frac}.  If there are multiple outstanding
waitbars they can be updated individually by passing the handle @var{h}
of the specific waitbar to modify.

@seealso{delete}
@end deftypefn
