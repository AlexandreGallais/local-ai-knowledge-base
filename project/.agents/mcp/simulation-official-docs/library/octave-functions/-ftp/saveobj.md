# saveobj

```octave
function b = saveobj (a)
```

@deftypefn {} {@var{b} =} saveobj (@var{a})
Method of a class to manipulate an object prior to saving it to a file.

The function @code{saveobj} is called when the object @var{a} is saved
using the @code{save} function.  An example of the use of @code{saveobj}
might be to remove fields of the object that don't make sense to be saved
or it might be used to ensure that certain fields of the object are
initialized before the object is saved.

@seealso{loadobj, class}
@end deftypefn
