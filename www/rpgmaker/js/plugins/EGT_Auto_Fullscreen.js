//this is a full screen plugin which makes the game autostart in fullscreen

//known bugs:  when going to "windowed mode" by pressing F4 the widescreen function of YEP_CoreEngine plugin makes the game go into a 4:3 windowed letterbox.

/*:
 *@help This plugin does not provide plugin commands.
 *
 *Known bugs:  when going to "windowed mode" by pressing F4 the widescreen function of YEP_CoreEngine *plugin makes the game go into a 4:3 windowed letterbox.
 *
 *ChangeLog
 October 31 2015 - version 1 released
  */
(function() {
    Graphics._requestFullScreen()
})();