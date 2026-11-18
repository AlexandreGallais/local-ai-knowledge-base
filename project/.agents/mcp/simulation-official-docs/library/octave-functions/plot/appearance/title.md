# title

```octave
function h = title (varargin)
```

@deftypefn  {} {} title (@var{string})
@deftypefnx {} {} title (@var{string}, @var{prop}, @var{val}, @dots{})
@deftypefnx {} {} title (@var{hax}, @dots{})
@deftypefnx {} {@var{h} =} title (@dots{})
Specify the string used as a title for the current axis.

An optional list of @var{property}/@var{value} pairs can be used to change
the appearance of the created title text object.

If the first argument @var{hax} is an axes or legend handle, then add a
title to this object, rather than the current axes returned by @code{gca}.

The optional return value @var{h} is a graphics handle to the created text
object.
@seealso{xlabel, ylabel, zlabel, text}
@end deftypefn
