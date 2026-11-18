# java_get

```octave
function retval = java_get (obj, name)
```

@deftypefn {} {@var{val} =} java_get (@var{obj}, @var{name})
Get the value of the field @var{name} of the Java object @var{obj}.

For static fields, @var{obj} can be a string representing the fully
qualified name of the corresponding class.

When @var{obj} is a regular Java object, structure-like indexing can be
used as a shortcut syntax.  For instance, the following two statements are
equivalent

@example
@group
  java_get (x, "field1")
  x.field1
@end group
@end example

@seealso{java_set, javaMethod, javaObject}
@end deftypefn
