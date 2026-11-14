---
title: "The Python 2.3 Method Resolution Order (part 2 of 2)"
tool: "python"
version: "3.15"
source: "https://github.com/python/cpython/blob/5e58eaad7c58df58dfa8ea549c87996e01dd1077/Doc/howto/mro.rst"
commit: "5e58eaad7c58df58dfa8ea549c87996e01dd1077"
license: "PSF-2.0 AND 0BSD"
---

# The Python 2.3 Method Resolution Order (part 2 of 2)

## Bad Method Resolution Orders

A MRO is *bad* when it breaks such fundamental properties as local
precedence ordering and monotonicity.  In this section, I will show
that both the MRO for classic classes and the MRO for new style classes
in Python 2.2 are bad.

It is easier to start with the local precedence ordering.  Consider the
following example:

```python
>>> F=type('Food',(),{'remember2buy':'spam'})
>>> E=type('Eggs',(F,),{'remember2buy':'eggs'})
>>> G=type('GoodFood',(F,E),{}) # under Python 2.3 this is an error!  # doctest: +SKIP
```

with inheritance diagram

```text
             O
             |
(buy spam)   F
             | \
             | E   (buy eggs)
             | /
             G

      (buy eggs or spam ?)
```

We see that class G inherits from F and E, with F *before* E:  therefore
we would expect the attribute *G.remember2buy* to be inherited by
*F.remember2buy* and not by *E.remember2buy*:  nevertheless Python 2.2
gives

```python
>>> G.remember2buy  # doctest: +SKIP
'eggs'
```

This is a breaking of local precedence ordering since the order in the
local precedence list, i.e. the list of the parents of G, is not
preserved in the Python 2.2 linearization of G:

```
L[G,P22]= G E F object   # F *follows* E
```

One could argue that the reason why F follows E in the Python 2.2
linearization is that F is less specialized than E, since F is the
superclass of E; nevertheless the breaking of local precedence ordering
is quite non-intuitive and error prone.  This is particularly true since
it is a different from old style classes:

```python
>>> class F: remember2buy='spam'
>>> class E(F): remember2buy='eggs'
>>> class G(F,E): pass  # doctest: +SKIP
>>> G.remember2buy  # doctest: +SKIP
'spam'
```

In this case the MRO is GFEF and the local precedence ordering is
preserved.

As a general rule, hierarchies such as the previous one should be
avoided, since it is unclear if F should override E or vice-versa.
Python 2.3 solves the ambiguity by raising an exception in the creation
of class G, effectively stopping the programmer from generating
ambiguous hierarchies.  The reason for that is that the C3 algorithm
fails when the merge:

```
merge(FO,EFO,FE)
```

cannot be computed, because F is in the tail of EFO and E is in the tail
of FE.

The real solution is to design a non-ambiguous hierarchy, i.e. to derive
G from E and F (the more specific first) and not from F and E; in this
case the MRO is GEF without any doubt.

```text
           O
           |
           F (spam)
         / |
(eggs)   E |
         \ |
           G
             (eggs, no doubt)
```

Python 2.3 forces the programmer to write good hierarchies (or, at
least, less error-prone ones).

On a related note, let me point out that the Python 2.3 algorithm is
smart enough to recognize obvious mistakes, as the duplication of
classes in the list of parents:

```python
>>> class A(object): pass
>>> class C(A,A): pass # error
Traceback (most recent call last):
```

File "<stdin>", line 1, in ?
TypeError: duplicate base class A

Python 2.2 (both for classic classes and new style classes) in this
situation, would not raise any exception.

Finally, I would like to point out two lessons we have learned from this
example:

1. despite the name, the MRO determines the resolution order of
attributes, not only of methods;

1. the default food for Pythonistas is spam !  (but you already knew
that ;-)

Having discussed the issue of local precedence ordering, let me now
consider the issue of monotonicity.  My goal is to show that neither the
MRO for classic classes nor that for Python 2.2 new style classes is
monotonic.

To prove that the MRO for classic classes is non-monotonic is rather
trivial, it is enough to look at the diamond diagram:

```text

   C
  / \
 /   \
A     B
 \   /
  \ /
   D
```

One easily discerns the inconsistency:

```
L[B,P21] = B C        # B precedes C : B's methods win
L[D,P21] = D A C B C  # B follows C  : C's methods win!
```

On the other hand, there are no problems with the Python 2.2 and 2.3
MROs, they give both:

```
L[D] = D A B C
```

Guido points out in his essay that the classic MRO is not so bad in
practice, since one can typically avoids diamonds for classic classes.
But all new style classes inherit from `object`, therefore diamonds are
unavoidable and inconsistencies shows up in every multiple inheritance
graph.

The MRO of Python 2.2 makes breaking monotonicity difficult, but not
impossible.  The following example, originally provided by Samuele
Pedroni, shows that the MRO of Python 2.2 is non-monotonic:

```python
>>> class A(object): pass
>>> class B(object): pass
>>> class C(object): pass
>>> class D(object): pass
>>> class E(object): pass
>>> class K1(A,B,C): pass
>>> class K2(D,B,E): pass
>>> class K3(D,A):   pass
>>> class Z(K1,K2,K3): pass
```

Here are the linearizations according to the C3 MRO (the reader should
verify these linearizations as an exercise and draw the inheritance
diagram ;-):

```
L[A] = A O
L[B] = B O
L[C] = C O
L[D] = D O
L[E] = E O
L[K1]= K1 A B C O
L[K2]= K2 D B E O
L[K3]= K3 D A O
L[Z] = Z K1 K2 K3 D A B C E O
```

Python 2.2 gives exactly the same linearizations for A, B, C, D, E, K1,
K2 and K3, but a different linearization for Z:

```
L[Z,P22] = Z K1 K3 A K2 D B C E O
```

It is clear that this linearization is *wrong*, since A comes before D
whereas in the linearization of K3 A comes *after* D. In other words, in
K3 methods derived by D override methods derived by A, but in Z, which
still is a subclass of K3, methods derived by A override methods derived
by D!  This is a violation of monotonicity.  Moreover, the Python 2.2
linearization of Z is also inconsistent with local precedence ordering,
since the local precedence list of the class Z is [K1, K2, K3] (K2
precedes K3), whereas in the linearization of Z K2 *follows* K3.  These
problems explain why the 2.2 rule has been dismissed in favor of the C3
rule.

## The end

This section is for the impatient reader, who skipped all the previous
sections and jumped immediately to the end.  This section is for the
lazy programmer too, who didn't want to exercise her/his brain.
Finally, it is for the programmer with some hubris, otherwise s/he would
not be reading a paper on the C3 method resolution order in multiple
inheritance hierarchies ;-) These three virtues taken all together (and
*not* separately) deserve a prize:  the prize is a short Python 2.2
script that allows you to compute the 2.3 MRO without risk to your
brain.  Simply change the last line to play with the various examples I
have discussed in this paper.:

```
#<mro.py>

"""C3 algorithm by Samuele Pedroni (with readability enhanced by me)."""

class __metaclass__(type):
    "All classes are metamagically modified to be nicely printed"
    __repr__ = lambda cls: cls.__name__

class ex_2:
    "Serious order disagreement" #From Guido
    class O: pass
    class X(O): pass
    class Y(O): pass
    class A(X,Y): pass
    class B(Y,X): pass
    try:
        class Z(A,B): pass #creates Z(A,B) in Python 2.2
    except TypeError:
        pass # Z(A,B) cannot be created in Python 2.3

class ex_5:
    "My first example"
    class O: pass
    class F(O): pass
    class E(O): pass
    class D(O): pass
    class C(D,F): pass
    class B(D,E): pass
    class A(B,C): pass

class ex_6:
    "My second example"
    class O: pass
    class F(O): pass
    class E(O): pass
    class D(O): pass
    class C(D,F): pass
    class B(E,D): pass
    class A(B,C): pass

class ex_9:
    "Difference between Python 2.2 MRO and C3" #From Samuele
    class O: pass
    class A(O): pass
    class B(O): pass
    class C(O): pass
    class D(O): pass
    class E(O): pass
    class K1(A,B,C): pass
    class K2(D,B,E): pass
    class K3(D,A): pass
    class Z(K1,K2,K3): pass

def merge(seqs):
    print '\n\nCPL[%s]=%s' % (seqs[0][0],seqs),
    res = []; i=0
    while 1:
      nonemptyseqs=[seq for seq in seqs if seq]
      if not nonemptyseqs: return res
      i+=1; print '\n',i,'round: candidates...',
      for seq in nonemptyseqs: # find merge candidates among seq heads
          cand = seq[0]; print ' ',cand,
          nothead=[s for s in nonemptyseqs if cand in s[1:]]
          if nothead: cand=None #reject candidate
          else: break
      if not cand: raise "Inconsistent hierarchy"
      res.append(cand)
      for seq in nonemptyseqs: # remove cand
          if seq[0] == cand: del seq[0]

def mro(C):
    "Compute the class precedence list (mro) according to C3"
    return merge([[C]]+map(mro,C.__bases__)+[list(C.__bases__)])

def print_mro(C):
    print '\nMRO[%s]=%s' % (C,mro(C))
    print '\nP22 MRO[%s]=%s' % (C,C.mro())

print_mro(ex_9.Z)

#</mro.py>
```

That's all folks,

enjoy !
