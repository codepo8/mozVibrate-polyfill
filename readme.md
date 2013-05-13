mozVibrate polyfill
===================

This is nothing special but might be very useful for debugging FirefoxOS applications in the emulator or on your Desktop. 

Simply include the polyfill in your development version of your app and when mozVibrate is not supported you get a "buzz" message in the page title and the document "vibrates" to see that your code is working. You can see it in action in this screencast: http://www.youtube.com/watch?v=SmWJcf-MnJ4 

On devices that support mozVibrate, you get the real thing. This allows you to debug code without needing any extra logging. 

You can try it out here: https://github.com/codepo8/mozVibrate-polyfill
