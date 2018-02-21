#pragma once

template <typename T>                                                              
struct CServeronError: public baseUWS<T>
{    std::string mText;

public:    
    #define X(a) using baseUWS<T>::a;
        #include "server_baseUWS.def"
    #undef X
    
public:    
          T& derived()       { return *static_cast<T*>(this);       }
    const T& derived() const { return *static_cast<const T*>(this); }

public:
    CServeronError(const char* aText):   mText(aText)
    {   //derived().val=90;
	    //std::cout<<__FUNCTION__<<", derived().val="<<derived().val<<", bodoh="<<bodoh<<std::endl;
	    //bodoh=derived().val;
	    //std::cout<<__FUNCTION__<<", derived().val="<<derived().val<<", bodoh="<<bodoh<<", mText="<<mText<<std::endl;
    }

    auto initonError()   
    {   return derived().initonError_();
    }
    
    int initonError_()
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
        return 1;
    }    
};     