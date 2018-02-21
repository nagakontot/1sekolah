
var isSent = false;
// Send random message data on every button click
//bindEvent(document.getElementById('message_button'), 'click', 

function callParent() 
{	//var random = Math.random();
    //sendMessage('' + random);
        
    isSent = !isSent;
    if(isSent)
    {	client('getPrice', 1234, function (err, price) 
	    {	alert('price:' + price);
		    //sendMessage('price:' + String(price));
		});
    }	
	/////////////////////////////////////////////////////////
	else
	{	client('sum', [1,2,3,4], function (err, total) 
		{	alert('total:' + total);
			//sendMessage('sum total:' + String(total));
		});
	}	
}
//);