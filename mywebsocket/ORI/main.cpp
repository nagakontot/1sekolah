#include <iostream>
#include <string>
#include "MemMap.h"


//g++ -std=c++11 main.cpp -O3 -o main.exe

// test class
class MyClass
{
  public:
    int  m_nInt;
    char m_cChar;
    char m_sBuff[10];
};

// main function
int main()
{
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
  return 0;
}
