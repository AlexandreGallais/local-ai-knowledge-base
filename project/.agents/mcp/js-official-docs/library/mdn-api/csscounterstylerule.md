---
title: "CSSCounterStyleRule"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/csscounterstylerule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSSCounterStyleRule

The **`CSSCounterStyleRule`** interface represents an `@counter-style` at-rule.

## Instance properties

_This interface also inherits properties from its parent `CSSRule`._

- `CSSCounterStyleRule.name`
    A string that contains the serialization of the `<custom-ident>` defined as the `name` for the associated rule.
- `CSSCounterStyleRule.system`
    A string that contains the serialization of the `system` descriptor defined for the associated rule. If the descriptor was not specified in the associated rule, the attribute returns an empty string.
- `CSSCounterStyleRule.symbols`
    A string that contains the serialization of the `symbols` descriptor defined for the associated rule. If the descriptor was not specified in the associated rule, the attribute returns an empty string.
- `CSSCounterStyleRule.additiveSymbols`
    A string that contains the serialization of the `additive-symbols` descriptor defined for the associated rule. If the descriptor was not specified in the associated rule, the attribute returns an empty string.
- `CSSCounterStyleRule.negative`
    A string that contains the serialization of the `negative` descriptor defined for the associated rule. If the descriptor was not specified in the associated rule, the attribute returns an empty string.
- `CSSCounterStyleRule.prefix`
    A string that contains the serialization of the `prefix` descriptor defined for the associated rule. If the descriptor was not specified in the associated rule, the attribute returns an empty string.
- `CSSCounterStyleRule.suffix`
    A string that contains the serialization of the `suffix` descriptor defined for the associated rule. If the descriptor was not specified in the associated rule, the attribute returns an empty string.
- `CSSCounterStyleRule.range`
    A string that contains the serialization of the `range` descriptor defined for the associated rule. If the descriptor was not specified in the associated rule, the attribute returns an empty string.
- `CSSCounterStyleRule.pad`
    A string that contains the serialization of the `pad` descriptor defined for the associated rule. If the descriptor was not specified in the associated rule, the attribute returns an empty string.
- `CSSCounterStyleRule.speakAs`
    A string that contains the serialization of the `speak-as` descriptor defined for the associated rule. If the descriptor was not specified in the associated rule, the attribute returns an empty string.
- `CSSCounterStyleRule.fallback`
    A string that contains the serialization of the `fallback` descriptor defined for the associated rule. If the descriptor was not specified in the associated rule, the attribute returns an empty string.

## Instance methods

_This interface doesn't implement any specific method but inherits methods from its parent `CSSRule`._

## See also

- `@counter-style`
- CSS counter styles module
- Using CSS counters guide
