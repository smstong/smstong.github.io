**C++ FAQ**

# What's the difference between <stdio.h> and <cstdio>?
The standard specifies that if one includes the C-style header 
(<stdio.h> in this case), the symbols will be available in the 
global namespace and perhaps in namespace std:: (but this is no 
longer a firm requirement.) 

On the other hand, including the C++-style header (<cstdio>) guarantees that
the entities will be found in namespace std and perhaps in the global namespace.

```cpp
#include <stdio.h>
#include <cstdio>
```
