# orderfields

```octave
function [sout, p] = orderfields (s1, s2)
```

@deftypefn  {} {@var{sout} =} orderfields (@var{s1})
@deftypefnx {} {@var{sout} =} orderfields (@var{s1}, @var{s2})
@deftypefnx {} {@var{sout} =} orderfields (@var{s1}, @{@var{cellstr}@})
@deftypefnx {} {@var{sout} =} orderfields (@var{s1}, @var{p})
@deftypefnx {} {[@var{sout}, @var{p}] =} orderfields (@dots{})
Return a @emph{copy} of @var{s1} with fields arranged alphabetically, or as
specified by the second input.

Given one input struct @var{s1}, arrange field names alphabetically.

If a second struct argument is given, arrange field names in @var{s1} as
they appear in @var{s2}.  The second argument may also specify the order
in a cell array of strings @var{cellstr}.  The second argument may also
be a permutation vector.

The optional second output argument @var{p} is the permutation vector which
converts the original name order to the new name order.

Examples:

@example
@group
s = struct ("d", 4, "b", 2, "a", 1, "c", 3);
t1 = orderfields (s)
  @xresult{} t1 =
       scalar structure containing the fields:
         a =  1
         b =  2
         c =  3
         d =  4
@end group
@end example

@example
@group
t = struct ("d", @{@}, "c", @{@}, "b", @{@}, "a", @{@});
t2 = orderfields (s, t)
  @xresult{} t2 =
       scalar structure containing the fields:
         d =  4
         c =  3
         b =  2
         a =  1
@end group
@end example

@example
@group
t3 = orderfields (s, [3, 2, 4, 1])
  @xresult{} t3 =
       scalar structure containing the fields:
         a =  1
         b =  2
         c =  3
         d =  4
@end group
@end example

@example
@group
[t4, p] = orderfields (s, @{"d", "c", "b", "a"@})
  @xresult{} t4 =
       scalar structure containing the fields:
         d =  4
         c =  3
         b =  2
         a =  1
     p =
        1
        4
        2
        3
@end group
@end example

@seealso{fieldnames, getfield, setfield, rmfield, isfield, isstruct, struct}
@end deftypefn
