#include <uWS/uWS.h>
#include "server_baseUWS.h"
#include "server_webpage.h"

template <typename T>
struct CServer: public baseUWS<T>
{   std::string mText;
    
public:    
    #define X(a) using baseUWS<T>::a;
        #include "server_baseUWS.def"
    #undef X
public:
    /*
    using baseUWS<T>::storedMessages;
    using baseUWS<T>::excludedMessages;
    using baseUWS<T>::indexHtml;
    using baseUWS<T>::mainHtml;
    using baseUWS<T>::connections;
    using baseUWS<T>::bodoh;
    */

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


//https://stackoverflow.com/questions/19886094/how-to-derive-from-a-nested-class-of-a-variadic-template-argument
template <template<class> class ... Ts>
struct CmyUWS: Ts<CmyUWS<Ts...>>...
{   int val;   

public:    
    uWS::Hub h;
    
    //uWS::Group<uWS::SERVER>*  group1_lobby    = h.createGroup<uWS::SERVER>();
    //uWS::Group<uWS::SERVER>*  group2_math     = h.createGroup<uWS::SERVER>();
    uWS::Group<uWS::SERVER>*    defgroup        = &h.getDefaultGroup<uWS::SERVER>();

public:    
    template<typename... Args>
    CmyUWS(const Args... Arg):    Ts<CmyUWS<Ts...>>(Arg)...
    {
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