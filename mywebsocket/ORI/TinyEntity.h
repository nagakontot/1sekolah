//https://gist.github.com/r-lyeh/7462948
// Component-entity system in 16 lines of C++11. 2013 rlyeh, MIT licensed
// Code fragment from kult engine     -    https://github.com/r-lyeh/kult

#include <iostream>
#include <iterator>

#include <map>  
#include <set>  
#include <string>  

enum {JOIN,MERGE,EXCLUDE};

using set=std::set<unsigned>;

template<typename T>set&
system()
{   static set entities;
    return entities;
}

template<typename T,int MODE>set 
subsystem(const set& B)
{   set newset;
    const set& A=system<T>();
    
    if(MODE==MERGE)
    {   newset=B;
        for(auto& id:A)
        {   newset.insert(id);
        }
    }
    else if(MODE==EXCLUDE)
    {   newset=B;
        for(auto& id:A)
        {   newset.erase(id);
        }
    }
    else if(A.size()<B.size())
    {   for(auto& id:A)
        {   if(B.find(id)!=B.end())newset.insert(id);
        }
    }
    else
    {   for(auto& id:B)
        {   if(A.find(id)!=A.end())newset.insert(id);
        }
    }
    
    return newset;
}

template<typename T> std::map<unsigned,T>&
components()
{   static std::map<unsigned,T>objects;
    return objects;
}

template<typename T>bool 
has(unsigned id)
{   return components<T>().find(id)!=components<T>().end();
}

template<typename T>decltype(T::value_type)&
get(unsigned id)
{   static decltype(T::value_type)invalid,reset;
    return has<T>(id)?components<T>()[id].value_type:invalid=reset;
}

template<typename T>decltype(T::value_type)&
add(unsigned id)
{   return system<T>().insert(id),components<T>()[id]=components<T>()[id],get<T>(id);
}

template<typename T>bool 
del(unsigned id)
{   return add<T>(id),components<T>().erase(id),system<T>().erase(id),!has<T>(id);
}

template<typename T,int>struct component
{   T value_type;
};

//////////////////////////////////////////////////////////////////
// sugars
template<class T,class U>                   set join()                  { return subsystem<T,JOIN>( system<U>() );   }
template<class T,class U,class V>           set join()                  { return subsystem<T,JOIN>( join<U,V>() );   }
template<class T,class U,class V,class W>   set join()                  { return subsystem<T,JOIN>( join<U,V,W>() ); }
template<class T>                           set exclude( const set& B ) { return subsystem<T,EXCLUDE>(B); }

//////////////////////////////////////////////////////////////////
template <class T>
void writeSet(const std::set<T>& data_set) 
{
	//using data_type = unsigned;
	//std::set<data_type> data_set;
 
	//change cin to your ifstream
	//std::copy(  std::istream_iterator<T>(std::cin), 
	//            std::istream_iterator<T>(), 
	//            std::inserter(data_set, end(T)));
 
    std::ofstream fout_data("fout_data.txt");
	//change cout to your ofstream
	std::copy(std::begin(data_set), std::end(data_set), std::ostream_iterator<T>(fout_data, " "));
}

//////////////////////////////////////////////////////////////////
/*
//https://stackoverflow.com/questions/27434792/write-read-stdset-t-to-from-binary-file
template <class T>
void writeSet(const std::string& filePath, const std::string fileName,const std::set<T>& data)
{   // Construct binary file location string using filePath and fileName inputs
    std::stringstream file; 
    file << filePath.c_str() << "/" << fileName.c_str();
    
    std::ofstream fileStream; 
    fileStream.open(file.str().c_str(), std::ios::out | std::ios::binary); 

    // First write number of std::set elements held by data, and then write std::set block to binary file
    typename std::set<T>::size_type n = data.size(); 
    
    fileStream.write(reinterpret_cast<const char*>(&n), sizeof(typename std::set<T>::size_type));
    fileStream.write(reinterpret_cast<const char*>(&data), sizeof(T)*n); 
    fileStream.close();
}

template <class T>
void readSet(const std::string& filePath, const std::string fileName, std::set<T>& data)
{   // Construct binary file location string using filePath and fileName inputs
    std::stringstream file; 
    file << filePath.c_str() << "/" << fileName.c_str();
    
    std::ifstream fileStream; 
    fileStream.open(file.str().c_str(), std::ios::in | std::ios::binary); 

    // First read number of elements stored in binary file, then write file content to adresses std::set data variable
    typename std::set<T>::size_type n; 
    fileStream.read(reinterpret_cast<char*>(&n), sizeof(typename std::set<T>::size_type));
    fileStream.read(reinterpret_cast<char*>(&data), sizeof(T)*n); 
    fileStream.close();
}
*/





