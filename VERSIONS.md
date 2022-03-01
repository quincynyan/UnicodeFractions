# Unicode Fractions

###### Version history

## 1.0.0

### Initial release

First release of Unicode Fractions

#### 1.0.1

##### Discriptive release

Released README and fixed manifest. Also added a preview.

#### 1.0.1.fix

##### Typo fix

Fixed the stupid typos I made everywhere.

#### 1.0.2

##### Image fix

Fixed the problem where it won't work when you upload a file. This is probly one of the first plugins to fix that lmao.

#### 1.0.3

##### Revert Image fix

As of right now, here're the known issues that the plugin breaks:

-   Emojis (can't click on them on the emoji selection box)
-   Selection of texts (can't select text in messages)
-   Search bar (can't click on the search bar)
-   Quick switcher (takes you to the support page instead of taking you to the last channel)

I'll try to provide a fix for this, but for now, you can temporarily (like for 5 seconds) fix this by right-clicking on a message (any messages) before you use emojis or select texts or use quick switcher or the search bar.

It seems that the injection is broken. Most plugins inject into `sendMessage` but it doesn't work when you upload files, as another method is called when you send a message with attachments. This plugin fixes it by doing a different injection which works when you upload images but apparently, it also breaks these things above. I'll revert back to the old `sendMessage` injection where these will be fixed, but doing so will make UnicodeFractions not available when you send messages with attachments (They won't convert the fractions when you upload files). I'll try to find a fix for that, and thank you for opening an issue and helping me out!
