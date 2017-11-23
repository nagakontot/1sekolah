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