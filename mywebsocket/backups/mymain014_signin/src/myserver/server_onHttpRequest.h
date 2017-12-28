#pragma once

typedef std::map<std::string,int>   MapType;
static MapType                      mymap;

static int myfilecounter    =-1;    //-ve because we are using prefix increment ++myfilecounter

#define INSERTMAP(k,c)  {   auto lb = mymap.lower_bound(k);\
                            if(lb != mymap.end() && !(mymap.key_comp()(k, lb->first)))\
                            {\
                            }\
                            else\
                            {   mymap.insert(lb, MapType::value_type(k, ++c));\
                            }\
                        }

//////////////////////////////////////////////////////////////////////////////////
/*
typedef map<int, int> MapType;    // Your map type may vary, just change the typedef

MapType mymap;
// Add elements to map here
int k = 4;   // assume we're searching for keys equal to 4
int v = 0;   // assume we want the value 0 associated with the key of 4

MapType::iterator lb = mymap.lower_bound(k);

if(lb != mymap.end() && !(mymap.key_comp()(k, lb->first)))
{   // key already exists, update lb->second if you care to
}
else
{   // the key does not exist in the map, add it to the map
    mymap.insert(lb, MapType::value_type(k, v));    // Use lb as a hint to insert, so it can avoid another lookup
}
*/
//////////////////////////////////////////////////////////////////////////////////

static std::stringstream    tempss;
//static std::atomic<int>     expectedRequests(0);

typedef std::vector<std::stringstream*> Tss;
static auto controlData = [](uWS::HttpResponse *res, char *data, size_t length, size_t remainingBytes) 
        //myfactory[EcontrolData] = [this, &expectedRequests](uWS::HttpResponse *res, char *data, size_t length, size_t remainingBytes) 
        {   std::string *buffer = (std::string *) res->httpSocket->getUserData();
            buffer->append(data, length);

            //std::cout << "\nHTTP POST, chunk: " << length << ", total: " << buffer->length() << ", remainingBytes: " << remainingBytes << std::endl;

            if (!remainingBytes) 
            {   // control the contents
                //for (unsigned int i = 0; i < buffer->length(); i++) 
                //{   if ((*buffer)[i] != char('0' + i % 10)) 
                //    {   //std::cout << "FAILURE: corrupt data received in HTTP post!" << std::endl;
                //        //exit(-1);
                //        //delete (std::string *) res->httpSocket->getUserData();
                //        //THROW1("FAILURE: corrupt data received in HTTP post!");
                //    }
                //}

                //expectedRequests++;
                //myfactory[EexpectedRequests].as<Tatom>()=myfactory[EexpectedRequests].as<Tatom>()+1;

                std::cout<<"\nres->httpSocket->getUserData()="<<buffer->c_str();
                delete (std::string *) res->httpSocket->getUserData();
                //res->end();
                //res->end(DHTMLPAGE[mymap["/main.html"]]->str().data(),DHTMLPAGE[mymap["/main.html"]]->str().length());
                
                res->end(   myfactory[Ehtmlpage].as<Tss>()[mymap["/main.html"]]->str().data(),
                            myfactory[Ehtmlpage].as<Tss>()[mymap["/main.html"]]->str().length());
                
                
            }
        };


template <typename T>                                                              
struct CServeronHttpRequest: public baseUWS<T>
{   std::string mText;
    //typedef std::vector<std::stringstream*> Tss;
    //typedef std::atomic<int>                Tatom;

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

        //myfactory[EexpectedRequests] = std::atomic<int>(0);        
        
        //myfactory[Ehtmlpage]    = std::vector<std::stringstream*>({new std::stringstream(),new std::stringstream(),new std::stringstream()});
#define X new std::stringstream()
	    myfactory[Ehtmlpage]    = std::vector<std::stringstream*>   ({  X,X,X,X,X,X,X,X,X,X,        //10x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //20x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //30x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //40x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //50x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //60x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //70x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //80x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //90x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //100x
	                                                                    
	                                                                    X,X,X,X,X,X,X,X,X,X,        //110x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //120x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //130x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //140x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //150x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //160x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //170x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //180x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //190x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //200x

	                                                                    X,X,X,X,X,X,X,X,X,X,        //210x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //220x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //230x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //240x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //250x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //260x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //270x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //280x
	                                                                    X,X,X,X,X,X,X,X,X,X,        //290x
	                                                                    X,X,X,X,X,X,X,X,X,X         //300x
	                                                                });
#undef  X	    

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
	    /////////////////////////////////////////////////////////////////////////////////
        //std::atomic<int> expectedRequests(0);
        //myfactory[EexpectedRequests] = std::atomic<int>(0);

        /*
        //auto controlData = [&h, &expectedRequests](uWS::HttpResponse *res, char *data, size_t length, size_t remainingBytes) 
        //auto controlData = [this, &expectedRequests](uWS::HttpResponse *res, char *data, size_t length, size_t remainingBytes) 
        auto controlData = [this](uWS::HttpResponse *res, char *data, size_t length, size_t remainingBytes) 
        //myfactory[EcontrolData] = [this, &expectedRequests](uWS::HttpResponse *res, char *data, size_t length, size_t remainingBytes) 
        {   std::string *buffer = (std::string *) res->httpSocket->getUserData();
            buffer->append(data, length);

            std::cout << "HTTP POST, chunk: " << length << ", total: " << buffer->length() << ", remainingBytes: " << remainingBytes << std::endl;

            if (!remainingBytes) 
            {   // control the contents
                for (unsigned int i = 0; i < buffer->length(); i++) 
                {   if ((*buffer)[i] != char('0' + i % 10)) 
                    {   //std::cout << "FAILURE: corrupt data received in HTTP post!" << std::endl;
                        //exit(-1);
                        THROW1("FAILURE: corrupt data received in HTTP post!");
                    }
                }

                expectedRequests++;
                //myfactory[EexpectedRequests].as<Tatom>()=myfactory[EexpectedRequests].as<Tatom>()+1;

                delete (std::string *) res->httpSocket->getUserData();
                res->end();
            }
        };
        */
        
        //derived().h.onHttpData([&controlData](uWS::HttpResponse *res, char *data, size_t length, size_t remainingBytes) 
        derived().h.onHttpData([this](uWS::HttpResponse *res, char *data, size_t length, size_t remainingBytes) 
        {   controlData(res, data, length, remainingBytes);
        });	    
	    //////////////////////////////////////////////////////////////////////////////////
	    //Tss htmlpage = myfactory[Ehtmlpage].as<Tss>();
	    
#define DHTMLPAGE myfactory[Ehtmlpage].as<Tss>()
        
	    //indexHtml << std::ifstream ("./public/index.html").rdbuf();
        INSERTMAP("/index.html",myfilecounter);
	    *DHTMLPAGE[mymap["/index.html"]]<< std::ifstream ("./public/index.html").rdbuf();
        if (!DHTMLPAGE[mymap["/index.html"]]->str().length())  {   std::cerr << "Failed to load index.html" << std::endl;return -1;}

        INSERTMAP("/main.html",myfilecounter);
	    *DHTMLPAGE[mymap["/main.html"]]<< std::ifstream ("./public/main.html").rdbuf();
        if (!DHTMLPAGE[mymap["/main.html"]]->str().length())  {   std::cerr << "Failed to load main.html" << std::endl;return -1;}
        
        
        //DHTMLPAGE.push_back(new std::stringstream());
	    //derived().h.onHttpRequest([](uWS::HttpResponse* res, uWS::HttpRequest req, char* data, size_t length, size_t remainingBytes) 
	    derived().h.onHttpRequest([this](uWS::HttpResponse* res, uWS::HttpRequest req, char* data, size_t length, size_t remainingBytes) 
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
                res->end(DHTMLPAGE[mymap["/index.html"]]->str().data(),DHTMLPAGE[mymap["/index.html"]]->str().length());
                
            } 
            else if (url == "/main.html") 
            {   //res->end(mainHtml.str().data(), mainHtml.str().length());
                //res->end(DHTMLPAGE[mymap["/main.html"]]->str().data(),DHTMLPAGE[mymap["/main.html"]]->str().length());
            } 
            else
            {   // i guess this should be done more gracefully?
                //res->end(nullptr, 0);
                //res->end(indexHtml.str().data(), indexHtml.str().length());
                //res->end(DHTMLPAGE[0]->str().data(),DHTMLPAGE[0]->str().length());
                
                //std::cout << url.c_str() << ", method = "<<req.getMethod()<< std::endl;
                
                //std::ifstream input( url.c_str(), std::ios::binary );
                //std::vector<char> buffer((std::istreambuf_iterator<char>(input)), (std::istreambuf_iterator<char>()));  // copies all data into buffer
                //res->end(buffer.data(),buffer.size());
                
                std::string fname(std::string("./public")+url);
                
/*
                //std::stringstream().swap(*DHTMLPAGE[2]);  //gcc doesnt have swap
                DHTMLPAGE[2]->str(std::string());  //clear up
                DHTMLPAGE[2]->clear();

	            *DHTMLPAGE[2]<< std::ifstream (fname.c_str()).rdbuf();
                if (!DHTMLPAGE[2]->str().length())  {   std::cerr << "Failed to load "<< fname.c_str()<< std::endl;}
                res->end(DHTMLPAGE[2]->str().data(),DHTMLPAGE[2]->str().length());
*/              
                switch(req.getMethod())
                {   case uWS::HttpMethod::METHOD_GET:       
                                                {   std::cout<<"\nGET: ";
                                                    auto lb = mymap.lower_bound(url.c_str());
                                                    if(lb != mymap.end() && !(mymap.key_comp()(url.c_str(), lb->first)))
                                                    {   //already exist
                                                        std::cout<<"res "<<url.c_str()<<" already exist in map["<<mymap[url.c_str()]<<"], myfilecounter="<<myfilecounter;
                                                        res->end(DHTMLPAGE[mymap[url.c_str()]]->str().data(),DHTMLPAGE[mymap[url.c_str()]]->str().length());
                                                    }
                                                    else
                                                    {   if(!std::ifstream (fname.c_str()).good())
                                                        {   std::cout<<"\nGET: "<<fname.c_str()<<" NOT FOUND!";
                                                            //fname="./public/index.html";
                                                        }
                                                        else
                                                        {   //insert new
                                                            mymap.insert(lb, MapType::value_type(url.c_str(), ++myfilecounter));
                                                            std::cout<<"new res "<<url.c_str()<<" is created in map["<<mymap[url.c_str()]<<"], myfilecounter="<<myfilecounter;
                
                                                            *DHTMLPAGE[mymap[url.c_str()]]<< std::ifstream (fname.c_str()).rdbuf();
                                                            if (!DHTMLPAGE[mymap[url.c_str()]]->str().length())  {   std::cerr << "Failed to load "<< fname.c_str()<< std::endl;}
                                                            res->end(DHTMLPAGE[mymap[url.c_str()]]->str().data(),DHTMLPAGE[mymap[url.c_str()]]->str().length());                
                                                        }                                                                
                                                    }
                                                }
                                                break;
                                                /////////////////////////////////////////////////////////////////////
                    case uWS::HttpMethod::METHOD_POST:      
                                                {   /*
                                                    if(!std::ifstream (fname.c_str()).good())
                                                    {   std::cout<<"\nPOST: "<<fname.c_str()<<" NOT FOUND!";
                                                        fname="./public/index.html";
                                                    }
                                                    std::cout<<"\nPOST: "<<url;
                                                    tempss.str(std::string());
                                                    tempss.clear();
                                                    tempss << std::ifstream (fname.c_str()).rdbuf();
                                                    res->end(tempss.str().data(), tempss.str().length());
                                                    */
                                                    std::cout<<"\nPOST: "<<url;
                                                    res->httpSocket->setUserData(new std::string);
                                                    controlData(res, data, length, remainingBytes);
                                                }
                                                break;
                                                /////////////////////////////////////////////////////////////////////
                    case uWS::HttpMethod::METHOD_PUT:       std::cout<<"\nPUT:";break;
                                                /////////////////////////////////////////////////////////////////////
                    case uWS::HttpMethod::METHOD_DELETE:    std::cout<<"\nDELETE:";break;
                                                /////////////////////////////////////////////////////////////////////
                    case uWS::HttpMethod::METHOD_PATCH:     std::cout<<"\nPATCH:";break;
                                                /////////////////////////////////////////////////////////////////////
                    case uWS::HttpMethod::METHOD_OPTIONS:   std::cout<<"\nOPTIONS:";break;
                                                /////////////////////////////////////////////////////////////////////
                    case uWS::HttpMethod::METHOD_HEAD:      std::cout<<"\nHEAD:";break;
                                                /////////////////////////////////////////////////////////////////////
                    case uWS::HttpMethod::METHOD_TRACE:     std::cout<<"\nTRACE:";break;
                                                /////////////////////////////////////////////////////////////////////
                    case uWS::HttpMethod::METHOD_CONNECT:   std::cout<<"\nCONNECT:";break;
                                                /////////////////////////////////////////////////////////////////////
                    case uWS::HttpMethod::METHOD_INVALID:   std::cout<<"\nINVALID:";break;
                                                /////////////////////////////////////////////////////////////////////
                    default:                    std::cout<<"\nunknown:";break;                    
                }
                
            }
        });

#undef DHTMLPAGE

        return 1;
    }    
};     
        
