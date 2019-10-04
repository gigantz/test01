#How to run it?

```
npx parcel index.html
```

<!--
Timeline:
You have 12 hours from receiving this message to complete as many of the steps as you can below and build something you're proud of, given the time constraint.


Background:
Imagine you have a software company providing a service online.
Users can buy one year of this service access, and with credit card pay the daily cost between $5 - 20 per day depending on which plan they're on.  If users are happy with the software/service after one year, then they will renew the service for another year and keep paying daily.
Some customer will love your service (we say they are happy and have "good health"), other customers may be disappointed with the service and have "bad health". Customers with bad health typically don't renew their subscription when it's ending after one year.

Let's build a game to simulate these customers!


Tech Stack:
This is a front-end only exercise, to be implemented in pure JS / HTML / CSS.

Keep it lean and simple. You're free to use some libraries like JQuery, Lodash, Bootstrap but given the small scope of this exercise, you shouldn't really need it. Plain Javascript will most likely be enough, and we certainly don't want to see the big guns such as Angular or React.

You can have the CSS, JS and HTML in a single file, or if you prefer you can split it into a few different files, whatever you feel makes most sense.



The Bubble Game:

A) Playground (delivery 1)
Create a rectangular container area for the game on the HTML page.

Bubbles:
Draw 10 (ten) bubbles, randomly spread out across the area - each bubble represents a customer.

The size of each bubble represents how much the customer is paying
The color of each bubble represents the "health" of the customer relationship on a scale 0-10
(green if more than 7.5,  red if less than 3.5, yellow if in between)

In addition, each bubble also has two other properties
1) Number of days to renewal (can have a value of 0 - 360)
2) Number of days since last contacted

x-axis:
The lower bottom border (x-axis) represents the number of days to renewal, starting at 360 (to the left) and ending at 0.

y-axis
The left side border or the container area (y-axis) represents number of days since contacted, with 0 at the top and 90 at the bottom.


B) Time (delivery 2)
Add a time component so the bubbles start moving along the x-axis in the chart (ignore y-axis for now).
Every second is, 6 days in the game. Each day is a "tick" in the game. Meaning that in one minute 360 ticks will have passed and every bubble will have travelled one full container width. Whenever a bubble reaches the right border, number of days to renewal is reset from 0 to 360. Bubbles should move smoothly to give a continuous feeling.

Bubble also move vertically from top to bottom, bubbles with 0 days since last contacted will show at the top and then "sink" towards the bottom. They reach the bottom of the area when it's been 90 days and then this parameter is reset to 0 so bubble "floats" to the top again.

Each game lasts 2 minutes (= 720 ticks).


C) Contacting Customers (delivery 3)
Instead of resetting the value "Number of days since last contacted" when the bubble reach the bottom, completely remove the bubbles from the game when they reach the bottom.

But also allow the user to click the bubbles. Clicking a bubble represents contacting the customer and resets  "Number of days since last contacted"  so bubble float to top.

It now means that if the player does nothing, soon all bubbles will have touched bottom and disappeared from game. But if the player manages to click any bubble before they reach the bottom it floats back up again and game continues as long as there are bubbles on the screen (max limit still 720 ticks).

D) Money & Health (delivery 4)
For every tick, the heath of each customer will get a small random change in the range  so on average, health will drop over time (for example range may be +0.01 to -0.05.. or whatever makes the game fun and reasonable to play).

But minimum health is still 0 and max health is 10 (so if a customer with health 10 gets an addition of e.g 0.01 it will stay at 10 unchanged). Color of the bubbles change according to health.

Any bubble with health less than 3.5 will not renew, ie if a bubble with health < 3.5 gets to the right edge of the gaming area it is removed from the game.

alt + click on a bubble give +3 in health but can only be done every 2 seconds at most depending on what makes the game fun. (feel free to tweak the +3 and 2 seconds to values that make the game fun to play).

Every tick that passes, the value of each active customer it added to the score of the Player. So there's a counter somewhere showing the accumulated value of the game session.

Game ends either when 720 ticks passed or when no bubbles are left on the screen.

E) Logarithmic y-axis (delivery 5)
Instead of having a linear scale on the x-axis. Make it logarithmic so that the first 30% of the screen (from the top) represents not 30 days, but 10 days, consequently each bubble will (vertically) move faster initially and then the speed will slow down toward the bottom border .


F) Put the game online and keep a top list (deliver 6)
Deploy your project so that it can be played online use your own VPS, GitHub pages, S3 or something else.. up to you. Keep a top list of high scores (best 5 scores ever) and show in the app, instead of persisting to some self hosted database, save the top list using some onlie storage solution, for example Firebase which has a free plan.

G) Advanced / Bonus (delivery 7)
The ability to "alt + click" every x seconds to improve health of the customer by a few points was a massive over simplification.

In a real world scenario,  you may have an in-person meeting with some customers to strengthen the relationship, maybe a video call, customer will also send in support ticket, maybe email etc. They may also need some training on the product since perhaps if they only knew better how to use the product they'd be happier. Customer have different needs.

As a service provider you cannot please everyone and you certainly don't have time to meet everyone.. you have limited resources in terms of bugs you can fix, meetings you can attend and new features you can build, so you need to prioritize wisely.

In this final step, make the game more realistic by bringing some of these complexities into the game.


Best of luck! -->
