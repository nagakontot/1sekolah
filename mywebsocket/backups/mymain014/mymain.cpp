#include "mymain.h"
#include "drecho.hpp"

// default settings
const bool dr::log_timestamp    = true;
const bool dr::log_branch       = true;
const bool dr::log_branch_scope = true;
const bool dr::log_text         = true;
const bool dr::log_errno        = true;
const bool dr::log_location     = true;

int main() 
{   try 
    {   errno = EAGAIN;
        dr::capture( std::cout );
        std::signal(SIGINT, INThandler);
    
        CGame  mygame;
        mygame.test();
            
        CConfig mycfg("./data/config.txt");
    
        typedef CmyUWS< CServeronError,
                        CServeronHttpRequest,
                        CServeronMessage,
                        CServeronConnection,
                        CServeronDisconnection>     TmyUWS;
            
        TmyUWS myUWS("P1","P2","P3","P4","P5");

        if(!myUWS.initServer())throw exit_exception(-10); 
        if(!myUWS.runServer()) throw exit_exception(-20); 

        dr::release( std::cout );        
        return EXIT_SUCCESS;
    } 
    catch(exit_exception& e) 
    {   std::cout<<"\ncatch(exit_exception& e)";
        dr::release( std::cout );
        
        //std::exit(e.c);
        
        return EXIT_FAILURE;
    }    

    return EXIT_SUCCESS;

}
