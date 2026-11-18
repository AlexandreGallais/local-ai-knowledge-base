# findobj

```octave
function h = findobj (varargin)
```

@deftypefn  {} {@var{h} =} findobj ()
@deftypefnx {} {@var{h} =} findobj (@var{prop_name}, @var{prop_value}, @dots{})
@deftypefnx {} {@var{h} =} findobj (@var{prop_name}, @var{prop_value}, "-@var{logical_op}", @var{prop_name}, @var{prop_value})
@deftypefnx {} {@var{h} =} findobj ("-property", @var{prop_name})
@deftypefnx {} {@var{h} =} findobj ("-regexp", @var{prop_name}, @var{pattern})
@deftypefnx {} {@var{h} =} findobj (@var{hlist}, @dots{})
@deftypefnx {} {@var{h} =} findobj (@var{hlist}, "flat", @dots{})
@deftypefnx {} {@var{h} =} findobj (@var{hlist}, "-depth", @var{d}, @dots{})
Find graphics objects with specified properties.

When called without arguments, return all graphic objects beginning with the
root object (0) and including all of its descendants.

The simplest form for narrowing the results is

@example
findobj (@var{prop_name}, @var{prop_value})
@end example

@noindent
which returns the handles of all objects which have a property named
@var{prop_name} that has the value @var{prop_value}.  If multiple
property/value pairs are specified then only objects meeting all of the
conditions (equivalent to @code{-and}) are returned.

The search can be limited to a particular set of objects and their
descendants, by passing a handle or set of handles @var{hlist} as the first
argument.

The depth of the object hierarchy to search can be limited with the
@qcode{"-depth"} argument.  An example of searching through only three
generations of children is:

@example
findobj (@var{hlist}, "-depth", 3, @var{prop_name}, @var{prop_value})
@end example

Specifying a depth @var{d} of 0 limits the search to the set of objects
passed in @var{hlist}.  A depth of 0 is also equivalent to the
@qcode{"flat"} argument.  The default depth value is @code{Inf} which
includes all descendants.

A specified logical operator may be used between @var{prop_name},
@var{prop_value} pairs.  The supported logical operators are:
@qcode{"-and"}, @qcode{"-or"}, @qcode{"-xor"}, @qcode{"-not"}.  Example code
to locate all figure and axes objects is

@example
findobj ("type", "figure", "-or", "type", "axes")
@end example

Objects may also be matched by comparing a regular expression to the
property values, where property values that match
@code{regexp (@var{prop_value}, @var{pattern})} are returned.

Finally, objects which have a property name can be found with the
@qcode{"-property"} option.  For example, code to locate objects with a
@qcode{"meshstyle"} property is

@example
findobj ("-property", "meshstyle")
@end example

Implementation Note: The search only includes objects with visible handles
(@w{HandleVisibility} = @qcode{"on"}).  @xref{XREFfindall,,findall}, to
search for all objects including hidden ones.
@seealso{findall, allchild, get, set}
@end deftypefn
