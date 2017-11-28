#include "mymain.h"

int main() 
{   CGame  mygame;
    mygame.test();

    CConfig mycfg("./data/config.txt");
    
    ///////////////////////////////////////////////////////////////////////////////
    typedef CmyUWS< CServer,
                    CServerOnError,
                    CServeronHttpRequest,
                    CServeronMessage,
                    CServeronConnection,
                    CServeronDisconnection>     TmyServer;
            
    TmyServer myUWS("P1","P2","P3","P4","P5","P6");

    if(!myUWS.initServer())           return -1;

	//if(!myUWS.initOnError())            return -1;
	//if(!myUWS.initonHttpRequest())      return -1;
	//if(!myUWS.initonMessage())          return -1;
	//if(!myUWS.initonConnection())       return -1;
	//if(!myUWS.initonDisconnection())    return -1;
	    
    if(!myUWS.runServer())              return -1;
    
    ///////////////////////////////////////////////////////////////////////////////
    return 1;

}
