#pragma once

typedef std::vector<std::stringstream*> Tss;
typedef std::map<std::string,int>       MapType;
static MapType                          mymap;

static int myfilecounter                =-1;    //-ve because we are using prefix increment ++myfilecounter

#define INSERTMAP(k,c)  {   auto lb = mymap.lower_bound(k);\
                            if(lb != mymap.end() && !(mymap.key_comp()(k, lb->first)))\
                            {\
                            }\
                            else\
                            {   mymap.insert(lb, MapType::value_type(k, ++c));\
                            }\
                        }


#define DHTMLPAGE       myfactory[Ehtmlpage].as<Tss>()

//////////////////////////////////////////////////////////////////////////////////
static std::stringstream                tempss;
//static std::atomic<int>               expectedRequests(0);

static std::string rsa_pub_key1(
R"(-----BEGIN PUBLIC KEY-----
MIIDJjCCAg6gAwIBAgIIGArQgu26eyowDQYJKoZIhvcNAQEFBQAwNjE0MDIGA1UE
AxMrZmVkZXJhdGVkLXNpZ25vbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTAe
Fw0xNzEyMjkxMTQzMzRaFw0xODAxMDExMjEzMzRaMDYxNDAyBgNVBAMTK2ZlZGVy
YXRlZC1zaWdub24uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqG
SIb3DQEBAQUAA4IBDwAwggEKAoIBAQDqh6LRVyFUZ6y7WKDoCWkvH94DfKwxCdfK
S1fulcibItZWXWKiiKE+nzDRkuTs9isT5KKTluDg+GHv57wUs9ge/SlJzf4fwuc1
31yoCdRccOQuBenB5rQV0ySoOiBX/WQc1PYidv6QotmpR3tDJm8mTQgbBbEvaFiS
zoOxK2beTc07ZrUSL82sj99eB3dpwPn4CAsrcFk31pFE1Xpbj8iuw3nb8+Bex3K4
LwGnVN7oaYCs0J5XlG+/wMCrXtf2iaxXd6YQC+p+v+cmzc54KzFzqx/+m4puWt1U
BfKB21ACoX8f8hYwCbu12aaTHnwowOdm9zJ05dHkhGd6BsmdKwa5AgMBAAGjODA2
MAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsG
AQUFBwMCMA0GCSqGSIb3DQEBBQUAA4IBAQCqCzMkY7OaW4ADbf2ATDI9G3uxZemO
6YYwa7lIVJNUkgWp+4r0SkNAaeMUZPYvNCNolVFjsR9ZQPZo3LvwRbZAAzs+GiPD
FldHdbZIvN3muzzSntn2tsBO7bYZUiEoilDYfjMuztzN3JDA+gN+qeybkXvxBiFz
F0gTU41PxcOgySPl83AW1GDSCuUeD4zxrqXlseqZwdAbgnsCEKm93c6aO67nmrb+
b/5+i6olpimy/RF5/Wt5Bd4y0qhbpr9KsC7IMM3h0B/k66bqmuONbKc4LodFLmVK
31mLL75U87NzeodODzq2xVdDyQaxFq2LY96HxdNHBmDLTnpX5cWcw/Xi
-----END PUBLIC KEY-----)");

static std::string rsa_pub_key2(
R"(-----BEGIN PUBLIC KEY-----
MIGJAoGBAKyFZt4dVhm7yo5r866cDxXsgFiHj91vO8/gvZNGGq3jyBdGO+yoGjAf
N3Fb+R6fOQoXvmf52/8tJAYazoWuP6v+oBRDocs/D1GUs3WNs5IV/A3Ivr4nPR7p
S+XBVowxj18HpBy5vxJl5D5Cru/up25MZsHFUDBl9pRHmsAqqjZpAgMBAAE=
-----END PUBLIC KEY-----)");

        static auto controlData = [](uWS::HttpResponse *res, char *data, size_t length, size_t remainingBytes) 
        //myfactory[EcontrolData] = [this, &expectedRequests](uWS::HttpResponse *res, char *data, size_t length, size_t remainingBytes) 
        {   //////////////////////////////////////////////////////////////////////////
            std::string *buffer = (std::string *) res->httpSocket->getUserData();
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
                ////////////////////////////////////////////////////////////////////////
                std::string id_token    = buffer->c_str();
                std::string s           = "id_token=";

                std::string::size_type i = id_token.find(s);
                if (i != std::string::npos)id_token.erase(i, s.length());
   
                //dr::release( std::cout ); 
                //std::cout<<"\nres->httpSocket->getUserData()="<<buffer->c_str();
                //std::cout<<"\nres->httpSocket->getUserData()="<<id_token;
                //dr::capture( std::cout );
                ////////////////////////////////////////////////////////////////////////
                /*                                
                //std::string rsa_pub_key1{"MIIDJjCCAg6gAwIBAgIIGArQgu26eyowDQYJKoZIhvcNAQEFBQAwNjE0MDIGA1UE\nAxMrZmVkZXJhdGVkLXNpZ25vbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTAe\nFw0xNzEyMjkxMTQzMzRaFw0xODAxMDExMjEzMzRaMDYxNDAyBgNVBAMTK2ZlZGVy\nYXRlZC1zaWdub24uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqG\nSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDqh6LRVyFUZ6y7WKDoCWkvH94DfKwxCdfK\nS1fulcibItZWXWKiiKE+nzDRkuTs9isT5KKTluDg+GHv57wUs9ge/SlJzf4fwuc1\n31yoCdRccOQuBenB5rQV0ySoOiBX/WQc1PYidv6QotmpR3tDJm8mTQgbBbEvaFiS\nzoOxK2beTc07ZrUSL82sj99eB3dpwPn4CAsrcFk31pFE1Xpbj8iuw3nb8+Bex3K4\nLwGnVN7oaYCs0J5XlG+/wMCrXtf2iaxXd6YQC+p+v+cmzc54KzFzqx/+m4puWt1U\nBfKB21ACoX8f8hYwCbu12aaTHnwowOdm9zJ05dHkhGd6BsmdKwa5AgMBAAGjODA2\nMAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsG\nAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4IBAQCqCzMkY7OaW4ADbf2ATDI9G3uxZemO\n6YYwa7lIVJNUkgWp+4r0SkNAaeMUZPYvNCNolVFjsR9ZQPZo3LvwRbZAAzs+GiPD\nFldHdbZIvN3muzzSntn2tsBO7bYZUiEoilDYfjMuztzN3JDA+gN+qeybkXvxBiFz\nF0gTU41PxcOgySPl83AW1GDSCuUeD4zxrqXlseqZwdAbgnsCEKm93c6aO67nmrb+\nb/5+i6olpimy/RF5/Wt5Bd4y0qhbpr9KsC7IMM3h0B/k66bqmuONbKc4LodFLmVK\n31mLL75U87NzeodODzq2xVdDyQaxFq2LY96HxdNHBmDLTnpX5cWcw/Xi"};
                //std::string rsa_pub_key1{"MIIDJjCCAg6gAwIBAgIIGArQgu26eyowDQYJKoZIhvcNAQEFBQAwNjE0MDIGA1UEAxMrZmVkZXJhdGVkLXNpZ25vbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTAeFw0xNzEyMjkxMTQzMzRaFw0xODAxMDExMjEzMzRaMDYxNDAyBgNVBAMTK2ZlZGVyYXRlZC1zaWdub24uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDqh6LRVyFUZ6y7WKDoCWkvH94DfKwxCdfKS1fulcibItZWXWKiiKE+nzDRkuTs9isT5KKTluDg+GHv57wUs9ge/SlJzf4fwuc131yoCdRccOQuBenB5rQV0ySoOiBX/WQc1PYidv6QotmpR3tDJm8mTQgbBbEvaFiSzoOxK2beTc07ZrUSL82sj99eB3dpwPn4CAsrcFk31pFE1Xpbj8iuw3nb8+Bex3K4LwGnVN7oaYCs0J5XlG+/wMCrXtf2iaxXd6YQC+p+v+cmzc54KzFzqx/+m4puWt1UBfKB21ACoX8f8hYwCbu12aaTHnwowOdm9zJ05dHkhGd6BsmdKwa5AgMBAAGjODA2MAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsGAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4IBAQCqCzMkY7OaW4ADbf2ATDI9G3uxZemO6YYwa7lIVJNUkgWp+4r0SkNAaeMUZPYvNCNolVFjsR9ZQPZo3LvwRbZAAzs+GiPDFldHdbZIvN3muzzSntn2tsBO7bYZUiEoilDYfjMuztzN3JDA+gN+qeybkXvxBiFzF0gTU41PxcOgySPl83AW1GDSCuUeD4zxrqXlseqZwdAbgnsCEKm93c6aO67nmrb+b/5+i6olpimy/RF5/Wt5Bd4y0qhbpr9KsC7IMM3h0B/k66bqmuONbKc4LodFLmVK31mLL75U87NzeodODzq2xVdDyQaxFq2LY96HxdNHBmDLTnpX5cWcw/Xi"};
                
                //auto decoded = jwt::decode(t.c_str(), rsa_pub_key1y, { "HS256", "HS384" });
                //auto decoded = jwt::decode(id_token, rsa_pub_key1, { "RS256" });

                json decoded = jwt::decode(id_token, rsa_pub_key1, { "RS256" });

                //dr::release( std::cout ); 
                std::cout<<"\ndecoded = jwt::decode(id_token_new, key, { 'RS256' })="<<decoded.dump()<<std::endl;
                //dr::capture( std::cout );
                
                // Verify the standard claims.
                jwt::AcceptedParameters params{};

                //params.issuers = { "my company", "your company" };
                params.audience = { "151812089305-308f2br54heobdu5fiph9sdk8g78bmbe.apps.googleusercontent.com" };
                
                //auto isValid = jwt::verify(decoded, jwt::claims::ISS | jwt::claims::IAT | jwt::claims::AUD, params);
                auto isValid = jwt::verify(decoded, jwt::claims::AUD, params);
                std::cout<<"\njwt::verify(decoded, jwt::claims::AUD, params)=="<<isValid;
                */
                /////////////////////////////////////////////////////////////////////////
                /*
                const std::string const_id_token(id_token);
                jwt_verify::json_web_token jwt{const_id_token};
                const std::string secret_key{"MIIDJjCCAg6gAwIBAgIIGArQgu26eyowDQYJKoZIhvcNAQEFBQAwNjE0MDIGA1UE\nAxMrZmVkZXJhdGVkLXNpZ25vbi5zeXN0ZW0uZ3NlcnZpY2VhY2NvdW50LmNvbTAe\nFw0xNzEyMjkxMTQzMzRaFw0xODAxMDExMjEzMzRaMDYxNDAyBgNVBAMTK2ZlZGVy\nYXRlZC1zaWdub24uc3lzdGVtLmdzZXJ2aWNlYWNjb3VudC5jb20wggEiMA0GCSqG\nSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDqh6LRVyFUZ6y7WKDoCWkvH94DfKwxCdfK\nS1fulcibItZWXWKiiKE+nzDRkuTs9isT5KKTluDg+GHv57wUs9ge/SlJzf4fwuc1\n31yoCdRccOQuBenB5rQV0ySoOiBX/WQc1PYidv6QotmpR3tDJm8mTQgbBbEvaFiS\nzoOxK2beTc07ZrUSL82sj99eB3dpwPn4CAsrcFk31pFE1Xpbj8iuw3nb8+Bex3K4\nLwGnVN7oaYCs0J5XlG+/wMCrXtf2iaxXd6YQC+p+v+cmzc54KzFzqx/+m4puWt1U\nBfKB21ACoX8f8hYwCbu12aaTHnwowOdm9zJ05dHkhGd6BsmdKwa5AgMBAAGjODA2\nMAwGA1UdEwEB/wQCMAAwDgYDVR0PAQH/BAQDAgeAMBYGA1UdJQEB/wQMMAoGCCsG\nAQUFBwMCMA0GCSqGSIb3DQEBBQUAA4IBAQCqCzMkY7OaW4ADbf2ATDI9G3uxZemO\n6YYwa7lIVJNUkgWp+4r0SkNAaeMUZPYvNCNolVFjsR9ZQPZo3LvwRbZAAzs+GiPD\nFldHdbZIvN3muzzSntn2tsBO7bYZUiEoilDYfjMuztzN3JDA+gN+qeybkXvxBiFz\nF0gTU41PxcOgySPl83AW1GDSCuUeD4zxrqXlseqZwdAbgnsCEKm93c6aO67nmrb+\nb/5+i6olpimy/RF5/Wt5Bd4y0qhbpr9KsC7IMM3h0B/k66bqmuONbKc4LodFLmVK\n31mLL75U87NzeodODzq2xVdDyQaxFq2LY96HxdNHBmDLTnpX5cWcw/Xi"};
		        std::cout << jwt.verify(secret_key) << std::endl;
		        */
                ////////////////////////////////////////////////////////////////////////
                //auto verify = jwt::verify()
                //                .allow_algorithm(jwt::algorithm::rs256(rsa_pub_key1, "", "", ""))
                //                .with_issuer("accounts.google.com");

                auto decoded_token = jwt::decode(id_token);
	            //verify.verify(decoded_token);                
                //std::string issuer = decoded_token.get_issuer();
                //std::cout<<"\nAlgo: "<<decoded_token.get_algorithm()<<", issuer:"<<issuer<<std::endl;
                
                ////////////////////////////////////////////////////////////////////////                
                /*
                std::string s = buffer->c_str();
                std::string delimiter = "=";

                size_t pos = 0;
                std::string token;
                std::string id;
                
                std::vector<int>    iv;
                while ((pos = s.find(delimiter)) != std::string::npos) 
                {   std::string().swap(token);
                    token = s.substr(0, pos);
                    //std::cout << token << std::endl;
                    s.erase(0, pos + delimiter.length());
                    
                    std::string().swap(id);
                    for(std::string::size_type i = 0; i < token.size(); ++i) 
                    {   if(token[i]=='&')
                        {   iv.push_back(std::stoi( id ));
                            //std::cout << id << std::endl;
                            //std::cout << iv.back() << std::endl;
                            
                            char ascii = iv.back();
                            std::cout << iv.back() << " = " << ascii << std::endl;
                            break;
                        }
                        id+=token[i];
                    }
                }
                */
                /////////////////////////////////////////////////////////////////////////
                
                delete (std::string *) res->httpSocket->getUserData();
                //res->end();

                if(decoded_token.get_issuer()=="accounts.google.com")   
                {   std::cout<<"\nSUCCESS, JWT is verified.";
                    res->end(DHTMLPAGE[mymap["/main.html"]]->str().data(),DHTMLPAGE[mymap["/main.html"]]->str().length());
                    
                    //const char* pointer = DHTMLPAGE[mymap["/main.html"]]->str().data();//data.data();
                    //std::size_t size    = DHTMLPAGE[mymap["/main.html"]]->str().length();//data.size();
                    //std::string compressed_data = gzip::compress(pointer, size);
                }
                else                                                    
                {   std::cout<<"\nFAIL, JWT is NOT verified.";
                    res->end(DHTMLPAGE[mymap["/index.html"]]->str().data(),DHTMLPAGE[mymap["/index.html"]]->str().length());                    
                }

                //if(decoded_token.get_issuer()=="accounts.google.com")   res->end(myfactory[Ehtmlpage].as<Tss>()[mymap["/main.html"]]->str().data(),myfactory[Ehtmlpage].as<Tss>()[mymap["/main.html"]]->str().length());
                //else                                                    res->end(myfactory[Ehtmlpage].as<Tss>()[mymap["/index.html"]]->str().data(),myfactory[Ehtmlpage].as<Tss>()[mymap["/index.html"]]->str().length());                    

                //if(isValid) res->end(myfactory[Ehtmlpage].as<Tss>()[mymap["/main.html"]]->str().data(),myfactory[Ehtmlpage].as<Tss>()[mymap["/main.html"]]->str().length());
                //else        res->end(myfactory[Ehtmlpage].as<Tss>()[mymap["/index.html"]]->str().data(),myfactory[Ehtmlpage].as<Tss>()[mymap["/index.html"]]->str().length());    
                
                
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
	                                                                    X,X,X,X,X,X,X,X,X,X         //200x
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
	    
//#define DHTMLPAGE myfactory[Ehtmlpage].as<Tss>()
        
        //////////////////////////////////////////////////////////////

        //////////////////////////////////////////////////////////////
	    //indexHtml << std::ifstream ("./public/index.html").rdbuf();
        INSERTMAP("/index.html",myfilecounter);
	    *DHTMLPAGE[mymap["/index.html"]]<< std::ifstream ("./public/index.html").rdbuf();
        if (!DHTMLPAGE[mymap["/index.html"]]->str().length())  {   std::cerr << "Failed to load index.html" << std::endl;return -1;}

        ///////////////////////////////////////////////////////////////
        /*
        std::string compressedData;
        GZipCodec::Compress(DHTMLPAGE[mymap["/index.html"]]->str(), compressedData);
        
        char response[] = "HTTP/1.1 200 OK\r\n"
        "Content-Type: text/html; charset=UTF-8\r\n"
        "Content-Encoding: gzip\r\n"
        "Connection: keep-alive\r\n"
        "Server: PakAbu\r\n"
        "Vary: Accept-Encoding\r\n\r\n";

        std::string outputstr(response);
        outputstr += compressedData;
        
        //std::string input;
        //std::cin >> input;
        std::ofstream out("./public/index_.html");
        out << outputstr;//compressedData;
        out.close();
    
        //std::stringstream().swap(*DHTMLPAGE[2]);  //gcc doesnt have swap
        DHTMLPAGE[mymap["/index.html"]]->str(std::string());  //clear up
        DHTMLPAGE[mymap["/index.html"]]->clear();

        *DHTMLPAGE[mymap["/index.html"]]<< std::ifstream ("./public/index_.html").rdbuf(); //<< compressedData.c_str();
        if (!DHTMLPAGE[mymap["/index.html"]]->str().length())  {   std::cerr << "Failed to load gzip"<<std::endl;}
*/
        ///////////////////////////////////////////////////////////////

        INSERTMAP("/main.html",myfilecounter);
	    *DHTMLPAGE[mymap["/main.html"]]<< std::ifstream ("./public/main.html").rdbuf();
        if (!DHTMLPAGE[mymap["/main.html"]]->str().length())  {   std::cerr << "Failed to load main.html" << std::endl;return -1;}
        
        
        //DHTMLPAGE.push_back(new std::stringstream());
	    //derived().h.onHttpRequest([](uWS::HttpResponse* res, uWS::HttpRequest req, char* data, size_t length, size_t remainingBytes) 
	    derived().h.onHttpRequest([this](uWS::HttpResponse* res, uWS::HttpRequest req, char* data, size_t length, size_t remainingBytes) 
        {   ///////////////////////////////////////////////////////////////////////////////
            //std::string s1(req.getHeader("accept-encoding").toString());
			//std::string s2(req.getHeader("accept-language").toString());
			//std::string s3(req.getHeader("cache-control").toString());
			//std::string s4(req.getHeader("connection").toString());
			//std::string s5(req.getHeader("host").toString());
			//std::string s6(req.getHeader("origin").toString());
			//std::string s7(req.getHeader("pragma").toString());
			//std::string s8(req.getHeader("sec-websocket-extensions").toString());
			//std::string s9(req.getHeader("sec-websocket-key").toString());
			//std::string s10(req.getHeader("sec-webSocket-version").toString());
			//std::string s11(req.getHeader("upgrade").toString());
			//std::string s12(req.getHeader("user-agent").toString());

			//std::cout   //<<"\naccept-encoding:           "<<s1
					    //<<"\naccept-language:           "<<s2
					    //<<"\ncache-control:             "<<s3
					    //<<"\nconnection:                "<<s4
					    //<<"\nhost:                      "<<s5
					    //<<"\norigin:                    "<<s6
					    //<<"\npragma:                    "<<s7
					    //<<"\nsec-websocket-extensions:  "<<s8
					    //<<"\nsec-websocket-key:         "<<s9
					    //<<"\nsec-webSocket-version:     "<<s10
					    //<<"\nupgrade:                   "<<s11
					    //<<"\nuser-agent:                "<<s12
					    //<<std::endl;
            ///////////////////////////////////////////////////////////////////////////////
            //header is not found!!
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
                                                    
                                                    if(data) 
                                                    {   if(url=="/id_token.html")
                                                        {   res->httpSocket->setUserData(new std::string);
                                                            controlData(res, data, length, remainingBytes);
                                                        }
                                                    }    
                                                }
                                                break;
                                                /////////////////////////////////////////////////////////////////////
                    //case uWS::HttpMethod::METHOD_PUT:       std::cout<<"\nPUT:";break;
                                                /////////////////////////////////////////////////////////////////////
                    //case uWS::HttpMethod::METHOD_DELETE:    std::cout<<"\nDELETE:";break;
                                                /////////////////////////////////////////////////////////////////////
                    //case uWS::HttpMethod::METHOD_PATCH:     std::cout<<"\nPATCH:";break;
                                                /////////////////////////////////////////////////////////////////////
                    //case uWS::HttpMethod::METHOD_OPTIONS:   std::cout<<"\nOPTIONS:";break;
                                                /////////////////////////////////////////////////////////////////////
                    //case uWS::HttpMethod::METHOD_HEAD:      std::cout<<"\nHEAD:";break;
                                                /////////////////////////////////////////////////////////////////////
                    //case uWS::HttpMethod::METHOD_TRACE:     std::cout<<"\nTRACE:";break;
                                                /////////////////////////////////////////////////////////////////////
                    //case uWS::HttpMethod::METHOD_CONNECT:   std::cout<<"\nCONNECT:";break;
                                                /////////////////////////////////////////////////////////////////////
                    //case uWS::HttpMethod::METHOD_INVALID:   std::cout<<"\nINVALID:";break;
                                                /////////////////////////////////////////////////////////////////////
                    default:                    std::cout<<"\nunknown:";break;                    
                }
                
            }
        });

//#undef DHTMLPAGE

        return 1;
    }    
};     
        

#undef DHTMLPAGE
#undef INSERTMAP