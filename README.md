before we start,..
old plugins can be found here:
https://github.com/DopanPlugins/Storage-old-plugins-/tree/main

for rpg MV related Scriptcalls that are NOT added by the SRPG Core pls visit :

Usefull Scriptcalls Info 
(Page is not made by me)

https://docs.google.com/spreadsheets/d/1-Oa0cRGpjC8L5JO8vdMwOaYMKO75dtfKDOetnvh7OHs/htmlview#gid=0

alternative Scriptcall List
(Page is not made by me)

https://www.wikimoe.com/?post=108

for a scriptcall list of SRPG related Scriptcalls pls visit:

ScriptCallList_SRPG.js:

https://github.com/DopanPlugins/Srpg-plugins/blob/main/ScriptCallList_SRPG.js



# edited Srpg Core-plugin

Info about the newest edited core Version:

-> this edited Version is required for most of my plugins and it adds several features,
while beeing still compatible with other srpg Plugins that assume the usage of the default "srpg core 1.34"
by now i made all extra features that way, that you can use this edited core plug and play!

(i rewrote the mapbattle setup and splited it into a few more functions,
to easier allow other plugins to manipulate mapbattle stuff)

pls look into the core param and add or change data if required!

- this plugin has a correctly working plug&play "map pre battle phase"(timing) & adds a plug&play mapActionText function
(mapactionText is displaying the skillname of active skills in mapbattle mode)

- this plugin allows more char frame usage if core param setup is correctly and "exa" imgs are in your project

- this plugin allows enabling/disabling actorbattleCommands with gameSwitches

- this plugin has a few edits in the mapBattleSetup for better forceAction compatilety & it changes eventPriority to always display the acting unit above the target unit.This will be reseted automatically.

- and this plugin has a few other features which you can setup in the core param
