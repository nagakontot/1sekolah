#include "mymain.h"

// default settings
const bool dr::log_timestamp    = true;
const bool dr::log_branch       = true;
const bool dr::log_branch_scope = true;
const bool dr::log_text         = true;
const bool dr::log_errno        = true;
const bool dr::log_location     = true;


int main() 
{   errno = EAGAIN;
    dr::highlight( DR_YELLOW,{ "warn",      "warning"   } );
    dr::highlight( DR_GREEN, { "info",      "debug"     } );
    dr::highlight( DR_CYAN,  { "another",   "branch"    } );
    dr::capture( std::cout );

    dr::tab scope;
    {   CGame  mygame;

        dr::tab scope;
        {   mygame.test();
            
            dr::tab scope;
            {   CConfig mycfg("./data/config.txt");
            }
        }
    }
    
    ///////////////////////////////////////////////////////////////////////////////
    typedef CmyUWS< CServeronError,
                    CServeronHttpRequest,
                    CServeronMessage,
                    CServeronConnection,
                    CServeronDisconnection>     TmyUWS;
            
    TmyUWS myUWS("P1","P2","P3","P4","P5");

    if(!myUWS.initServer()) return -1;
    if(!myUWS.runServer())  return -1;
    
    ///////////////////////////////////////////////////////////////////////////////
    dr::release( std::cout );
    
    return 1;

}
