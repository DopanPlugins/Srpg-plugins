//=============================================================================
// SRPG_Blank.js
//=============================================================================
/*:
 * @plugindesc v1.0 Adds <SRPG_Blank> for whatever in SRPG 
 * @author ()
 *
 *
 *
 * 
 *
 * @param DefaultVarID
 * @desc Variable ID:
 * @type variable
 * @default 0
 *
 *
 *
 * @param DefaultSwitchID 
 * @desc SwitchID: 
 * @type switch
 * @default 0
 *
 *
 *
 *
 *
 * @help  
 *
 * (put help info Here)
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * Plugin Command:
 * --------------
 *
 *
 *
 *
 *
 *
 *
 *
 * Plugin Scriptcalls:
 *---------------------
 *
 *
 *
 *
 *
 *
 *
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

  var parameters = PluginManager.parameters("SRPG_Blank") || $plugins.filter(function (plugin) { return plugin.description.contains('<SRPG_Blank>'); });

  
  var _varDefaultID = Number(parameters['DefaultVarID'] || 0);
  var _switchDefaultID = Number(parameters['InfoReport_SwitchID'] || 0);

//-----------------------------------------------------------------------------------------

//Plugin  ScriptCall: (Example)

                      // => "this.isTestEg(x);" // x = TestId

                   Game_Interpreter.prototype.isTestEG = function(TestId) {

                       if ( "put Condition Here" ) {

                       $gameSwitches.setValue(TestId, true);

                       } else {

                        $gameSwitches.setValue(TestId, false);

                       }

                       return true;

                   };


//-----------------------------------------------------------------------------------------

//Plugin Command : (Example)

    var _Game_Interpreter_pluginCommand =
                Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function(command, args) {
            _Game_Interpreter_pluginCommand.call(this, command, args);

            if (command === 'SRPG_Blank') {
                switch (args[0]) {

//------->Start: 

                case 'Start': // Plugin Command = "SRPG_Blank Start"

                    "put Code Here" ;

                    break;

                case 'Stop': // Plugin Command = "SRPG_Blank Stop"

                    "put Code Here" ;
                
                
                    break;

                
                
                
                
//Plugin Command-End:
                
                }
            }
        };

//--End:

})();