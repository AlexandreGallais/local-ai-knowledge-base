# webread

```octave
function response = webread (url, varargin)
```

@deftypefn  {} {@var{response} =} webread (@var{url})
@deftypefnx {} {@var{response} =} webread (@var{url}, @var{name1}, @var{value1}, @dots{})
@deftypefnx {} {@var{response} =} webread (@dots{}, @var{options})

Read content from RESTful web service.

Read content from the web service specified by @var{url} and return the
content in @var{response}.

All name-value pairs given (@var{name1}, @var{value1}, @dots{}) are appended
as query parameters to @var{url}.  To place a query in the body of the
message, use @code{webwrite}.  The web service defines the acceptable query
parameters.

@var{options} is a @code{weboptions} object that may be used to add other
HTTP request options.  This argument can be used with either calling form.
See @code{help weboptions} for a complete list of supported HTTP options.

@seealso{weboptions, webwrite}
@end deftypefn
