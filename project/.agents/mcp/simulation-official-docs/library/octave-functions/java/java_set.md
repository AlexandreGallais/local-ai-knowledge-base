# java_set

```octave
function retval = java_set (obj, name, val)
```

@deftypefn {} {@var{obj} =} java_set (@var{obj}, @var{name}, @var{val})
Set the value of the field @var{name} of the Java object @var{obj} to
@var{val}.

For static fields, @var{obj} can be a string representing the fully
qualified named of the corresponding Java class.

When @var{obj} is a regular Java object, structure-like indexing can be
used as a shortcut syntax.  For instance, the following two statements are
equivalent

@example
@group
  java_set (x, "field1", val)
  x.field1 = val
@end group
@end example

@seealso{java_get, javaMethod, javaObject}
@end deftypefn
