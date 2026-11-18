# hgload

```octave
function [h, old_prop] = hgload (filename, prop_struct = struct ())
```

@deftypefn  {} {@var{h} =} hgload (@var{filename})
@deftypefnx {} {[@var{h}, @var{old_prop}] =} hgload (@var{filename}, @var{prop_struct})
Load the graphics objects in @var{filename} into a vector of graphics
handles @var{h}.

If @var{filename} has no extension, Octave will try to find the file with
and without the default extension @file{.ofig}.

If provided, the elements of structure @var{prop_struct} will be used to
override the properties of top-level objects stored in @var{filename}, and
the saved values from @var{filename} will be stored in @var{old_prop}.
@var{old_prop} is a cell array matching the size of @var{h}; each cell
contains a structure of the existing property names and values before being
overridden.

@seealso{openfig, hgsave, struct2hdl}
@end deftypefn
