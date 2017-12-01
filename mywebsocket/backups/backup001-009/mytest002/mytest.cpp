#include "main.h"

//int main()
//{   CMain();
//}

/*
class PolicyOne
{   std::string mText;

public:
    PolicyOne(const char* aText):mText(aText)
	{
	}
    
    void executePolicyOne()
    {   std::cout << mText << std::endl;
    }
};

class PolicyTwo
{   std::string mText;

public:

    PolicyTwo(const char* aText):mText(aText)
	{
	}

    void executePolicyTwo()
    {   std::cout << mText << std::endl;
    }
};


int main()
{	typedef VPolicy<PolicyOne, PolicyTwo> PolicyOneAndPolicyTwo;
	PolicyOneAndPolicyTwo linstance("PolicyOne", "PolicyTwo");

	linstance.executePolicyOne();
	linstance.executePolicyTwo();
}	
*/

//////////////////////////////////////////////////////////////////////////////////////
class base
{   
public:    
    int bodoh;
    
    base(): bodoh(0)
    {
    }
};

template <typename T>
class A: virtual public base 
{   std::string mText;
    //using base<T>::derived;
          T& derived()       { return *static_cast<T*>(this);       }
    const T& derived() const { return *static_cast<const T*>(this); }

public:
    A(const char* aText):   mText(aText)
    {
    }
    
    void bar()
	{   derived().val=3;
	    //std::cout<<__FUNCTION__<<", val="<<derived().val<<", bodoh="<<bodoh<<std::endl;
	    bodoh=derived().val;
	    std::cout<<__FUNCTION__<<", val="<<derived().val<<", bodoh="<<bodoh<<", mText="<<mText<<std::endl;
    }                                                                              
};                                                                                 

template <typename T>                                                              
class B: virtual public base
{    std::string mText;

    //using base<T>::derived;
          T& derived()       { return *static_cast<T*>(this);       }
    const T& derived() const { return *static_cast<const T*>(this); }

public:
    B(const char* aText):   mText(aText)
    {
    }

    void foo()
	{   derived().val=90;
	    //std::cout<<__FUNCTION__<<", val="<<derived().val<<", bodoh="<<bodoh<<std::endl;
	    bodoh=derived().val;
	    std::cout<<__FUNCTION__<<", val="<<derived().val<<", bodoh="<<bodoh<<", mText="<<mText<<std::endl;
    }                                                                              
};                                                                                 

template <template<class> class ... Ts>
struct Test: Ts<Test<Ts...>>...
{   int val;

    template<typename... Args>
    Test(const Args... Arg):    Ts<Test<Ts...>>(Arg)...
    {
    }
};                                                                                 

int main() 
{   Test<A,B> test("PolicyOne", "PolicyTwo");                                                                
    test.foo();                                                                    
    test.bar();                                                                    
    return 0;                                                                      
}  