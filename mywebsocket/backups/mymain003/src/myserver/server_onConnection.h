#pragma once

template <typename T>                                                              
struct CServeronConnection: public baseUWS<T>
{    std::string mText;

public:    
    #define X(a) using baseUWS<T>::a;
        #include "server_baseUWS.def"
    #undef X
    
public:    
          T& derived()       { return *static_cast<T*>(this);       }
    const T& derived() const { return *static_cast<const T*>(this); }

public:
    CServeronConnection(const char* aText):   mText(aText)
    {   //derived().val=90;
	    //std::cout<<__FUNCTION__<<", derived().val="<<derived().val<<", bodoh="<<bodoh<<std::endl;
	    //bodoh=derived().val;
	    //std::cout<<__FUNCTION__<<", derived().val="<<derived().val<<", bodoh="<<bodoh<<", mText="<<mText<<std::endl;
    }

    auto initonConnection()   
    {   return derived().initonConnection_();
    }
    
    int initonConnection_()
	{   
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
        return 1;
    }    
};     