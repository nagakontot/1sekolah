#pragma once

template <typename T>                                                              
struct CServeronMessage: public baseUWS<T>
{    std::string mText;

public:    
    #define X(a) using baseUWS<T>::a;
        #include "server_baseUWS.def"
    #undef X
    
public:    
          T& derived()       { return *static_cast<T*>(this);       }
    const T& derived() const { return *static_cast<const T*>(this); }

public:
    CServeronMessage(const char* aText):   mText(aText)
    {   //derived().val=90;
	    //std::cout<<__FUNCTION__<<", derived().val="<<derived().val<<", bodoh="<<bodoh<<std::endl;
	    //bodoh=derived().val;
	    //std::cout<<__FUNCTION__<<", derived().val="<<derived().val<<", bodoh="<<bodoh<<", mText="<<mText<<std::endl;
    }

    auto initonMessage()   
    {   return derived().initonMessage_();
    }
    
    int initonMessage_()
	{   
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
        return 1;
    }    
};     