---
title: "Generics in the runtime (part 3 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/generics/generics-in-the-run-time.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Generics in the runtime (part 3 of 5)

```csharp
﻿using System.Collections.Generic;

namespace CsCsrefProgrammingGenerics
{
    public class GenericList<T>
    {
        // The nested class is also generic on T.
        private class Node
        {
            // T used in non-generic constructor.
            public Node(T t)
            {
                data = t;
            }

            public Node? Next { get; set; }

            // T as private member data type.
            private T data;

            // T as return type of property.
            public T Data
            {
                get { return data; }
                set { data = value; }
            }
        }

        private Node? head;

        // constructor
        public GenericList()
        {
            head = null;
        }

        // T as method parameter type:
        public void AddHead(T t)
        {
            Node n = new Node(t);
            n.Next = head;
            head = n;
        }

        public IEnumerator<T> GetEnumerator()
        {
            Node? current = head;

            while (current != null)
            {
                yield return current.Data;
                current = current.Next;
            }
        }
    }

    class TestGenericList2
    {
        private class ExampleClass { }
        private struct ExampleStruct { }
        static void Main()
        {
            GenericList<float> list1 = new GenericList<float>();
            GenericList<ExampleClass> list2 = new GenericList<ExampleClass>();
            GenericList<ExampleStruct> list3 = new GenericList<ExampleStruct>();
        }
    }

    //---------------------------------------------------------------------------
    public class WrapBenefits
    {
        public static void Test1()
        {
            // The .NET Framework 1.1 way to create a list:
            System.Collections.ArrayList list1 = new System.Collections.ArrayList();
            list1.Add(3);
            list1.Add(105);

            System.Collections.ArrayList list2 = new System.Collections.ArrayList();
            list2.Add("It is raining in Redmond.");
            list2.Add("It is snowing in the mountains.");
        }

        public static void Test2()
        {
            System.Collections.ArrayList list = new System.Collections.ArrayList();
            // Add an integer to the list.
            list.Add(3);
            // Add a string to the list. This will compile, but may cause an error later.
            list.Add("It is raining in Redmond.");

            int t = 0;
            // This causes an InvalidCastException to be returned.
            foreach (int x in list)
            {
                t += x;
            }
        }

        public static void Test3()
        {
            // The .NET Framework 2.0 way to create a list
            List<int> list1 = new List<int>();

            // No boxing, no casting:
            list1.Add(3);

            // Compile-time error:
            // list1.Add("It is raining in Redmond.");
        }
    }

    //---------------------------------------------------------------------------
    public class WrapConstraints
    {
        public class Employee
        {
            private string name;
            private int id;

            public Employee(string s, int i)
            {
                name = s;
                id = i;
            }

            public string Name
            {
                get { return name; }
                set { name = value; }
            }

            public int ID
            {
                get { return id; }
                set { id = value; }
            }
        }

        public class GenericList<T> where T : Employee
        {
            private class Node
            {
                private Node? next;
                private T data;

                public Node(T t)
                {
                    next = null;
                    data = t;
                }

                public Node? Next
                {
                    get { return next; }
                    set { next = value; }
                }

                public T Data
                {
                    get { return data; }
                    set { data = value; }
                }
            }

            private Node? head;

            public GenericList() //constructor
            {
                head = null;
            }

            public void AddHead(T t)
            {
                Node n = new Node(t);
                n.Next = head;
                head = n;
            }

            public IEnumerator<T> GetEnumerator()
            {
                Node? current = head;

                while (current != null)
                {
                    yield return current.Data;
                    current = current.Next;
                }
            }

            public T? FindFirstOccurrence(string s)
            {
                Node? current = head;
                T? t = null;

                while (current != null)
                {
                    // The constraint enables access to the Name property.
                    if (current.Data.Name == s)
                    {
                        t = current.Data;
                        break;
                    }
                    else
                    {
                        current = current.Next;
                    }
                }
                return t;
            }
        }

        interface IEmployee { }

        class EmployeeList<T> where T : Employee, IEmployee, System.IComparable<T>, new()
        {
            // ...
        }

        public static void OpTest<T>(T s, T t) where T : class
        {
            System.Console.WriteLine(s == t);
        }
        static void Main()
        {
            string s1 = "target";
            System.Text.StringBuilder sb = new System.Text.StringBuilder("target");
            string s2 = sb.ToString();
            OpTest<string>(s1, s2);
        }

        class List<T>
        {
            void Add<U>(List<U> items) where U : T {/*...*/}
        }

        //Type parameter V is used as a type constraint.
        public class SampleClass<T, U, V> where T : V { }
    }

    //---------------------------------------------------------------------------
    namespace WrapClasses
    {
        class BaseNode { }
        class BaseNodeGeneric<T> { }

        // concrete type
        class NodeConcrete<T> : BaseNode { }

        //closed constructed type
        class NodeClosed<T> : BaseNodeGeneric<int> { }

        //open constructed type
        class NodeOpen<T> : BaseNodeGeneric<T> { }

        //No error
        class Node1 : BaseNodeGeneric<int> { }

        //Generates an error
        //class Node2 : BaseNodeGeneric<T> {}

        //Generates an error
        //class Node3 : T {}

        class BaseNodeMultiple<T, U> { }

        //No error
        class Node4<T> : BaseNodeMultiple<T, int> { }

        //No error
        class Node5<T, U> : BaseNodeMultiple<T, U> { }

        //Generates an error
        //class Node6<T> : BaseNodeMultiple<T, U> {}

        class NodeItem<T> where T : System.IComparable<T>, new() { }
        class SpecialNodeItem<T> : NodeItem<T> where T : System.IComparable<T>, new() { }

        class SuperKeyType<K, V, U>
            where U : System.IComparable<U>
            where V : new()
        { }

        class Test
        {
            void Swap<T>(List<T> list1, List<T> list2)
            {
                //code to swap items
            }

            void Swap(List<int> list1, List<int> list2)
            {
                //code to swap items
            }
        }
    }

    //---------------------------------------------------------------------------
    namespace WrapMethods
    {
        public class Test
        {
            static void Swap<T>(ref T lhs, ref T rhs)
            {
                T temp;
                temp = lhs;
                lhs = rhs;
                rhs = temp;
            }

            public static void TestSwap()
            {
                int a = 1;
                int b = 2;

                Swap<int>(ref a, ref b);
                System.Console.WriteLine(a + " " + b);
            }

            public static void TestSwapInfer()
            {
                int a = 1;
                int b = 2;

                Swap(ref a, ref b);
                System.Console.WriteLine(a + " " + b);
            }
        }

        class SampleClass<T>
        {
            void Swap(ref T lhs, ref T rhs) { }
        }

        class Test2
        {
            void SwapIfGreater<T>(ref T lhs, ref T rhs) where T : System.IComparable<T>
            {
                T temp;
                if (lhs.CompareTo(rhs) > 0)
                {
                    temp = lhs;
                    lhs = rhs;
                    rhs = temp;
                }
            }

            void DoWork() { }
            void DoWork<T>() { }
            void DoWork<T, U>() { }
        }

        class Test3
        {
            T[] Swap<T>(T a, T b)
            {
                return [b, a];
            }
        }
    }

    //---------------------------------------------------------------------------
    namespace WrapArrays
    {
        class Program
        {
            static void Main()
            {
                int[] arr = [0, 1, 2, 3, 4];
                List<int> list = new List<int>();

                for (int x = 5; x < 10; x++)
                {
                    list.Add(x);
                }

                ProcessItems<int>(arr);
                ProcessItems<int>(list);
            }

            static void ProcessItems<T>(IList<T> coll)
            {
                // IsReadOnly returns True for the array and False for the List.
                System.Console.WriteLine
                    ("IsReadOnly returns {0} for this collection.",
                    coll.IsReadOnly);

                // The following statement causes a run-time exception for the
                // array, but not for the List.
                //coll.RemoveAt(4);

                foreach (T item in coll)
                {
                    System.Console.Write(item?.ToString() + " ");
                }
                System.Console.WriteLine();
            }
        }
    }

    //---------------------------------------------------------------------------
    class WrapDelegates
    {
        public delegate void Del<T>(T item);
        public static void Notify(int i) { }

        Del<int> m1 = new Del<int>(Notify);

        Del<int> m2 = Notify;

        class Stack<T>
        {
            public delegate void StackDelegate(T[] items);
        }

        private static void DoWork(float[] items) { }

        public static void TestStack()
        {
            Stack<float> s = new Stack<float>();
            Stack<float>.StackDelegate d = DoWork;
        }
    }

    //---------------------------------------------------------------------------
    class WrapDelegates2
    {
        delegate void StackEventHandler<T, U>(T sender, U eventArgs);

        class Stack<T>
        {
            public class StackEventArgs : System.EventArgs { }
            public event StackEventHandler<Stack<T>, StackEventArgs>? StackEvent;

            protected virtual void OnStackChanged(StackEventArgs a)
            {
                if (StackEvent is not null)
                    StackEvent(this, a);
            }
        }

        class SampleClass
        {
            public void HandleStackChange<T>(Stack<T> stack, Stack<T>.StackEventArgs args) { }
        }

        public static void Test()
        {
            Stack<double> s = new Stack<double>();
            SampleClass o = new SampleClass();
            s.StackEvent += o.HandleStackChange;
        }
    }

    //---------------------------------------------------------------------------
    class WrapRuntime
    {
        Stack<int> stackOne = new Stack<int>();
        Stack<int> stackTwo = new Stack<int>();

        class Customer { }
        class Order { }

        public static void Test()
        {
            Stack<Customer> customers;

            Stack<Order> orders = new Stack<Order>();

            customers = new Stack<Customer>();
        }
    }
}
```

 At this point, the runtime generates a specialized version of the `System.Collections.Generic.Stack`1` class that stores object references that will be filled in later instead of storing data. Suppose the next line of code creates a stack of another reference type, which is named `Order`:
