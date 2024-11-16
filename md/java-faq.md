***JAVA faq***

# How to set the Max Heap Size of a JVM instance?
Below command sets the max heap size to 8 GB.
```
java -Xmx8g 
```

# How to check the Max Heap Size of a JVM instance?
Below command prints info including MaxHeapSize of the JVM instance denoted by pid 12345.
```
jhsdb jmap --heap --pid 12345
```
jhsdb is a builtin (J)ava (H)ost(S)pot (D)e(B)ugger tool since JDK 9.

# What're (1)Anonymous class, (2) Functional inteface, and (3) Lambda in Java?
Anonymous class has been available in Java since version 1.1.

* Anonymous class allows combining defining a class and initiating a object of this class at the same line.
* Functional interfaces are interfaces that have single abstract method.
* Lambda expression is syntax sugar of anonymous class that implements a functional interface.

Like any other reference data, both anonoymous class initiated objects or lambda expressions are OBJECTS.

```
public class LambdaDemo {
	public static void main(String[] args){
        // anonymous class
		Runable r = new Runable(){
			@Override
			public void Run(){
				System.out.println("Run in an anonymouse subclass object");
			}
		};

		r.Run();

		// lambda expression
		Runable r2 = ()->{System.out.println("Run in a lambda.");};
		r2.Run();

		// print the class name of r and r2
		System.out.println(r.getClass());
		System.out.println(r2.getClass());
	}
}

interface Runable{
	void Run();
}

```