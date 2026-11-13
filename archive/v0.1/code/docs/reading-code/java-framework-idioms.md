---
id: reading-code-java-framework-idioms
title: Java framework idioms
topic: reading-code
summary: What Spring and Lombok annotations do without showing it in the code, and the C# landmark of each.
tool: java
version: "25"
checked: 2026-11-13
sources: [S1, S2]
license: MIT (own words; facts summarized from the sources)
variant: files
---

# Java framework idioms

Contents: 1. Spring · 2. Lombok · 3. How to explain · Sources

## 1. Spring annotations (hidden object creation)

| You read | What happens without showing | C# landmark |
| --- | --- | --- |
| `@Component`, `@Service`, `@Repository`, `@Controller` | Spring scans the classes, registers those with these annotations, creates the object and passes its dependencies: no `new` in the code [S1] | Registration in the ASP.NET Core dependency container |
| `@Configuration` and `@Bean` | A factory method that declares a managed object [S1] | Registration by factory |
| `@Autowired`, `@Qualifier`, `@Scope` | Injection point; choice between candidates; scope, singleton by default [S1] | Constructor injection, service lifetime |

## 2. Lombok annotations (generated members)

| You read | What happens without showing | C# landmark |
| --- | --- | --- |
| `@Getter`, `@Setter` | Accessors generated for the fields [S2] | Auto-properties |
| `@Data` | Accessors, `equals`, `hashCode` and `toString` generated [S2] | `record` |
| `@Builder` | A builder class generated [S2] | Source generator |
| `@RequiredArgsConstructor` | A constructor for the final fields generated [S2] | Primary constructor |

The code calls methods that are not written in the file: say which annotation creates them. Other frameworks (JPA, JUnit, Jakarta EE) were not checked for this base.

## 3. How to explain a framework class

- Name the annotations first, then what each one creates or injects.
- An object with no `new` in the excerpt is created by the framework: never call it unused.
- When the framework version matters, read it in the build file.

## Sources

- [S1] Spring, "Classpath Scanning and Managed Components", Spring Framework 7.0.10, <https://docs.spring.io/spring-framework/reference/core/beans/classpath-scanning.html>, read 2026-11-12, summarized.
- [S2] Project Lombok, "Lombok features", <https://projectlombok.org/features/>, read 2026-11-12, summarized.
