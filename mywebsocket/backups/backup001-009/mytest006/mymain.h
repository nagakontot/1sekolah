#include "myserver.h"


int CMain() 
{   CGame  mygame;
    mygame.test();

    CConfig mycfg("./data/config.txt");
    
    ///////////////////////////////////////////////////////////////////////////////
    CmyUWS<CServer,CWebpage>    myUWS("PolicyOne", "PolicyTwo");

    if(!myUWS.initWebpage())    return -1;
    if(!myUWS.initServer())     return -1;
    if(!myUWS.runServer())      return -1;
    
    ///////////////////////////////////////////////////////////////////////////////
    return 1;

}
