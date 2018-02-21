    //<script>
        window.lazySizesConfig = window.lazySizesConfig || {};
        window.lazySizesConfig = {   addClasses: true};
        
        ////////////////////////////////////////////
        $(document).ready(function() 
        {   $('html').fadeIn("slow",function ()
            {   $('#content-wrapper').fadeIn("slow");    
            });

            //$('#content-wrapper').fadeIn("slow");		
            //$('#content-wrapper').fadeIn(function ()
            //{   
            //});
            
            ////////////////////////////////////////////
            //var req = new XMLHttpRequest();
            //req.open('GET', document.location, false);
            //req.send(null);
            //var headers = req.getAllResponseHeaders().toLowerCase();
            //alert(headers);
            //////////////////////////////////////////////
        });
    //</script> 



        /**
        *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
        *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
        */
        /*
            var disqus_config = function () 
            {   this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
                this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
            };
        */
        /*
        (function() 
        {   // DON'T EDIT BELOW THIS LINE
            var d = document, s = d.createElement('script');
            s.src = 'https://1sekolah-xyz.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
        })();
        */
        
/*
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
        (function(window, document, snabbt) 
        {   function splitText(element) 
            {   var text = element.textContent;
                var textParts = text.split(' ');

                element.textContent = '';
                textParts.forEach(function(textPart, i) 
                {   var wordSpan = document.createElement('span');
                    wordSpan.className = 'text-area-word';

                    var chars = textPart.split('');
                    chars.forEach(function(letter, i) 
                    {   var letterSpan = document.createElement('span');
                        letterSpan.className = 'text-area-letter';
                        letterSpan.textContent = letter;
                        wordSpan.appendChild(letterSpan);
                    });
      
                    element.appendChild(wordSpan);
                    if(i !== textParts.length - 1)wordSpan.insertAdjacentHTML('afterEnd', ' ');
                });
            }

            function unsplitText(element) 
            {   element.textContent = element.textContent;
            }

            var element = document.getElementsByClassName('text-area')[0];
            splitText(element);

            function letterWave() 
            {   var letters = document.querySelectorAll('.text-area-letter');

                for (var i=0; i<letters.length; i++) 
                {   letters[i].style.opacity = 0;
                }

                const mpi_div_2 = Math.PI/2;
                snabbt(document.querySelectorAll('.text-area .text-area-letter'), 
                {   fromRotation:   function(i) 
                                    {   if(i % 2 === 0)return [-mpi_div_2, 0, 0];
                                        return [mpi_div_2, 0, 0];
                                    },
                    rotation:       [0, 0, 0],
                    //delay:          function(i) { return i * 30 },
                    delay:          function(i) { return i * 200 },
                    //duration:       300,
                    duration:       100,
                    perspective:    5,
                    fromOpacity:    0,
                    opacity:        1,
                    easing:         'spring',
                    springConstant:     0.6,    //0.4,
                    springDeceleration: 0.7,   //0.5,
                });
            }

            setTimeout(letterWave, 500);

            //document.getElementById('again-please').onclick = function() 
            //{   letterWave();
            //}

        })(window, document, window.snabbt);
*/

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    $(".intro_rotate").textrotator({animation:   "dissolve",    // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
                                    separator:   ",",           // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
                                    speed:       5000           // How many milliseconds until the next word show.
    });  

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    var vid1    = document.getElementById("headvid1");
    var vid2    = document.getElementById("headvid2");
    var vid3    = document.getElementById("headvid3");
    var vid4    = document.getElementById("headvid4");

    vid1.addEventListener("mouseover",  function(){ if(vid1.paused)vid1.play();else vid1.pause();});
    vid1.addEventListener("mouseout",   function(){ if(vid1.paused)vid1.play();else vid1.pause();});
    
    vid2.addEventListener("mouseover",  function(){ if(vid2.paused)vid2.play();else vid2.pause();});
    vid2.addEventListener("mouseout",   function(){ if(vid2.paused)vid2.play();else vid2.pause();});

    vid3.addEventListener("mouseover",  function(){ if(vid3.paused)vid3.play();else vid3.pause();});
    vid3.addEventListener("mouseout",   function(){ if(vid3.paused)vid3.play();else vid3.pause();});

    vid4.addEventListener("mouseover",  function(){ if(vid4.paused)vid4.play();else vid4.pause();});
    vid4.addEventListener("mouseout",   function(){ if(vid4.paused)vid4.play();else vid4.pause();});

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    var vid         = document.getElementById("bgvid");
    var pauseButton = document.querySelector(".polina button");

    function vidFade() 
    {   vid.classList.add("stopfade");
    }

    vid.addEventListener('ended', function()
    {   vid.pause();     // only functional if "loop" is removed 
        vidFade();       // to capture IE10
    }); 

    pauseButton.addEventListener("click", function() 
    {   vid.classList.toggle("stopfade");
        if (vid.paused) 
        {  vid.play();
           pauseButton.innerHTML = "Pause";
        } 
        else 
        {  vid.pause();
           pauseButton.innerHTML = "Paused";
        }
    });


    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    const mysession1 = new CSession();
    //var mysession1 = new CSession();
    //window.mysession1 = new CSession();

    function setBorderToDefault() 
    {  document.getElementById('headvid1a').style.border = '2px solid #FFF';
       document.getElementById('headvid2a').style.border = '2px solid #FFF';
       document.getElementById('headvid3a').style.border = '2px solid #FFF';
       document.getElementById('headvid4a').style.border = '2px solid #FFF';
       return true;
    }
    
    function handleMDown1()     {  setBorderToDefault();document.getElementById('headvid1a').style.border = '5px solid red';mysession1.set('avatar','0');return true;}
    function handleMDown2()     {  setBorderToDefault();document.getElementById('headvid2a').style.border = '5px solid red';mysession1.set('avatar','1');return true;}
    function handleMDown3()     {  setBorderToDefault();document.getElementById('headvid3a').style.border = '5px solid red';mysession1.set('avatar','2');return true;}
    function handleMDown4()     {  setBorderToDefault();document.getElementById('headvid4a').style.border = '5px solid red';mysession1.set('avatar','3');return true;}

    //default value set to headvid1
    //var x=~~getCookie("avatar");
    //var x=~~getCookie("avatar");
    var x=~~mysession1.get('avatar');
    
    if(!x)x=0;
    switch(x)
    { case 0:    handleMDown1();break;
      case 1:    handleMDown2();break;
      case 2:    handleMDown3();break;
      case 3:    handleMDown4();break;
      default:   handleMDown1();break;
    }

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
    // Discovery Doc found here: https://developers.google.com/people/api/rest/
    var authorizeButton = document.getElementById('authorize-button');
    var signoutButton   = document.getElementById('signout-button');

    function handleClientLoad() 
    {   // Load the API client and auth2 library
        gapi.load('client:auth2', initClient);
    }

    function initClient()  
    {   gapi.client
        .init
        ({  apiKey:             'AIzaSyBfLprFIif47bZ5fGx_FrQIgRL4ubnNOm0',
            clientId:           '151812089305-308f2br54heobdu5fiph9sdk8g78bmbe.apps.googleusercontent.com',
            scope:              'profile',
            ux_mode:            'redirect'
        })
        .then(function () 
        {   gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);     // Listen for sign-in state changes.
            updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());      // Handle the initial sign-in state.
            
            authorizeButton.onclick = handleAuthClick;
            signoutButton.onclick   = handleSignoutClick;
        });
        
        /*
        auth2 = gapi.auth2.getAuthInstance(
        {   client_id:      '151812089305-308f2br54heobdu5fiph9sdk8g78bmbe.apps.googleusercontent.com',
            scope:          'profile'
        });

        auth2.isSignedIn.listen(signinChanged);     // Listen for sign-in state changes.
        auth2.currentUser.listen(userChanged);      // Listen for changes to current user.

        // Sign in the user if they are currently signed in.
        if (auth2.isSignedIn.get() == true) 
        {   auth2.signIn();
        }
        */
    };
    
    function updateSigninStatus(isSignedIn) 
    {   if (isSignedIn) 
        {   authorizeButton.style.display = 'none';
            signoutButton.style.display = 'block';

            //onSuccess(gapi.auth2.getAuthInstance().currentUser.get());
        
            ////////////////////////    
            var googleUser  = gapi.auth2.getAuthInstance().currentUser.get();
            var profile     = googleUser.getBasicProfile();

            //mysession1.set('username',profile.getName());
            mysession1.set('username',profile.getGivenName());
            mysession1.set('userimg',profile.getImageUrl());
            mysession1.set('useremail',profile.getEmail());

            //var jwt = parseJwt(id_token_); 
            //console.log(jwt);

            ///////////////////////////////////////////
            $.post("./id_token.html",
            {   id_token: googleUser.getAuthResponse().id_token
            },
            function(data, textStatus)
            {   if(textStatus=="success")
                {   var p       = document.createElement('p');
                    var name    = profile.getGivenName();
                    p.appendChild(document.createTextNode('Hello, '+name+'!'));
                    document.getElementById('greeting').appendChild(p);
                
                    $(document).ready(function()
                    {   //document.open('text/html');
                        //document.write(data);
                        //document.close();

                        setTimeout(() => 
                        {   $('html').fadeOut('slow',function ()
                            {   //window.location.href = '/';
                                //document.write(document.documentElement.innerHTML) ;
                                ////////////////////////////////////
                                //$(this).remove();
                                document.close();
                                document.open('text/html');
                                document.write(data);
                                document.close();
                                ////////////////////////////////////
                                //$("body").html(data);
                                //$("html").html(data);
                                //$("html").html($("html", data).html());
                            });
                        }, 2000);
                    });
                }
            });            
        } 
        else 
        {   authorizeButton.style.display = 'block';
            signoutButton.style.display = 'none';
        }
    }
    
    function handleAuthClick(event) 
    {   gapi.auth2.getAuthInstance().signIn();
    }
    
    function handleSignoutClick(event) 
    {   gapi.auth2.getAuthInstance().signOut();
    }
    
    ///////////////////////////////////////////////////////
    /*
    function renderButton() 
    {   gapi.signin2.render('my-signin2', 
        {   'scope':        'profile email',
            'width':        235,    //240,
            'height':       35,     //50,
            'longtitle':    true,
            'theme':        'dark',
            'ux_mode':      'redirect',
            'onsuccess':    onSuccess,
            'onfailure':    onFailure
        });
    }

    function onSuccess(googleUser) 
    {   var profile     = googleUser.getBasicProfile();

        //mysession1.set('username',profile.getName());
        mysession1.set('username',profile.getGivenName());
        mysession1.set('userimg',profile.getImageUrl());
        mysession1.set('useremail',profile.getEmail());

        //var jwt = parseJwt(id_token_); 
        //console.log(jwt);

        $.post("./id_token.html",
        {   id_token: googleUser.getAuthResponse().id_token
        },
        function(data, textStatus)
        {   if(textStatus=="success")
            {   var p       = document.createElement('p');
                var name = profile.getGivenName();
                p.appendChild(document.createTextNode('Hello, '+name+'!'));
                document.getElementById('greeting').appendChild(p);
                
                setTimeout(() => 
                {   $('html').fadeOut(function ()
                    {   //window.location.href = '/';
                        ////////////////////////////////////
                        document.open('text/html');
                        document.write(data);
                        document.close();
                        ////////////////////////////////////
                        //document.open('text/html');
                        //document.body.parentNode.innerHTML = data;
                    });
                }, 2000);                    
            }
        });
        
        //////////////////////////
        //$.ajax({    url:            "./index.html",
        //            type:           'POST',
        //            data:           utf8EncodedString,
        //            contentType:    false,//'application/octet-stream',  
        //            processData:    false
        //        });        
                        
        /////////////////////////
        //$('html').fadeOut(function (){window.location.href = '/main.html';});
    }
    
    function onFailure(error) 
    {   //console.log(error);
        alert(error);
    }

    function signOut() 
    {   var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () 
        {   //console.log('User signed out.');
            alert('User signed out.');
        });
    }
    */
    

    //<!--script async defer data-cfasync='false'>window.purechatApi = { l: [], t: [], on: function () { this.l.push(arguments); } }; (function () { var done = false; var script = document.createElement('script'); script.async = true; script.type = 'text/javascript'; script.src = 'https://app.purechat.com/VisitorWidget/WidgetScript'; document.getElementsByTagName('HEAD').item(0).appendChild(script); script.onreadystatechange = script.onload = function (e) { if (!done && (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete')) { var w = new PCWidget({c: '99ab80c7-4b58-4f31-8ba6-d87707b43929', f: true }); done = true; } }; })();</script-->

    //<!-- Start of Rocket.Chat Livechat Script -->
    //<script type="text/javascript">
        (function(w, d, s, u) 
        {   w.RocketChat = function(c) { w.RocketChat._.push(c) }; w.RocketChat._ = []; w.RocketChat.url = u;
	        var h = d.getElementsByTagName(s)[0], j = d.createElement(s);
	        j.async = true; j.src = 'https://rchat.1sekolah.xyz/packages/rocketchat_livechat/assets/rocketchat-livechat.min.js?_=201702160944';
	        h.parentNode.insertBefore(j, h);
        })(window, document, 'script', 'https://rchat.1sekolah.xyz/livechat');
    //</script>
    //<!-- End of Rocket.Chat Livechat Script -->