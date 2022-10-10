//=============================================================================
// SRPG_StatusWindow.js
//=============================================================================
/*:
 * @plugindesc Patched Version <SRPG_StatusWindow> allows you to show multiple status pages in SRPG battle
 * @author Shoukang (dopan patch 816x624)
 *
 * @param enable actor status command
 * @type boolean
 * @default false
 *
 *
 * @param number of pages
 * @desc Number of pages the status window have
 * @type number
 * @default 4
 *
 * @help
 *
 * This plugin allows you to show multiple status pages in SRPG battle.
 * Click Ok will go to next page, click cancel will close the window.
 * You need to code yourself to show the contents.
 * I left the TODO notes and examples for you to DIY your status window. Just serch for 'TODO',
 * and play around with the code. Drawing text is easy to learn.(but hard to master).
 * If you scroll to the bottom I also copy and paste some functions used (such as 'drawBasicInfoActor')
 * so you know what they are doing.
 * The example code as well as the code copied from core plugin have many 'magic numbers'... Which is not a good
 * coding example. It's usually better to replace the numbers with variables. For example number 6 is actually this.textPadding(),
 * values such as 192... should derive from calculations like _width/2 - this.standardpadding() + this.textPadding();
 * This will make your code more maintainable, especially when you want to change the window width and other parameters someday.
 * ==========================================================================================================================
 * Compatibility:
 * Place it below SRPG_UX_Window & SRPG_BattleUI & SRPG_EnemyEquip
 * =========================================================================================================================
 * v2.02 dopans Edited Patch for EnemyEquip!816x624
 */

(function(){
    //var params = PluginManager.parameters('SRPG_StatusWindow');

    // this allows to use other names for the plugin
    var params = PluginManager.parameters("SRPG_StatusWindow") || $plugins.filter(function (plugin) {
                   return plugin.description.contains('<SRPG_StatusWindow>'); });

    var _enableStatus = !!eval(params['enable actor status command']);
    var _pages = Number(params['number of pages'] || 4);

    var _Window_SrpgStatus_initialize = Window_SrpgStatus.prototype.initialize
    Window_SrpgStatus.prototype.initialize = function(x, y) {
        _Window_SrpgStatus_initialize.call(this, x, y);
        this._page = 0;
        this.refresh();
    };

    var _SRPG_Game_Player_triggerAction = Game_Player.prototype.triggerAction;
    Game_Player.prototype.triggerAction = function() {
        if ($gameSystem.isSRPGMode() && $gameSystem.isSubBattlePhase() === 'status_window') {
            if (Input.isTriggered('ok') || TouchInput.isTriggered()) {
                $gameSystem.setSrpgStatusWindowNextPage();
                return true;
            }
        }
        return _SRPG_Game_Player_triggerAction.call(this);
    }

    Game_System.prototype.setSrpgStatusWindowNextPage = function(){
        this._SrpgStatusWindowPageNext = true;
    }

    Game_System.prototype.clearSrpgStatusWindowNextPage = function(){
        this._SrpgStatusWindowPageNext = false;
    }

    Game_System.prototype.srpgStatusWindowNextPage = function(){
        return this._SrpgStatusWindowPageNext;
    }

    Game_System.prototype.setActorCommandStatus = function(){
        this._isActorCommandStatus = true;
    }

    Game_System.prototype.clearActorCommandStatus = function(){
        this._isActorCommandStatus = false;
    }

    Game_System.prototype.isActorCommandStatus = function(){
        return this._isActorCommandStatus;
    }

    var _SRPG_SceneMap_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _SRPG_SceneMap_update.call(this);
        if ($gameSystem.isSRPGMode()) {
            if ($gameSystem.srpgStatusWindowNextPage()){
                SoundManager.playOk();
                this._mapSrpgStatusWindow.nextPage();
                $gameSystem.clearSrpgStatusWindowNextPage();
            }
        }
    }

    var _updateCallMenu = Scene_Map.prototype.updateCallMenu;
    Scene_Map.prototype.updateCallMenu = function() {
        if ($gameSystem.isSRPGMode() && !$gameSystem.srpgWaitMoving()) {
            if ($gameSystem.isSubBattlePhase() === 'status_window' && this.isMenuCalled()) {
                $gameSystem.clearSrpgStatusWindowNeedRefresh();
                SoundManager.playCancel();
                if ($gameSystem.isActorCommandStatus()){
                    $gameSystem.setSubBattlePhase('actor_command_window');
                    $gameSystem.clearSrpgStatusWindowNeedRefresh();
                    this._mapSrpgActorCommandWindow.activate();
                } else {
                    $gameTemp.clearActiveEvent();
                    $gameSystem.setSubBattlePhase('normal');
                    $gameTemp.clearMoveTable();
                }
                return;
            }
        }
        _updateCallMenu.call(this);
    };

    //change the window priority
    var _SRPG_SceneMap_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function() {
        _SRPG_SceneMap_createAllWindows.call(this);
        this._windowLayer.removeChild(this._mapSrpgStatusWindow);
        this.createSrpgStatusWindow();
    };

    var _Scene_Map_createSrpgActorCommandWindow = Scene_Map.prototype.createSrpgActorCommandWindow;
    Scene_Map.prototype.createSrpgActorCommandWindow = function(){
        _Scene_Map_createSrpgActorCommandWindow.call(this);
        this._mapSrpgActorCommandWindow.setHandler('status', this.commandStatus.bind(this));
    };

    Scene_Map.prototype.commandStatus = function() {
        var battlerArray = $gameSystem.EventToUnit($gameTemp.activeEvent().eventId());
        SoundManager.playOk();
        $gameTemp.setResetMoveList(true);
        $gameSystem.setActorCommandStatus();
        $gameSystem.setSrpgStatusWindowNeedRefresh(battlerArray);
        $gameSystem.setSubBattlePhase('status_window');
    };

    var _Scene_Map_selectPreviousActorCommand = Scene_Map.prototype.selectPreviousActorCommand
    Scene_Map.prototype.selectPreviousActorCommand = function() {
        if ($gameSystem.isActorCommandStatus()) {
            $gameSystem.clearActorCommandStatus();
            this._mapSrpgActorCommandWindow.activate();
        } else _Scene_Map_selectPreviousActorCommand.call(this);
    }

    Window_ActorCommand.prototype.addSrpgStatusCommand = function() {
        if (_enableStatus) this.addCommand(TextManager.status, 'status');
    }

    //a bad idea to add the status command here... 
    var _Window_ActorCommand_addWaitCommand = Window_ActorCommand.prototype.addWaitCommand
    Window_ActorCommand.prototype.addWaitCommand = function() {
        this.addSrpgStatusCommand();
        _Window_ActorCommand_addWaitCommand.call(this);
    };

    var _Window_SrpgStatus_clearBattler = Window_SrpgStatus.prototype.clearBattler
    Window_SrpgStatus.prototype.clearBattler = function() {
        this._page = 0;
        _Window_SrpgStatus_clearBattler.call(this);
    };

    Window_SrpgStatus.prototype.nextPage = function() {
        this._page = (this._page + 1) % _pages;
        this.refresh();
    };
    // rebuild the 816 x 624 Setup from the SRPG Core
    Window_SrpgBattleStatus.prototype.drawBasicInfoActor = function(x, y) {
        var lineHeight = this.lineHeight();
        this.drawActorIcons(this._battler, x, y + lineHeight * 0);
        this.drawActorHp(this._battler, x, y + lineHeight * 1);
        if ($dataSystem.optDisplayTp) {
            this.drawActorMp(this._battler, x, y + lineHeight * 2, 90);
            this.drawActorTp(this._battler, x + 96, y + lineHeight * 2, 90);
        } else {
            this.drawActorMp(this._battler, x, y + lineHeight * 2);
        }

    };

    Window_SrpgBattleStatus.prototype.drawBasicInfoEnemy = function(x, y) {
        var lineHeight = this.lineHeight();
        this.drawActorIcons(this._battler, x, y + lineHeight * 0);
        this.drawActorHp(this._battler, x, y + lineHeight * 1);
        if ($dataSystem.optDisplayTp) {
            this.drawActorMp(this._battler, x, y + lineHeight * 2, 90);
            this.drawActorTp(this._battler, x + 96, y + lineHeight * 2, 90);
        } else {
            this.drawActorMp(this._battler, x, y + lineHeight * 2);
        }
    };

    var _SRPG_import_enemyEquip_actorStatus = Window_SrpgStatus.prototype.drawContentsActor;
    Window_SrpgStatus.prototype.drawContentsActor = function() {
        var lineHeight = this.lineHeight();
        if (this._page == 0) { 
            var lineHeight = this.lineHeight();
            var srpgTeam = this._battler.srpgTeam();
            this.drawText(this._battler._nickname, 170, lineHeight * 0);
            this.changeTextColor(this.textColor(13));
            this.drawText('Team:', 170, lineHeight * 5);
            this.resetTextColor();
            this.drawText(srpgTeam + ' ', 240, lineHeight * 5);
            this.drawActorName(this._battler, 6, lineHeight * 0);
            this.drawActorFace(this._battler, 6, lineHeight * 1);
            this.drawBasicInfoActor(176, lineHeight * 1);
            this.drawActorClass(this._battler, 6, lineHeight * 5);
            this.drawParameters(6, lineHeight * 6);
            this.drawSrpgParameters(6, lineHeight * 9);
            // add stuff here

        } else if (this._page == 1) {
            //TODO: this part is for page 1
            //add data:
            var characterName = this._battler._characterName;
            var characterIndex = this._battler._characterIndex;
            //TODO:  "page 1" + char img
            this.changeTextColor(this.systemColor());
            this.drawText('1/3', 325, 10);
            this.resetTextColor();
            this.drawCharacter(characterName , characterIndex , 300, 50);
            //ActorEquips Setup:
            this.changeTextColor(this.systemColor());
            this.drawText('Equipment:', 2, lineHeight * 0);
            this.resetTextColor();
            var eGone = this._battler._equipIsGone; 
            var storage = this._battler._equips;
            var count = storage.length;
            for (var i = 0; i < count; i++) {
                 var itemID = this._battler._equips[i]._itemId;
                 if (itemID > 0) {
                     this.drawItemName(storage[i].object(), 10, lineHeight * 1 + this.lineHeight() * i);
                 }
                 if (itemID === 0 && eGone[i] === false) {
                     this.drawText('<Nothing equiped>', 10, lineHeight * 1 + this.lineHeight() * i);
                 }
                 if (itemID === 0 && eGone[i] === true) {
                     this.changeTextColor(this.textColor(10));
                     this.drawText('<Stolen>', 10, lineHeight * 1 + this.lineHeight() * i);
                     this.resetTextColor();
                 }
            };
            // add stuff here

        } else if (this._page == 2) {
            //TODO: this part is for page 2
            //add data:
            var characterName = this._battler._characterName;
            var characterIndex = this._battler._characterIndex;
            //TODO:  "page 2" + char img
            this.changeTextColor(this.systemColor());
            this.drawText('2/3', 325, 10);
            this.resetTextColor();
            this.drawCharacter(characterName, characterIndex, 300, 50);
            //displayActorItemSlots
            this.changeTextColor(this.systemColor());
            this.drawText('Items:', 6, lineHeight * 0);
            this.resetTextColor();
            var storage = this._battler._itemSlots;
            var count = storage.length;
            for (var i = 0; i < count; i++) {
                 var itemID = this._battler._itemSlots[i]._itemId;
                 var amount = this._battler._itemSlots[i].amount;
                 if (itemID > 0) {
                     this.drawItemName(storage[i].object(), 36, lineHeight * 1 + this.lineHeight() * i);
                     this.changeTextColor(this.systemColor());
                     this.drawText(amount + 'x', 6, lineHeight * 1 + this.lineHeight() * i);
                 }
                 if (itemID === 0) {
                     this.drawText('<Empty>', 6, lineHeight * 1 + this.lineHeight() * i);

                 }
            };
            // add stuff here

        //Feel free to add/remove pages.
        } else if (this._page == 3) {
            //add data:
            var characterName = this._battler._characterName;
            var characterIndex = this._battler._characterIndex;
            //TODO: "page 3" +char img
            this.changeTextColor(this.systemColor());
            this.drawText('3/3', 325, 10);
            this.drawText('Element Rates:', 2, lineHeight * 0);
            this.resetTextColor();
            this.drawCharacter(characterName, characterIndex, 300, 50);
            //an example to draw all element rate
            this.drawText('physical', 6, lineHeight * 1, 120);
            this.drawText('fire', 6, lineHeight * 2, 120);
            this.drawText('ice', 6, lineHeight * 3, 120);
            this.drawText('thunder', 6, lineHeight * 4, 120);
            this.drawText('water', 6, lineHeight * 5, 120);
            this.drawText('earth', 6, lineHeight * 6, 120);
            this.drawText('wind', 6, lineHeight * 7, 120);
            this.drawText('light', 6, lineHeight * 8, 120);
            this.drawText('darkness', 6, lineHeight * 9, 120);
            this.drawText(this._battler.elementRate(1) * 100 + '%', 6 + 120, lineHeight * 1, 48, 'right');
            this.drawText(this._battler.elementRate(2) * 100 + '%', 6 + 120, lineHeight * 2, 48, 'right');
            this.drawText(this._battler.elementRate(3) * 100 + '%', 6 + 120, lineHeight * 3, 48, 'right');
            this.drawText(this._battler.elementRate(4) * 100 + '%', 6 + 120, lineHeight * 4, 48, 'right');
            this.drawText(this._battler.elementRate(5) * 100 + '%', 6 + 120, lineHeight * 5, 48, 'right');
            this.drawText(this._battler.elementRate(6) * 100 + '%', 6 + 120, lineHeight * 6, 48, 'right');
            this.drawText(this._battler.elementRate(7) * 100 + '%', 6 + 120, lineHeight * 7, 48, 'right');
            this.drawText(this._battler.elementRate(8) * 100 + '%', 6 + 120, lineHeight * 8, 48, 'right');
            this.drawText(this._battler.elementRate(9) * 100 + '%', 6 + 120, lineHeight * 9, 48, 'right');
            // add stuff here

        };
        //Feel free to add/remove pages.
    };
    var _SRPG_import_enemyEquip_enemyStatus = Window_SrpgStatus.prototype.drawContentsEnemy;
    Window_SrpgStatus.prototype.drawContentsEnemy = function() {
        var lineHeight = this.lineHeight();
        if (this._page == 0) {
            var lineHeight = this.lineHeight();
            var srpgTeam = this._battler.srpgTeam();
            this.changeTextColor(this.textColor(13));
            this.drawText('Team:', 170, lineHeight * 5);
            this.resetTextColor();
            this.drawText(srpgTeam + ' ', 240, lineHeight * 5);
            this.drawActorName(this._battler, 6, lineHeight * 0);
            this.drawEnemyFace(this._battler, 6, lineHeight * 1);
            this.drawBasicInfoEnemy(176, lineHeight * 1);
            this.drawEnemyClass(this._battler, 6, lineHeight * 5);
            this.drawParameters(6, lineHeight * 6);
            this.drawSrpgParameters(6, lineHeight * 9);
            // add stuff here

        } else if (this._page == 1) {
            //add data:
            var enemyMeta = this._battler.enemy().meta;
            var characterName = enemyMeta.characterName;
            var characterIndex = enemyMeta.characterIndex;
            //TODO: "page 1" +char img
            this.changeTextColor(this.systemColor());
            this.drawText('1/3', 325, 10);
            this.resetTextColor();
            this.drawCharacter(characterName, characterIndex, 300, 50);
            //EnemyEquips Setup:
            this.changeTextColor(this.systemColor());
            this.drawText('Equipment:', 2, lineHeight * 0);
            this.resetTextColor();
            var eGone = this._battler._equipIsGone; 
            var storage = this._battler._equips;
            var count = storage.length;
            for (var i = 0; i < count; i++) {
                 var itemID = this._battler._equips[i]._itemId;
                 if (itemID > 0) {
                     this.drawItemName(storage[i].object(), 10, lineHeight * 1 + this.lineHeight() * i);
                 }
                 if (itemID === 0 && eGone[i] === false) {
                     this.drawText('<Nothing equiped>', 10, lineHeight * 1 + this.lineHeight() * i);
                 }
                 if (itemID === 0 && eGone[i] === true) {
                     this.changeTextColor(this.textColor(10));
                     this.drawText('<Stolen>', 10, lineHeight * 1 + this.lineHeight() * i);
                     this.resetTextColor();
                 }
            };
            // add stuff here

        } else if (this._page == 2) {
            //TODO: this part is content for page 2
            //add data:
            var enemyMeta = this._battler.enemy().meta;
            var characterName = enemyMeta.characterName;
            var characterIndex = enemyMeta.characterIndex;
            //TODO:  "page 2"+ char img
            this.changeTextColor(this.systemColor());
            this.drawText('2/3', 325, 10);
            this.resetTextColor();
            this.drawCharacter(characterName, characterIndex, 300, 50);
            //EnemySkills
            this.changeTextColor(this.systemColor());
            this.drawText('Skills:', 2, lineHeight * 0);
            this.resetTextColor();
            var skills = [];
            for (var i = 0; i < this._battler.enemy().actions.length; ++i) {
                var skill = $dataSkills[this._battler.enemy().actions[i].skillId];
                if (skill) skills.push(skill);
                this.drawItemName(skills[i], 10, lineHeight * 1 + this.lineHeight() * i);
            }
            //EnemyItemStore Setup:
            this.changeTextColor(this.systemColor());
            this.drawText('Items:', 2, lineHeight * 5);
            this.resetTextColor();
            var storage = this._battler._itemSlots;
            var count = storage.length;
            for (var i = 0; i < count; i++) {
                 var itemID = this._battler._itemSlots[i]._itemId;
                 if (itemID > 0) {
                     this.drawItemName(storage[i].object(), 10, lineHeight * 6 + this.lineHeight() * i);
                 }
                 if (itemID === 0) {
                     this.drawText('<Empty>', 10, lineHeight * 6 + this.lineHeight() * i);

                 }
            };
            // add stuff here

        //Feel free to add/remove pages.
        } else if (this._page == 3) {
            //TODO: this part is content for page 3
            //add data:
            var enemyMeta = this._battler.enemy().meta;
            var characterName = enemyMeta.characterName;
            var characterIndex = enemyMeta.characterIndex;
            // draw page nr + char
            this.changeTextColor(this.systemColor());
            this.drawText('3/3', 325, 10);
            this.drawText('Element Rates:', 6, lineHeight * 0);
            this.resetTextColor();
            this.drawCharacter(characterName , characterIndex , 300, 50);
            //an example to draw all element rate
            this.drawText('physical', 6, lineHeight * 1, 120);
            this.drawText('fire', 6, lineHeight * 2, 120);
            this.drawText('ice', 6, lineHeight * 3, 120);
            this.drawText('thunder', 6, lineHeight * 4, 120);
            this.drawText('water', 6, lineHeight * 5, 120);
            this.drawText('earth', 6, lineHeight * 6, 120);
            this.drawText('wind', 6, lineHeight * 7, 120);
            this.drawText('light', 6, lineHeight * 8, 120);
            this.drawText('darkness', 6, lineHeight * 9, 120);
            this.drawText(this._battler.elementRate(1) * 100 + '%', 6 + 120, lineHeight * 1, 48, 'right');
            this.drawText(this._battler.elementRate(2) * 100 + '%', 6 + 120, lineHeight * 2, 48, 'right');
            this.drawText(this._battler.elementRate(3) * 100 + '%', 6 + 120, lineHeight * 3, 48, 'right');
            this.drawText(this._battler.elementRate(4) * 100 + '%', 6 + 120, lineHeight * 4, 48, 'right');
            this.drawText(this._battler.elementRate(5) * 100 + '%', 6 + 120, lineHeight * 5, 48, 'right');
            this.drawText(this._battler.elementRate(6) * 100 + '%', 6 + 120, lineHeight * 6, 48, 'right');
            this.drawText(this._battler.elementRate(7) * 100 + '%', 6 + 120, lineHeight * 7, 48, 'right');
            this.drawText(this._battler.elementRate(8) * 100 + '%', 6 + 120, lineHeight * 8, 48, 'right');
            this.drawText(this._battler.elementRate(9) * 100 + '%', 6 + 120, lineHeight * 9, 48, 'right');
            // add stuff here
        }
        //Feel free to add/remove pages.
    };


})();
