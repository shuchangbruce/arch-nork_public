# Architected Nork

This repository contains two versions of a simple text-based game called Nork, developed as part of a [course](http://arch-joelross.rhcloud.com/) at the UW iSchool. 

The below questions should be answered (in detail!) regarding your submission!


##### 1. Did you work with a partner? If so, who?
> No, I'm alone.



##### 2. Discuss how the different architectural styles affected the implementation of your program. Was one pattern easier to use or more effective _for this problem_? Why? How do the different styles influence the ability to add new features or modify existing functionality? What kind of changes would be easier or harder with each style?
##### This discussion should be a couple of paragraphs, giving a detailed analysis of how the styles work.
> Pipe-and-filter and Client-Server are the two architectural styles I used in this assignments. While both use the same game logic to run the game, they have different ways of transfering data and interecting with users. 
> 
> Pipe-and-filter style is the first one I began to implement. I have created three filters to handle the job. Input filter, compute filter and output filter. Although not all three are complicated coding works, the idea of transforming a stream of data three times is complicated. And it is the nature of Pipe-and-filter. It is great if there is clearly a data flow. The pipe-and-filter structure will keep the modularity of the program. But for a interective game which has very simple data stream. It's over complicated. However, it's still effective in this program.
> 
> Client-Server is a better solution in this nork game. There are only two parts talking to each other. That is simpler than the pipe-and-filter. The server side is responsible for computing the input and return the output. The client side is responsible for showing the output and collect the input. It's simpler to understand thant the pipe style. However, I feel this one is harder to implement than the pipe's. I found it hard to totally seperate game logic from client side. Also the networking set up is little tricky for new programmer to learn.
> 
> In this program, I have set up a helper.js in the common file. It basically contains the game logic class. I use this class to build objects in both styles and it is very effective. If we want to add more function for the game, we do not need to separatedly work on each style. The logic class will be the only place to work on. I would say both styles are good for future improvements. 



##### 3. Did you add an extra features to either version of your game? If so, what?
>NO



##### 4. Approximately how many hours did it take you to complete this assignment? #####
> 30 hours.



##### 5. Did you receive help from any other sources (classmates, etc)? If so, please list who (be specific!). #####
> Joel



##### 6. Did you encounter any problems in this assignment we should warn students about in the future? How can we make the assignment better? #####
> I hope there are more coding examples on the slides.


