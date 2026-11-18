# idivide

```octave
function C = idivide (A, B, op)
```

@deftypefn {} {@var{C} =} idivide (@var{A}, @var{B}, @var{op})
Integer division with different rounding rules.

The standard behavior of integer division such as @code{@var{A} ./ @var{B}}
is to round the result to the nearest integer.  This is not always the
desired behavior and @code{idivide} permits integer element-by-element
division to be performed with different treatment for the fractional
part of the division as determined by the @var{op} flag.  @var{op} is
a string with one of the values:

@table @asis
@item @qcode{"fix"}
Calculate @code{@var{A} ./ @var{B}} with the fractional part rounded
towards zero.

@item @qcode{"round"}
Calculate @code{@var{A} ./ @var{B}} with the fractional part rounded
towards the nearest integer.

@item @qcode{"floor"}
Calculate @code{@var{A} ./ @var{B}} with the fractional part rounded
towards negative infinity.

@item @qcode{"ceil"}
Calculate @code{@var{A} ./ @var{B}} with the fractional part rounded
towards positive infinity.
@end table

@noindent
If @var{op} is not given it defaults to @qcode{"fix"}.
An example demonstrating these rounding rules is

@example
@group
idivide (int8 ([-3, 3]), int8 (4), "fix")
  @xresult{}   0   0
idivide (int8 ([-3, 3]), int8 (4), "round")
  @xresult{}  -1   1
idivide (int8 ([-3, 3]), int8 (4), "floor")
  @xresult{}  -1   0
idivide (int8 ([-3, 3]), int8 (4), "ceil")
  @xresult{}   0   1
@end group
@end example

@seealso{ceil, floor, fix, round, ldivide, rdivide}
@end deftypefn
