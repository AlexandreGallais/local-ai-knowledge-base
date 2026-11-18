# loadobj

```octave
function b = loadobj (a)
```

@deftypefn {} {@var{b} =} loadobj (@var{a})
Method of a class to manipulate an object after loading it from a file.

The function @code{loadobj} is called when the object @var{a} is loaded
using the @code{load} function.  An example of the use of @code{saveobj}
might be to add fields to an object that don't make sense to be saved.
For example:

@example
@group
function b = loadobj (a)
  b = a;
  b.addmissingfield = addfield (b);
endfunction
@end group
@end example

@seealso{saveobj, class}
@end deftypefn
