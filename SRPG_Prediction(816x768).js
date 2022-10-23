//=============================================================================
// SRPG_Prediction.js
//=============================================================================
/*:
 * @plugindesc v1.0 Adds <SRPG_Prediction> for SRPG (modyfy precdition Window)
 * @author dopan
 *
 * @help 
 *
 * PLUG & PLAY (this is for 816x768 Usage)
 *
 *
 *
 *
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ============================================================================
 * Changelog 
 * ============================================================================
 * Version 1.0:
 * - first Release 00.00.2020 for SRPG (rpg mv)!
 */
 
(function() {

  // Plugin param Variables:

  var parameters = PluginManager.parameters("SRPG_Prediction") || $plugins.filter(function (plugin) {
                   return plugin.description.contains('<SRPG_Prediction>')});

  var coreParam = PluginManager.parameters('SRPG_core');
  var _textSrpgRange = coreParam['textSrpgRange'] || 'Range';
  var _textSrpgDamage = coreParam['textSrpgDamage'] || 'Damage';
  var _textSrpgHealing = coreParam['textSrpgHealing'] || 'Healing';
  var _srpgPredictionWindowMode = Number(coreParam['srpgPredictionWindowMode'] || 1);  

//-----------------------------------------------------------------------------------------

    Window_SrpgPrediction.prototype.initialize = function(x, y) {
        var width = this.windowWidth();
        var height = this.windowHeight();
        this._actionArray = [];
        this._targetArray = [];
        Window_Base.prototype.initialize.call(this, x, y, width, height);
        this.refresh();
    };

    Window_SrpgPrediction.prototype.windowHeight = function() {
        if (_srpgPredictionWindowMode === 2) {
            return this.fittingHeight(1);
        } else {
            return this.fittingHeight(5);
        }
    };

    Window_SrpgPrediction.prototype.windowWidth = function() {
        return Graphics.boxWidth;
    };

//-----------------------------------------------------------------------------------------

    Window_SrpgPrediction.prototype.drawContents = function() {
        var windowWidth = this.windowWidth();
        var lineHeight = this.lineHeight();
        var x = 10;
        // action data
        var actor = this._actionArray[1];
        var target = this._targetArray[1];
        var action = actor.currentAction();
        var damage = action.srpgPredictionDamage(target);
        var hit = action.itemHit(target);
        var eva = action.itemEva(target);
        var actorCrit = Math.round(this._actionArray[1].cri * 100);
        var targetCrit = Math.round(this._targetArray[1].cri * 100);
        if (action.srpgSetChances()) action.srpgSetChances(); // requires srpgUnitCore plugin
        // display user Chances
        this.drawChances(action, x); 
        // display user crit
        this.changeTextColor(this.systemColor());
        this.drawText('Crit', windowWidth / 2 + x + 230, lineHeight * 2);
        this.resetTextColor();
        this.drawText(actorCrit + '%', windowWidth / 2 + x + 290, lineHeight * 2);
        // draw default content
        this.drawSrpgBattleActionName(actor, action, windowWidth / 2 + x + 60, lineHeight * 0, true);
        this.drawSrpgBattleHit(hit, eva, windowWidth / 2 + x + 60, lineHeight * 1);
        this.drawSrpgBattleDistance(actor, action, windowWidth / 2 + 230 + x, lineHeight * 1);
        this.drawSrpgBattleDamage(damage, windowWidth / 2 + x + 60, lineHeight * 2);
        // reaction data
        var actor = this._targetArray[1];
        var target = this._actionArray[1];
        var action = actor.currentAction();
        var userActionMeta = target.currentAction().item().meta;
        var counter = this._targetArray[1].cnt * 100;
        if (!this._targetArray[1].canUse(action.item())) {
            action = null;
        }
        // if no reaction or actingUnit = targetUnit
        if (!action || actor == target || counter === 0) {
            this.drawSrpgBattleActionName(actor, action, x, lineHeight * 0, false);
            return;
        }
        // if counter
        if (counter !== 0 && !userActionMeta.srpgUncounterable) {
            this.changeTextColor(this.systemColor());
            this.drawText('Counter', x + 160, lineHeight * 0, 96, 'right');
            this.resetTextColor();
            this.drawText(counter + '%', x + 220, lineHeight * 0, 96, 'right');
            // display target crit
            this.changeTextColor(this.systemColor());
            this.drawText('Crit', x + 160, lineHeight * 2);
            this.resetTextColor();
            this.drawText(targetCrit + '%', x + 220, lineHeight * 2);
        }
        // display target Chances
        this.drawChances(action, x - 478); 
        // draw default content
        var damage = action.srpgPredictionDamage(target);
        var hit = action.itemHit(target);
        var eva = action.itemEva(target);
        this.drawSrpgBattleActionName(actor, action, x - 10, lineHeight * 0, true);
        this.drawSrpgBattleHit(hit, eva, x - 10, lineHeight * 1);
        this.drawSrpgBattleDistance(actor, action, 160 + x, lineHeight * 1);
        this.drawSrpgBattleDamage(damage, x - 10, lineHeight * 2);
        this._targetArray[1].clearActions();
    };
//-----------------------------------------------------------------------------------------

    Window_SrpgPrediction.prototype.drawChances = function(action, x) {
           this.changeTextColor(this.systemColor());
           this.drawText('Break', this.windowWidth() / 2 + x + 60, this.lineHeight() * 3);
           this.drawText('Steal', this.windowWidth() / 2 + x + 230, this.lineHeight() * 3);
           this.resetTextColor();
           var skill = action.item();
        if (skill.meta.srpgBreak || skill.meta.srpgItemBreak || skill.meta.srpgTypeBreakEquip || skill.meta.srpgTypeBreakWeapon || 
            skill.meta.srpgTypeBreakArmor || skill.meta.srpgSlotBreakEquip || skill.meta.srpgSlotBreakItem) {
            var textBreak = Number(action._breakChance);
        } else {var textBreak = 0};
        if (skill.meta.srpgSteal || skill.meta.srpgItemSteal || skill.meta.srpgTypeStealWeapon || skill.meta.srpgTypeStealArmor || 
            skill.meta.srpgTypeStealEquip || skill.meta.srpgSlotStealEquip || skill.meta.srpgSlotStealItem || 
            skill.meta.srpgGoldStealAmount || skill.meta.srpgGoldStealRandom || skill.meta.srpgExpStealAmount || skill.meta.srpgExpStealRandom) {
            var textSteal = Number(action._stealChance);
        } else {var textSteal = 0};
           this.drawText(textBreak + '%', this.windowWidth() / 2 + x + 140, this.lineHeight() * 3);
           this.drawText(textSteal + '%', this.windowWidth() / 2 + x + 310, this.lineHeight() * 3);
    };

    Window_SrpgPrediction.prototype.drawSrpgBattleDistance = function(actor, action, x, y) {
        var skill = action.item();
        this.changeTextColor(this.systemColor());
        this.drawText(_textSrpgRange, x, y);
        this.resetTextColor();
        var text = '';
        if (actor.srpgSkillMinRange(skill) > 0) {
            text += actor.srpgSkillMinRange(skill) + '-';
        }
        text += actor.srpgSkillRange(skill);
        this.drawText(text, x + 80, y);
    };

    Window_SrpgPrediction.prototype.drawSrpgBattleDamage = function(damage, x, y) {
        this.changeTextColor(this.systemColor());
        if (damage >= 0) {
            this.drawText(_textSrpgDamage, x, y);
            this.resetTextColor();
            this.drawText(damage, x + 100, y);
        } else {
            this.drawText(_textSrpgHealing, x, y);
            this.resetTextColor();
            this.drawText(damage * -1, x + 105, y);
        }
    };

    Window_SrpgPrediction.prototype.drawSrpgBattleHit = function(hit, eva, x, y) {
        var val = 1.0 * hit * (1.0 - eva);
        this.changeTextColor(this.systemColor());
        this.drawText(TextManager.param(8), x, y);
        this.resetTextColor();
        this.drawText(Math.floor(val * 100) + '%', x + 50, y);
    };



//-----------------------------------------------------------------------------------------

    Window_SrpgPrediction.prototype.drawSkillCost = function(actor, skill, x, y, width) {
        if (actor.skillTpCost(skill) > 0) {
            this.changeTextColor(this.tpCostColor());
            this.drawText(actor.skillTpCost(skill) + '.TP', x - 25, y, width, 'right');
        } else if (actor.skillMpCost(skill) > 0) {
            this.changeTextColor(this.mpCostColor());
            this.drawText(actor.skillMpCost(skill) + '.MP', x - 25, y, width, 'right');
        }
    };


//-----------------------------------------------------------------------------------------  

Window_SrpgBattle.prototype.initialize = function() {
      var width = this.windowWidth();
      var height = this.windowHeight();
      Window_Command.prototype.initialize.call(this, 0, 0);
      this._actor = null;
      this._item = null;
      this.openness = 0;
      this.deactivate();
};

Window_SrpgBattle.prototype.maxCols = function() {
    return 1;
};

Window_SrpgBattle.prototype.itemTextAlign = function() {
    return 'center';

};

Window_SrpgBattle.prototype.windowWidth = function() {
      var data = 150;
      return data;
};
	
Window_SrpgBattle.prototype.windowHeight = function() {
      var data = 110;
      return data;
};

Window_SrpgBattle.prototype.makeCommandList = function() {
      this.addCommand('Execute', 'battleStart', this.isEnabled(this._item));
      this.addCommand(TextManager.cancel, 'cancel');
};

Scene_Map.prototype.createSrpgBattleWindow = function() {
     this._mapSrpgBattleWindow = new Window_SrpgBattle();
     this._mapSrpgBattleWindow.x = Math.max((Graphics.boxWidth - this._mapSrpgBattleWindow.windowWidth()) / 2, 120);
     this._mapSrpgBattleWindow.y = this._mapSrpgStatusWindow.windowHeight() + this._mapSrpgPredictionWindow.windowHeight() - 150;// - 160
     this._mapSrpgBattleWindow.setHandler('battleStart', this.commandBattleStart.bind(this));
     this._mapSrpgBattleWindow.setHandler('cancel', this.selectPreviousSrpgBattleStart.bind(this));
     this.addWindow(this._mapSrpgBattleWindow);
};

//-----------------------------------------------------------------------------------------  


//--End:

})();