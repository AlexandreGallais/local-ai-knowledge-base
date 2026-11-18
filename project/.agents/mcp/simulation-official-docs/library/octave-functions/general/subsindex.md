# subsindex

```octave
function idx = subsindex (obj)
```

@deftypefn {} {@var{idx} =} subsindex (@var{obj})
Convert an object to an index vector.

When @var{obj} is a class object defined with a class constructor, then
@code{subsindex} is the overloading method that allows the conversion of
this class object to a valid indexing vector.  It is important to note that
@code{subsindex} must return a zero-based real integer vector of the class
@qcode{"double"}.  For example, if the class constructor were

@example
@group
function obj = myclass (a)
  obj = class (struct ("a", a), "myclass");
endfunction
@end group
@end example

@noindent
then the @code{subsindex} function

@example
@group
function idx = subsindex (obj)
  idx = double (obj.a) - 1.0;
endfunction
@end group
@end example

@noindent
could be used as follows

@example
@group
a = myclass (1:4);
b = 1:10;
b(a)
@xresult{} 1  2  3  4
@end group
@end example

@seealso{class, subsref, subsasgn}
@end deftypefn
