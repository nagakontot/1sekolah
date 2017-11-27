#pragma once

//http://codeforces.com/blog/entry/15643
#include <bits/stdc++.h>

/*
#include <fstream>
#include <iostream>
#include <sstream>
*/

//+-----------------------------------------------------------------------------------------------------------+
//|	https://stackoverflow.com/questions/43948460/shorten-long-template-derived-class-that-passed-as-template-argument-into-crtp
//+----------------------------example 1:---------------------------------------------------------------------+
//a variadic crtp combiner:

//template <class T, template <class> ...Cs>
//struct VCrtp: Cs<T>... 
//{
//};

//Usage:
//
//template<template<class>class T1,class T2,class T3>
//class HyperDatabase : VCrtp<HyperDataBase<T1, T2, T3>,IndexManager, BitHash, DefaultAllocator>
//{ // etc...
//};

////////////////////////////////////////////////////////////////////////////////
//https://www.codeproject.com/Tips/894847/Policy-Design-Pattern-and-Variadic-Template-Techni

template<typename... Policies>
class VPolicy: public Policies...
{
public:
    template<typename... Args>
    VPolicy(const Args... Arg): Policies(Arg)...
    {
    }
};

/*
template<typename... Policies>
class PolicyAndVariadic: public Policies...
{
public:
    template<typename... Args>
    PolicyAndVariadic(const Args... Arg): Policies(Arg)...
    {
    }
};
*/
/*******USAGE**************

class PolicyOne
{   std::string mText;

public:
    PolicyOne(const char* aText):   mText(aText)
    {
    }
    
    void executePolicyOne()
    {   std::cout << mText << std::endl;
    }
};

class PolicyTwo
{   std::string mText;

public:
    PolicyTwo(const char* aText):   mText(aText)
    {
    }

    void executePolicyTwo()
    {   std::cout << mText << std::endl;
    }
};
typedef PolicyAndVariadic<PolicyOne, PolicyTwo> PolicyOneAndPolicyTwo;
PolicyOneAndPolicyTwo linstance("PolicyOne", "PolicyTwo");

linstance.executePolicyOne();
linstance.executePolicyTwo();

***************************/

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