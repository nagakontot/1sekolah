#include "myutils.h"
#include "TinyEntity.h"

#include <uWS/uWS.h>

#include <vector>
#include <thread>
#include <algorithm>

#include <cassert>
#include <string>
#include <iostream>


// test class
class MyClass
{
public:
    int  m_nInt;
    char m_cChar;
    char m_sBuff[10];
};

/////////////////////////////////////////////////////////////////////////
// gamedev types and constants
typedef std::pair<int, int>    vec2i;
typedef std::pair<float,float> vec2f;

const vec2f zero    = { 0.f, 0.f };
const vec2f one     = { 1.f, 1.f };

// test class
class CMyEntity
{
public:
    // component aliases
    using friendly = component<        bool, 'team' >;
    using health   = component<         int, 'heal' >;
    using mana     = component<         int, 'mana' >;
    using coins    = component<         int, 'coin' >;
    using name     = component< std::string, 'name' >;
    using position = component<       vec2f, 'pos2' >;

    // entities
    const int none = 0, player = 1, enemy = 2;
    
public:
    CMyEntity()
    {   
    }
    
    void save()
    {   //writeSet("data","test1.dat",join<name, coins, health, position>());
        //writeSet("data","test1.dat",system<mana>());
        
        //writeSet(system<mana>());
        writeSet(join<name, coins, health, position>());
    }
    
    void load()
    {   //readSet("data","test1.dat",system<mana>());
        display();
    }

    void display() 
    {   std::cout << "- ";
        for( auto &id : join<name, coins, health, position>() ) 
        {   std::cout   << get<name>(id) << " at "
                        << "(" << get<position>(id).first << "," << get<position>(id).second << ")"
                        << " " << get<health>(id) << "HP"
                        << " " << get<coins>(id) << "$, ";
        }
        std::cout << std::endl;
    }

    void test1()
    {   // components
        assert( !has<name>(player) );
        assert( !has<position>(player) );
        assert( !has<coins>(enemy) );
        assert( !has<health>(enemy) );
        
        add<name>(player)       = "Hero";
        add<position>(player)   = zero;
        add<health>(player)     = 100;
        add<coins>(player)      = 200;
        add<mana>(player)       = 4000;
        add<friendly>(player)   = true;

        add<name>(enemy)        = "Orc";
        add<position>(enemy)    = one;
        add<health>(enemy)      = 200;
        add<coins>(enemy)       = 50;
        add<mana>(enemy)        = 10;

/*
        assert( get<health>(player) == 100 ); // :>
        assert(  has<name>(player) );
        assert( !has<vec2i>(player) );
        assert(  has<position>(player) );
        assert(  has<health>(player) );

        assert( get<name>(player) == "Hero" );
        assert( get<position>(player) == zero );
        assert( get<health>(player) == 100 );

        // systems; here we intersect a system of all elements with <name> and <position>.
        assert( (join<name, position>().size() == 2) );
*/      
/*
        // systems; render game state
        auto display = []() 
        {   std::cout << "- ";
            for( auto &id : join<name, coins, health, position>() ) 
            {   std::cout   << get<name>(id) << " at "
                            << "(" << get<position>(id).first << "," << get<position>(id).second << ")"
                            << " " << get<health>(id) << "HP"
                            << " " << get<coins>(id) << "$, ";
            }
            std::cout << std::endl;
        };
*/
        display();        
        //////////////////////////
        
    // systems; simulate movement
    for( auto &id : join<name, position>() ) {
        std::cout << get<name>(id) << " says: im moving!" << std::endl;
        vec2f &pos = get<position>(id);
        pos.first += 10;
        pos.second ++;
    }

    // systems; simulate a spell bomb in entities of any type
    for( auto &id : system<mana>() ) {
        std::cout << "spellboomb!!!" << std::endl;
        get<mana>(id) -= 50;
    }

    // systems; simulate a powerup (+$100) for all players
    for( auto &id : join<name, coins, friendly>() ) {
        get<coins>(id) += 100;
        std::cout << get<name>(id) << " says: money! :)" << std::endl;
    }

    // systems; simulate a poison (-50%HP) to all entities that are not friendly (so enemies)
    for( auto &id : exclude<friendly>( join<name, health>() ) ) {
        get<health>(id) *= 0.5;
        std::cout << get<name>(id) << " says: ugh! poisoned :(" << std::endl;
    }

/*
    assert( get<health>(player) == 100+0 );
    assert( get<health>(enemy) == 200/2 );
    assert( get<coins>(player) == 200+100 );
    assert( get<coins>(enemy) == 50+0 );
    assert( get<mana>(player) == 4000-50 );
    assert( get<mana>(enemy) == 10-50 );

    assert( del<position>(player) );
    assert( !has<position>(player) );
    assert( del<name>(player) );
    assert( !has<name>(player) );

    assert( (join<name, position>().size() == 1) );        
*/    
    }
};

/////////////////////////////////////////////////////////////////////////
class CGame
{   typedef MemMap::MemMapFilePtr<MyClass> TMemMappedClass;
    TMemMappedClass mymemmap;
    
    CMyEntity       myent;
    
public:
    CGame(const std::string& fn="./data/mymemmap"): mymemmap(fn.c_str())
    {   
    }
    
    void test()
    {   try 
        {   myent.test1();
            myent.save();
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
//////////////////////////////////////////////////////////////////

std::vector<std::string>    storedMessages;
std::vector<int>            excludedMessages;
std::stringstream           indexHtml;
std::stringstream           mainHtml;

int connections = 0;

int main() 
{   CGame  mygame;
    mygame.test();

    CConfig mycfg("config.txt");
    
    ///////////////////////////////////////////////////////////////////////////////
    indexHtml << std::ifstream ("index.html").rdbuf();
    if (!indexHtml.str().length()) 
    {   std::cerr << "Failed to load index.html" << std::endl;
        return -1;
    }

    mainHtml << std::ifstream ("main.html").rdbuf();
    if (!mainHtml.str().length()) 
    {   std::cerr << "Failed to load main.html" << std::endl;
        return -1;
    }

    ///////////////////////////////////////////////////////////////////////////////
    uWS::Hub h;
    
    //uWS::Group<uWS::SERVER>*  group1_lobby    = h.createGroup<uWS::SERVER>();
    //uWS::Group<uWS::SERVER>*  group2_math     = h.createGroup<uWS::SERVER>();
    
    uWS::Group<uWS::SERVER>*    defgroup        = &h.getDefaultGroup<uWS::SERVER>();

    h.onError([](void *user) 
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
    
    h.onHttpRequest([](uWS::HttpResponse* res, uWS::HttpRequest req, char* data, size_t, size_t) 
    {   
        //std::cout<<"req.getUrl().valueLength = " << len << std::endl;
        //std::cout<<"req.getUrl().value = " << req.getUrl().value << std::endl;
        
        std::string url(req.getUrl().toString());
        //std::cout << url.c_str() << std::endl;
        if (url == "/") 
        {   res->end(indexHtml.str().data(), indexHtml.str().length());
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

    
    h.onConnection([&defgroup](uWS::WebSocket<uWS::SERVER> *ws, uWS::HttpRequest req) 
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
        
        defgroup->broadcast(tmp.data(), tmp.length(), uWS::TEXT);
        
        //group1_lobby->broadcast(tmp.data(), tmp.length(), uWS::TEXT);
    });

    h.onMessage([&defgroup](uWS::WebSocket<uWS::SERVER>* ws, char *data, size_t length, uWS::OpCode opCode) 
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
            
            defgroup->broadcast(data, length, uWS::TEXT);

            //group1_lobby->broadcast(data, length, uWS::TEXT);
        }
    });
    
    h.onDisconnection([&defgroup](uWS::WebSocket<uWS::SERVER>* ws, int code, char *message, size_t length) 
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

        defgroup->broadcast(tmp.data(), tmp.length(), uWS::TEXT);

        //group1_lobby->broadcast(tmp.data(), tmp.length(), uWS::TEXT);
        
        
    });
    
    //h.getDefaultGroup<uWS::SERVER>().startAutoPing(30000);
    
    defgroup->startAutoPing(30000);
    
    //group1_lobby->startAutoPing(30000);
    //group2_math->startAutoPing(31000);
    
    
    //if (h.listen(6000, nullptr, uS::ListenOptions::REUSE_PORT, group1_lobby) && 
    //    h.listen(6000, nullptr, uS::ListenOptions::REUSE_PORT, group2_math)) 
    //if (h.listen(6000))         
    if (h.listen(6000, nullptr, uS::ListenOptions::REUSE_PORT, defgroup)) 
    {   std::cout << "Listening to port 6000" << std::endl;
    } 
    else 
    {   std::cerr << "Failed to listen to port" << std::endl;
        return -1;
    }
    
    h.run();
    
    //delete group1_lobby;
    //delete group2_math;
    
}



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