#pragma once

template <typename T>                                                              
struct CServeronDisconnection: public baseUWS<T>
{    std::string mText;

public:    
    #define X(a) using baseUWS<T>::a;
        #include "server_baseUWS.def"
    #undef X
    
public:    
          T& derived()       { return *static_cast<T*>(this);       }
    const T& derived() const { return *static_cast<const T*>(this); }

public:
    CServeronDisconnection(const char* aText):   mText(aText)
    {   //derived().val=90;
	    //std::cout<<__FUNCTION__<<", derived().val="<<derived().val<<", bodoh="<<bodoh<<std::endl;
	    //bodoh=derived().val;
	    //std::cout<<__FUNCTION__<<", derived().val="<<derived().val<<", bodoh="<<bodoh<<", mText="<<mText<<std::endl;
    }

    auto initonDisconnection()   
    {   return derived().initonDisconnection_();
    }
    
    int initonDisconnection_()
	{   
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
};     