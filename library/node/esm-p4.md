---
title: "Modules: ECMAScript modules (part 4 of 5)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/esm.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Modules: ECMAScript modules (part 4 of 5)

### Resolution Algorithm Specification

**ESM\_RESOLVE**(_specifier_, _parentURL_)

> 1. Let _resolved_ be **undefined**.
> 2. If _specifier_ is a valid URL, then
>    1. Set _resolved_ to the result of parsing and reserializing
>       _specifier_ as a URL.
> 3. Otherwise, if _specifier_ starts with _"/"_, _"./"_, or _"../"_, then
>    1. Set _resolved_ to the URL resolution of _specifier_ relative to
>       _parentURL_.
> 4. Otherwise, if _specifier_ starts with _"#"_, then
>    1. Set _resolved_ to the result of
>       **PACKAGE\_IMPORTS\_RESOLVE**(_specifier_,
>       _parentURL_, _defaultConditions_).
> 5. Otherwise,
>    1. Note: _specifier_ is now a bare specifier.
>    2. Set _resolved_ the result of
>       **PACKAGE\_RESOLVE**(_specifier_, _parentURL_).
> 6. Let _format_ be **undefined**.
> 7. If _resolved_ is a _"file:"_ URL, then
>    1. If _resolved_ contains any percent encodings of _"/"_ or _"\\"_ (_"%2F"_
>       and _"%5C"_ respectively), then
>       1. Throw an _Invalid Module Specifier_ error.
>    2. If the file at _resolved_ is a directory, then
>       1. Throw an _Unsupported Directory Import_ error.
>    3. If the file at _resolved_ does not exist, then
>       1. Throw a _Module Not Found_ error.
>    4. Set _resolved_ to the real path of _resolved_, maintaining the
>       same URL querystring and fragment components.
>    5. Set _format_ to the result of **ESM\_FILE\_FORMAT**(_resolved_).
> 8. Otherwise,
>    1. Set _format_ the module format of the content type associated with the
>       URL _resolved_.
> 9. Return _format_ and _resolved_ to the loading phase

**PACKAGE\_RESOLVE**(_packageSpecifier_, _parentURL_)

> 1. Let _packageName_ be **undefined**.
> 2. If _packageSpecifier_ is an empty string, then
>    1. Throw an _Invalid Module Specifier_ error.
> 3. If _packageSpecifier_ is a Node.js builtin module name, then
>    1. Return the string _"node:"_ concatenated with _packageSpecifier_.
> 4. If _packageSpecifier_ does not start with _"@"_, then
>    1. Set _packageName_ to the substring of _packageSpecifier_ until the first
>       _"/"_ separator or the end of the string.
> 5. Otherwise,
>    1. If _packageSpecifier_ does not contain a _"/"_ separator, then
>       1. Throw an _Invalid Module Specifier_ error.
>    2. Set _packageName_ to the substring of _packageSpecifier_
>       until the second _"/"_ separator or the end of the string.
> 6. If _packageName_ starts with _"."_ or contains _"\\"_ or _"%"_, then
>    1. Throw an _Invalid Module Specifier_ error.
> 7. Let _packageSubpath_ be _"."_ concatenated with the substring of
>    _packageSpecifier_ from the position at the length of _packageName_.
> 8. Let _selfUrl_ be the result of
>    **PACKAGE\_SELF\_RESOLVE**(_packageName_, _packageSubpath_, _parentURL_).
> 9. If _selfUrl_ is not **undefined**, return _selfUrl_.
> 10. While _parentURL_ is not the file system root,
>     1. Let _packageURL_ be the URL resolution of _"node\_modules/"_
>        concatenated with _packageName_, relative to _parentURL_.
>     2. Set _parentURL_ to the parent folder URL of _parentURL_.
>     3. If the folder at _packageURL_ does not exist, then
>        1. Continue the next loop iteration.
>     4. Let _pjson_ be the result of **READ\_PACKAGE\_JSON**(_packageURL_).
>     5. If _pjson_ is not **null** and _pjson_._exports_ is not **null** or
>        **undefined**, then
>        1. Return the result of **PACKAGE\_EXPORTS\_RESOLVE**(_packageURL_,
>           _packageSubpath_, _pjson.exports_, _defaultConditions_).
>     6. Otherwise, if _packageSubpath_ is equal to _"."_, then
>        1. If _pjson.main_ is a string, then
>           1. Return the URL resolution of _main_ in _packageURL_.
>     7. Otherwise,
>        1. Return the URL resolution of _packageSubpath_ in _packageURL_.
> 11. Throw a _Module Not Found_ error.

**PACKAGE\_SELF\_RESOLVE**(_packageName_, _packageSubpath_, _parentURL_)

> 1. Let _packageURL_ be the result of **LOOKUP\_PACKAGE\_SCOPE**(_parentURL_).
> 2. If _packageURL_ is **null**, then
>    1. Return **undefined**.
> 3. Let _pjson_ be the result of **READ\_PACKAGE\_JSON**(_packageURL_).
> 4. If _pjson_ is **null** or if _pjson_._exports_ is **null** or
>    **undefined**, then
>    1. Return **undefined**.
> 5. If _pjson.name_ is equal to _packageName_, then
>    1. Return the result of **PACKAGE\_EXPORTS\_RESOLVE**(_packageURL_,
>       _packageSubpath_, _pjson.exports_, _defaultConditions_).
> 6. Otherwise, return **undefined**.

**PACKAGE\_EXPORTS\_RESOLVE**(_packageURL_, _subpath_, _exports_, _conditions_)

Note: This function is directly invoked by the CommonJS resolution algorithm.

> 1. If _exports_ is an Object with both a key starting with _"."_ and a key not
>    starting with _"."_, throw an _Invalid Package Configuration_ error.
> 2. If _subpath_ is equal to _"."_, then
>    1. Let _mainExport_ be **undefined**.
>    2. If _exports_ is a String or Array, or an Object containing no keys
>       starting with _"."_, then
>       1. Set _mainExport_ to _exports_.
>    3. Otherwise if _exports_ is an Object containing a _"."_ property, then
>       1. Set _mainExport_ to _exports_\[_"."_].
>    4. If _mainExport_ is not **undefined**, then
>       1. Let _resolved_ be the result of **PACKAGE\_TARGET\_RESOLVE**(
>          _packageURL_, _mainExport_, **null**, **false**, _conditions_).
>       2. If _resolved_ is not **null** or **undefined**, return _resolved_.
> 3. Otherwise, if _exports_ is an Object and all keys of _exports_ start with
>    _"."_, then
>    1. Assert: _subpath_ begins with _"./"_.
>    2. Let _resolved_ be the result of **PACKAGE\_IMPORTS\_EXPORTS\_RESOLVE**(
>       _subpath_, _exports_, _packageURL_, **false**, _conditions_).
>    3. If _resolved_ is not **null** or **undefined**, return _resolved_.
> 4. Throw a _Package Path Not Exported_ error.

**PACKAGE\_IMPORTS\_RESOLVE**(_specifier_, _parentURL_, _conditions_)

Note: This function is directly invoked by the CommonJS resolution algorithm.

> 1. Assert: _specifier_ begins with _"#"_.
> 2. If _specifier_ is exactly equal to _"#"_, then
>    1. Throw an _Invalid Module Specifier_ error.
> 3. Let _packageURL_ be the result of **LOOKUP\_PACKAGE\_SCOPE**(_parentURL_).
> 4. If _packageURL_ is not **null**, then
>    1. Let _pjson_ be the result of **READ\_PACKAGE\_JSON**(_packageURL_).
>    2. If _pjson.imports_ is a non-null Object, then
>       1. Let _resolved_ be the result of
>          **PACKAGE\_IMPORTS\_EXPORTS\_RESOLVE**(
>          _specifier_, _pjson.imports_, _packageURL_, **true**, _conditions_).
>       2. If _resolved_ is not **null** or **undefined**, return _resolved_.
> 5. Throw a _Package Import Not Defined_ error.

**PACKAGE\_IMPORTS\_EXPORTS\_RESOLVE**(_matchKey_, _matchObj_, _packageURL_,
_isImports_, _conditions_)

> 1. If _matchKey_ ends in _"/"_, then
>    1. Throw an _Invalid Module Specifier_ error.
> 2. If _matchKey_ is a key of _matchObj_ and does not contain _"\*"_, then
>    1. Let _target_ be the value of _matchObj_\[_matchKey_].
>    2. Return the result of **PACKAGE\_TARGET\_RESOLVE**(_packageURL_,
>       _target_, **null**, _isImports_, _conditions_).
> 3. Let _expansionKeys_ be the list of keys of _matchObj_ containing only a
>    single _"\*"_, sorted by the sorting function **PATTERN\_KEY\_COMPARE**
>    which orders in descending order of specificity.
> 4. For each key _expansionKey_ in _expansionKeys_, do
>    1. Let _patternBase_ be the substring of _expansionKey_ up to but excluding
>       the first _"\*"_ character.
>    2. If _matchKey_ starts with but is not equal to _patternBase_, then
>       1. Let _patternTrailer_ be the substring of _expansionKey_ from the
>          index after the first _"\*"_ character.
>       2. If _patternTrailer_ has zero length, or if _matchKey_ ends with
>          _patternTrailer_ and the length of _matchKey_ is greater than or
>          equal to the length of _expansionKey_, then
>          1. Let _target_ be the value of _matchObj_\[_expansionKey_].
>          2. Let _patternMatch_ be the substring of _matchKey_ starting at the
>             index of the length of _patternBase_ up to the length of
>             _matchKey_ minus the length of _patternTrailer_.
>          3. Return the result of **PACKAGE\_TARGET\_RESOLVE**(_packageURL_,
>             _target_, _patternMatch_, _isImports_, _conditions_).
> 5. Return **null**.

**PATTERN\_KEY\_COMPARE**(_keyA_, _keyB_)

> 1. Assert: _keyA_ contains only a single _"\*"_.
> 2. Assert: _keyB_ contains only a single _"\*"_.
> 3. Let _baseLengthA_ be the index of _"\*"_ in _keyA_.
> 4. Let _baseLengthB_ be the index of _"\*"_ in _keyB_.
> 5. If _baseLengthA_ is greater than _baseLengthB_, return -1.
> 6. If _baseLengthB_ is greater than _baseLengthA_, return 1.
> 7. If the length of _keyA_ is greater than the length of _keyB_, return -1.
> 8. If the length of _keyB_ is greater than the length of _keyA_, return 1.
> 9. Return 0.

**PACKAGE\_TARGET\_RESOLVE**(_packageURL_, _target_, _patternMatch_,
_isImports_, _conditions_)

> 1. If _target_ is a String, then
>    1. If _target_ does not start with _"./"_, then
>       1. If _isImports_ is **false**, or if _target_ starts with _"../"_ or
>          _"/"_, or if _target_ is a valid URL, then
>          1. Throw an _Invalid Package Target_ error.
>       2. If _patternMatch_ is a String, then
>          1. Return **PACKAGE\_RESOLVE**(_target_ with every instance of _"\*"_
>             replaced by _patternMatch_, _packageURL_ + _"/"_).
>       3. Return **PACKAGE\_RESOLVE**(_target_, _packageURL_ + _"/"_).
>    2. If _target_ split on _"/"_ or _"\\"_ contains any _""_, _"."_, _".."_,
>       or _"node\_modules"_ segments after the first _"."_ segment, case
>       insensitive and including percent encoded variants, throw an _Invalid
>       Package Target_ error.
>    3. Let _resolvedTarget_ be the URL resolution of the concatenation of
>       _packageURL_ and _target_.
>    4. Assert: _packageURL_ is contained in _resolvedTarget_.
>    5. If _patternMatch_ is **null**, then
>       1. Return _resolvedTarget_.
>    6. If _patternMatch_ split on _"/"_ or _"\\"_ contains any _""_, _"."_,
>       _".."_, or _"node\_modules"_ segments, case insensitive and including
>       percent encoded variants, throw an _Invalid Module Specifier_ error.
>    7. Return the URL resolution of _resolvedTarget_ with every instance of
>       _"\*"_ replaced with _patternMatch_.
> 2. Otherwise, if _target_ is a non-null Object, then
>    1. If _target_ contains any index property keys, as defined in ECMA-262
>       6.1.7 Array Index, throw an _Invalid Package Configuration_ error.
>    2. For each property _p_ of _target_, in object insertion order as,
>       1. If _p_ equals _"default"_ or _conditions_ contains an entry for _p_,
>          then
>          1. Let _targetValue_ be the value of the _p_ property in _target_.
>          2. Let _resolved_ be the result of **PACKAGE\_TARGET\_RESOLVE**(
>             _packageURL_, _targetValue_, _patternMatch_, _isImports_,
>             _conditions_).
>          3. If _resolved_ is equal to **undefined**, continue the loop.
>          4. Return _resolved_.
>    3. Return **undefined**.
> 3. Otherwise, if _target_ is an Array, then
>    1. If \_target.length is zero, return **null**.
>    2. For each item _targetValue_ in _target_, do
>       1. Let _resolved_ be the result of **PACKAGE\_TARGET\_RESOLVE**(
>          _packageURL_, _targetValue_, _patternMatch_, _isImports_,
>          _conditions_), continuing the loop on any _Invalid Package Target_
>          error.
>       2. If _resolved_ is **undefined**, continue the loop.
>       3. Return _resolved_.
>    3. Return or throw the last fallback resolution **null** return or error.
> 4. Otherwise, if _target_ is _null_, return **null**.
> 5. Otherwise throw an _Invalid Package Target_ error.

**ESM\_FILE\_FORMAT**(_url_)

> 1. Assert: _url_ corresponds to an existing file.
> 2. If _url_ ends in _".mjs"_, then
>    1. Return _"module"_.
> 3. If _url_ ends in _".cjs"_, then
>    1. Return _"commonjs"_.
> 4. If _url_ ends in _".json"_, then
>    1. Return _"json"_.
> 5. If _url_ ends in
>    _".wasm"_, then
>    1. Return _"wasm"_.
> 6. If `--experimental-addon-modules` is enabled and _url_ ends in
>    _".node"_, then
>    1. Return _"addon"_.
> 7. Let _packageURL_ be the result of **LOOKUP\_PACKAGE\_SCOPE**(_url_).
> 8. Let _pjson_ be the result of **READ\_PACKAGE\_JSON**(_packageURL_).
> 9. Let _packageType_ be **null**.
> 10. If _pjson?.type_ is _"module"_ or _"commonjs"_, then
>     1. Set _packageType_ to _pjson.type_.
> 11. If _url_ ends in _".js"_, then
>     1. If _packageType_ is not **null**, then
>        1. Return _packageType_.
>     2. If the result of **DETECT\_MODULE\_SYNTAX**(_source_) is true, then
>        1. Return _"module"_.
>     3. Return _"commonjs"_.
> 12. If _url_ does not have any extension, then
>     1. If _packageType_ is _"module"_ and the file at _url_ contains the
>        "application/wasm" content type header for a WebAssembly module, then
>        1. Return _"wasm"_.
>     2. If _packageType_ is not **null**, then
>        1. Return _packageType_.
>     3. If the result of **DETECT\_MODULE\_SYNTAX**(_source_) is true, then
>        1. Return _"module"_.
>     4. Return _"commonjs"_.
> 13. Return **undefined** (will throw during load phase).

**LOOKUP\_PACKAGE\_SCOPE**(_url_)

> 1. Let _scopeURL_ be _url_.
> 2. While _scopeURL_ is not the file system root,
>    1. Set _scopeURL_ to the parent URL of _scopeURL_.
>    2. If _scopeURL_ ends in a _"node\_modules"_ path segment, return **null**.
>    3. Let _pjsonURL_ be the resolution of _"package.json"_ within
>       _scopeURL_.
>    4. if the file at _pjsonURL_ exists, then
>       1. Return _scopeURL_.
> 3. Return **null**.

**READ\_PACKAGE\_JSON**(_packageURL_)

> 1. Let _pjsonURL_ be the resolution of _"package.json"_ within _packageURL_.
> 2. If the file at _pjsonURL_ does not exist, then
>    1. Return **null**.
> 3. If the file at _packageURL_ does not parse as valid JSON, then
>    1. Throw an _Invalid Package Configuration_ error.
> 4. Return the parsed JSON source of the file at _pjsonURL_.

**DETECT\_MODULE\_SYNTAX**(_source_)

> 1. Parse _source_ as an ECMAScript module.
> 2. If the parse is successful, then
>    1. If _source_ contains top-level `await`, static `import` or `export`
>       statements, or `import.meta`, return **true**.
>    2. If _source_ contains a top-level lexical declaration (`const`, `let`,
>       or `class`) of any of the CommonJS wrapper variables (`require`,
>       `exports`, `module`, `__filename`, or `__dirname`) then return **true**.
> 3. Return **false**.
