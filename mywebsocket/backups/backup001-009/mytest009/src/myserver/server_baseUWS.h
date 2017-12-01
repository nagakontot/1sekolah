#pragma once

template< class T >
struct baseUWS
{   
public:    
    //https://stackoverflow.com/questions/28226251/static-member-in-header-only-library
    static std::vector<std::string>    storedMessages;
    static std::vector<int>            excludedMessages;
    static std::stringstream           indexHtml;
    static std::stringstream           mainHtml;
    static int connections;
    static int bodoh;
    
public:    
    //baseUWS()
    //{   
    //}

    //https://stackoverflow.com/questions/28226251/static-member-in-header-only-library
    //inline static auto storedMessages()->std::vector<std::string>&  {    static std::vector<std::string> storedMessages_;return storedMessages_;}
    //inline static auto excludedMessages()->std::vector<int>&        {    static std::vector<int>         excludedMessages_;return excludedMessages_;}
    //inline static auto indexHtml()->std::stringstream&              {    static std::stringstream        indexHtml_;return indexHtml_;}
    //inline static auto mainHtml()->std::stringstream&               {    static std::stringstream        mainHtml_;return mainHtml_;}
    //inline static auto connections()->int&                          {    static int                      connections_;return connections_;}
    //inline static auto bodoh()->int&                                {    static int                      bodoh_;return bodoh_;}

};

template<class T>std::vector<std::string>   baseUWS<T>::storedMessages;
template<class T>std::vector<int>           baseUWS<T>::excludedMessages;
template<class T>std::stringstream          baseUWS<T>::indexHtml;
template<class T>std::stringstream          baseUWS<T>::mainHtml;
template<class T>int                        baseUWS<T>::connections=0;
template<class T>int                        baseUWS<T>::bodoh=0;






////////////////////////////////////////////////////////////////////////////////
/*
struct SGlobalUWS
{   std::vector<std::string>    storedMessages;
    std::vector<int>            excludedMessages;
    std::stringstream           indexHtml;
    std::stringstream           mainHtml;
    
    int connections;
    
    SGlobalUWS():   connections(0)
    {
    }
}gUWSData;  
*/

//https://stackoverflow.com/questions/28226251/static-member-in-header-only-library
//Example of the templated statics trick:
/*
template< class Dummy >
struct Foo_statics
{
    static int n_instances;
};

template< class Dummy >
int Foo_statics<Dummy>::n_instances;

class Foo
    : private Foo_statics<void>
{
public:
    ~Foo() { --n_instances; }
    Foo() { ++n_instances; }
    Foo( Foo const& ) { ++n_instances; }
};
*/