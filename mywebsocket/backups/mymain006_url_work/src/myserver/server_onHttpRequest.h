#pragma once


//////////////////////////////////////////////////////////////////////////////////

template <typename T>                                                              
struct CServeronHttpRequest: public baseUWS<T>
{   std::string mText;
    typedef std::vector<std::stringstream*> Tss;
    
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
	    
	    myfactory[Ehtmlpage]    = std::vector<std::stringstream*>({new std::stringstream(),new std::stringstream(),new std::stringstream()});
    }
    
    ~CServeronHttpRequest()
    {   //std::cout<<"\nDeleting std::vector<std::stringstream*> in myfactory[Ehtmlpage]";
        //deleteVectorPointer(myfactory[Ehtmlpage].as<Tss>());
        quitHttpRequest_();
    }

    auto initonHttpRequest()   
    {   return derived().initonHttpRequest_();
    }
    
    auto quitHttpRequest()
    {   return derived().quitHttpRequest_();
    }
    
    int quitHttpRequest_()
    {   std::cout<<"\nDeleting std::vector<std::stringstream*> in myfactory[Ehtmlpage]";
        deleteVectorPointer(myfactory[Ehtmlpage].as<Tss>());
        return 1;
    }
    
    int initonHttpRequest_()
	{   
	    //Tss htmlpage = myfactory[Ehtmlpage].as<Tss>();
	    
#define DHTMLPAGE myfactory[Ehtmlpage].as<Tss>()

	    //indexHtml << std::ifstream ("./public/index.html").rdbuf();
	    *DHTMLPAGE[0]<< std::ifstream ("./public/index.html").rdbuf();
        if (!DHTMLPAGE[0]->str().length())  {   std::cerr << "Failed to load index.html" << std::endl;return -1;}

	    *DHTMLPAGE[1]<< std::ifstream ("./public/main.html").rdbuf();
        if (!DHTMLPAGE[1]->str().length())  {   std::cerr << "Failed to load main.html" << std::endl;return -1;}

	    derived().h.onHttpRequest([](uWS::HttpResponse* res, uWS::HttpRequest req, char* data, size_t, size_t) 
        {   //header is not found!!
            //res->header("Access-Control-Allow-Origin", "*");
            //res->header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            
            
            
            //std::cout<<"req.getHeader('Access-Control-Allow-Origin') = " << req.getHeader("Access-Control-Allow-Origin").toString() << std::endl;
            //std::cout<<"req.getHeader('Access-Control-Allow-Headers')= " << req.getHeader("Access-Control-Allow-Headers").toString() << std::endl;
            


            //std::cout<<"req.getUrl().valueLength = " << len << std::endl;
            //std::cout<<"req.getUrl().value = " << req.getUrl().value << std::endl;
        
            std::string url(req.getUrl().toString());
            //std::cout << url.c_str() << ", method = "<<req.getMethod()<< std::endl;
            
            if (url == "/") 
            {   //res->end(indexHtml.str().data(),indexHtml.str().length());
                res->end(DHTMLPAGE[0]->str().data(),DHTMLPAGE[0]->str().length());
                
            } 
            else if (url == "/main.html") 
            {   //res->end(mainHtml.str().data(), mainHtml.str().length());
                res->end(DHTMLPAGE[1]->str().data(),DHTMLPAGE[1]->str().length());
            } 
            else 
            {   // i guess this should be done more gracefully?
                //res->end(nullptr, 0);
                //res->end(indexHtml.str().data(), indexHtml.str().length());
                //res->end(DHTMLPAGE[0]->str().data(),DHTMLPAGE[0]->str().length());
                
                std::cout << url.c_str() << ", method = "<<req.getMethod()<< std::endl;
                
                //std::ifstream input( url.c_str(), std::ios::binary );
                //std::vector<char> buffer((std::istreambuf_iterator<char>(input)), (std::istreambuf_iterator<char>()));  // copies all data into buffer
                //res->end(buffer.data(),buffer.size());
                
                std::string fdir("./public");
                std::string fname(fdir+url);
	            *DHTMLPAGE[2]<< std::ifstream (fname.c_str()).rdbuf();
                if (!DHTMLPAGE[2]->str().length())  {   std::cerr << "Failed to load index.html" << std::endl;}
                res->end(DHTMLPAGE[2]->str().data(),DHTMLPAGE[2]->str().length());
                
            }
        });

#undef DHTMLPAGE

        return 1;
    }    
};     
        