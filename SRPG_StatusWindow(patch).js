//=============================================================================
// SRPG_StatusWindow.js
//=============================================================================
/*:
 * @plugindesc Patched Version <SRPG_StatusWindow> allows you to show multiple status pages in SRPG battle
 * @author Shoukang
 *
 * @param enable actor status command
 * @type boolean
 * @default false
 *
 *
 * @param number of pages
 * @desc Number of pages the status window have
 * @type number
 * @default 3
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
 * Place it below SRPG_UX_Window and SRPG_BattleUI
 * =========================================================================================================================
 * v2.00 dopans Edited Patch for EnemyEquip!
 */

(function(){
    //var params = PluginManager.parameters('SRPG_StatusWindow');

    // this allows to use other names for the plugin
    var params = PluginManager.parameters("SRPG_StatusWindow") || $plugins.filter(function (plugin) {
                   return plugin.description.contains('<SRPG_StatusWindow>'); });

    var _enableStatus = !!eval(params['enable actor status command']);
    var _pages = Number(params['number of pages'] || 3);

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
    var _SRPG_import_enemyEquip_actorStatus = Window_SrpgStatus.prototype.drawContentsActor;
    Window_SrpgStatus.prototype.drawContentsActor = function() {
        var lineHeight = this.lineHeight();
        if (this._page == 0){ 
            _SRPG_import_enemyEquip_actorStatus.call(this)
        } else if (this._page == 1){
            //TODO: this part is for page 1
            //add data:
            var characterName = this._battler._characterName;
            var characterIndex = this._battler._characterIndex;
            //TODO:  "page 1" + char img
            this.drawText('page 1', 420, 20);
            this.drawText('Element Rates:', 6, lineHeight * 0);
            this.drawCharacter(characterName , characterIndex , 390, 60);
            //an example to draw all element rate
            this.changeTextColor(this.systemColor());
            this.drawText('physical', 6, lineHeight * 1, 120);
            this.drawText('fire', 6, lineHeight * 2, 120);
            this.drawText('ice', 6, lineHeight * 3, 120);
            this.drawText('thunder', 6, lineHeight * 4, 120);
            this.drawText('water', 6, lineHeight * 5, 120);
            this.drawText('earth', 6, lineHeight * 6, 120);
            this.drawText('wind', 6, lineHeight * 7, 120);
            this.drawText('light', 6, lineHeight * 8, 120);
            this.drawText('darkness', 6, lineHeight * 9, 120);
            this.resetTextColor();
            this.drawText(this._battler.elementRate(1) * 100 + '%', 6 + 120, lineHeight * 1, 48, 'right');
            this.drawText(this._battler.elementRate(2) * 100 + '%', 6 + 120, lineHeight * 2, 48, 'right');
            this.drawText(this._battler.elementRate(3) * 100 + '%', 6 + 120, lineHeight * 3, 48, 'right');
            this.drawText(this._battler.elementRate(4) * 100 + '%', 6 + 120, lineHeight * 4, 48, 'right');
            this.drawText(this._battler.elementRate(5) * 100 + '%', 6 + 120, lineHeight * 5, 48, 'right');
            this.drawText(this._battler.elementRate(6) * 100 + '%', 6 + 120, lineHeight * 6, 48, 'right');
            this.drawText(this._battler.elementRate(7) * 100 + '%', 6 + 120, lineHeight * 7, 48, 'right');
            this.drawText(this._battler.elementRate(8) * 100 + '%', 6 + 120, lineHeight * 8, 48, 'right');
            this.drawText(this._battler.elementRate(9) * 100 + '%', 6 + 120, lineHeight * 9, 48, 'right');
        } else if (this._page == 2){
            //TODO: this part is for page 2
            //add data:
            var characterName = this._battler._characterName;
            var characterIndex = this._battler._characterIndex;
            //TODO:  "page 2" + char img
            this.drawText('page 2', 420, 20);
            this.drawCharacter(characterName, characterIndex, 390, 60);
            // add stuff here


        }
        //Feel free to add/remove pages.
    };
    var _SRPG_import_enemyEquip_enemyStatus = Window_SrpgStatus.prototype.drawContentsEnemy;
    Window_SrpgStatus.prototype.drawContentsEnemy = function() {
        var lineHeight = this.lineHeight();
        if (this._page == 0){
            _SRPG_import_enemyEquip_enemyStatus.call(this)
        } else if (this._page == 1){
            //add data:
            var enemyMeta = this._battler.enemy().meta;
            var characterName = enemyMeta.characterName;
            var characterIndex = enemyMeta.characterIndex;
            //TODO: "page 1" +char img
            this.drawText('page 1', 420, 20);
            this.drawText('Element Rates:', 6, lineHeight * 0);
            this.drawCharacter(characterName, characterIndex, 390, 60);
            //an example to draw all element rate
            this.changeTextColor(this.systemColor());
            this.drawText('physical', 6, lineHeight * 1, 120);
            this.drawText('fire', 6, lineHeight * 2, 120);
            this.drawText('ice', 6, lineHeight * 3, 120);
            this.drawText('thunder', 6, lineHeight * 4, 120);
            this.drawText('water', 6, lineHeight * 5, 120);
            this.drawText('earth', 6, lineHeight * 6, 120);
            this.drawText('wind', 6, lineHeight * 7, 120);
            this.drawText('light', 6, lineHeight * 8, 120);
            this.drawText('darkness', 6, lineHeight * 9, 120);
            this.resetTextColor();
            this.drawText(this._battler.elementRate(1) * 100 + '%', 6 + 120, lineHeight * 1, 48, 'right');
            this.drawText(this._battler.elementRate(2) * 100 + '%', 6 + 120, lineHeight * 2, 48, 'right');
            this.drawText(this._battler.elementRate(3) * 100 + '%', 6 + 120, lineHeight * 3, 48, 'right');
            this.drawText(this._battler.elementRate(4) * 100 + '%', 6 + 120, lineHeight * 4, 48, 'right');
            this.drawText(this._battler.elementRate(5) * 100 + '%', 6 + 120, lineHeight * 5, 48, 'right');
            this.drawText(this._battler.elementRate(6) * 100 + '%', 6 + 120, lineHeight * 6, 48, 'right');
            this.drawText(this._battler.elementRate(7) * 100 + '%', 6 + 120, lineHeight * 7, 48, 'right');
            this.drawText(this._battler.elementRate(8) * 100 + '%', 6 + 120, lineHeight * 8, 48, 'right');
            this.drawText(this._battler.elementRate(9) * 100 + '%', 6 + 120, lineHeight * 9, 48, 'right');
        } else if (this._page == 2){
            //TODO: this part is content for page 2
            //add data:
            var enemyMeta = this._battler.enemy().meta;
            var characterName = enemyMeta.characterName;
            var characterIndex = enemyMeta.characterIndex;
            //TODO:  "page 2"+ char img
            this.drawText('page 2', 420, 20);
            this.drawCharacter(characterName, characterIndex, 390, 60);
            // add stuff here


        }
        //Feel free to add/remove pages.
    };

    Game_Enemy.prototype.equipSlots = function() {
        return Game_Actor.prototype.equipSlots.call(this);
    };

})();
