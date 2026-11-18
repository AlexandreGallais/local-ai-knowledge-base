# imformats

```octave
function varargout = imformats (arg1, arg2, arg3)
```

@deftypefn  {} {} imformats ()
@deftypefnx {} {@var{formats} =} imformats (@var{ext})
@deftypefnx {} {@var{formats} =} imformats (@var{format})
@deftypefnx {} {@var{formats} =} imformats ("add", @var{format})
@deftypefnx {} {@var{formats} =} imformats ("remove", @var{ext})
@deftypefnx {} {@var{formats} =} imformats ("update", @var{ext}, @var{format})
@deftypefnx {} {@var{formats} =} imformats ("factory")
Manage supported image formats.

@var{formats} is a structure with information about each supported file
format, or from a specific format @var{ext}, the value displayed on the
field @var{ext}.  It contains the following fields:

@table @asis
@item ext
The name of the file format.  This may match the file extension but Octave
will automatically detect the file format.

@item description
A long description of the file format.

@item @nospell{isa}
A function handle to confirm if a file is of the specified format.

@item write
A function handle to write if a file is of the specified format.

@item read
A function handle to open files the specified format.

@item info
A function handle to obtain image information of the specified format.

@item alpha
Logical value if format supports alpha channel (transparency or matte).

@item multipage
Logical value if format supports multipage (multiple images per file).
@end table

It is possible to change the way Octave manages file formats with the
options @qcode{"add"}, @qcode{"remove"}, and @qcode{"update"}, and supplying
a structure @var{format} with the required fields.  The option
@qcode{"factory"} resets the configuration to the default.

This can be used by Octave packages to extend the image reading capabilities
Octave, through use of the PKG_ADD and PKG_DEL commands.

@seealso{imfinfo, imread, imwrite}
@end deftypefn
