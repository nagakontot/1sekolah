git add *
git commit -am "your commit message"
git push origin master

//-std=c++11 -O3 tests/main.cpp -Isrc -o testsBin -lpthread -luWS -lssl -lcrypto -lz -luv

//g++ -std=c++11 mytest.cpp -O3 -lpthread -lz -lssl -lcrypto -luWS -o mytest.exe    

//g++ -std=c++11 main.cpp -O3 -lz -lssl -luv -luWS -o server

//g++ -std=c++11 mytest.cpp -Wall -O3 -DUWS_THREADSAFE=1 -lpthread -lz -lssl -lcrypto -luWS -o mytest.exe
//g++ -std=c++11 mytest.cpp -Wall -pedantic -O3 -lpthread -lz -lssl -lcrypto -luWS -o mytest.exe

//g++ -std=c++11 mytest.cpp -Ispdlog/ -Wall -Wno-multichar -pedantic -O3 -lpthread -lz -lssl -lcrypto -luWS -o mytest.exe

//g++ -std=c++11 mytest.cpp -I/workspace/gateway/mywebsocket/spdlog/ -Wall -Wno-multichar -pedantic -O3 -lpthread -lz -lssl -lcrypto -luWS -o mytest.exe

//g++ -std=c++14 mymain.cpp -Wall -Wno-multichar -pedantic -O3 -lpthread -lz -lssl -lcrypto -luWS -o mymain.exe

//g++ -std=c++14 mymain.cpp drecho.cpp -Wall -Wno-multichar -pedantic -O3 -lpthread -lz -lssl -lcrypto -luWS -o mymain.exe

//g++ -std=c++14 mymain.cpp drecho.cpp ltalloc.cpp -Wall -Wno-multichar -pedantic -O3 -flto -lpthread -lz -lssl -lcrypto -luWS -o mymain.exe

//g++ -std=c++14 mymain.cpp lib/drecho/drecho.cpp lib/ltalloc/ltalloc.cpp lib/jwt/jwt.cpp -Wall -Wno-multichar -pedantic -O3 -flto -lpthread -lz -lssl -lcrypto -luWS -o mymain.exe
//g++ -std=c++14 mymain.cpp lib/drecho/*.cpp lib/ltalloc/*.cpp lib/jwt/*.cpp -Wall -Wno-multichar -pedantic -O3 -flto -lpthread -lz -lssl -lcrypto -luWS -o mymain.exe


//g++ -std=c++14 mymain.cpp lib/drecho/*.cpp lib/ltalloc/*.cpp lib/jwt/*.cpp -Wall -Wno-multichar -pedantic -O3 -flto -lpthread -lz -lssl -lcrypto -luWS -o mymain.exe
//g++ -std=c++14 mymain.cpp lib/drecho/*.cpp lib/ltalloc/*.cpp -Wall -Wno-multichar -pedantic -O3 -flto -lpthread -lz -lssl -lcrypto -luWS -o mymain.exe
//g++ -std=c++14 mymain.cpp lib/GZipCodec/*.cpp lib/drecho/*.cpp lib/ltalloc/*.cpp -Wall -Wno-multichar -pedantic -O3 -flto -lpthread -lz -lssl -lcrypto -luWS -o mymain.exe

g++ -std=c++14 mymain.cpp lib/GZipCodec/*.cpp lib/drecho/*.cpp lib/ltalloc/*.cpp -Wall -Wno-multichar -pedantic -O3 -flto -lpthread -lz -lssl -lcrypto -luWS -o mymain.exe
                                                 



