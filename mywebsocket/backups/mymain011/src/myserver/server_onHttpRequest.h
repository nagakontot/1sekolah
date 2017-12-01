#pragma once

template <typename T>                                                              
struct CServeronHttpRequest: public baseUWS<T>
{    std::string mText;

public:    
    #define X(a) using baseUWS<T>::a;
        #include "server_baseUWS.def"
    #undef X
    
public:    
          T& derived()       { return *static_cast<T*>(this);       }
    const T& derived() const { return *static_cast<const T*>(this); }

public:
    CServeronHttpRequest(const char* aText):   mText(aText)
    {   //derived().val=90;
	    //std::cout<<__FUNCTION__<<", derived().val="<<derived().val<<", bodoh="<<bodoh<<std::endl;
	    //bodoh=derived().val;
	    //std::cout<<__FUNCTION__<<", derived().val="<<derived().val<<", bodoh="<<bodoh<<", mText="<<mText<<std::endl;
    }

    auto initonHttpRequest()   
    {   return derived().initonHttpRequest_();
    }
    
    int initonHttpRequest_()
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
        return 1;
    }    
};     
        
