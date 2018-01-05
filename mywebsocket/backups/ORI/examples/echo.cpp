
#include <uWS/uWS.h>
//#include <iostream>



int main()
{
    uWS::Hub h;

    h.onMessage([](uWS::WebSocket<uWS::SERVER> *ws, char *message, size_t length, uWS::OpCode opCode) 
    {   ws->send(message, length, opCode);
    });

    h.listen(6000);
    h.run();
    
    //std::cout<<"hurray!!!";
}
