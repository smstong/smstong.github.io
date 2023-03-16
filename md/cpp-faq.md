**C++ FAQ**

# What's the difference between `<stdio.h>` and `<cstdio>`?
The standard specifies that if one includes the C-style header 
(`<stdio.h>` in this case), the symbols will be available in the 
global namespace and perhaps in namespace std:: (but this is no 
longer a firm requirement.) 

On the other hand, including the C++-style header (`<cstdio>`) guarantees that
the entities will be found in namespace std and perhaps in the global namespace.

```cpp
#include <stdio.h>
int main()
{
    printf("Hello world!\n");
}
```
```cpp
#include <cstdio>
int main()
{
    std::printf("Hello world!\n");
}
```
# What're the most important features in C++11?
## uniform intialization
From C++ 11, variables of any data types share a unified form of initalization.

    *datatype* *variableName*{value,...}

```cpp
    int x{2};
    string s{"hello"};
    vector<int> v{5,8,4,6};
```
## "auto" keyword
C++ STL has a lot classes with super long names due to nested scopes. e.g.
```cpp
#include <iostream>
#include <vector>
using namespace std;

int main(){

    vector<int> v{5,8,4,6};
    for(vector<int>::iterator it=v.begin(); it != v.end(); ++it){
        cout << *it << ",";
    }
    cout << endl;
    return 0;
}

```
To free programmers, C++ 11 introduced "auto" keyword to let the compiler to deduct the class name automatically when possible.
```cpp
#include <iostream>
#include <vector>
using namespace std;

int main(){

    vector<int> v{5,8,4,6};
    for(auto it=v.begin(); it != v.end(); ++it){
        cout << *it << ",";
    }
    cout << endl;
    return 0;
}

```
## lambda expression
Anonymous functions (closures) are available in C++ 11.
```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main(){
    vector<int> v{5,8,4,6};
    int limit = 6;
    auto pos = find_if(v.begin(), v.end(), [=](int x){
                return x > limit;
            });
    if(pos != v.end()){
        cout << "found: " <<  *pos << endl;
    }else{
        cout << "not found." << endl;
    }

    return 0;
}

```




