# namedargs2cell

```octave
function c = namedargs2cell (s)
```

@deftypefn {} {@var{c} =} namedargs2cell (@var{s})
Create a cell array of field name/value pairs from a scalar structure.

Example:

@example
@group
@c doctest: +SKIP
s.Name = "Peter";
s.Height = 185;
s.Age = 42;

c = namedargs2cell (s)
  @xresult{} @{ "Name", "Peter", "Height", 185, "Age", 42 @}
@end group
@end example

@seealso{struct2cell}
@end deftypefn
