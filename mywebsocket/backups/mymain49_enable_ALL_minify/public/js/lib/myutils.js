
////////////////////////////////////////////////////////////////////////////////
//https://stackoverflow.com/questions/1125084/how-to-make-the-window-full-screen-with-javascript-stretching-all-over-the-scre
////////////////////////////////////////////////////////////////////////////////
        function cancelFullScreen(el) 
        {   var requestMethod = el.cancelFullScreen||el.webkitCancelFullScreen||el.mozCancelFullScreen||el.exitFullscreen;
            if (requestMethod) { // cancel full screen.
                requestMethod.call(el);
            } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    wscript.SendKeys("{F11}");
                }
            }
        }

        function requestFullScreen(el) {
            // Supports most browsers and their versions.
            var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

            if (requestMethod) { // Native full screen.
                requestMethod.call(el);
            } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
                var wscript = new ActiveXObject("WScript.Shell");
                if (wscript !== null) {
                    wscript.SendKeys("{F11}");
                }
            }
            return false
        }

    function toggleFull() 
    {   var elem = document.body; // Make the body go full screen.
            var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||  (document.mozFullScreen || document.webkitIsFullScreen);

            if (isInFullScreen) {
                cancelFullScreen(document);
            } else {
                requestFullScreen(elem);
            }
            return false;
        }
        
////////////////////////////////////////////////////////////////////////////////
    // TODO: longer method name
    Function.prototype.multiline = function() 
    {   return this.toString().match(/^function \(\)\{\s*\/\*((?:[^*]|\*+[^*\/])*)\*+\/\s*\}$/)[1];
    };

    //usage:
    //var s = function(){/*
	//STRING
	//GOES
	//HERE
    //*/}.multiline();
    //console.log("\r\n\tSTRING\r\n\tGOES\r\n\tHERE\r\n" === s); // true, possibly

////////////////////////////////////////////////////////////////////////////////
//https://softwareengineering.stackexchange.com/questions/212808/treating-a-1d-data-structure-as-2d-grid
////////////////////////////////////////////////////////////////////////////////
    function getIndex(x,y,width)
    {   //return (x + width*y);
		return (y + width*x);
    }
    		
	function getArray(array, index)
	{	return array[index] = array[index] || {};
	}			
	
//////////////////////////////////
    function parseJwt (token) 
    {   var base64Url   = token.split('.')[1];
        var base64      = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }; 
    
///////////////////////////////////  
//https://stackoverflow.com/questions/9370606/javascript-error-handling-can-i-throw-an-error-inside-a-ternary-operator    
    function _throw(m) { throw new Error(m); }

    //usage:
    //function foo({ msg = _throw('msg parameter not defined') } = {}) 
    //{   console.log(msg);
    //}
    //
    //foo({ msg : 'party people!' }); // :D
    //foo({}); // throws!
///////////////////////////////////  
//https://stackoverflow.com/questions/6193574/save-javascript-objects-in-sessionstorage
    Storage.prototype.setObj = function(key, obj)   {   return this.setItem(key, JSON.stringify(obj))};
    Storage.prototype.getObj = function(key)        {   return JSON.parse(this.getItem(key))};
    
    //usage:
    //  sesssionStorage.setObj(1,{date:Date.now(),action:'save firstObject'});
    //  sesssionStorage.setObj(2,{date:Date.now(),action:'save 2nd object'}); 
    //Retrieve date created of 2nd object
    //  new Date(sesssionStorage.getObj(1).date)
///////////////////////////////////
    class CSession extends Map 
    {   constructor()
        {   super();
        }
        
        set(id, value) 
        {   if ( typeof value === 'object' ) value= JSON.stringify(value);
            sessionStorage.setItem(id, value);
        }

        get(id) 
        {   const value = sessionStorage.getItem(id);
            try 
            {   return JSON.parse(value);
            } 
            catch(e) 
            {   return value; 
            }
        } 
    }
    //usage:
    //const session = new CSession();
    //session.set('name', {first: 'Ahmed', last : 'Toumi'});
    //session.get('name');    
///////////////////////////////////  
//http://stackoverflow.com/questions/32518102/passing-an-instance-method-to-super-with-es6-classes
//fake virtual function:
/*
    class A 
    {   constructor(method) 
        {   if(method) {method();return;}
            this.callback();
        }

        message() 
        {   return "a";
        }

        callback() 
        {   console.log(this.message());
        }
    }

    class B extends A 
    {   constructor() 
        {   super(() => this.callback());
        }

        message() 
        {   return "b"; 
        }

        callback() 
        {   console.log(this.message())
        }
    }

    //usage:
    //  new A();        //will print output "a";
    //  new B();        //will print output "b";
*/

///////////////////////////////////  
//https://hacks.mozilla.org/2015/08/es6-in-depth-subclassing/
//compose multiple inheritance using mixing
        function mix(...mixins) 
        {   class Mix {}

            // Programmatically add all the methods and accessors
            // of the mixins to class Mix.
            for (let mixin of mixins) 
            {   copyProperties(Mix, mixin);
                copyProperties(Mix.prototype, mixin.prototype);
            }
            return Mix;
        }

        function copyProperties(target, source) 
        {   for (let key of Reflect.ownKeys(source)) 
            {   if (key !== "constructor" && key !== "prototype" && key !== "name") 
                {   let desc = Object.getOwnPropertyDescriptor(source, key);
                    Object.defineProperty(target, key, desc);
                }
            }
        }
        
        //usage:
        //      class DistributedEdit extends mix(Loggable, Serializable) 
        //      {   // Event methods
        //      }
        
///////////////////////////////////  
        //function toggle(button)
        //{        if(document.getElementById("1").value=="OFF")  document.getElementById("1").value="ON";
        //    else if(document.getElementById("1").value=="ON" )  document.getElementById("1").value="OFF";
        //}
        
        function toggle(b){b.value=(b.value=="ON")?"OFF":"ON";}
        //usage: <input type="button" id="1" value="ON" style="color:blue" onclick="toggle(this);"></input>
        
///////////////////////////////////  
        //round with precision
        
        //http://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript
        function FastRound(num)
        {   return ((num * 10) << 0) * 0.1;
        }
        
        //http://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
        function FastRound2(num,prec=2)
        {   //return +(num*1).toFixed(prec);
            return +(num).toFixed(prec);
        }
        
        //https://jsperf.com/math-round-vs-hack/3
        //no precision!
        function myround(num)
        {   return (0.5 + num) | 0;
        }
///////////////////////////////////        
        //http://stackoverflow.com/questions/14226803/javascript-wait-5-seconds-before-executing-next-line
        var delay = ( function() 
        {   var timer = 0;
            return function(callback, ms) 
            {   clearTimeout (timer);
                timer = setTimeout(callback, ms);
            };
        })();
        
        //Usage:
        //    delay(  function()
        //            {   // do stuff
        //            }, 
        //            600 ); // end delay
//////////////////////////////////////        
        function getCookie(name) 
        {   return (name = (document.cookie + ';').match(new RegExp(name + '=.*;'))) && name[0].split(/=|;/)[1];
            //match = document.cookie.match(new RegExp(name + '=([^;]+)'));
            //if (match) return match[1];
            //function escape(s) { return s.replace(/([.*+?\^${}()|\[\]\/\\])/g, '\\$1'); };
            //var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
            //return match ? match[1] : null;
        }

        // the default lifetime is 7 days
        function setCookie(name, value, days) 
        {   var e = new Date;
            e.setDate(e.getDate() + (days || 7));
            document.cookie = name + "=" + value + ';expires=' + e.toUTCString() + ';path=/;domain=.' + document.domain;
        }
//////////////////////////////
        //http://psoug.org/snippet/Javascript-Javascript-quotFade-In-On-Clickquot_903.htm
        // Browser safe opacity handling function
        function setOpacity( value,id ) 
        {   document.getElementById(id).style.opacity = value / 10;
            document.getElementById(id).style.filter = 'alpha(opacity=' + value * 10 + ')';
        }
 
        function fadeInMyPopup() 
        {   for( var i = 0 ; i <= 100 ; i++ )
            setTimeout( 'setOpacity(' + (i / 10) + ')' , 8 * i );
        }
 
        function fadeOutMyPopup(id) 
        {   for( var i = 0 ; i <= 100 ; i++ ) 
            {   setTimeout( 'setOpacity(' + (10 - i / 10) + ')' , 8 * i );
            }
            setTimeout('closeMyPopup(id)', 800 );
        }
 
        function closeMyPopup(id) 
        {   document.getElementById(id).style.visibility = "hidden";
        }
 
        function fireMyPopup(id) 
        {    setOpacity( 0,id );
             document.getElementById(id).style.visibility = "visible";
             fadeInMyPopup(id);
        }
        
        //|//////////////////////////////////|
        //|usage:                            |
        //|//////////////////////////////////|
        //| <!--
        //|     <table id='styled_popup' NAME='styled_popup' style='width: 380px; height: 200px; visibility:hidden; zoom: 1' bgcolor="#ffffdd" cellpadding='0' cellspacing='0' border='0'>
        //|         <tr><td style='width: 380px; height: 200px;'>
        //|             Hey, look at me!<br>
        //|             I'm fading :-)
        //|         </td></tr>
        //|     </table>
        //|     <input type='submit' onClick='fireMyPopup("styled_popup")' value=' Fire! '>
        //| -->
        //|//////////////////////////////////|
        
        //////////////////////////////
        //http://psoug.org/snippet/Javascript-Prevent-framing-a-page_114.htm
        function breakout()
        {   if(top.location != location) 
            {   top.location.href = document.location.href ;
            }
        }
        
        //////////////////////////////        
        function focusit()
        {   if(document.activeElement)document.activeElement.blur();
        }        
        
        function myClickFunction() 
        {   var elem = document.activeElement;
            if(elem && elem.tagName == 'IFRAME')
            {    document.activeElement.blur();    //<<-- this command will default to body focus
                 //console.log('document.activeElement.blur();');
            }
        }        
        
        /*
        $(document).ready(()=> 
        {   $("IFRAME").click(document.activeElement.blur());
        });        
        */
        
        function blur_all_iframes()
        {   var frames = document.getElementsByTagName("iframe");
            for (var i = 0; i < frames.length; ++i)
            {   
                //frames[i].style.display = "none";                                   // The iFrame
                //getElementById(frames[i].id + "-L").style.display = "";             // The corresponding DIV
                frames[i].onload = ()=>
                {   //getElementById(frames[i].id + "-L").style.display = "none";
                    //frames[i].style.display = "";
                    frames[i].onclick = ()=>
                    {   document.activeElement.blur();
                    }
                }
            }
        }