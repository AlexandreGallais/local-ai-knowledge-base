# __parse_movargs__

```octave
function args = __parse_movargs__ (caller, varargin)
```

@deftypefn {} {@var{args} =} __parse_movargs__ (@var{caller}, @var{varargin})

Parse arguments for movXXX functions before passing to @code{movfun}.

The input @var{caller} is a string with the name of the calling function
and is used to personalize any error messages.
@seealso{movfun}
@end deftypefn
