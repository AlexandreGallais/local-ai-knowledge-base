---
title: "C# arithmetic, comparison, logical, and assignment operators (part 1 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/expressions/operators.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# C# operators

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. If you're new to programming, start with the Get started tutorials first.
>
> **Coming from another language?** Most operators in this article (`+`, `-`, `*`, `/`, `%`, `&&`, `||`, `!`, `==`, `!=`, `<`, `>`, comparison operators, and `=`) work the same as in Java, C++, and JavaScript. The main surprises for newcomers are integer division behavior, the prefix/postfix distinction for `++`/`--`, and the way compound assignment converts back to the left-hand-side type.

An *operator* combines one or more *operands* into a single value. You already know about expressions and operator precedence from C# expressions; this article goes deeper into the specific operators you'll use every day.

## Arithmetic operators

The five arithmetic operators perform numeric calculations.

| Operator | Name           | Example  | Result |
|----------|----------------|----------|--------|
| `+`      | Addition       | `10 + 3` | `13`   |
| `-`      | Subtraction    | `10 - 3` | `7`    |
| `*`      | Multiplication | `10 * 3` | `30`   |
| `/`      | Division       | `10 / 3` | `3`    |
| `%`      | Remainder      | `10 % 3` | `1`    |

```csharp
int apples = 10;
int oranges = 3;

Console.WriteLine(apples + oranges);  // => 13  (addition)
Console.WriteLine(apples - oranges);  // => 7   (subtraction)
Console.WriteLine(apples * oranges);  // => 30  (multiplication)
Console.WriteLine(apples / oranges);  // => 3   (integer division: truncates toward zero)
Console.WriteLine(apples % oranges);  // => 1   (remainder)

// Integer division always truncates toward zero — the fractional part is discarded
int result = 7 / 2;
Console.WriteLine(result); // => 3, not 3.5

// Truncation applies to negative results too: -7 / 2 is -3, not -4
int negResult = -7 / 2;
Console.WriteLine(negResult); // => -3

// To get a decimal result, at least one operand must be a double or float
double precise = 7.0 / 2;
Console.WriteLine(precise); // => 3.5

// Remainder with negative operands: the sign of the result matches the dividend
Console.WriteLine(-7 % 3);  // => -1  (-7 = 3 × -2 + (-1))
Console.WriteLine(7 % -3);  // => 1   ( 7 = -3 × -2 + 1)

int temperature = 20;
int windChill = -5;

int heatIndex = +temperature;   // unary +: value unchanged (rarely needed)
int coldFactor = -windChill;    // unary -: negates the value → 5

Console.WriteLine(heatIndex);   // => 20
Console.WriteLine(coldFactor);  // => 5

bool isRaining = false;
bool isSunny = !isRaining;     // logical NOT: flips true/false
Console.WriteLine(isSunny);    // => True

int counter = 5;

// Prefix: increment first, then use the new value
int a = ++counter;
Console.WriteLine(a);       // => 6
Console.WriteLine(counter); // => 6

// Postfix: use the current value first, then increment
int b = counter++;
Console.WriteLine(b);       // => 6  (value before increment)
Console.WriteLine(counter); // => 7  (incremented after)

// Decrement works the same way
int score = 10;
Console.WriteLine(score--); // => 10 (current value; score becomes 9)
Console.WriteLine(score);   // => 9

int speed = 75;
int limit = 60;

Console.WriteLine(speed > limit);   // => True   (greater than)
Console.WriteLine(speed < limit);   // => False  (less than)
Console.WriteLine(speed >= limit);  // => True   (greater than or equal)
Console.WriteLine(speed <= limit);  // => False  (less than or equal)

// Relational operators work on all numeric types and char
// char comparison uses the character's numeric Unicode code point, not alphabetical position
// 'B' (U+0042, value 66) is less than 'A' (U+0041, value 65)? No — 'A' (65) < 'B' (66)
char grade = 'B';
Console.WriteLine(grade >= 'A' && grade <= 'C'); // => True  ('A'=65 <= 'B'=66 <= 'C'=67)

int expected = 42;
int actual = 42;

Console.WriteLine(actual == expected);  // => True   (values are equal)
Console.WriteLine(actual != expected);  // => False  (true when values are not equal)

string name = "Alice";
Console.WriteLine(name == "Alice");  // => True   (string content matches)
Console.WriteLine(name == "alice");  // => False  (case-sensitive)

int x = 5;
Console.WriteLine(x == 10);  // => False

int age = 20;
bool hasTicket = true;

// && (AND): both sides must be true
bool canEnter = age >= 18 && hasTicket;
Console.WriteLine(canEnter); // => True

// || (OR): at least one side must be true
bool freeEntry = age < 5 || age >= 65;
Console.WriteLine(freeEntry); // => False

// Short-circuit: right side is skipped when the result is already determined
// Here, items.Count is never called if items is null
List<string>? items = null;
bool hasItems = items != null && items.Count > 0;
Console.WriteLine(hasItems); // => False  (short-circuits; no NullReferenceException)

int temperature2 = 35;

// condition ? value-when-true : value-when-false
string weather = temperature2 > 30 ? "hot" : "comfortable";
Console.WriteLine(weather); // => hot

// Only the matching branch evaluates — the other branch is never run
int divisor = 0;
// The division 10 / divisor is never evaluated because divisor == 0 is true
int safe = divisor == 0 ? -1 : 10 / divisor;
Console.WriteLine(safe); // => -1

int level = 1;
level = 5;          // simple assignment: replaces the value
Console.WriteLine(level); // => 5

// Compound assignment: short form of binary operation + assignment
int hp = 100;
hp += 20;   // same as: hp = hp + 20
Console.WriteLine(hp); // => 120
hp -= 10;   // same as: hp = hp - 10
Console.WriteLine(hp); // => 110
hp *= 2;    // same as: hp = hp * 2
Console.WriteLine(hp); // => 220
hp /= 3;    // same as: hp = hp / 3 (integer division)
Console.WriteLine(hp); // => 73
hp %= 7;    // same as: hp = hp % 7
Console.WriteLine(hp); // => 3

// Assignment is right-associative: evaluated right to left
int a2, b2, c2;
a2 = b2 = c2 = 0;     // c2 = 0 first, then b2 = 0, then a2 = 0
Console.WriteLine($"{a2} {b2} {c2}"); // => 0 0 0

// Compound assignment evaluates the left side once and converts back to the LHS type
byte small = 200;
small += 10;  // equivalent to: small = (byte)(small + 10); result is 210
Console.WriteLine(small); // => 210
```
**Integer division truncates toward zero.** When both operands are integers, `/` discards the fractional part: `7 / 2` is `3`, not `3.5`. Truncation is toward zero, not toward the smaller number: `-7 / 2` is `-3` (not `-4`). To get a decimal result, make at least one operand a floating-point type: `7.0 / 2` is `3.5`. This differs from some languages where `/` always produces a floating-point result.

**Remainder (`%`) returns what's left over** after integer division: `10 % 3` is `1` because `10 = 3 × 3 + 1`. It's useful for cycling through a fixed range (`index % length`), testing divisibility (`n % 2 == 0`), and extracting digits. With negative operands, the sign of the result matches the sign of the *dividend* (the left operand): `-7 % 3` is `-1` and `7 % -3` is `1`.

## Unary operators

Unary operators act on a single operand.

```csharp
int apples = 10;
int oranges = 3;

Console.WriteLine(apples + oranges);  // => 13  (addition)
Console.WriteLine(apples - oranges);  // => 7   (subtraction)
Console.WriteLine(apples * oranges);  // => 30  (multiplication)
Console.WriteLine(apples / oranges);  // => 3   (integer division: truncates toward zero)
Console.WriteLine(apples % oranges);  // => 1   (remainder)

// Integer division always truncates toward zero — the fractional part is discarded
int result = 7 / 2;
Console.WriteLine(result); // => 3, not 3.5

// Truncation applies to negative results too: -7 / 2 is -3, not -4
int negResult = -7 / 2;
Console.WriteLine(negResult); // => -3

// To get a decimal result, at least one operand must be a double or float
double precise = 7.0 / 2;
Console.WriteLine(precise); // => 3.5

// Remainder with negative operands: the sign of the result matches the dividend
Console.WriteLine(-7 % 3);  // => -1  (-7 = 3 × -2 + (-1))
Console.WriteLine(7 % -3);  // => 1   ( 7 = -3 × -2 + 1)

int temperature = 20;
int windChill = -5;

int heatIndex = +temperature;   // unary +: value unchanged (rarely needed)
int coldFactor = -windChill;    // unary -: negates the value → 5

Console.WriteLine(heatIndex);   // => 20
Console.WriteLine(coldFactor);  // => 5

bool isRaining = false;
bool isSunny = !isRaining;     // logical NOT: flips true/false
Console.WriteLine(isSunny);    // => True

int counter = 5;

// Prefix: increment first, then use the new value
int a = ++counter;
Console.WriteLine(a);       // => 6
Console.WriteLine(counter); // => 6

// Postfix: use the current value first, then increment
int b = counter++;
Console.WriteLine(b);       // => 6  (value before increment)
Console.WriteLine(counter); // => 7  (incremented after)

// Decrement works the same way
int score = 10;
Console.WriteLine(score--); // => 10 (current value; score becomes 9)
Console.WriteLine(score);   // => 9

int speed = 75;
int limit = 60;

Console.WriteLine(speed > limit);   // => True   (greater than)
Console.WriteLine(speed < limit);   // => False  (less than)
Console.WriteLine(speed >= limit);  // => True   (greater than or equal)
Console.WriteLine(speed <= limit);  // => False  (less than or equal)

// Relational operators work on all numeric types and char
// char comparison uses the character's numeric Unicode code point, not alphabetical position
// 'B' (U+0042, value 66) is less than 'A' (U+0041, value 65)? No — 'A' (65) < 'B' (66)
char grade = 'B';
Console.WriteLine(grade >= 'A' && grade <= 'C'); // => True  ('A'=65 <= 'B'=66 <= 'C'=67)

int expected = 42;
int actual = 42;

Console.WriteLine(actual == expected);  // => True   (values are equal)
Console.WriteLine(actual != expected);  // => False  (true when values are not equal)

string name = "Alice";
Console.WriteLine(name == "Alice");  // => True   (string content matches)
Console.WriteLine(name == "alice");  // => False  (case-sensitive)

int x = 5;
Console.WriteLine(x == 10);  // => False

int age = 20;
bool hasTicket = true;

// && (AND): both sides must be true
bool canEnter = age >= 18 && hasTicket;
Console.WriteLine(canEnter); // => True

// || (OR): at least one side must be true
bool freeEntry = age < 5 || age >= 65;
Console.WriteLine(freeEntry); // => False

// Short-circuit: right side is skipped when the result is already determined
// Here, items.Count is never called if items is null
List<string>? items = null;
bool hasItems = items != null && items.Count > 0;
Console.WriteLine(hasItems); // => False  (short-circuits; no NullReferenceException)

int temperature2 = 35;

// condition ? value-when-true : value-when-false
string weather = temperature2 > 30 ? "hot" : "comfortable";
Console.WriteLine(weather); // => hot

// Only the matching branch evaluates — the other branch is never run
int divisor = 0;
// The division 10 / divisor is never evaluated because divisor == 0 is true
int safe = divisor == 0 ? -1 : 10 / divisor;
Console.WriteLine(safe); // => -1

int level = 1;
level = 5;          // simple assignment: replaces the value
Console.WriteLine(level); // => 5

// Compound assignment: short form of binary operation + assignment
int hp = 100;
hp += 20;   // same as: hp = hp + 20
Console.WriteLine(hp); // => 120
hp -= 10;   // same as: hp = hp - 10
Console.WriteLine(hp); // => 110
hp *= 2;    // same as: hp = hp * 2
Console.WriteLine(hp); // => 220
hp /= 3;    // same as: hp = hp / 3 (integer division)
Console.WriteLine(hp); // => 73
hp %= 7;    // same as: hp = hp % 7
Console.WriteLine(hp); // => 3

// Assignment is right-associative: evaluated right to left
int a2, b2, c2;
a2 = b2 = c2 = 0;     // c2 = 0 first, then b2 = 0, then a2 = 0
Console.WriteLine($"{a2} {b2} {c2}"); // => 0 0 0

// Compound assignment evaluates the left side once and converts back to the LHS type
byte small = 200;
small += 10;  // equivalent to: small = (byte)(small + 10); result is 210
Console.WriteLine(small); // => 210
```
- `+x` (unary plus) — leaves the value unchanged; rarely written explicitly but valid.
- `-x` (unary minus) — negates the value.
- `!x` (logical NOT) — flips `true` to `false` and `false` to `true`. You'll use `!` often: `if (!list.Contains(item))`.
