#pragma once

//http://codeforces.com/blog/entry/15643
#include <bits/stdc++.h>
#include <unistd.h>
//#include "gzip/gzip.hpp"
#include "drecho/drecho.hpp"
//#include "jwt/jwt.hpp"
//#include "jwt/json_web_token.h"
#include "jwt/jwt.h"
#include "r-lyeh/memo.h"
#include "GZipCodec/GZipCodec.h"

//using json = nlohmann::json;

//https://stackoverflow.com/questions/16134469/minify-html-with-boost-regex-in-c
//need to add, g++ .... -lboost_regex  ....
#include <boost/regex.hpp>

void minify_nowhitespace(std::string* s) 
{
}

void minify_nowhitespace_ORI(std::string* s) 
{   boost::regex nowhitespace(
        "(?ix)"
        "(?>"           // Match all whitespans other than single space.
        "[^\\S ]\\s*"   // Either one [\t\r\n\f\v] and zero or more ws,
        "| \\s{2,}"     // or two or more consecutive-any-whitespace.
        ")"             // Note: The remaining regex consumes no text at all...
        "(?="           // Ensure we are not in a blacklist tag.
        "[^<]*+"        // Either zero or more non-"<" {normal*}
        "(?:"           // Begin {(special normal*)*} construct
        "<"             // or a < starting a non-blacklist tag.
        "(?!/?(?:textarea|pre|script)\\b)"
        "[^<]*+"        // more non-"<" {normal*}
        ")*+"           // Finish "unrolling-the-loop"
        "(?:"           // Begin alternation group.
        "<"             // Either a blacklist start tag.
        "(?>textarea|pre|script)\\b"
        "| \\z"         // or end of file.
        ")"             // End alternation group.
        ")"             // If we made it here, we are not in a blacklist tag.
    );

    // @todo Don't remove conditional html comments
    //boost::regex nocomments("<!--(.*)-->");
    boost::regex nocomments("<!--(.*?)-->");

    *s = boost::regex_replace(*s, nowhitespace, "");
    //*s = boost::regex_replace(*s, nocomments, "");

    //s->erase(std::remove(s->begin(), s->end(), '\r'), s->end());
    //s->erase(std::remove(s->begin(), s->end(), '\t'), s->end());
    //s->erase(std::remove(s->begin(), s->end(), '\n'), s->end());
}

//+-------------------------------------------------------------------------------------------------------------+
//| https://stackoverflow.com/questions/8551418/c-preprocessor-macro-for-returning-a-string-repeated-a-certain-number-of-times
//+-------------------------------------------------------------------------------------------------------------+
#define REP0(X)
#define REP1(X) X
#define REP2(X) REP1(X) X
#define REP3(X) REP2(X) X
#define REP4(X) REP3(X) X
#define REP5(X) REP4(X) X
#define REP6(X) REP5(X) X
#define REP7(X) REP6(X) X
#define REP8(X) REP7(X) X
#define REP9(X) REP8(X) X
#define REP10(X) REP9(X) X

#define REP(HUNDREDS,TENS,ONES,X) \
  REP##HUNDREDS(REP10(REP10(X))) \
  REP##TENS(REP10(X)) \
  REP##ONES(X)

/*usage
int main(void)
{
  printf(REP(9,0,7, "*")); // "*" repeated 907 times
  printf(REP(0,9,2, "#")); // "#" repeated 92 times
  printf(REP(0,0,1, "@")); // "@" repeated 1 times
  return 0;
}
*/

//+-------------------------------------------------------------------------------------------------------------+
//| https://stackoverflow.com/questions/37181621/easy-way-of-constructing-information-message-for-throwing-stdexception-using-p
//+-------------------------------------------------------------------------------------------------------------+
//static inline std::string make_source_error( std::string msg,char const* file, char const* function,std::size_t line) 
//{   return std::string{} + file + "(" + std::to_string(line) + "): [" + function + "] " + msg;
//}
//#define SOURCE_ERROR(...) make_source_error(__VA_ARGS__, __FILE__, __func__, __LINE__ )


//+-------------------------------------------------------------------------------------------------------------+
//| https://stackoverflow.com/questions/5590381/easiest-way-to-convert-int-to-string-in-c
//+-------------------------------------------------------------------------------------------------------------+
#define SSTR( x ) static_cast< std::ostringstream & >( ( std::ostringstream() << std::dec << x ) ).str()
/*
//Usage is as easy as could be:

int i = 42;
std::cout << SSTR( "i is: " << i );
std::string s = SSTR( i );
puts( SSTR( i ).c_str() );
*/
//+-------------------------------------------------------------------------------------------------------------+
//| https://stackoverflow.com/questions/561997/determining-exception-type-after-the-exception-is-caught
//+-------------------------------------------------------------------------------------------------------------+
#define EXCEPTION_FACTORY( NE ) class NE  : public std::runtime_error\
                                {\
                                public:\
                                    NE (std::string const& error_=std::string("error")) : runtime_error(error_) {}\
                                }
EXCEPTION_FACTORY( ErrorExit );
EXCEPTION_FACTORY( ErrorCTLC );

#define THROW(cls,msg)          throw cls(SSTR( msg<<" ["<<__FILE__<<" : "<<__func__<<" : "<<__LINE__<<"]" ))

#define THROW1(msg)             THROW(ErrorExit,msg)
#define THROW2(msg)             THROW(ErrorCTLC,msg)

/*
//+-------------------------------------------------------------------------------------------------------------+
//| https://stackoverflow.com/questions/397075/what-is-the-difference-between-exit-and-abort
//+-------------------------------------------------------------------------------------------------------------+
struct exit_exception: public std::runtime_error  // derived from std::exception and has an implementation of what()
{  //int c; 
   //exit_exception(int c):c(c) 
   exit_exception(std::string const& msg=std::string("error")):runtime_error(msg)
   { 
   } 
};

//Instead of calling exit(), arrange that code throw exit_exception(exit_code); instead.
//usage:
int main() 
{   try 
    {   // put all code in here
    } 
    catch(exit_exception& e) 
    {   exit(e.c);
    }
}
*/

//+-------------------------------------------------------------------------------------------------------------+
//| http://www.csl.mtu.edu/cs4411.ck/www/NOTES/signal/install.html                                              |
//+-------------------------------------------------------------------------------------------------------------+
static void  INThandler(int sig)
{   std::signal(sig, SIG_IGN);
    //const char str[] = " Do you want to quit?[y/n] ";
    const char str[] = "Press r to resume: ";
    write(STDOUT_FILENO,str,std::strlen(str));
    //std::cout.write(reinterpret_cast<char*>(&str), sizeof str);
    //std::cout.write(str,sizeof(str));
    
    std::fflush(stdin);
    //if ( std::getchar() == 'y')throw exit_exception("ctrl+c detected");
    //if ( std::getchar() != 'r')throw exit_exception("ctrl+c detected");
    //if ( std::getchar() != 'r')throw ErrorCTLC(SSTR( "ctrl+c detected"<<__FILE__<<":"<<__LINE__ ));
    //if ( std::getchar() != 'r')throw ErrorCTLC(SSTR( "ctrl+c detected ["<<__FILE__<<":"<<__LINE__<<"]" ));
    //if ( std::getchar() != 'r')throw ERR1("ctrl+c detected [");
    //if ( std::getchar() != 'r')throw ErrorCTLC("ctrl+c detected");
    //if ( std::getchar() != 'r')THROW(ErrorCTLC,"ctrl+c detected");
    if ( std::getchar() != 'r')THROW2("ctrl+c detected");

    
    //std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
    //if ( std::cin.get() == 'y')throw exit_exception(-1);
    
    std::signal(SIGINT, INThandler);

    std::fflush(stdin);
    std::getchar();
    
}

//+-------------------------------------------------------------------------------------------------------------+
//| https://stackoverflow.com/questions/11813062/why-do-i-need-to-delete-pointers-from-vector-manually          |
//+-------------------------------------------------------------------------------------------------------------+
template<class T>
static inline void deleteVectorPointer(std::vector<T*> v)
{   int j=0;
    for (typename std::vector<T*>::iterator i = v.begin(); i != v.end(); i++)
    {   std::cout<<"\nDeleting i="<<j++;
        delete *i;
    }
}

//+-------------------------------------------------------------------------------------------------------------+
//| https://stackoverflow.com/questions/21924156/how-to-initialize-a-stdstringstream?rq=1                       |
//+-------------------------------------------------------------------------------------------------------------+
#define OSS(VALUES) static_cast<std::ostringstream&&>(std::ostringstream() << VALUES)
//usage: std::stringstream ss(OSS("Number of people is " << numPeople));

//+-------------------------------------------------------------------------------------------------------------+
//|	https://stackoverflow.com/questions/17701197/how-to-run-code-inside-a-loop-only-once-without-external-flag  |
//+-------------------------------------------------------------------------------------------------------------+
struct RunOnce 
{   template <typename T>
    RunOnce(T &&f) { f(); }
};

/*usage:
while(true)
{ :::
  static RunOnce a([]() { your_code });
  :::
  static RunOnce b([]() { more_once_only_code });
  :::
}
*/
//+-------------------------------------------------------------------------------------------------------------+
//|	https://stackoverflow.com/questions/87372/check-if-a-class-has-a-member-function-of-a-given-signature       |    
//+-------------------------------------------------------------------------------------------------------------+
#define ISFUNCT_EXIST(F)    template <class C>\
                            class is_##F\
                            {   template <class T>static std::true_type                             testSignature(int (T::*)());\
                                template <class T>static decltype(testSignature(&T::F))             test(std::nullptr_t);\
                                template <class T>static std::false_type                            test(...);\
                            public:\
                                using type = decltype(test<C>(nullptr));\
                                static const bool value = type::value;\
                            };

//+-------------------------------------------------------------------------------------------------------------+
//|	https://stackoverflow.com/questions/43948460/shorten-long-template-derived-class-that-passed-as-template-argument-into-crtp
//+-------------------------------------------------------------------------------------------------------------+
//a variadic crtp combiner:

//template <class T, template <class> ...Cs>
//struct VCrtp: Cs<T>... 
//{
//};

//Usage:
//
//template<template<class>class T1,class T2,class T3>
//class HyperDatabase : VCrtp<HyperDataBase<T1, T2, T3>,IndexManager, BitHash, DefaultAllocator>
//{ // etc...
//};

//+-------------------------------------------------------------------------------------------------------------+
//| https://www.codeproject.com/Tips/894847/Policy-Design-Pattern-and-Variadic-Template-Techni
//+-------------------------------------------------------------------------------------------------------------+
template<typename... Policies>
class VPolicy: public Policies...
{
public:
    template<typename... Args>
    VPolicy(const Args... Arg): Policies(Arg)...
    {
    }
};

/*******USAGE**************
class PolicyOne
{   std::string mText;

public:
    PolicyOne(const char* aText):   mText(aText)
    {
    }
    
    void executePolicyOne()
    {   std::cout << mText << std::endl;
    }
};

class PolicyTwo
{   std::string mText;

public:
    PolicyTwo(const char* aText):   mText(aText)
    {
    }

    void executePolicyTwo()
    {   std::cout << mText << std::endl;
    }
};
typedef VPolicy<PolicyOne, PolicyTwo> PolicyOneAndPolicyTwo;
PolicyOneAndPolicyTwo linstance("PolicyOne", "PolicyTwo");

linstance.executePolicyOne();
linstance.executePolicyTwo();

***************************/

//+-------------------------------------------------------------------------------------------------------------+
//+-------------------------------------------------------------------------------------------------------------+
int getKb() 
{   std::string     line;
    std::ifstream   self("/proc/self/status");
    int             vmData, 
                    vmStk, 
                    vmPte;

    while(!self.eof()) 
    {   std::getline(self, line, ':');
             if (line == "VmPTE")   self >> vmPte;
        else if (line == "VmData")  self >> vmData;
        else if (line == "VmStk")   self >> vmStk;
        
        std::getline(self, line);
    }
    return vmData - vmStk - vmPte;
}


//+-------------------------------------------------------------------------------------------------------------+
//+-------------------------------------------------------------------------------------------------------------+
//config.txt
//Input name = image1.png
//Num. of rows = 100
//Num. of cols = 150
class CConfig
{   std::string ipName;
    int nR, nC;

public:
    CConfig(std::string fn="config.txt")
    {   std::ifstream           fin(fn);
        std::string             line;
        std::istringstream      sin;

        while (std::getline(fin, line)) 
        {   sin.str(line.substr(line.find("=")+1));
            if (line.find("Input name") != std::string::npos) 
            {   std::cout<<"Input name = "<<sin.str()<<std::endl;
                sin >> ipName;
            }
            else if (line.find("Num. of rows") != std::string::npos) 
            {   std::cout<<"Num. of rows = "<<sin.str()<<std::endl;
                sin >> nR;
            }
            else if (line.find("Num. of cols") != std::string::npos) 
            {   std::cout<<"Num. of cols = "<<sin.str()<<std::endl;
                sin >> nC;
            }
            sin.clear();
        }
    }
};