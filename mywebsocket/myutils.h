#include "MemMap.h"


#include <fstream>
#include <iostream>
#include <sstream>

//////////////////////////////////////////////////////////////////
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


/////////////////////////////////////////////////////////////////
//config.txt
//Input name = image1.png
//Num. of rows = 100
//Num. of cols = 150
class CConfig
{   std::string ipName;
    int nR, nC;

public:
    CConfig(std::string fn="config.txt")
    {   std::ifstream           fin(fn);
        std::string             line;
        std::istringstream      sin;

        while (std::getline(fin, line)) 
        {   sin.str(line.substr(line.find("=")+1));
            if (line.find("Input name") != std::string::npos) 
            {   std::cout<<"Input name = "<<sin.str()<<std::endl;
                sin >> ipName;
            }
            else if (line.find("Num. of rows") != std::string::npos) 
            {   std::cout<<"Num. of rows = "<<sin.str()<<std::endl;
                sin >> nR;
            }
            else if (line.find("Num. of cols") != std::string::npos) 
            {   std::cout<<"Num. of cols = "<<sin.str()<<std::endl;
                sin >> nC;
            }
            sin.clear();
        }
    }
};