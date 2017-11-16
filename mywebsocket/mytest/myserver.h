#include "lib/myutils.h"
#include "lib/kult.h"
#include <uWS/uWS.h>

/*
#include <vector>
#include <thread>
#include <algorithm>

#include <cassert>
#include <string>
#include <iostream>
*/

////////////////////////////////////////////////////////////////////////////////
// custom type
struct vec2 
{   float x, y;

    template<typename T> friend T&operator<<( T &os, const vec2 &self ) {
        return os << "(x:" << self.x << ",y:" << self.y << ")", os;
    }
};

////////////////////////////////////////////////////////////////////////////////
class CMyEntity
{   
public:    
    //entities
    kult::entity                            player; 
    kult::entity                            enemy;

    // components
    kult::component<'name', std::string>    name;
    kult::component<'desc', std::string>    description;
    kult::component<'pos2', vec2>           position;
    kult::component<'vel2', vec2>           velocity;
    
    // systems
    kult::system<float>                     movement;
    
    CMyEntity()
    {
    }
    
    void init()
    {   movement = [&]( float dt ) 
        {   for( auto &entity : kult::join( position, velocity ) ) 
            {   entity[ position ].x += entity[ velocity ].x * dt;
                entity[ position ].y += entity[ velocity ].y * dt;
            }
        };
    }

    void test_entity() 
    {   // assign properties dynamically
        player[ name ]          = "player #1";
        player[ position ]      = { 0, 0 };
        player[ velocity ]      = { 2, 4 };
        player[ description ]   = "this is our warrior";

        enemy[ name ]           = "orc #1";
        enemy[ position ]       = { 0, 0 };

        // simulate 100 frames
        for( int i = 0; i < 100; ++i ) 
        {   movement( 1/60.f );
        }

        // print status
        std::cout << player.dump() << std::endl;
        std::cout << enemy.dump() << std::endl;

        // purge entities
        player.purge();
        enemy.purge();

        // print status
        std::cout << player.dump() << std::endl;
        std::cout << enemy.dump() << std::endl;
    }
    
};

////////////////////////////////////////////////////////////////////////////////

// test class
class CMyClass
{
public:
    int  m_nInt;
    char m_cChar;
    char m_sBuff[10];
};


class CGame
{   typedef MemMap::MemMapFilePtr<CMyClass> TMemMappedClass;
    TMemMappedClass mymemmap;
    
    CMyEntity       myent;

public:
    CGame(const std::string& fn="./data/mymemmap"): mymemmap(fn.c_str())
    {   
    }
    
    void test()
    {   try 
        {   myent.init();
            myent.test_entity();
        
            //myent.test1();
            //myent.save();
            //myent.load();

            //typedef MemMap::MemMapFilePtr<MyClass> MemMappedClass;
      
            // create a object of wrapper class
            //MemMappedClass mymemmap("./data/mymemmap");

            // now use mymemmap as pointer of MyClass object.
            mymemmap->m_nInt        = 5;            // Write  int as pointer
            (*mymemmap).m_cChar     = 'a';          // dereference it and write char
            strcpy(mymemmap->m_sBuff, "12345678");  // write as buff
      
            std::cout << "m_nInt:"  << mymemmap->m_nInt  << std::endl;
            std::cout << "m_cChar:" << mymemmap->m_cChar << std::endl;
            std::cout << "m_sBuff:" << mymemmap->m_sBuff << std::endl;
        }
        catch (MemMap::MemMapFileException &e) 
        {   std::cout << e.what() << std::endl;
        }
    }
};
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

template <typename T>
struct CServer: public baseUWS<T>
{   std::string mText;
    
public:    
    using baseUWS<T>::storedMessages;
    using baseUWS<T>::excludedMessages;
    using baseUWS<T>::indexHtml;
    using baseUWS<T>::mainHtml;
    using baseUWS<T>::connections;
    using baseUWS<T>::bodoh;

          T& derived()       { return *static_cast<T*>(this);       }
    const T& derived() const { return *static_cast<const T*>(this); }

public:
    CServer(const char* aText):   mText(aText)
    {   //derived().val=3;
	    //std::cout<<__FUNCTION__<<", derived().val="<<derived().val<<", bodoh="<<bodoh<<std::endl;
	    //bodoh=derived().val;
	    //std::cout<<__FUNCTION__<<", derived().val="<<derived().val<<", bodoh="<<bodoh<<", mText="<<mText<<std::endl;
    }
    
    auto initServer()   {   return derived().initServer_();}
    auto runServer()    {   return derived().runServer_();}

    int initServer_()
	{   derived().h.onError([](void *user) 
        {   switch ((long) user) 
            {   case 1:     std::cerr << "Client emitted error on invalid URI" << std::endl;break;
                case 2:     std::cerr << "Client emitted error on resolve failure" << std::endl;break;
                case 3:     std::cerr << "Client emitted error on connection timeout (non-SSL)" << std::endl;break;
                case 5:     std::cerr << "Client emitted error on connection timeout (SSL)" << std::endl;break;
                case 6:     std::cerr << "Client emitted error on HTTP response without upgrade (non-SSL)" << std::endl;break;
                case 7:     std::cerr << "Client emitted error on HTTP response without upgrade (SSL)" << std::endl;break;
                case 10:    std::cerr << "Client emitted error on poll error" << std::endl;break;
                case 11:    {   static int protocolErrorCount = 0;
                                ++protocolErrorCount;
                                std::cerr << "Client emitted error on invalid protocol" << std::endl;
                                if (protocolErrorCount > 1) 
                                {   std::cerr << "FAILURE:  " << protocolErrorCount << " errors emitted for one connection!" << std::endl;
                                    exit(-1);
                                }
                            }                            
                            break;
                default:    std::cerr << "FAILURE: " << user << " should not emit error!" << std::endl;exit(-1);
            }
        });    
    
        derived().h.onHttpRequest([](uWS::HttpResponse* res, uWS::HttpRequest req, char* data, size_t, size_t) 
        {   
            //std::cout<<"req.getUrl().valueLength = " << len << std::endl;
            //std::cout<<"req.getUrl().value = " << req.getUrl().value << std::endl;
        
            std::string url(req.getUrl().toString());
            //std::cout << url.c_str() << std::endl;
            if (url == "/") 
            {   res->end(indexHtml.str().data(),indexHtml.str().length());
            } 
            else if (url == "/main.html") 
            {   res->end(mainHtml.str().data(), mainHtml.str().length());
            } 
            else 
            {   // i guess this should be done more gracefully?
                //res->end(nullptr, 0);
                res->end(indexHtml.str().data(), indexHtml.str().length());
            }
        });

    
        derived().h.onConnection([this](uWS::WebSocket<uWS::SERVER> *ws, uWS::HttpRequest req) 
        //h.onConnection([&defgroup](uWS::WebSocket<uWS::SERVER> *ws, uWS::HttpRequest req) 
        //h.onConnection([&defgroup](uWS::WebSocket<uWS::SERVER> *ws, uWS::HttpRequest req)         
        //h.onConnection([&h,group1_lobby](uWS::WebSocket<uWS::SERVER> *ws, uWS::HttpRequest req) 
        //h.onConnection([&h](uWS::WebSocket<uWS::SERVER> *ws, uWS::HttpRequest req) 
        {   //switch ((long) ws->getUserData()) 
            //{   case 8:     std::cout << "Client established a remote connection over non-SSL" << std::endl;break;
            //    case 9:     std::cout << "Client established a remote connection over SSL" << std::endl;break;
            //    //default:    std::cout << "FAILURE: " << ws->getUserData() << " should not connect!" << std::endl;break;        
            //}
            ////////////////////////////////////////////////////////////////

            //std::cout<<"req.getHeader('sec-websocket-protocol').toString() ="<< req.getHeader("sec-websocket-protocol").toString()<<std::endl;
            //std::cout<<"req.getHeader('some-random-header').toString() ="<< req.getHeader("some-random-header").toString()<<std::endl;
            //std::cout<<"req.getUrl().toString() =" << req.getUrl().toString() << std::endl;
        
            ////////////////////////////////////////////////////////////////
            ////////////////////////////////////////////////////////////////
        
            // send this client all stored messages in one batch send
            uWS::WebSocket<uWS::SERVER>::PreparedMessage* preparedMessageBatch = uWS::WebSocket<uWS::SERVER>::prepareMessageBatch(storedMessages, excludedMessages, uWS::TEXT, false);
            ws->sendPrepared(preparedMessageBatch);
            ws->finalizeMessage(preparedMessageBatch);

            // broadcast number of clients connected to everyone
            //std::string tmp = "S " + std::to_string(++connections) + " " +  std::to_string(getKb());
            std::string tmp("S " + std::to_string(++connections) + " " +  std::to_string(getKb()));
            //h.getDefaultGroup<uWS::SERVER>().broadcast(tmp.data(), tmp.length(), uWS::TEXT);
        
            derived().defgroup->broadcast(tmp.data(), tmp.length(), uWS::TEXT);
        
            //group1_lobby->broadcast(tmp.data(), tmp.length(), uWS::TEXT);
        });

        derived().h.onMessage([this](uWS::WebSocket<uWS::SERVER>* ws, char *data, size_t length, uWS::OpCode opCode) 
        //h.onMessage([&defgroup](uWS::WebSocket<uWS::SERVER>* ws, char *data, size_t length, uWS::OpCode opCode) 
        //h.onMessage([&h,group1_lobby](uWS::WebSocket<uWS::SERVER>* ws, char *data, size_t length, uWS::OpCode opCode) 
        //h.onMessage([&h](uWS::WebSocket<uWS::SERVER>* ws, char *data, size_t length, uWS::OpCode opCode) 
        {   if (length && data[0] != 'S' && length < 4096) 
            {   // add this message to the store, cut off old messages
                if (storedMessages.size() == 50) 
                {   storedMessages.erase(storedMessages.begin());
                }
                storedMessages.push_back(std::string(data, length));
                //std::cout << "Message posted: " << storedMessages.back() << std::endl;

                // simply broadcast this message to everyone (completely without any timeout optimization!)
                //h.getDefaultGroup<uWS::SERVER>().broadcast(data, length, uWS::TEXT);
            
                derived().defgroup->broadcast(data, length, uWS::TEXT);

                //group1_lobby->broadcast(data, length, uWS::TEXT);
            }
        });
    
        derived().h.onDisconnection([this](uWS::WebSocket<uWS::SERVER>* ws, int code, char *message, size_t length) 
        //h.onDisconnection([&defgroup](uWS::WebSocket<uWS::SERVER>* ws, int code, char *message, size_t length) 
        //h.onDisconnection([&h,group1_lobby](uWS::WebSocket<uWS::SERVER>* ws, int code, char *message, size_t length) 
        //h.onDisconnection([&h](uWS::WebSocket<uWS::SERVER>* ws, int code, char *message, size_t length) 
        {   //     if (code == 1006)  {   std::cout << "Server recives terminate close code after terminating" << std::endl;} 
            //else if (code == 1001)  {   std::cout << "Closing browser tab abruptly" << std::endl;} 
            //else                    
            //{   if (code == 1000)   {   std::cout << "Server receives correct close code after closing" << std::endl;}
            //    else                {   std::cout << "FAILURE: Server does not receive correct close code!" << std::endl;} 
            //}    
            //std::cout << "Client got disconnected with data: " << ws->getUserData() << ", code: " << code << ", message: <" << std::string(message, length) << ">" << std::endl;
        
                 if (code == 1000)  {   std::cout << "Server receives correct close code after closing";}
            else if (code == 1001)  {   std::cout << "Closing browser tab abruptly";} 
            else if (code == 1006)  {   std::cout << "Server recives terminate close code after terminating";} 
            else                    {   std::cout << "FAILURE: Server does not receive correct close code!";}    
            std::cout << ", data: " << ws->getUserData() << ", code: " << code << ", message: <" << std::string(message, length) << ">" << std::endl;        
        
            // broadcast number of clients connected to everyone
            std::string tmp = "S " + std::to_string(--connections) + " " +  std::to_string(getKb());
            //h.getDefaultGroup<uWS::SERVER>().broadcast(tmp.data(), tmp.length(), uWS::TEXT);

            derived().defgroup->broadcast(tmp.data(), tmp.length(), uWS::TEXT);

            //group1_lobby->broadcast(tmp.data(), tmp.length(), uWS::TEXT);
        });	    
        
        return 1;
    }         
    
    int runServer_()
    {   //h.getDefaultGroup<uWS::SERVER>().startAutoPing(30000);
        derived().defgroup->startAutoPing(30000);
    
        //group1_lobby->startAutoPing(30000);
        //group2_math->startAutoPing(31000);
    
        //if (h.listen(6000, nullptr, uS::ListenOptions::REUSE_PORT, group1_lobby) && 
        //    h.listen(6000, nullptr, uS::ListenOptions::REUSE_PORT, group2_math)) 
        //if (h.listen(6000))         
        if (derived().h.listen(6000, nullptr, uS::ListenOptions::REUSE_PORT, derived().defgroup)) 
        {   std::cout << "Listening to port 6000" << std::endl;
        } 
        else 
        {   std::cerr << "Failed to listen to port" << std::endl;
            return -1;
        }
    
        derived().h.run();
    
        //delete group1_lobby;
        //delete group2_math;
        
        return 1;
    }    
};                                                                                 

template <typename T>                                                              
struct CWebpage: public baseUWS<T>
{    std::string mText;

public:
    using baseUWS<T>::storedMessages;
    using baseUWS<T>::excludedMessages;
    using baseUWS<T>::indexHtml;
    using baseUWS<T>::mainHtml;
    using baseUWS<T>::connections;
    using baseUWS<T>::bodoh;
    
          T& derived()       { return *static_cast<T*>(this);       }
    const T& derived() const { return *static_cast<const T*>(this); }

public:
    CWebpage(const char* aText):   mText(aText)
    {   //derived().val=90;
	    //std::cout<<__FUNCTION__<<", derived().val="<<derived().val<<", bodoh="<<bodoh<<std::endl;
	    //bodoh=derived().val;
	    //std::cout<<__FUNCTION__<<", derived().val="<<derived().val<<", bodoh="<<bodoh<<", mText="<<mText<<std::endl;
    }

    auto initWebpage()   
    {   return derived().initWebpage_();
    }
    
    int initWebpage_()
	{   indexHtml << std::ifstream ("./public/index.html").rdbuf();
        if (!indexHtml.str().length()) 
        {   std::cerr << "Failed to load index.html" << std::endl;
            return -1;
        }

        mainHtml << std::ifstream ("./public/main.html").rdbuf();
        if (!mainHtml.str().length()) 
        {   std::cerr << "Failed to load main.html" << std::endl;
            return -1;
        }

        return 1;
    }    
};     


//https://stackoverflow.com/questions/19886094/how-to-derive-from-a-nested-class-of-a-variadic-template-argument
template <template<class> class ... Ts>
struct CmyUWS: Ts<CmyUWS<Ts...>>...
{   int val;   
public:    
    //std::vector<std::string>    storedMessages;
    //std::vector<int>            excludedMessages;
    //std::stringstream           indexHtml;
    //std::stringstream           mainHtml;
    
    //https://stackoverflow.com/questions/28226251/static-member-in-header-only-library
    //inline static auto storedMessages()->std::vector<std::string>& {    static std::vector<std::string> storedMessages_;return storedMessages_;}
    //inline static auto excludedMessages()->std::vector<int>&       {    static std::vector<int>         excludedMessages_;return excludedMessages_;}
    //inline static auto indexHtml()->std::stringstream&             {    static std::stringstream        indexHtml_;return indexHtml_;}
    //inline static auto mainHtml()->std::stringstream&              {    static std::stringstream        mainHtml_;return mainHtml_;}

    uWS::Hub h;
    
    //uWS::Group<uWS::SERVER>*  group1_lobby    = h.createGroup<uWS::SERVER>();
    //uWS::Group<uWS::SERVER>*  group2_math     = h.createGroup<uWS::SERVER>();
    uWS::Group<uWS::SERVER>*    defgroup        = &h.getDefaultGroup<uWS::SERVER>();

public:    
    template<typename... Args>
    CmyUWS(const Args... Arg):    Ts<CmyUWS<Ts...>>(Arg)...
    {
    }
    
    /*
    int init()
    {   if(!initWebpage())  return -1;
        if(!initServer())   return -1;
        return 1;
    }
    
    int run()
    {   if(!runServer())    return -1;
        return 1;
    }
    */

};   
////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////////
/*
    std::vector<std::thread *> threads(std::thread::hardware_concurrency());
    std::transform(threads.begin(), threads.end(), threads.begin(), [](std::thread *t) 
    {   return new std::thread([]() 
        {   uWS::Hub h;

            //h.onMessage([](uWS::WebSocket<uWS::SERVER> *ws, char *message, size_t length, uWS::OpCode opCode) 
            //{   ws->send(message, length, opCode);
            //});
            
            //////////////////////////////////////////////////////////////////////////


            h.onHttpRequest([](uWS::HttpResponse* res, uWS::HttpRequest req, char* data, size_t, size_t) 
            {   int len = req.getUrl().valueLength;
                //std::cout<<"req.getUrl().valueLength = " << len << std::endl;
                //std::cout<<"req.getUrl().value = " << req.getUrl().value << std::endl;
        
                //if (req.getUrl().valueLength == 1) 
                if (len == 1) 
                {   res->end(indexHtml.str().data(), indexHtml.str().length());
                } 
                else if (len == 10) 
                {   res->end(mainHtml.str().data(), mainHtml.str().length());
                } 
                else 
                {   // i guess this should be done more gracefully?
                    res->end(nullptr, 0);
                }
            });

            h.onConnection([&h](uWS::WebSocket<uWS::SERVER> *ws, uWS::HttpRequest req) 
            {   // send this client all stored messages in one batch send
                uWS::WebSocket<uWS::SERVER>::PreparedMessage* preparedMessageBatch = uWS::WebSocket<uWS::SERVER>::prepareMessageBatch(storedMessages, excludedMessages, uWS::TEXT, false);
                ws->sendPrepared(preparedMessageBatch);
                ws->finalizeMessage(preparedMessageBatch);

                // broadcast number of clients connected to everyone
                //std::string tmp = "S " + std::to_string(++connections) + " " +  std::to_string(getKb());
                std::string tmp("S " + std::to_string(++connections) + " " +  std::to_string(getKb()));
                h.getDefaultGroup<uWS::SERVER>().broadcast(tmp.data(), tmp.length(), uWS::TEXT);
            });

            //h.onMessage([](uWS::WebSocket<uWS::SERVER> *ws, char *message, size_t length, uWS::OpCode opCode) 
            //{   ws->send(message, length, opCode);
            //});
            
            h.onMessage([&h](uWS::WebSocket<uWS::SERVER>* ws, char *data, size_t length, uWS::OpCode opCode) 
            {   if (length && data[0] != 'S' && length < 4096) 
                {   // add this message to the store, cut off old messages
                    if (storedMessages.size() == 50) 
                    {   storedMessages.erase(storedMessages.begin());
                    }
                    storedMessages.push_back(std::string(data, length));
                    //std::cout << "Message posted: " << storedMessages.back() << std::endl;

                    // simply broadcast this message to everyone (completely without any timeout optimization!)
                    h.getDefaultGroup<uWS::SERVER>().broadcast(data, length, opCode);//uWS::TEXT);
                }
            });

            h.onDisconnection([&h](uWS::WebSocket<uWS::SERVER>* ws, int code, char *message, size_t length) 
            {   // broadcast number of clients connected to everyone
                std::string tmp = "S " + std::to_string(--connections) + " " +  std::to_string(getKb());
                h.getDefaultGroup<uWS::SERVER>().broadcast(tmp.data(), tmp.length(), uWS::TEXT);
            });
    
            h.getDefaultGroup<uWS::SERVER>().startAutoPing(30000);
            
            //if (h.listen(6000)) 
            //{   std::cout << "Listening to port 6000" << std::endl;
            //} 
            //else 
            //{   std::cerr << "Failed to listen to port" << std::endl;
            //    return -1;
            //}
            
            // This makes use of the SO_REUSEPORT of the Linux kernel
            // Other solutions include listening to one port per thread
            // with or without some kind of proxy inbetween
            if (!h.listen(6000, nullptr, uS::ListenOptions::REUSE_PORT)) 
            {   std::cerr << "Failed to listen" << std::endl;
                return -1;
            }
            else
            {   std::cout << "Listening to port 6000" << std::endl;
            }
            
            h.run();
            //////////////////////////////////////////////////////////////////////////
            
        });
    });

    std::for_each(threads.begin(), threads.end(), [](std::thread *t) 
    {   t->join();
    });    
*/    
    ///////////////////////////////////////////////////////////////////////////////