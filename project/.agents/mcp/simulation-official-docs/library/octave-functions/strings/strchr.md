# strchr

```octave
function varargout = strchr (str, chars, varargin)
```

@deftypefn  {} {@var{idx} =} strchr (@var{str}, @var{chars})
@deftypefnx {} {@var{idx} =} strchr (@var{str}, @var{chars}, @var{n})
@deftypefnx {} {@var{idx} =} strchr (@var{str}, @var{chars}, @var{n}, @var{direction})
@deftypefnx {} {[@var{i}, @var{j}] =} strchr (@dots{})
Search through the string @var{str} for occurrences of characters from the
set @var{chars}.

The return value(s), as well as the @var{n} and @var{direction} arguments
behave identically as in @code{find}.

This will be faster than using @code{regexp} in most cases.

@seealso{find}
@end deftypefn
