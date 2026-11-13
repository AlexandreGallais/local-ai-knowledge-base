---
title: "Error Encyclopedia"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/reference/errors/overview.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# Error Encyclopedia

## Runtime errors

| Code      | Name                                                                                 |
| :-------- | :----------------------------------------------------------------------------------- |
| `NG0100`  | Expression Changed After Checked                                    |
| `NG0200`  | Circular Dependency in DI                                           |
| `NG0201`  | No Provider Found                                                   |
| `NG0203`  | `inject()` must be called from an injection context                 |
| `NG0204`  | Invalid Injection Token                                             |
| `NG0205`  | Injector has already been destroyed                                 |
| `NG0207`  | EnvironmentProviders in wrong context                               |
| `NG0209`  | Invalid multi provider                                              |
| `NG0300`  | Selector Collision                                                  |
| `NG0301`  | Export Not Found                                                    |
| `NG0302`  | Pipe Not Found                                                      |
| `NG0318`  | Invalid style property binding value                                |
| `NG0401`  | Missing platform                                                    |
| `NG0403`  | Bootstrapped NgModule doesn't specify which component to initialize |
| `NG0500`  | Hydration Node Mismatch                                             |
| `NG0501`  | Hydration Missing Siblings                                          |
| `NG0502`  | Hydration Missing Node                                              |
| `NG0503`  | Hydration Unsupported Projection of DOM Nodes                       |
| `NG0504`  | Skip hydration flag is applied to an invalid node                   |
| `NG0505`  | No hydration info in server response                                |
| `NG0506`  | NgZone remains unstable                                             |
| `NG0507`  | HTML content was altered after SSR                                  |
| `NG0509`  | Hydration Missing Node on Path                                      |
| `NG0600`  | Signal write in a disallowed context                                |
| `NG0602`  | Disallowed function call inside reactive context                    |
| `NG0750`  | @defer dependencies failed to load                                  |
| `NG0751`  | @defer behavior when HMR is enabled                                 |
| `NG0904`  | Unsafe value used in a resource URL context                         |
| `NG0910`  | Unsafe bindings on an element                                       |
| `NG0912`  | Component ID generation collision                                   |
| `NG0913`  | Runtime Performance Warnings                                        |
| `NG0919`  | Circular Dependency Detected                                        |
| `NG0950`  | Required input is accessed before a value is set                    |
| `NG0951`  | Child query result is required but no value is available            |
| `NG0955`  | Track expression resulted in duplicated keys for a given collection |
| `NG0956`  | Tracking expression caused re-creation of the DOM structure         |
| `NG0991`  | Resource completed before producing a value                         |
| `NG01002` | Missing Control Value                                              |
| `NG01055` | Missing control for `formControlName`                              |
| `NG01101` | Wrong Async Validator Return Type                                  |
| `NG01203` | Missing value accessor                                             |
| `NG01902` | Orphan field in signal forms                                       |
| `NG02200` | Missing Iterable Differ                                            |
| `NG02800` | JSONP support in HttpClient configuration                          |
| `NG02802` | Headers not transferred by HttpTransferCache                       |
| `NG02825` | Fetch response body exceeds the configured limit                   |
| `NG05000` | Hydration with unsupported Zone.js instance.                       |
| `NG05104` | Root element was not found.                                        |
| `NG05106` | Insertion reference node not found                                 |
| `NG05201` | Unsafe resource URL passed to DomSanitizer                         |
| `NG05703` | Suspicious URL origin change during SSR                            |

## Compiler errors

| Code     | Name                                                        |
| :------- | :---------------------------------------------------------- |
| `NG1001` | Argument Not Literal                       |
| `NG2003` | Missing Token                              |
| `NG2009` | Invalid Shadow DOM selector                |
| `NG3003` | Import Cycle Detected                      |
| `NG6100` | NgModule.id Set to module.id anti-pattern  |
| `NG8001` | Invalid Element                            |
| `NG8002` | Invalid Attribute                          |
| `NG8003` | Missing Reference Target                   |
| `NG8011` | Control Flow Preventing Content Projection |
| `NG8023` | Multiple Components Match Same Element     |
| `NG8024` | Conflicting Host Directive Binding         |
