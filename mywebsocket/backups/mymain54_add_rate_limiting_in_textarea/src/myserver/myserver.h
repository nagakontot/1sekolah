#pragma once

#include <uWS/uWS.h>
#include "server_baseUWS.h"
#include "server_onError.h"
#include "server_onHttpRequest.h"
#include "server_onMessage.h"
#include "server_onConnection.h"
#include "server_onDisconnection.h"

ISFUNCT_EXIST(initonError)
ISFUNCT_EXIST(initonHttpRequest)
ISFUNCT_EXIST(initonMessage)
ISFUNCT_EXIST(initonConnection)
ISFUNCT_EXIST(initonDisconnection)

//https://stackoverflow.com/questions/19886094/how-to-derive-from-a-nested-class-of-a-variadic-template-argument
template <template<class> class ... Ts>
struct CmyUWS: Ts<CmyUWS<Ts...>>...
{   int val;   

public:    
    uWS::Hub h;
    
    //uWS::Group<uWS::SERVER>*  group1_lobby;//      = h.createGroup<uWS::SERVER>();
    //uWS::Group<uWS::SERVER>*  group2_math;//       = h.createGroup<uWS::SERVER>();
    uWS::Group<uWS::SERVER>*  defgroup               = &h.getDefaultGroup<uWS::SERVER>();
    
public:

public:    
    template<typename... Args>
    CmyUWS(const Args... Arg):    Ts<CmyUWS<Ts...>>(Arg)...
    {   //group1_lobby    = h.createGroup<uWS::SERVER>(uWS::PERMESSAGE_DEFLATE);
        //group2_math     = h.createGroup<uWS::SERVER>(uWS::PERMESSAGE_DEFLATE);
        //defgroup        = &h.getDefaultGroup<uWS::SERVER>();
    }
    
    ~CmyUWS()
    {   std::cout<<__func__<<std::endl;
        //if(group1_lobby)delete group1_lobby;
        //if(group2_math) delete group2_math;
    
        quitServer();
    }
    
    //declare a function here to disable base method with the same name
    //int initonHttpRequest_()                            { std::cout<<__func__<<std::endl;return 1;}
    
    int initServer()
	{   if(is_initonError<CmyUWS<Ts...>>::value)        { if(!this->initonError())        return -1;}else return -10;
	    if(is_initonHttpRequest<CmyUWS<Ts...>>::value)  { if(!this->initonHttpRequest())  return -2;}else return -20;
	    if(is_initonMessage<CmyUWS<Ts...>>::value)      { if(!this->initonMessage())      return -3;}else return -30;
	    if(is_initonConnection<CmyUWS<Ts...>>::value)   { if(!this->initonConnection())   return -4;}else return -40;
	    if(is_initonDisconnection<CmyUWS<Ts...>>::value){ if(!this->initonDisconnection())return -5;}else return -50;
        
        //if(!this->initonError())        return -1;else return -10;
	    //if(!this->initonHttpRequest())  return -2;else return -20;
	    //if(!this->initonMessage())      return -3;else return -30;
	    //if(!this->initonConnection())   return -4;else return -40;
	    //if(!this->initonDisconnection())return -5;else return -50;
        return 1;
    }         

    int quitServer()
    {   //if(!this->quitHttpRequest())  return -2;
    
        defgroup->close();
        return 1;
    }
    
    int runServer()
    {   //h.getDefaultGroup<uWS::SERVER>().startAutoPing(30000);
        //derived().defgroup->startAutoPing(30000);
        defgroup->startAutoPing(30000);
    
        //group1_lobby->startAutoPing(30000);
        //group2_math->startAutoPing(31000);
    
        //if (h.listen(6000, nullptr, uS::ListenOptions::REUSE_PORT, group1_lobby) && 
        //    h.listen(6000, nullptr, uS::ListenOptions::REUSE_PORT, group2_math)  &&
        //    h.listen(6000, nullptr, uS::ListenOptions::REUSE_PORT, defgroup)) 
        //if (derived().h.listen(6000, nullptr, uS::ListenOptions::REUSE_PORT, derived().defgroup)) 
        //if (h.listen(6000, nullptr, uS::ListenOptions::REUSE_PORT, defgroup)) 
        if (h.listen(6000))         
        {   std::cout << "Listening to port 6000" << std::endl;
        } 
        else 
        {   std::cerr << "Failed to listen to port" << std::endl;
            return -1;
        }
    
        //derived().h.run();
        h.run();
        
    
        //delete group1_lobby;
        //delete group2_math;

        return 1;
    }      
};   

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
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