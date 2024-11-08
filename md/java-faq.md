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