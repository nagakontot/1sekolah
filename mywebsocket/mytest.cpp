#include "myutils.h"
#include <uWS/uWS.h>

#include <vector>

// test class
class MyClass
{
  public:
    int  m_nInt;
    char m_cChar;
    char m_sBuff[10];
};


//////////////////////////////////////////////////////////////////

std::vector<std::string>    storedMessages;
std::vector<int>            excludedMessages;
std::stringstream           indexHtml;
std::stringstream           mainHtml;
std::string                 pidString;

int connections = 0;

int getKb() 
{   std::string     line;
    std::ifstream   self("/proc/self/status");
    int             vmData, 
                    vmStk, 
                    vmPte;

    while(!self.eof()) 
    {   std::getline(self, line, ':');
             if (line == "VmPTE")   self >> vmPte;
        else if (line == "VmData")  self >> vmData;
        else if (line == "VmStk")   self >> vmStk;
        
        std::getline(self, line);
    }
    return vmData - vmStk - vmPte;
}

int main() 
{   

    CConfig mycfg("config.txt");
    
    /////////////////////////
    try 
    {   typedef MemMap::MemMapFilePtr<MyClass> MemMappedClass;
      
        // create a object of wrapper class
        MemMappedClass MemClass("/tmp/mymemmap");
      
        // now use MemClass as pointer of MyClass object.
        MemClass->m_nInt        = 5;            // Write  int as pointer
        (*MemClass).m_cChar     = 'a';          // dereference it and write char
        strcpy(MemClass->m_sBuff, "12345678");  // write as buff
      
        std::cout << "m_nInt:"  << MemClass->m_nInt  << std::endl;
        std::cout << "m_cChar:" << MemClass->m_cChar << std::endl;
        std::cout << "m_sBuff:" << MemClass->m_sBuff << std::endl;
    }
    catch (MemMap::MemMapFileException &e) 
    {   std::cout << e.what() << std::endl;
    }
    /////////////////////////
    
    uWS::Hub h;

    indexHtml << std::ifstream ("index.html").rdbuf();
    if (!indexHtml.str().length()) 
    {   std::cerr << "Failed to load index.html" << std::endl;
        return -1;
    }

    mainHtml << std::ifstream ("main.html").rdbuf();
    if (!mainHtml.str().length()) 
    {   std::cerr << "Failed to load main.html" << std::endl;
        return -1;
    }

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

    h.onMessage([&h](uWS::WebSocket<uWS::SERVER>* ws, char *data, size_t length, uWS::OpCode opCode) 
    {   if (length && data[0] != 'S' && length < 4096) 
        {   // add this message to the store, cut off old messages
            if (storedMessages.size() == 50) 
            {   storedMessages.erase(storedMessages.begin());
            }
            storedMessages.push_back(std::string(data, length));
            //std::cout << "Message posted: " << storedMessages.back() << std::endl;

            // simply broadcast this message to everyone (completely without any timeout optimization!)
            h.getDefaultGroup<uWS::SERVER>().broadcast(data, length, uWS::TEXT);
        }
    });

    h.onDisconnection([&h](uWS::WebSocket<uWS::SERVER>* ws, int code, char *message, size_t length) 
    {   // broadcast number of clients connected to everyone
        std::string tmp = "S " + std::to_string(--connections) + " " +  std::to_string(getKb());
        h.getDefaultGroup<uWS::SERVER>().broadcast(tmp.data(), tmp.length(), uWS::TEXT);
    });
    
    h.getDefaultGroup<uWS::SERVER>().startAutoPing(30000);
    if (h.listen(6000)) 
    {   std::cout << "Listening to port 6000" << std::endl;
    } 
    else 
    {   std::cerr << "Failed to listen to port" << std::endl;
        return -1;
    }
    h.run();
}