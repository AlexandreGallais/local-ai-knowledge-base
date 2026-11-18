# ismember

```octave
function [tf, s_idx] = ismember (a, s, varargin)
```

@deftypefn  {} {@var{tf} =} ismember (@var{a}, @var{s})
@deftypefnx {} {@var{tf} =} ismember (@var{a}, @var{s}, "rows")
@deftypefnx {} {[@var{tf}, @var{s_idx}] =} ismember (@dots{})

Return a logical matrix @var{tf} with the same shape as @var{a} which is
true (1) if the element in @var{a} is found in @var{s} and false (0) if it
is not.

If a second output argument is requested then the index into @var{s} of each
matching element is also returned.

@example
@group
a = [3, 10, 1];
s = [0:9];
[tf, s_idx] = ismember (a, s)
     @xresult{} tf = [1, 0, 1]
     @xresult{} s_idx = [4, 0, 2]
@end group
@end example

The inputs @var{a} and @var{s} may also be cell arrays.

@example
@group
a = @{"abc"@};
s = @{"abc", "def"@};
[tf, s_idx] = ismember (a, s)
     @xresult{} tf = 1
     @xresult{} s_idx = 1
@end group
@end example

If the optional third argument @qcode{"rows"} is given then compare rows
in @var{a} with rows in @var{s}.  The inputs must be 2-D matrices with the
same number of columns to use this option.

@example
@group
a = [1:3; 5:7; 4:6];
s = [0:2; 1:3; 2:4; 3:5; 4:6];
[tf, s_idx] = ismember (a, s, "rows")
     @xresult{} tf = logical ([1; 0; 1])
     @xresult{} s_idx = [2; 0; 5];
@end group
@end example

@seealso{lookup, unique, union, intersect, setdiff, setxor, ismembertol}
@end deftypefn
