vibrate/mozVibrate polyfill
===================

This is nothing special but might be very useful for debugging FirefoxOS applications in the emulator or on your Desktop. 

Simply include the polyfill in your development version of your app and when mozVibrate is not supported you get a "buzz" message in the page title and the document "vibrates" to see that your code is working. You can see it in action in this screencast: http://www.youtube.com/watch?v=SmWJcf-MnJ4 

On devices that support mozVibrate, you get the real thing. This allows you to debug code without needing any extra logging. 

You can try it out here: http://codepo8.github.io/mozVibrate-polyfill/

*New*: added W3C compliant alias and option to stop vibration with empty parameter