# Srpg-plugins
 srpg plugins (rpg mv)

IMPORTENT Info about the newest edited core Version:

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


![Screenshot_2](https://user-images.githubusercontent.com/72324675/138601922-73b61343-de76-4bd7-8c36-13860ffe8e0d.png)

The "MFA switch" is a Switch that is aktivated by the newest update of MapForceAction (comming soon)
this Switch makes sure that extra actions dont trigger a "MapActionText" or "MapBattle_pre-action phase"
 (to avoid bugs)
 
 The MapForceAction Plugin allows use to make "duo combo skill", "double skills" or ,
 skills that trigger other units to use other skills on oher targets..
 
 ===> currently i will mostly work on rework some of my plugins and to test other new plugins,..
 cheers
