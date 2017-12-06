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

        if(!myUWS.initServer())throw exit_exception("initServer"); 
        if(!myUWS.runServer()) throw exit_exception("runServer"); 

        dr::release( std::cout );        
        return EXIT_SUCCESS;
    } 
    catch(std::exception const& e)
    {   std::cout << "\n========== Exception caught ===========";
        std::cout << "\n\tMessage:\r\t\t\t\t" << e.what()<<"\n";
        std::cout << "\n\tType:\r\t\t\t\t" << typeid(e).name()<<"\n";
        std::cout << "\n======================================="<<"\n";;
        
        dr::release( std::cout );
        
        //std::exit(e.c);
        
        return EXIT_FAILURE;
    }    

    return EXIT_SUCCESS;

}
