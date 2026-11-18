# saveas

```octave
function saveas (h, filename, fmt)
```

@deftypefn  {} {} saveas (@var{h}, @var{filename})
@deftypefnx {} {} saveas (@var{h}, @var{filename}, @var{fmt})
Save graphics object @var{h} to the file @var{filename} in graphics format
@var{fmt}.

If @var{h} is the handle to a figure object, that figure object is saved.
If @var{h} is the handle to a different graphics object, the figure
containing that graphics object is saved.

All device formats accepted by @code{print} may be used.  Common formats
are:

@table @code

  @item ofig
    Octave figure file format (default)

  @item mfig
    Two files: Octave m-file @file{filename.m} containing code
    to open Octave figure file @file{filename.ofig}

  @item ps
    PostScript

  @item eps
    Encapsulated PostScript

  @item pdf
    Portable Document Format

  @item jpg
    JPEG Image

  @item png
    Portable Network Graphics image

  @item emf
    Enhanced MetaFile

  @item tif
    TIFF Image, compressed

@end table

If @var{fmt} is omitted it is extracted from the extension of
@var{filename}.  The default format when there is no extension is
@qcode{"ofig"}.

@example
@group
clf ();
surf (peaks);
saveas (1, "figure1.png");
@end group
@end example

@seealso{print, savefig, hgsave, orient}
@end deftypefn
