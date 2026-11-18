# cast

```octave
function y = cast (x, type, var)
```

@deftypefn  {} {@var{y} =} cast (@var{x}, "@var{type}")
@deftypefnx {} {@var{y} =} cast (@var{x}, "@var{like}", @var{var})
Convert @var{x} to data type @var{type}.

The input @var{x} may be a scalar, vector, or matrix of a class that is
convertible to the target class (see below).

If a variable @var{var} is specified after @qcode{"like"}, @var{x} is
converted to the same data type and sparsity attribute.  If @var{var} is
complex, @var{x} will be complex, too.

@var{var} may be and @var{type} may name any of the following built-in
numeric classes:

@example
@group
"double"
"single"
"logical"
"char"
"int8"
"int16"
"int32"
"int64"
"uint8"
"uint16"
"uint32"
"uint64"
@end group
@end example

The value @var{x} may be modified to fit within the range of the new type.

Examples:

@example
@group
cast (-5, "uint8")
   @xresult{} 0
cast (300, "int8")
   @xresult{} 127
@end group
@end example

Programming Note: This function relies on the object @var{x} having a
conversion method named @var{type}.  User-defined classes may implement only
a subset of the full list of types shown above.  In that case, it may be
necessary to call cast twice in order to reach the desired type.
For example, the conversion to double is nearly always implemented, but
the conversion to uint8 might not be.  In that case, the following code will
work:

@example
cast (cast (@var{user_defined_val}, "double"), "uint8")
@end example

@seealso{typecast, int8, uint8, int16, uint16, int32, uint32, int64, uint64,
double, single, logical, char, class, typeinfo}
@end deftypefn
