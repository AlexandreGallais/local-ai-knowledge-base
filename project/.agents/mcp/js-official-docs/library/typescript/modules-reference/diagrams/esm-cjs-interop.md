---
title: "esm-cjs-interop"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/modules-reference/diagrams/esm-cjs-interop.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# esm-cjs-interop

```mermaid
graph TB
  subgraph Transpiled[ESM transpiled to CJS]
    direction TB
    C[Importing module] -- designed based on spec --> D[Imported module]
  end
  subgraph ESM
    direction TB
    A[Importing module] -- specified behavior --> B[Imported module]
  end
```

```mermaid
graph TD
  subgraph Transpiled[ESM transpiled to CJS]
    C[Importing module] -- designed based on spec --> D[Imported module]
  end
  subgraph CJS[True CJS]
    E[Imported module]
  end
  subgraph ESM
    A[Importing module] -- specified behavior --> B[Imported module]
  end
  A -. unspecified behavior .-> E
  C .->|"<span style='font-size: 3em'>❓🤷🏻‍♂️❓</span>"| E
```
