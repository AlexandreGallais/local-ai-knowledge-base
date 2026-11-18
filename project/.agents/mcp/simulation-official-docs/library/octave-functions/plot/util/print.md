# print

```octave
function RGB = print (varargin)
```

@deftypefn  {} {} print ()
@deftypefnx {} {} print (@var{options})
@deftypefnx {} {} print (@var{filename}, @var{options})
@deftypefnx {} {} print (@var{hfig}, @dots{})
@deftypefnx {} {@var{RGB} =} print (@qcode{"-RGBImage"}, @dots{})
Format a figure for printing and either save it to a file, send it to a
printer, or return an RGB image.

@var{filename} defines the name of the output file.  If the filename has
no suffix then one is inferred from the specified device and appended to the
filename.  When neither a filename nor the @qcode{"-RGBImage"} option is
present, the output is sent to the printer.  The various options and
filename arguments may be given in any order, except for the figure handle
argument @var{hfig} which must be first if it is present.

Example: Print to a file using PDF and JPEG formats.

@example
@group
figure (1);
clf ();
surf (peaks);
print figure1.pdf    # The extension specifies the format
print -djpg figure1  # Will produce "figure1.jpg" file
@end group
@end example

If the first argument is a handle @var{hfig} to a figure object then it
specifies the figure to print.  By default, the current figure returned
by @code{gcf} is printed.

For outputs to paged formats, for example, PostScript and PDF, the page size
is specified by the figure's @code{papersize} property together with the
@code{paperunits} property.  The location and size of the plot on the page
are specified by the figure's @code{paperposition} property.  The
orientation of the page is specified by the figure's @code{paperorientation}
property.

For non-page formats---for example, image formats like JPEG---the width and
height of the output are specified by the figure's @code{paperposition(3:4)}
property values.

The @code{print} command supports many @var{options}:

@table @code
@item -f@var{h}
  Specify the handle, @var{h}, of the figure to be printed.

Example: Print figure 1.

@example
@group
figure (1);
clf ();
surf (peaks);
figure (2);
print -f1 figure1.pdf
## Equivalent functional form:
print (1, "figure1.pdf")
@end group
@end example

@item -P@var{printer}
  Set the @var{printer} name to which the plot is sent if no @var{filename}
is specified.

Example: Print to printer named PS_printer using PostScript format.

@example
@group
clf ();
surf (peaks);
print -dpswrite -PPS_printer
@end group
@end example

@item -RGBImage
  Return an M-by-N-by-3 RGB image of the figure.  The size of the image
depends on the formatting options.  This is similar to taking a screen
capture of the plot, but formatting options may be changed such as the
resolution or monochrome/color.

Example: Get the pixels of a figure image.

@example
@group
clf ();
surf (peaks);
@var{rgb} = print ("-RGBImage");
@end group
@end example

@item  -image | -opengl
@itemx -vector | -painters
  Specifies whether the pixel-based renderer (@option{-image} or
@option{-opengl}) or vector-based renderer (@option{-vector} or
@option{-painters}) is used.  This is equivalent to changing the figure's
@qcode{"Renderer"} property.  When the figure
@nospell{@qcode{"RendererMode"}} property is @qcode{"auto"} (the default)
Octave will use the @qcode{"opengl"} renderer for raster formats (e.g.,
JPEG) and @qcode{"painters"} for vector formats (e.g., PDF)@.  These options
are only supported for the "qt" graphics toolkit.

@item  -svgconvert (default)
@itemx -nosvgconvert
  When using the @option{-painters} renderer, this enables or disables the
SVG based backend toolchain with enhanced characteristics:

@table @asis
@item Font handling:
For interpreters "none" and "tex", the actual font is embedded in the output
file which allows for printing arbitrary characters and fonts in all vector
formats.

Strings using the @qcode{"latex"} interpreter, are rendered using path
objects.  This looks good but note that textual info (font,
characters@dots{}) are lost.

@item Output Simplification:
By default, the option @option{-painters} renders patch and surface objects
using assemblies of triangles.  This may lead to anti-aliasing artifacts
when viewing the file.  The @option{-svgconvert} option reconstructs
polygons in order to avoid those artifacts (particularly for 2-D figures).

@item Transparency:
Allows for printing transparent graphics objects in PDF format.
For PostScript formats the presence of any transparent object will cause the
output to be rasterized.
@end table

Caution: If Octave was built against Qt version earlier than 5.13,
@option{-svgconvert} may lead to inaccurate rendering of image objects.

@item  -polymerge
@itemx -nopolymerge
@itemx -polymerge-all
  When using the SVG based backend @option{-svgconvert}, faces are rendered
as triangles.  In some cases, some viewers might display fine lines where
those triangles share an edge.  These options control whether all triangles
that share edges are merged into polygons (@option{-polymerge-all} which
might take some time for graphics consisting of many triangles -- including
line markers), only consecutive polygons are merged (@option{-polymerge}),
or no triangles are merged at all (@option{-no-polymerge}).  By default,
only consecutive triangles sharing an edge are merged, unless the printed
figure contains patch or surface graphics objects in which case all
triangles that are sharing an edge are merged.

@item  -portrait
@itemx -landscape
  Specify the orientation of the plot for printed output.
For non-printed output the aspect ratio of the output corresponds to the
plot area defined by the @qcode{"paperposition"} property in the
orientation specified.  This option is equivalent to changing the figure's
@qcode{"paperorientation"} property.

@item  -fillpage
@itemx -bestfit
  When using a page-based format (PDF, PostScript, printer) ignore the
@qcode{"paperposition"} property and have the plot occupy the entire page.
The option @option{-fillpage} will stretch the plot to occupy the page with
0.25 inch margins all around.  The option @option{-bestfit} will expand the
plot to take up as much room as possible on the page @strong{without}
distorting the original aspect ratio of the plot.

@item  -color
@itemx -mono
  Color or monochrome output.

@item  -solid
@itemx -dashed
  Force all lines to be solid or dashed, respectively.

@item -noui
  Don't print uicontrol objects such as pushbuttons which may overlay the
plot.  This is the default behavior and it is not possible to include
uicontrol objects in the output without using an external screen capture
tool.

@item -r@var{NUM}
  Resolution of bitmaps in dots per inch (DPI).  For both metafiles and SVG
the default is the screen resolution; for other formats the default is 150
DPI@.  To specify screen resolution, use @qcode{"-r0"}.

Example: high resolution raster output.

@example
@group
clf ();
surf (peaks (), "facelighting", "gouraud");
light ();
print ("-r600", "lit_peaks.png");
@end group
@end example

@item -S@var{xsize},@var{ysize}
  Plot size in pixels for raster formats including PNG, JPEG, PNG, and
@emph{unusually} SVG@.  For all vector formats, including PDF, PS, and EPS,
the plot size is specified in points.  This option is equivalent to changing
the width and height of the output by setting the figure property
@code{paperposition(3:4)}.  When using the command form of the print
function you must quote the @var{xsize},@var{ysize} option to prevent the
Octave interpreter from recognizing the embedded comma (',').  For example,
by writing @w{"-S640,480"}.

@item  -tight
@itemx -loose
  Force a tight or loose bounding box for EPS files.  The default is tight.

@item -@var{preview}
  Add a preview to EPS files.  Supported formats are:

  @table @code
  @item -interchange
    Provide an interchange preview.

  @item -metafile
    Provide a metafile preview.

  @item -pict
    Provide a pict preview.

  @item -tiff
    Provide a TIFF preview.
  @end table

@item -append
  Append PostScript or PDF output to an existing file of the same type.

@item  -F@var{fontname}
@itemx -F@var{fontname}:@var{size}
@itemx -F:@var{size}
  Use @var{fontname} and/or @var{fontsize} for all text.
@var{fontname} is ignored for some devices: fig, etc.

@item -d@var{device}
  The available output format is specified by the option @var{device}, and
is one of the following (devices marked with a @qcode{'*'} are only
available with the Gnuplot toolkit):

Vector Formats

  @table @code
  @item svg
    Scalable Vector Graphics.

  @item  pdf
  @itemx pdfcrop
    Portable Document Format.  The @code{pdf} device formats the figure for
printing on paper.  The size of the surrounding page and the position of the
figure inside the page are defined by the
@ref{XREFfigurepaperorientation,,paper* figure properties}.

Use @code{pdfcrop} if you don't want the surrounding page.

Caution: with @option{-nosvgconvert} option, PDF inherits the same
limitations as PostScript (limited set of fonts and lack of transparency).

  @item  eps(2)
  @itemx epsc(2)
    Encapsulated PostScript (level 1 and 2, mono and color).

The OpenGL-based graphics toolkits always generate PostScript level 3.0.
They have limited support for text unless using the @option{-svgconvert}
option (the default).
Limitations include using only ASCII characters (e.g., no Greek letters)
and support for just three base PostScript fonts: Helvetica (the default),
Times, or Courier.  Any other font will be replaced by Helvetica.

  @item  ps(2)
  @itemx psc(2)
    Same as @code{eps} except that the figure is formatted for printing on
paper.  The size of the surrounding page and position of the figure inside
the page are defined by the
@ref{XREFfigurepaperorientation,,paper* figure properties}.

  @item  pslatex
  @itemx epslatex
  @itemx pdflatex
  @itemx pslatexstandalone
  @itemx epslatexstandalone
  @itemx pdflatexstandalone
    Generate a @LaTeX{} file @file{@var{filename}.tex} for the text portions
of a plot and a file @file{@var{filename}.(ps|eps|pdf)} for the remaining
graphics.  The graphics file suffix .ps|eps|pdf is determined by the
specified device type.  The @LaTeX{} file produced by the @samp{standalone}
option can be processed directly by @LaTeX{}.  The file generated without
the @samp{standalone} option is intended to be included from another
@LaTeX{} document.  In either case, the @LaTeX{} file contains an
@code{\includegraphics} command so that the generated graphics file is
automatically included when the @LaTeX{} file is processed.  The text that
is written to the @LaTeX{} file contains the strings @strong{exactly} as
they were specified in the plot.  If any special characters of the @TeX{}
mode interpreter were used, the file must be edited before @LaTeX{}
processing.  Specifically, the special characters must be enclosed with
dollar signs @w{(@code{$ @dots{} $})}, and other characters that are
recognized by @LaTeX{} may also need editing (e.g., braces).  The
@samp{pdflatex} device, and any of the @samp{standalone} formats, are not
available with the Gnuplot toolkit.

  @item  epscairo*
  @itemx pdfcairo*
  @itemx epscairolatex*
  @itemx pdfcairolatex*
  @itemx epscairolatexstandalone*
  @itemx pdfcairolatexstandalone*
    Generate output with Cairo renderer.  The devices @code{epscairo} and
@code{pdfcairo} are synonymous with the @code{epsc} device.  The @LaTeX{}
variants generate a @LaTeX{} file, @file{@var{filename}.tex}, for the text
portions of a plot, and an image file, @file{@var{filename}.(eps|pdf)}, for
the graph portion of the plot.  The @samp{standalone} variants behave as
described for @samp{epslatexstandalone} above.

  @item canvas*
    Javascript-based drawing on an HTML5 canvas viewable in a web browser.

  @item  emf
  @itemx meta
    Microsoft Enhanced Metafile

  @item fig
    XFig.  For the Gnuplot graphics toolkit, the additional options
@option{-textspecial} or @option{-textnormal} (default) can be used to
control whether the special flag should be set for the text in the figure.

  @item  latex*
  @itemx eepic*
    @LaTeX{} picture environment and extended picture environment.

  @item  tikz
  @itemx tikzstandalone*
    Generate a @LaTeX{} file using PGF/TikZ format.  The OpenGL-based
toolkits create a PGF file while Gnuplot creates a TikZ file.  The
@samp{tikzstandalone} device produces a @LaTeX{} document which includes the
TikZ file.

  @end table

Raster Formats

  @table @code
  @item png
    Portable Network Graphics

  @item  jpg
  @itemx jpeg
    JPEG image

  @item  tif
  @itemx tiff
  @itemx tiffn
    TIFF image with LZW compression (@nospell{tif}, tiff) or uncompressed
(@nospell{tiffn}).

  @item gif
    GIF image

  @item pbm
    PBMplus

  @item dumb*
    ASCII art

  @end table

  If the device is omitted, it is inferred from the file extension,
or if there is no filename then it is sent to the printer as PostScript.

@item -d@var{ghostscript_device}
  Additional devices are supported by Ghostscript.
Some examples are:

  @table @code
  @item ljet2p
    HP LaserJet @nospell{IIP}

  @item pcx24b
    24-bit color PCX file format

  @item ppm
    Portable Pixel Map file format
  @end table

  For a complete list of available formats and devices type
@kbd{system ("gs -h")}.

  When Ghostscript output is sent to a printer the size is determined by
the figure's @qcode{"papersize"} property.  When the output is sent to a
file the size is determined by the plot box defined by the figure's
@qcode{"paperposition"} property.

@item -G@var{ghostscript_command}
  Specify the command for calling Ghostscript.  For Unix the default is
@qcode{"gs"} and for Windows it is @qcode{"gswin32c"}.

@item  -TextAlphaBits=@var{n}
@itemx -GraphicsAlphaBits=@var{n}
  Octave is able to produce output for various printers, bitmaps, and
vector formats by using Ghostscript.  For bitmap and printer output
anti-aliasing is applied using Ghostscript's TextAlphaBits and
GraphicsAlphaBits options.  The default number of bits are 4 and 1
respectively.  Allowed values for @var{N} are 1, 2, or 4.

@item -no-append-file-extension
  With this option, @var{filename} is used verbatim.  That means no file
extension matching the file format is appended automatically.
@end table

@seealso{saveas, getframe, savefig, hgsave, orient, figure}
@end deftypefn
