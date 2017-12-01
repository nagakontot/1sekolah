#include "myserver.h"


int CMain() 
{   CGame  mygame;
    mygame.test();

    CConfig mycfg("./data/config.txt");
    
    ///////////////////////////////////////////////////////////////////////////////
    CmyUWS<CServer,CWebpage>    myUWS("PolicyOne", "PolicyTwo");

    if(!myUWS.initWebpage())    return -1;
    if(!myUWS.initServer())     return -1;
    if(!myUWS.runServer())      return -1;
    
    
    ///////////////////////////////////////////////////////////////////////////////

    return 1;
    
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
    
/////////////////////////////////////////////////////////////////////////
/*
//#include "TinyEntity.h"
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


        //assert( get<health>(player) == 100 ); // :>
        //assert(  has<name>(player) );
        //assert( !has<vec2i>(player) );
        //assert(  has<position>(player) );
        //assert(  has<health>(player) );

        //assert( get<name>(player) == "Hero" );
        //assert( get<position>(player) == zero );
        //assert( get<health>(player) == 100 );

        // systems; here we intersect a system of all elements with <name> and <position>.
        //assert( (join<name, position>().size() == 2) );
      
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

    //assert( get<health>(player) == 100+0 );
    //assert( get<health>(enemy) == 200/2 );
    //assert( get<coins>(player) == 200+100 );
    //assert( get<coins>(enemy) == 50+0 );
    //assert( get<mana>(player) == 4000-50 );
    //assert( get<mana>(enemy) == 10-50 );

    //assert( del<position>(player) );
    //assert( !has<position>(player) );
    //assert( del<name>(player) );
    //assert( !has<name>(player) );

    //assert( (join<name, position>().size() == 1) );        
    
    }
};
*/
/////////////////////////////////////////////////////////////////////////   