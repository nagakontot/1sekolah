#include "mymain.h"

int main() 
{   CGame  mygame;
    mygame.test();

    CConfig mycfg("./data/config.txt");
    
    ///////////////////////////////////////////////////////////////////////////////
    typedef CmyUWS< CServeronError,
                    CServeronHttpRequest,
                    CServeronMessage,
                    CServeronConnection,
                    CServeronDisconnection>     TmyServer;
            
    TmyServer myUWS("P1","P2","P3","P4","P5");

    if(!myUWS.initServer()) return -1;
    if(!myUWS.runServer())  return -1;
    
    ///////////////////////////////////////////////////////////////////////////////
    return 1;

}
