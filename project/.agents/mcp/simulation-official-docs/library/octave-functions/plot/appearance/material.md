# material

```octave
function retval = material (varargin)
```

@deftypefn  {} {} material shiny
@deftypefnx {} {} material dull
@deftypefnx {} {} material metal
@deftypefnx {} {} material default
@deftypefnx {} {} material ([@var{as}, @var{ds}, @var{ss}])
@deftypefnx {} {} material ([@var{as}, @var{ds}, @var{ss}, @var{se}])
@deftypefnx {} {} material ([@var{as}, @var{ds}, @var{ss}, @var{se}, @var{scr}])
@deftypefnx {} {} material (@var{hlist}, @dots{})
@deftypefnx {} {@var{mtypes} =} material ()
@deftypefnx {} {@var{refl_props} =} material (@var{mtype_string})
Set reflectance properties for the lighting of surfaces and patches.

This function changes the ambient, diffuse, and specular strengths, as well
as the specular exponent and specular color reflectance, of all
@code{patch} and @code{surface} objects in the current axes.  This can be
used to simulate, to some extent, the reflectance properties of certain
materials when used with @code{light}.

When called with a string, the aforementioned properties are set
according to the values in the following table:

@multitable @columnfractions .16 .16 .16 .16 .16 .16
@headitem @var{mtype} @tab ambient- strength @tab diffuse-
strength @tab specular- strength @tab specular- exponent @tab specular-
color- reflectance
@item @qcode{"shiny"} @tab 0.3 @tab 0.6 @tab 0.9 @tab 20 @tab 1.0
@item @qcode{"dull"} @tab 0.3 @tab 0.8 @tab 0.0 @tab 10 @tab 1.0
@item @qcode{"metal"} @tab 0.3 @tab 0.3 @tab 1.0 @tab 25 @tab 0.5
@item @qcode{"default"} @tab @qcode{"default"} @tab @qcode{"default"} @tab @qcode{"default"}
@tab @qcode{"default"} @tab @qcode{"default"}
@end multitable

When called with a vector of three elements, the ambient, diffuse, and
specular strengths of all @code{patch} and @code{surface} objects in the
current axes are updated.  An optional fourth vector element updates the
specular exponent, and an optional fifth vector element updates the
specular color reflectance.

A list of graphic handles can also be passed as the first argument.  In
this case, the properties of these handles and all child @code{patch} and
@code{surface} objects will be updated.

Additionally, @code{material} can be called with a single output argument.
If called without input arguments, a column cell vector @var{mtypes} with
the strings for all available materials is returned.  If the one input
argument @var{mtype_string} is the name of a material, a 1x5 cell vector
@var{refl_props} with the reflectance properties of that material is
returned.  In both cases, no graphic properties are changed.

@seealso{light, fill, mesh, patch, pcolor, surf, surface}
@end deftypefn
