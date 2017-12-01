#include "../../lib/kult.h"
#include "../../lib/memmap/memmap.h"
////////////////////////////////////////////////////////////////////////////////
// custom type
struct vec2 
{   float x, y;

    template<typename T> friend T&operator<<( T &os, const vec2 &self ) {
        return os << "(x:" << self.x << ",y:" << self.y << ")", os;
    }
};

////////////////////////////////////////////////////////////////////////////////
class CMyEntity
{   
public:    
    //entities
    kult::entity                            player; 
    kult::entity                            enemy;

    // components
    kult::component<'name', std::string>    name;
    kult::component<'desc', std::string>    description;
    kult::component<'pos2', vec2>           position;
    kult::component<'vel2', vec2>           velocity;
    
    // systems
    kult::system<float>                     movement;
    
    CMyEntity()
    {
    }
    
    void init()
    {   movement = [&]( float dt ) 
        {   for( auto &entity : kult::join( position, velocity ) ) 
            {   entity[ position ].x += entity[ velocity ].x * dt;
                entity[ position ].y += entity[ velocity ].y * dt;
            }
        };
    }

    void test_entity() 
    {   // assign properties dynamically
        player[ name ]          = "player #1";
        player[ position ]      = { 0, 0 };
        player[ velocity ]      = { 2, 4 };
        player[ description ]   = "this is our warrior";

        enemy[ name ]           = "orc #1";
        enemy[ position ]       = { 0, 0 };

        // simulate 100 frames
        for( int i = 0; i < 100; ++i ) 
        {   movement( 1/60.f );
        }

        // print status
        std::cout << player.dump() << std::endl;
        std::cout << enemy.dump() << std::endl;

        // purge entities
        player.purge();
        enemy.purge();

        // print status
        std::cout << player.dump() << std::endl;
        std::cout << enemy.dump() << std::endl;
    }
    
};

////////////////////////////////////////////////////////////////////////////////

// test class
class CMyClass
{
public:
    int  m_nInt;
    char m_cChar;
    char m_sBuff[10];
};


class CGame
{   typedef MemMap::MemMapFilePtr<CMyClass> TMemMappedClass;
    TMemMappedClass mymemmap;
    
    CMyEntity       myent;

public:
    CGame(const std::string& fn="./data/mymemmap"): mymemmap(fn.c_str())
    {   
    }
    
    void test()
    {   try 
        {   myent.init();
            myent.test_entity();
        
            //myent.test1();
            //myent.save();
            //myent.load();

            //typedef MemMap::MemMapFilePtr<MyClass> MemMappedClass;
      
            // create a object of wrapper class
            //MemMappedClass mymemmap("./data/mymemmap");

            // now use mymemmap as pointer of MyClass object.
            mymemmap->m_nInt        = 5;            // Write  int as pointer
            (*mymemmap).m_cChar     = 'a';          // dereference it and write char
            strcpy(mymemmap->m_sBuff, "12345678");  // write as buff
      
            std::cout << "m_nInt:"  << mymemmap->m_nInt  << std::endl;
            std::cout << "m_cChar:" << mymemmap->m_cChar << std::endl;
            std::cout << "m_sBuff:" << mymemmap->m_sBuff << std::endl;
        }
        catch (MemMap::MemMapFileException &e) 
        {   std::cout << e.what() << std::endl;
        }
    }
};