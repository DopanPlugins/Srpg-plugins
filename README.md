# Srpg-plugins
 srpg plugins (rpg mv)

IMPORTANT Info about the newest edited core Version:

-has EXA change, for more char frame usage
needed IMGs are attached at this github

-has eventpriority change ,that requires the plugin "EventResetAfterAction",
in order to reset priority after each action..

-has an correctly working MapBattle PreAction Phase, that requires an Common Event
which need to be inserted in the plugin param
(this Common Event should trigger the pre-action phase)
-> ill attach some info screenshoots for this aswell

![Screenshot_1](https://user-images.githubusercontent.com/72324675/138602017-a6f604f2-3d87-4b1e-ba14-eb8bf9e5c768.png)

![Screenshot_3](https://user-images.githubusercontent.com/72324675/138602027-f8777cc6-1d9c-4c33-ab4b-0287284d9b2d.png)



=> it has also other upgrades but none of them have importent requirements like those above
..if you need help with the setup pls ask in rpg mv forum

The MapActionText can easyly made with 1 Common event triggered from pre-action Phase 
..with if condition(if mapbattle is ON )

![Screenshot_4](https://user-images.githubusercontent.com/72324675/138602102-d713cbe1-ecbf-4e00-9a73-56025c96147f.png)


![11](https://user-images.githubusercontent.com/72324675/138607811-16ef1e5a-6b33-42cb-886a-d157b5d89daf.png)


The "MFA switch" is a Switch that is aktivated by the newest update of MapForceAction (not fully tested but uploaded)
this Switch makes sure that extra actions dont trigger a "MapActionText" or "MapBattle_pre-action phase"
 (to avoid bugs)
 The switch should be deactivated in the "event after action":
 ![Screenshot_1](https://user-images.githubusercontent.com/72324675/138607516-b1b584ac-5884-422b-93c0-fa582547a2b6.png)

 
 
 The MapForceAction Plugin allows us to make "duo combo skill", "double skills" or ,
 skills that trigger other units to use other skills on other targets..
 
 ===> currently i will mostly work on rework&test some of my plugins and to test other new srpg-plugins,..
 cheers
