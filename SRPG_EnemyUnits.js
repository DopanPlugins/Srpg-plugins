//=============================================================================
// SRPG_EnemyUnits.js
//=============================================================================
/*:
 * @plugindesc v1.0 Adds <SRPG_EnemyUnits> to Store and control Enemy event_Ids in Variables in SRPG 
 * @author dopan
 *
 *
 *
 *
 *
 *
 * @param Disable.B-Unit1_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 1 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit1VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit2_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 2 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit2VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit3_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 3 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit3VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit4_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 4 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit4VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit5_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 5 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit5VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit6_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 6 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit6VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit7_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 7 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit7VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit8_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 8 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit8VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit9_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 9 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit9VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit10_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 10 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit10VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit11_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 11 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit11VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit12_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 12 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit12VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit13_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 13 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit13VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit14_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 14 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit14VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit15_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 15 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit15VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit16_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 16 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit16VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit17_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 17 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit17VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit18_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 18 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit18VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit19_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 19 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit19VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit20_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 20 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit20VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit21_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 21 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit21VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit22_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 22 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit22VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit23_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 23 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit23VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit24_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 24 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit24VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit25_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 25 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit25VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit26_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 26 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit26VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit27_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 27 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit27VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit28_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 28 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit28VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit29_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 29 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit29VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit30_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 30 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit30VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit31_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 31 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit31VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit32_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 32 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit32VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit33_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 33 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit33VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit34_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 34 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit34VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit35_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 35 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit35VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit36_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 36 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit36VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit37_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 37 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit37VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit38_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 38 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit38VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit39_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 39 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit39VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit40_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 40 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit40VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit41_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 41 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit41VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit42_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 42 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit42VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit43_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 43 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit43VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit44_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 44 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit44VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit45_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 45 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit45VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit46_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 46 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit46VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit47_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 47 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit47VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit48_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 48 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit48VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit49_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 49 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit49VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit50_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 50 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit50VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit51_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 51 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit51VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit52_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 52 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit52VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit53_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 53 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit53VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit54_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 54 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit54VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit55_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 55 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit55VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit56_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 56 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit56VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit57_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 57 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit57VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit58_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 58 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit58VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit59_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 59 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit59VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit60_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 60 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit60VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit61_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 61 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit61VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit62_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 62 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit62VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit63_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 63 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit63VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit64_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 64 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit64VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit65_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 65 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit65VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit66_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 66 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit66VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit67_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 67 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit67VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit68_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 68 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit68VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit69_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 69 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit69VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit70_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 70 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit70VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit71_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 71 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit71VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit72_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 72 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit72VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit73_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 73 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit73VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit74_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 74 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit74VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit75_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 75 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit75VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit76_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 76 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit76VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit77_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 77 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit77VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit78_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 78 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit78VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit79_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 79 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit79VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit80_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 80 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit80VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit81_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 81 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit81VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit82_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 82 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit82VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit83_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 83 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit83VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit84_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 84 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit84VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit85_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 85 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit85VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit86_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 86 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit86VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit87_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 87 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit87VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit88_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 88 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit88VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit89_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 89 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit89VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit90_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 90 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit90VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit91_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 91 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit91VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit92_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 92 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit92VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit93_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 93 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit93VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit94_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 94 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit94VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit95_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 95 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit95VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit96_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 96 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit96VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit97_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 97 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit97VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit98_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 98 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit98VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit99_SwitchID 
 * @desc SwitchID: Control-Switch = DisableBattle Unit 99 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit99VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.B-Unit100_SwitchID
 * @desc SwitchID: Control-Switch = DisableBattle Unit 100 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param BattleUnit100VarEvID
 * @desc variable ID of BattleUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 *
 * @help 
 * -- This is made for 100 EnemyUnits ,but with a bit of JS knowlegde its easy to extend --
 *
 * This plugin stores the Variables for EnemyUnits-EVENT_ID and connect them to Switches..
 * 
 * -> the Event IDs must be inserted by the Plugin User by setting-> "VariableValue" = "Event ID".
 *  settingVarValue=>this can be done for each Map individually in a Event or for all Maps with Common Event
 *
 * ->Or you can use :
 * The Plugin SriptCalls and the PluginCommand from this Plugin to handle this on all *EnemyUnits*.. 
 *
 * - Actors can be located from the System by "actor ID" ,but Enemys need an Extra Event Notetag,
 *   in order to let the Plugin know which Enemy UNIT this is supposed to be..
 *-----------------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------------
 * New! Enemy Event NoteTag: (use this in addittion to the other NoteTags)
 *-----------------------------------------------------------------------------------------------------
 *   => for Example => EventNoteTag: "<Unit:1>" is => "EnemyUnit_Variable 1" & "DisableUnit_Switch 1" ..ect 
 *   => This is ENEMY_UNIT_1 ...(max is 100 Units) ..
 *-----------------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------------
 * How to use the Plugin Command and ScriptCalls? :
 *-----------------------------------------------------------------------------------------------------
 *..If u Use this Plugin & "SRPG_ActorUnits", most work can be done with PluginCommands and Plugin ScriptCalls:
 * 
 *- at BattleStart use Plugin Command => "SRPG_EnemyUnits Reset" 
 *- than use : "this.allExSetEventID();" (Plugin ScriptCall)
 *-> ..and use this on "after Action Phase": "this.allExCheckDeath();" 
 * => this way all your Enemys on Map have there eventId Stored in Variables and Switches are handled
 * if u add Enemys later to the Map use this again =>:"this.allExSetEventID();" (Plugin ScriptCall)
 * (or put it in an "After Action Phase" aswell in addittion to the "BattleStart" after the "reset at Battle Start")
 *-----------------------------------------------------------------------------------------------------
 *
 * -the Event ID Variables for EnemyUnits, can also be used to use other functions in ScriptCalls like:
 *   "this.isUnitDead(SwitchID, EventID);" or "this.unitRevive(EventID);"
 * Example : "this.unitRevive($gameVariables.value(varID));" //-> Enemy_Unit_VarID inserts Event ID) 
 *
 * This is really helpfull if the Event IDs of your Maps and Units are different on every Map,..
 * you only have to set the Value of the EnemyUnitVariables,or use the Unit EventPage,
 * to insert EventIDs in VarValue, for each Map.(Or use the Plugin Function and the Enemy NoteTag "<Unit:x>"..) 
 * 
 * (the UpdatedSRPGdemo has an Example for "set variable Value",
 * in order to give the EventID data to the Variables) 
 *
 * =>its recommended to use States "Actor" and  "Enemy" ( optional in addittion "all b.Units")
 * (this can be very usefull for "If Conditions" where u want to seperate friends from Enemys,for "aura"-States for EG)
 *
 *
 *-------------------------------------------------------------------------------------------------
 *
 * Plugin Command:
 *
 *-------------------------------------------------------------------------------------------------
 *
 *- Plugin Command = "SRPG_EnemyUnits Reset"
 *
 * This will set All Value to "0" and all switches to "true"
 *
 * -> use this at Battle Start  ,before using The Plugin ScriptCalls 
 * => Example was Explained above in "How to use the Plugin Command and ScriptCalls?"
 *
 *-------------------------------------------------------------------------------------------------
 *--------------------------------------------------------------------------------------------------------------------------------------------
 *
 * Plugin Scriptcalls:
 *
 *--------------------------------------------------------------------------------------------------------------------------------------------
 * (these Plugin Scriptcalls are connected to: *Disable Unit Switch* & *Unit EventID Variable*):
 *
 *--------------------------
 *-"this.allExCheckDeath();" // if Switch "false" -> checks on all Units if they are death and set Switch "true" if death. 
 *
 *--------------------------
 *-"this.allExCheckValue();" // this Checks the Value of Each Variable and set connected Switch "false" ,if Value more than 0 ( = EventID is set)
 *
 *--------------------------
 *-"this.allExSetEventID();" // sets Event Ids of All Enemys to the Variables from SRPG_EnemyUnits.js Param,if Switch is "true" (and set Switch to false)...
 *
 * =>..this only happens if the Variables are set to Value = 0 and if a SwitchID for the Variable is inserted in the Plugin param Setup
 *
 *--------------------------------------------------------------------------------------------------------------------------------------------
 * Usefull Scriptcall:( from SRPG_Core )
 *--------------------------------------------------------------------------------------------------------------------------------------------
 *
 * $gameSystem.EventToUnit(eventID)[1].isStateAffected(stateID) 
 * // used in a "if Condition" to check "if" BattleUnit has a State
 * 
 * //about : "$gameSystem.EventToUnit(eventID)[1]" //this can cause errors..
 * // => ..make sure to never use this script if the Battle-Event-Unit is NOT on BattleMap
 * ============================================================================
 * Terms of Use
 * ============================================================================
 * Free for any commercial or non-commercial project!
 * (edits are allowed but pls dont claim it as yours without Credits.thx)
 * ============================================================================
 * Changelog 
 * ============================================================================
 * Version 1.0:
 * - fixed Release 26.07.2020 for SRPG (rpg mv)!
 */
 
(function() {

  var parameters = PluginManager.parameters("SRPG_EnemyUnits") || $plugins.filter(function (plugin) { return plugin.description.contains('<SRPG_EnemyUnits>'); });

  var _switch1ID = Number(parameters['Disable.B-Unit1_SwitchID'] || 0);
  var _switch2ID = Number(parameters['Disable.B-Unit2_SwitchID'] || 0);
  var _switch3ID = Number(parameters['Disable.B-Unit3_SwitchID'] || 0);
  var _switch4ID = Number(parameters['Disable.B-Unit4_SwitchID'] || 0);
  var _switch5ID = Number(parameters['Disable.B-Unit5_SwitchID'] || 0);
  var _switch6ID = Number(parameters['Disable.B-Unit6_SwitchID'] || 0);
  var _switch7ID = Number(parameters['Disable.B-Unit7_SwitchID'] || 0);
  var _switch8ID = Number(parameters['Disable.B-Unit8_SwitchID'] || 0);
  var _switch9ID = Number(parameters['Disable.B-Unit9_SwitchID'] || 0);
  var _switch10ID = Number(parameters['Disable.B-Unit10_SwitchID'] || 0);
  var _switch11ID = Number(parameters['Disable.B-Unit11_SwitchID'] || 0);
  var _switch12ID = Number(parameters['Disable.B-Unit12_SwitchID'] || 0);
  var _switch13ID = Number(parameters['Disable.B-Unit13_SwitchID'] || 0);
  var _switch14ID = Number(parameters['Disable.B-Unit14_SwitchID'] || 0);
  var _switch15ID = Number(parameters['Disable.B-Unit15_SwitchID'] || 0);
  var _switch16ID = Number(parameters['Disable.B-Unit16_SwitchID'] || 0);
  var _switch17ID = Number(parameters['Disable.B-Unit17_SwitchID'] || 0);
  var _switch18ID = Number(parameters['Disable.B-Unit18_SwitchID'] || 0);
  var _switch19ID = Number(parameters['Disable.B-Unit19_SwitchID'] || 0);
  var _switch20ID = Number(parameters['Disable.B-Unit20_SwitchID'] || 0);
  var _switch21ID = Number(parameters['Disable.B-Unit21_SwitchID'] || 0);
  var _switch22ID = Number(parameters['Disable.B-Unit22_SwitchID'] || 0);
  var _switch23ID = Number(parameters['Disable.B-Unit23_SwitchID'] || 0);
  var _switch24ID = Number(parameters['Disable.B-Unit24_SwitchID'] || 0);
  var _switch25ID = Number(parameters['Disable.B-Unit25_SwitchID'] || 0);
  var _switch26ID = Number(parameters['Disable.B-Unit26_SwitchID'] || 0);
  var _switch27ID = Number(parameters['Disable.B-Unit27_SwitchID'] || 0);
  var _switch28ID = Number(parameters['Disable.B-Unit28_SwitchID'] || 0);
  var _switch29ID = Number(parameters['Disable.B-Unit29_SwitchID'] || 0);
  var _switch30ID = Number(parameters['Disable.B-Unit30_SwitchID'] || 0);
  var _switch31ID = Number(parameters['Disable.B-Unit31_SwitchID'] || 0);
  var _switch32ID = Number(parameters['Disable.B-Unit32_SwitchID'] || 0);
  var _switch33ID = Number(parameters['Disable.B-Unit33_SwitchID'] || 0);
  var _switch34ID = Number(parameters['Disable.B-Unit34_SwitchID'] || 0);
  var _switch35ID = Number(parameters['Disable.B-Unit35_SwitchID'] || 0);
  var _switch36ID = Number(parameters['Disable.B-Unit36_SwitchID'] || 0);
  var _switch37ID = Number(parameters['Disable.B-Unit37_SwitchID'] || 0);
  var _switch38ID = Number(parameters['Disable.B-Unit38_SwitchID'] || 0);
  var _switch39ID = Number(parameters['Disable.B-Unit39_SwitchID'] || 0);
  var _switch40ID = Number(parameters['Disable.B-Unit40_SwitchID'] || 0);
  var _switch41ID = Number(parameters['Disable.B-Unit41_SwitchID'] || 0);
  var _switch42ID = Number(parameters['Disable.B-Unit42_SwitchID'] || 0);
  var _switch43ID = Number(parameters['Disable.B-Unit43_SwitchID'] || 0);
  var _switch44ID = Number(parameters['Disable.B-Unit44_SwitchID'] || 0);
  var _switch45ID = Number(parameters['Disable.B-Unit45_SwitchID'] || 0);
  var _switch46ID = Number(parameters['Disable.B-Unit46_SwitchID'] || 0);
  var _switch47ID = Number(parameters['Disable.B-Unit47_SwitchID'] || 0);
  var _switch48ID = Number(parameters['Disable.B-Unit48_SwitchID'] || 0);
  var _switch49ID = Number(parameters['Disable.B-Unit49_SwitchID'] || 0);
  var _switch50ID = Number(parameters['Disable.B-Unit50_SwitchID'] || 0);
  var _switch51ID = Number(parameters['Disable.B-Unit51_SwitchID'] || 0);
  var _switch52ID = Number(parameters['Disable.B-Unit52_SwitchID'] || 0);
  var _switch53ID = Number(parameters['Disable.B-Unit53_SwitchID'] || 0);
  var _switch54ID = Number(parameters['Disable.B-Unit54_SwitchID'] || 0);
  var _switch55ID = Number(parameters['Disable.B-Unit55_SwitchID'] || 0);
  var _switch56ID = Number(parameters['Disable.B-Unit56_SwitchID'] || 0);
  var _switch57ID = Number(parameters['Disable.B-Unit57_SwitchID'] || 0);
  var _switch58ID = Number(parameters['Disable.B-Unit58_SwitchID'] || 0);
  var _switch59ID = Number(parameters['Disable.B-Unit59_SwitchID'] || 0);
  var _switch60ID = Number(parameters['Disable.B-Unit60_SwitchID'] || 0);
  var _switch61ID = Number(parameters['Disable.B-Unit61_SwitchID'] || 0);
  var _switch62ID = Number(parameters['Disable.B-Unit62_SwitchID'] || 0);
  var _switch63ID = Number(parameters['Disable.B-Unit63_SwitchID'] || 0);
  var _switch64ID = Number(parameters['Disable.B-Unit64_SwitchID'] || 0);
  var _switch65ID = Number(parameters['Disable.B-Unit65_SwitchID'] || 0);
  var _switch66ID = Number(parameters['Disable.B-Unit66_SwitchID'] || 0);
  var _switch67ID = Number(parameters['Disable.B-Unit67_SwitchID'] || 0);
  var _switch68ID = Number(parameters['Disable.B-Unit68_SwitchID'] || 0);
  var _switch69ID = Number(parameters['Disable.B-Unit69_SwitchID'] || 0);
  var _switch70ID = Number(parameters['Disable.B-Unit70_SwitchID'] || 0);
  var _switch71ID = Number(parameters['Disable.B-Unit71_SwitchID'] || 0);
  var _switch72ID = Number(parameters['Disable.B-Unit72_SwitchID'] || 0);
  var _switch73ID = Number(parameters['Disable.B-Unit73_SwitchID'] || 0);
  var _switch74ID = Number(parameters['Disable.B-Unit74_SwitchID'] || 0);
  var _switch75ID = Number(parameters['Disable.B-Unit75_SwitchID'] || 0);
  var _switch76ID = Number(parameters['Disable.B-Unit76_SwitchID'] || 0);
  var _switch77ID = Number(parameters['Disable.B-Unit77_SwitchID'] || 0);
  var _switch78ID = Number(parameters['Disable.B-Unit78_SwitchID'] || 0);
  var _switch79ID = Number(parameters['Disable.B-Unit79_SwitchID'] || 0);
  var _switch80ID = Number(parameters['Disable.B-Unit80_SwitchID'] || 0);
  var _switch81ID = Number(parameters['Disable.B-Unit81_SwitchID'] || 0);
  var _switch82ID = Number(parameters['Disable.B-Unit82_SwitchID'] || 0);
  var _switch83ID = Number(parameters['Disable.B-Unit83_SwitchID'] || 0);
  var _switch84ID = Number(parameters['Disable.B-Unit84_SwitchID'] || 0);
  var _switch85ID = Number(parameters['Disable.B-Unit85_SwitchID'] || 0);
  var _switch86ID = Number(parameters['Disable.B-Unit86_SwitchID'] || 0);
  var _switch87ID = Number(parameters['Disable.B-Unit87_SwitchID'] || 0);
  var _switch88ID = Number(parameters['Disable.B-Unit88_SwitchID'] || 0);
  var _switch89ID = Number(parameters['Disable.B-Unit89_SwitchID'] || 0);
  var _switch90ID = Number(parameters['Disable.B-Unit90_SwitchID'] || 0);
  var _switch91ID = Number(parameters['Disable.B-Unit91_SwitchID'] || 0);
  var _switch92ID = Number(parameters['Disable.B-Unit92_SwitchID'] || 0);
  var _switch93ID = Number(parameters['Disable.B-Unit93_SwitchID'] || 0);
  var _switch94ID = Number(parameters['Disable.B-Unit94_SwitchID'] || 0);
  var _switch95ID = Number(parameters['Disable.B-Unit95_SwitchID'] || 0);
  var _switch96ID = Number(parameters['Disable.B-Unit96_SwitchID'] || 0);
  var _switch97ID = Number(parameters['Disable.B-Unit97_SwitchID'] || 0);
  var _switch98ID = Number(parameters['Disable.B-Unit98_SwitchID'] || 0);
  var _switch99ID = Number(parameters['Disable.B-Unit99_SwitchID'] || 0);
  var _switch100ID = Number(parameters['Disable.B-Unit100_SwitchID'] || 0);

  var _var1ID = Number(parameters['BattleUnit1VarEvID'] || 0);
  var _var2ID = Number(parameters['BattleUnit2VarEvID'] || 0);
  var _var3ID = Number(parameters['BattleUnit3VarEvID'] || 0);
  var _var4ID = Number(parameters['BattleUnit4VarEvID'] || 0);
  var _var5ID = Number(parameters['BattleUnit5VarEvID'] || 0);
  var _var6ID = Number(parameters['BattleUnit6VarEvID'] || 0);
  var _var7ID = Number(parameters['BattleUnit7VarEvID'] || 0);
  var _var8ID = Number(parameters['BattleUnit8VarEvID'] || 0);
  var _var9ID = Number(parameters['BattleUnit9VarEvID'] || 0);
  var _var10ID = Number(parameters['BattleUnit10VarEvID'] || 0);
  var _var11ID = Number(parameters['BattleUnit11VarEvID'] || 0);
  var _var12ID = Number(parameters['BattleUnit12VarEvID'] || 0);
  var _var13ID = Number(parameters['BattleUnit13VarEvID'] || 0);
  var _var14ID = Number(parameters['BattleUnit14VarEvID'] || 0);
  var _var15ID = Number(parameters['BattleUnit15VarEvID'] || 0);
  var _var16ID = Number(parameters['BattleUnit16VarEvID'] || 0);
  var _var17ID = Number(parameters['BattleUnit17VarEvID'] || 0);
  var _var18ID = Number(parameters['BattleUnit18VarEvID'] || 0);
  var _var19ID = Number(parameters['BattleUnit19VarEvID'] || 0);
  var _var20ID = Number(parameters['BattleUnit20VarEvID'] || 0);
  var _var21ID = Number(parameters['BattleUnit21VarEvID'] || 0);
  var _var22ID = Number(parameters['BattleUnit22VarEvID'] || 0);
  var _var23ID = Number(parameters['BattleUnit23VarEvID'] || 0);
  var _var24ID = Number(parameters['BattleUnit24VarEvID'] || 0);
  var _var25ID = Number(parameters['BattleUnit25VarEvID'] || 0);
  var _var26ID = Number(parameters['BattleUnit26VarEvID'] || 0);
  var _var27ID = Number(parameters['BattleUnit27VarEvID'] || 0);
  var _var28ID = Number(parameters['BattleUnit28VarEvID'] || 0);
  var _var29ID = Number(parameters['BattleUnit29VarEvID'] || 0);
  var _var30ID = Number(parameters['BattleUnit30VarEvID'] || 0);
  var _var31ID = Number(parameters['BattleUnit31VarEvID'] || 0);
  var _var32ID = Number(parameters['BattleUnit32VarEvID'] || 0);
  var _var33ID = Number(parameters['BattleUnit33VarEvID'] || 0);
  var _var34ID = Number(parameters['BattleUnit34VarEvID'] || 0);
  var _var35ID = Number(parameters['BattleUnit35VarEvID'] || 0);
  var _var36ID = Number(parameters['BattleUnit36VarEvID'] || 0);
  var _var37ID = Number(parameters['BattleUnit37VarEvID'] || 0);
  var _var38ID = Number(parameters['BattleUnit38VarEvID'] || 0);
  var _var39ID = Number(parameters['BattleUnit39VarEvID'] || 0);
  var _var40ID = Number(parameters['BattleUnit40VarEvID'] || 0);
  var _var41ID = Number(parameters['BattleUnit41VarEvID'] || 0);
  var _var42ID = Number(parameters['BattleUnit42VarEvID'] || 0);
  var _var43ID = Number(parameters['BattleUnit43VarEvID'] || 0);
  var _var44ID = Number(parameters['BattleUnit44VarEvID'] || 0);
  var _var45ID = Number(parameters['BattleUnit45VarEvID'] || 0);
  var _var46ID = Number(parameters['BattleUnit46VarEvID'] || 0);
  var _var47ID = Number(parameters['BattleUnit47VarEvID'] || 0);
  var _var48ID = Number(parameters['BattleUnit48VarEvID'] || 0);
  var _var49ID = Number(parameters['BattleUnit49VarEvID'] || 0);
  var _var50ID = Number(parameters['BattleUnit50VarEvID'] || 0);
  var _var51ID = Number(parameters['BattleUnit51VarEvID'] || 0);
  var _var52ID = Number(parameters['BattleUnit52VarEvID'] || 0);
  var _var53ID = Number(parameters['BattleUnit53VarEvID'] || 0);
  var _var54ID = Number(parameters['BattleUnit54VarEvID'] || 0);
  var _var55ID = Number(parameters['BattleUnit55VarEvID'] || 0);
  var _var56ID = Number(parameters['BattleUnit56VarEvID'] || 0);
  var _var57ID = Number(parameters['BattleUnit57VarEvID'] || 0);
  var _var58ID = Number(parameters['BattleUnit58VarEvID'] || 0);
  var _var59ID = Number(parameters['BattleUnit59VarEvID'] || 0);
  var _var60ID = Number(parameters['BattleUnit60VarEvID'] || 0);
  var _var61ID = Number(parameters['BattleUnit61VarEvID'] || 0);
  var _var62ID = Number(parameters['BattleUnit62VarEvID'] || 0);
  var _var63ID = Number(parameters['BattleUnit63VarEvID'] || 0);
  var _var64ID = Number(parameters['BattleUnit64VarEvID'] || 0);
  var _var65ID = Number(parameters['BattleUnit65VarEvID'] || 0);
  var _var66ID = Number(parameters['BattleUnit66VarEvID'] || 0);
  var _var67ID = Number(parameters['BattleUnit67VarEvID'] || 0);
  var _var68ID = Number(parameters['BattleUnit68VarEvID'] || 0);
  var _var69ID = Number(parameters['BattleUnit69VarEvID'] || 0);
  var _var70ID = Number(parameters['BattleUnit70VarEvID'] || 0);
  var _var71ID = Number(parameters['BattleUnit71VarEvID'] || 0);
  var _var72ID = Number(parameters['BattleUnit72VarEvID'] || 0);
  var _var73ID = Number(parameters['BattleUnit73VarEvID'] || 0);
  var _var74ID = Number(parameters['BattleUnit74VarEvID'] || 0);
  var _var75ID = Number(parameters['BattleUnit75VarEvID'] || 0);
  var _var76ID = Number(parameters['BattleUnit76VarEvID'] || 0);
  var _var77ID = Number(parameters['BattleUnit77VarEvID'] || 0);
  var _var78ID = Number(parameters['BattleUnit78VarEvID'] || 0);
  var _var79ID = Number(parameters['BattleUnit79VarEvID'] || 0);
  var _var80ID = Number(parameters['BattleUnit80VarEvID'] || 0);
  var _var81ID = Number(parameters['BattleUnit81VarEvID'] || 0);
  var _var82ID = Number(parameters['BattleUnit82VarEvID'] || 0);
  var _var83ID = Number(parameters['BattleUnit83VarEvID'] || 0);
  var _var84ID = Number(parameters['BattleUnit84VarEvID'] || 0);
  var _var85ID = Number(parameters['BattleUnit85VarEvID'] || 0);
  var _var86ID = Number(parameters['BattleUnit86VarEvID'] || 0);
  var _var87ID = Number(parameters['BattleUnit87VarEvID'] || 0);
  var _var88ID = Number(parameters['BattleUnit88VarEvID'] || 0);
  var _var89ID = Number(parameters['BattleUnit89VarEvID'] || 0);
  var _var90ID = Number(parameters['BattleUnit90VarEvID'] || 0);
  var _var91ID = Number(parameters['BattleUnit91VarEvID'] || 0);
  var _var92ID = Number(parameters['BattleUnit92VarEvID'] || 0);
  var _var93ID = Number(parameters['BattleUnit93VarEvID'] || 0);
  var _var94ID = Number(parameters['BattleUnit94VarEvID'] || 0);
  var _var95ID = Number(parameters['BattleUnit95VarEvID'] || 0);
  var _var96ID = Number(parameters['BattleUnit96VarEvID'] || 0);
  var _var97ID = Number(parameters['BattleUnit97VarEvID'] || 0);
  var _var98ID = Number(parameters['BattleUnit98VarEvID'] || 0);
  var _var99ID = Number(parameters['BattleUnit99VarEvID'] || 0);
  var _var100ID = Number(parameters['BattleUnit100VarEvID'] || 0);


//--------------------------------------------------------------------------------------------
//use "this.isUnitDead": to check if the Event stored in variable is dead,if dead turn switch "true"

     // => "this.allExCheckDeath()"
     Game_Interpreter.prototype.allExCheckDeath = function() {

//-----1.ID:

            if (!$gameSwitches.value(_switch1ID) ) {               
                this.isUnitDead(_switch1ID, $gameVariables.value(_var1ID));
            };
//-----2.ID:

            if (!$gameSwitches.value(_switch2ID) ) {               
                this.isUnitDead(_switch2ID, $gameVariables.value(_var2ID));
            };
//-----3.ID:

            if (!$gameSwitches.value(_switch3ID) ) {               
                this.isUnitDead(_switch3ID, $gameVariables.value(_var3ID));
            };
//-----4.ID:

            if (!$gameSwitches.value(_switch4ID) ) {               
                this.isUnitDead(_switch4ID, $gameVariables.value(_var4ID));
            };
//-----5.ID:

            if (!$gameSwitches.value(_switch5ID) ) {               
                this.isUnitDead(_switch5ID, $gameVariables.value(_var5ID));
            };
//-----6.ID:

            if (!$gameSwitches.value(_switch6ID) ) {               
                this.isUnitDead(_switch6ID, $gameVariables.value(_var6ID));
            };
//-----7.ID:

            if (!$gameSwitches.value(_switch7ID) ) {               
                this.isUnitDead(_switch7ID, $gameVariables.value(_var7ID));
            };
//-----8.ID:

            if (!$gameSwitches.value(_switch8ID) ) {               
                this.isUnitDead(_switch8ID, $gameVariables.value(_var8ID));
            };
//-----9.ID:

            if (!$gameSwitches.value(_switch9ID) ) {               
                this.isUnitDead(_switch9ID, $gameVariables.value(_var9ID));
            };
//----10.ID:

            if (!$gameSwitches.value(_switch10ID) ) {               
                this.isUnitDead(_switch10ID, $gameVariables.value(_var10ID));
            };
//----11.ID:

            if (!$gameSwitches.value(_switch11ID) ) {               
                this.isUnitDead(_switch11ID, $gameVariables.value(_var11ID));
            };
//----12.ID:

            if (!$gameSwitches.value(_switch12ID) ) {               
                this.isUnitDead(_switch12ID, $gameVariables.value(_var12ID));
            };
//----13.ID:

            if (!$gameSwitches.value(_switch13ID) ) {               
                this.isUnitDead(_switch13ID, $gameVariables.value(_var13ID));
            };
//----14.ID:

            if (!$gameSwitches.value(_switch14ID) ) {               
                this.isUnitDead(_switch14ID, $gameVariables.value(_var14ID));
            };
//----15.ID:

            if (!$gameSwitches.value(_switch15ID) ) {               
                this.isUnitDead(_switch15ID, $gameVariables.value(_var15ID));
            };
//----16.ID:

            if (!$gameSwitches.value(_switch16ID) ) {               
                this.isUnitDead(_switch16ID, $gameVariables.value(_var16ID));
            };
//----17.ID:

            if (!$gameSwitches.value(_switch17ID) ) {               
                this.isUnitDead(_switch17ID, $gameVariables.value(_var17ID));
            };
//----18.ID:

            if (!$gameSwitches.value(_switch18ID) ) {               
                this.isUnitDead(_switch18ID, $gameVariables.value(_var18ID));
            };
//----19.ID:

            if (!$gameSwitches.value(_switch19ID) ) {               
                this.isUnitDead(_switch19ID, $gameVariables.value(_var19ID));
            };
//----20.ID:

            if (!$gameSwitches.value(_switch20ID) ) {               
                this.isUnitDead(_switch20ID, $gameVariables.value(_var20ID));
            };
//----21.ID:

            if (!$gameSwitches.value(_switch21ID) ) {               
                this.isUnitDead(_switch21ID, $gameVariables.value(_var21ID));
            };
//----22.ID:

            if (!$gameSwitches.value(_switch22ID) ) {               
                this.isUnitDead(_switch22ID, $gameVariables.value(_var22ID));
            };
//----23.ID:

            if (!$gameSwitches.value(_switch23ID) ) {               
                this.isUnitDead(_switch23ID, $gameVariables.value(_var23ID));
            };
//----24.ID:

            if (!$gameSwitches.value(_switch24ID) ) {               
                this.isUnitDead(_switch24ID, $gameVariables.value(_var24ID));
            };
//----25.ID:

            if (!$gameSwitches.value(_switch25ID) ) {               
                this.isUnitDead(_switch25ID, $gameVariables.value(_var25ID));
            };
//----26.ID:

            if (!$gameSwitches.value(_switch26ID) ) {               
                this.isUnitDead(_switch26ID, $gameVariables.value(_var26ID));
            };
//----27.ID:

            if (!$gameSwitches.value(_switch27ID) ) {               
                this.isUnitDead(_switch27ID, $gameVariables.value(_var27ID));
            };
//----28.ID:

            if (!$gameSwitches.value(_switch28ID) ) {               
                this.isUnitDead(_switch28ID, $gameVariables.value(_var28ID));
            };
//----29.ID:

            if (!$gameSwitches.value(_switch29ID) ) {               
                this.isUnitDead(_switch29ID, $gameVariables.value(_var29ID));
            };
//----30.ID:

            if (!$gameSwitches.value(_switch30ID) ) {               
                this.isUnitDead(_switch30ID, $gameVariables.value(_var30ID));
            };
//----31.ID:

            if (!$gameSwitches.value(_switch31ID) ) {               
                this.isUnitDead(_switch31ID, $gameVariables.value(_var31ID));
            };
//----32.ID:

            if (!$gameSwitches.value(_switch32ID) ) {               
                this.isUnitDead(_switch32ID, $gameVariables.value(_var32ID));
            };
//----33.ID:

            if (!$gameSwitches.value(_switch33ID) ) {               
                this.isUnitDead(_switch33ID, $gameVariables.value(_var33ID));
            };
//----34.ID:

            if (!$gameSwitches.value(_switch34ID) ) {               
                this.isUnitDead(_switch34ID, $gameVariables.value(_var34ID));
            };
//----35.ID:

            if (!$gameSwitches.value(_switch35ID) ) {               
                this.isUnitDead(_switch35ID, $gameVariables.value(_var35ID));
            };
//----36.ID:

            if (!$gameSwitches.value(_switch36ID) ) {               
                this.isUnitDead(_switch36ID, $gameVariables.value(_var36ID));
            };
//----37.ID:

            if (!$gameSwitches.value(_switch37ID) ) {               
                this.isUnitDead(_switch37ID, $gameVariables.value(_var37ID));
            };
//----38.ID:

            if (!$gameSwitches.value(_switch38ID) ) {               
                this.isUnitDead(_switch38ID, $gameVariables.value(_var38ID));
            };
//----39.ID:

            if (!$gameSwitches.value(_switch39ID) ) {               
                this.isUnitDead(_switch39ID, $gameVariables.value(_var39ID));
            };
//----40.ID:

            if (!$gameSwitches.value(_switch40ID) ) {               
                this.isUnitDead(_switch40ID, $gameVariables.value(_var40ID));
            };
//----41.ID:

            if (!$gameSwitches.value(_switch41ID) ) {               
                this.isUnitDead(_switch41ID, $gameVariables.value(_var41ID));
            };
//----42.ID:

            if (!$gameSwitches.value(_switch42ID) ) {               
                this.isUnitDead(_switch42ID, $gameVariables.value(_var42ID));
            };
//----43.ID:

            if (!$gameSwitches.value(_switch43ID) ) {               
                this.isUnitDead(_switch43ID, $gameVariables.value(_var43ID));
            };
//----44.ID:

            if (!$gameSwitches.value(_switch44ID) ) {               
                this.isUnitDead(_switch44ID, $gameVariables.value(_var44ID));
            };
//----45.ID:

            if (!$gameSwitches.value(_switch45ID) ) {               
                this.isUnitDead(_switch45ID, $gameVariables.value(_var45ID));
            };
//----46.ID:

            if (!$gameSwitches.value(_switch46ID) ) {               
                this.isUnitDead(_switch46ID, $gameVariables.value(_var46ID));
            };
//----47.ID:

            if (!$gameSwitches.value(_switch47ID) ) {               
                this.isUnitDead(_switch47ID, $gameVariables.value(_var47ID));
            };
//----48.ID:

            if (!$gameSwitches.value(_switch48ID) ) {               
                this.isUnitDead(_switch48ID, $gameVariables.value(_var48ID));
            };
//----49.ID:

            if (!$gameSwitches.value(_switch49ID) ) {               
                this.isUnitDead(_switch49ID, $gameVariables.value(_var49ID));
            };
//----50.ID:

            if (!$gameSwitches.value(_switch50ID) ) {               
                this.isUnitDead(_switch50ID, $gameVariables.value(_var50ID));
            };
//----51.ID:

            if (!$gameSwitches.value(_switch51ID) ) {               
                this.isUnitDead(_switch51ID, $gameVariables.value(_var51ID));
            };
//----52.ID:

            if (!$gameSwitches.value(_switch52ID) ) {               
                this.isUnitDead(_switch52ID, $gameVariables.value(_var52ID));
            };
//----53.ID:

            if (!$gameSwitches.value(_switch53ID) ) {               
                this.isUnitDead(_switch53ID, $gameVariables.value(_var53ID));
            };
//----54.ID:

            if (!$gameSwitches.value(_switch54ID) ) {               
                this.isUnitDead(_switch54ID, $gameVariables.value(_var54ID));
            };
//----55.ID:

            if (!$gameSwitches.value(_switch55ID) ) {               
                this.isUnitDead(_switch55ID, $gameVariables.value(_var55ID));
            };
//----56.ID:

            if (!$gameSwitches.value(_switch56ID) ) {               
                this.isUnitDead(_switch56ID, $gameVariables.value(_var56ID));
            };
//----57.ID:

            if (!$gameSwitches.value(_switch57ID) ) {               
                this.isUnitDead(_switch57ID, $gameVariables.value(_var57ID));
            };
//----58.ID:

            if (!$gameSwitches.value(_switch58ID) ) {               
                this.isUnitDead(_switch58ID, $gameVariables.value(_var58ID));
            };
//----59.ID:

            if (!$gameSwitches.value(_switch59ID) ) {               
                this.isUnitDead(_switch59ID, $gameVariables.value(_var59ID));
            };
//----60.ID:

            if (!$gameSwitches.value(_switch60ID) ) {               
                this.isUnitDead(_switch60ID, $gameVariables.value(_var60ID));
            };
//----61.ID:

            if (!$gameSwitches.value(_switch61ID) ) {               
                this.isUnitDead(_switch61ID, $gameVariables.value(_var61ID));
            };
//----62.ID:

            if (!$gameSwitches.value(_switch62ID) ) {               
                this.isUnitDead(_switch62ID, $gameVariables.value(_var62ID));
            };
//----63.ID:

            if (!$gameSwitches.value(_switch63ID) ) {               
                this.isUnitDead(_switch63ID, $gameVariables.value(_var63ID));
            };
//----64.ID:

            if (!$gameSwitches.value(_switch64ID) ) {               
                this.isUnitDead(_switch64ID, $gameVariables.value(_var64ID));
            };
//----65.ID:

            if (!$gameSwitches.value(_switch65ID) ) {               
                this.isUnitDead(_switch65ID, $gameVariables.value(_var65ID));
            };
//----66.ID:

            if (!$gameSwitches.value(_switch66ID) ) {               
                this.isUnitDead(_switch66ID, $gameVariables.value(_var66ID));
            };
//----67.ID:

            if (!$gameSwitches.value(_switch67ID) ) {               
                this.isUnitDead(_switch67ID, $gameVariables.value(_var67ID));
            };
//----68.ID:

            if (!$gameSwitches.value(_switch68ID) ) {               
                this.isUnitDead(_switch68ID, $gameVariables.value(_var68ID));
            };
//----69.ID:

            if (!$gameSwitches.value(_switch69ID) ) {               
                this.isUnitDead(_switch69ID, $gameVariables.value(_var69ID));
            };
//----70.ID:

            if (!$gameSwitches.value(_switch70ID) ) {               
                this.isUnitDead(_switch70ID, $gameVariables.value(_var70ID));
            };
//----71.ID:

            if (!$gameSwitches.value(_switch71ID) ) {               
                this.isUnitDead(_switch71ID, $gameVariables.value(_var71ID));
            };
//----72.ID:

            if (!$gameSwitches.value(_switch72ID) ) {               
                this.isUnitDead(_switch72ID, $gameVariables.value(_var72ID));
            };
//----73.ID:

            if (!$gameSwitches.value(_switch73ID) ) {               
                this.isUnitDead(_switch73ID, $gameVariables.value(_var73ID));
            };
//----74.ID:

            if (!$gameSwitches.value(_switch74ID) ) {               
                this.isUnitDead(_switch74ID, $gameVariables.value(_var74ID));
            };
//----75.ID:

            if (!$gameSwitches.value(_switch75ID) ) {               
                this.isUnitDead(_switch75ID, $gameVariables.value(_var75ID));
            };
//----76.ID:

            if (!$gameSwitches.value(_switch76ID) ) {               
                this.isUnitDead(_switch76ID, $gameVariables.value(_var76ID));
            };
//----77.ID:

            if (!$gameSwitches.value(_switch77ID) ) {               
                this.isUnitDead(_switch77ID, $gameVariables.value(_var77ID));
            };
//----78.ID:

            if (!$gameSwitches.value(_switch78ID) ) {               
                this.isUnitDead(_switch78ID, $gameVariables.value(_var78ID));
            };
//----79.ID:

            if (!$gameSwitches.value(_switch79ID) ) {               
                this.isUnitDead(_switch79ID, $gameVariables.value(_var79ID));
            };
//----80.ID:

            if (!$gameSwitches.value(_switch80ID) ) {               
                this.isUnitDead(_switch80ID, $gameVariables.value(_var80ID));
            };
//----81.ID:

            if (!$gameSwitches.value(_switch81ID) ) {               
                this.isUnitDead(_switch81ID, $gameVariables.value(_var81ID));
            };
//----82.ID:

            if (!$gameSwitches.value(_switch82ID) ) {               
                this.isUnitDead(_switch82ID, $gameVariables.value(_var82ID));
            };
//----83.ID:

            if (!$gameSwitches.value(_switch83ID) ) {               
                this.isUnitDead(_switch83ID, $gameVariables.value(_var83ID));
            };
//----84.ID:

            if (!$gameSwitches.value(_switch84ID) ) {               
                this.isUnitDead(_switch84ID, $gameVariables.value(_var84ID));
            };
//----85.ID:

            if (!$gameSwitches.value(_switch85ID) ) {               
                this.isUnitDead(_switch85ID, $gameVariables.value(_var85ID));
            };
//----86.ID:

            if (!$gameSwitches.value(_switch86ID) ) {               
                this.isUnitDead(_switch86ID, $gameVariables.value(_var86ID));
            };
//----87.ID:

            if (!$gameSwitches.value(_switch87ID) ) {               
                this.isUnitDead(_switch87ID, $gameVariables.value(_var87ID));
            };
//----88.ID:

            if (!$gameSwitches.value(_switch88ID) ) {               
                this.isUnitDead(_switch88ID, $gameVariables.value(_var88ID));
            };
//----89.ID:

            if (!$gameSwitches.value(_switch89ID) ) {               
                this.isUnitDead(_switch89ID, $gameVariables.value(_var89ID));
            };
//----90.ID:

            if (!$gameSwitches.value(_switch90ID) ) {               
                this.isUnitDead(_switch90ID, $gameVariables.value(_var90ID));
            };
//----91.ID:

            if (!$gameSwitches.value(_switch91ID) ) {               
                this.isUnitDead(_switch91ID, $gameVariables.value(_var91ID));
            };
//----92.ID:

            if (!$gameSwitches.value(_switch92ID) ) {               
                this.isUnitDead(_switch92ID, $gameVariables.value(_var92ID));
            };
//----93.ID:

            if (!$gameSwitches.value(_switch93ID) ) {               
                this.isUnitDead(_switch93ID, $gameVariables.value(_var93ID));
            };
//----94.ID:

            if (!$gameSwitches.value(_switch94ID) ) {               
                this.isUnitDead(_switch94ID, $gameVariables.value(_var94ID));
            };
//----95.ID:

            if (!$gameSwitches.value(_switch95ID) ) {               
                this.isUnitDead(_switch95ID, $gameVariables.value(_var95ID));
            };
//----96.ID:

            if (!$gameSwitches.value(_switch96ID) ) {               
                this.isUnitDead(_switch96ID, $gameVariables.value(_var96ID));
            };
//----97.ID:

            if (!$gameSwitches.value(_switch97ID) ) {               
                this.isUnitDead(_switch97ID, $gameVariables.value(_var97ID));
            };
//----98.ID:

            if (!$gameSwitches.value(_switch98ID) ) {               
                this.isUnitDead(_switch98ID, $gameVariables.value(_var98ID));
            };
//----99.ID:

            if (!$gameSwitches.value(_switch99ID) ) {               
                this.isUnitDead(_switch99ID, $gameVariables.value(_var99ID));
            };
//---100.ID:

            if (!$gameSwitches.value(_switch100ID) ) {               
                this.isUnitDead(_switch100ID, $gameVariables.value(_var100ID));
            };
//--..End:
         };

//-- next function-->(...)

//--------------------------------------------------------------------------------------------

//Checks Value of the Variables that store Enemy-event-IDs ,if Value more than 0 set Disable Unit Switch to "false"

     // => "this.allExCheckValue()"
     Game_Interpreter.prototype.allExCheckValue = function() {

//-----1.ID:

            if (($gameVariables.value(_var1ID) > 0 ) && ($gameSwitches.value(_switch1ID))) {               
                 $gameSwitches.setValue(_switch1ID, false);
            };
//-----2.ID:

            if (($gameVariables.value(_var2ID) > 0 ) && ($gameSwitches.value(_switch2ID))) {               
                 $gameSwitches.setValue(_switch2ID, false);
            };
//-----3.ID:

            if (($gameVariables.value(_var3ID) > 0 ) && ($gameSwitches.value(_switch3ID))) {               
                 $gameSwitches.setValue(_switch3ID, false);
            };
//-----4.ID:

            if (($gameVariables.value(_var4ID) > 0 ) && ($gameSwitches.value(_switch4ID))) {               
                 $gameSwitches.setValue(_switch4ID, false);
            };
//-----5.ID:

            if (($gameVariables.value(_var5ID) > 0 ) && ($gameSwitches.value(_switch5ID))) {               
                 $gameSwitches.setValue(_switch5ID, false);
            };
//-----6.ID:

            if (($gameVariables.value(_var6ID) > 0 ) && ($gameSwitches.value(_switch6ID))) {               
                 $gameSwitches.setValue(_switch6ID, false);
            };
//-----7.ID:

            if (($gameVariables.value(_var7ID) > 0 ) && ($gameSwitches.value(_switch7ID))) {               
                 $gameSwitches.setValue(_switch7ID, false);
            };
//-----8.ID:

            if (($gameVariables.value(_var8ID) > 0 ) && ($gameSwitches.value(_switch8ID))) {               
                 $gameSwitches.setValue(_switch8ID, false);
            };
//-----9.ID:

            if (($gameVariables.value(_var9ID) > 0 ) && ($gameSwitches.value(_switch9ID))) {               
                 $gameSwitches.setValue(_switch9ID, false);
            };
//----10.ID:

            if (($gameVariables.value(_var10ID) > 0 ) && ($gameSwitches.value(_switch10ID))) {               
                 $gameSwitches.setValue(_switch10ID, false);
            };
//----11.ID:

            if (($gameVariables.value(_var11ID) > 0 ) && ($gameSwitches.value(_switch11ID))) {               
                 $gameSwitches.setValue(_switch11ID, false);
            };
//----12.ID:

            if (($gameVariables.value(_var12ID) > 0 ) && ($gameSwitches.value(_switch12ID))) {               
                 $gameSwitches.setValue(_switch12ID, false);
            };
//----13.ID:

            if (($gameVariables.value(_var13ID) > 0 ) && ($gameSwitches.value(_switch13ID))) {               
                 $gameSwitches.setValue(_switch13ID, false);
            };
//----14.ID:

            if (($gameVariables.value(_var14ID) > 0 ) && ($gameSwitches.value(_switch14ID))) {               
                 $gameSwitches.setValue(_switch14ID, false);
            };
//----15.ID:

            if (($gameVariables.value(_var15ID) > 0 ) && ($gameSwitches.value(_switch15ID))) {               
                 $gameSwitches.setValue(_switch15ID, false);
            };
//----16.ID:

            if (($gameVariables.value(_var16ID) > 0 ) && ($gameSwitches.value(_switch16ID))) {               
                 $gameSwitches.setValue(_switch16ID, false);
            };
//----17.ID:

            if (($gameVariables.value(_var17ID) > 0 ) && ($gameSwitches.value(_switch17ID))) {               
                 $gameSwitches.setValue(_switch17ID, false);
            };
//----18.ID:

            if (($gameVariables.value(_var18ID) > 0 ) && ($gameSwitches.value(_switch18ID))) {               
                 $gameSwitches.setValue(_switch18ID, false);
            };
//----19.ID:

            if (($gameVariables.value(_var19ID) > 0 ) && ($gameSwitches.value(_switch19ID))) {               
                 $gameSwitches.setValue(_switch19ID, false);
            };
//----20.ID:

            if (($gameVariables.value(_var20ID) > 0 ) && ($gameSwitches.value(_switch20ID))) {               
                 $gameSwitches.setValue(_switch20ID, false);
            };
//----21.ID:

            if (($gameVariables.value(_var21ID) > 0 ) && ($gameSwitches.value(_switch21ID))) {               
                 $gameSwitches.setValue(_switch21ID, false);
            };
//----22.ID:

            if (($gameVariables.value(_var22ID) > 0 ) && ($gameSwitches.value(_switch22ID))) {               
                 $gameSwitches.setValue(_switch22ID, false);
            };
//----23.ID:

            if (($gameVariables.value(_var23ID) > 0 ) && ($gameSwitches.value(_switch23ID))) {               
                 $gameSwitches.setValue(_switch23ID, false);
            };
//----24.ID:

            if (($gameVariables.value(_var24ID) > 0 ) && ($gameSwitches.value(_switch24ID))) {               
                 $gameSwitches.setValue(_switch24ID, false);
            };
//----25.ID:

            if (($gameVariables.value(_var25ID) > 0 ) && ($gameSwitches.value(_switch25ID))) {               
                 $gameSwitches.setValue(_switch25ID, false);
            };
//----26.ID:

            if (($gameVariables.value(_var26ID) > 0 ) && ($gameSwitches.value(_switch26ID))) {               
                 $gameSwitches.setValue(_switch26ID, false);
            };
//----27.ID:

            if (($gameVariables.value(_var27ID) > 0 ) && ($gameSwitches.value(_switch27ID))) {               
                 $gameSwitches.setValue(_switch1ID, false);
            };
//----28.ID:

            if (($gameVariables.value(_var28ID) > 0 ) && ($gameSwitches.value(_switch28ID))) {               
                 $gameSwitches.setValue(_switch28ID, false);
            };
//----29.ID:

            if (($gameVariables.value(_var29ID) > 0 ) && ($gameSwitches.value(_switch29ID))) {               
                 $gameSwitches.setValue(_switch29ID, false);
            };
//----30.ID:

            if (($gameVariables.value(_var30ID) > 0 ) && ($gameSwitches.value(_switch30ID))) {               
                 $gameSwitches.setValue(_switch30ID, false);
            };
//----31.ID:

            if (($gameVariables.value(_var31ID) > 0 ) && ($gameSwitches.value(_switch31ID))) {               
                 $gameSwitches.setValue(_switch31ID, false);
            };
//----32.ID:

            if (($gameVariables.value(_var32ID) > 0 ) && ($gameSwitches.value(_switch32ID))) {               
                 $gameSwitches.setValue(_switch32ID, false);
            };
//----33.ID:

            if (($gameVariables.value(_var33ID) > 0 ) && ($gameSwitches.value(_switch33ID))) {               
                 $gameSwitches.setValue(_switch33ID, false);
            };
//----34.ID:

            if (($gameVariables.value(_var34ID) > 0 ) && ($gameSwitches.value(_switch34ID))) {               
                 $gameSwitches.setValue(_switch34ID, false);
            };
//----35.ID:

            if (($gameVariables.value(_var35ID) > 0 ) && ($gameSwitches.value(_switch35ID))) {               
                 $gameSwitches.setValue(_switch35ID, false);
            };
//----36.ID:

            if (($gameVariables.value(_var36ID) > 0 ) && ($gameSwitches.value(_switch36ID))) {               
                 $gameSwitches.setValue(_switch36ID, false);
            };
//----37.ID:

            if (($gameVariables.value(_var37ID) > 0 ) && ($gameSwitches.value(_switch37ID))) {               
                 $gameSwitches.setValue(_switch37ID, false);
            };
//----38.ID:

            if (($gameVariables.value(_var38ID) > 0 ) && ($gameSwitches.value(_switch38ID))) {               
                 $gameSwitches.setValue(_switch38ID, false);
            };
//----39.ID:

            if (($gameVariables.value(_var39ID) > 0 ) && ($gameSwitches.value(_switch39ID))) {               
                 $gameSwitches.setValue(_switch39ID, false);
            };
//----40.ID:

            if (($gameVariables.value(_var40ID) > 0 ) && ($gameSwitches.value(_switch40ID))) {               
                 $gameSwitches.setValue(_switch40ID, false);
            };
//----41.ID:

            if (($gameVariables.value(_var41ID) > 0 ) && ($gameSwitches.value(_switch41ID))) {               
                 $gameSwitches.setValue(_switch41ID, false);
            };
//----42.ID:

            if (($gameVariables.value(_var42ID) > 0 ) && ($gameSwitches.value(_switch42ID))) {               
                 $gameSwitches.setValue(_switch42ID, false);
            };
//----43.ID:

            if (($gameVariables.value(_var43ID) > 0 ) && ($gameSwitches.value(_switch43ID))) {               
                 $gameSwitches.setValue(_switch43ID, false);
            };
//----44.ID:

            if (($gameVariables.value(_var44ID) > 0 ) && ($gameSwitches.value(_switch44ID))) {               
                 $gameSwitches.setValue(_switch44ID, false);
            };
//----45.ID:

            if (($gameVariables.value(_var45ID) > 0 ) && ($gameSwitches.value(_switch45ID))) {               
                 $gameSwitches.setValue(_switch45ID, false);
            };
//----46.ID:

            if (($gameVariables.value(_var46ID) > 0 ) && ($gameSwitches.value(_switch46ID))) {               
                 $gameSwitches.setValue(_switch46ID, false);
            };
//----47.ID:

            if (($gameVariables.value(_var47ID) > 0 ) && ($gameSwitches.value(_switch47ID))) {               
                 $gameSwitches.setValue(_switch47ID, false);
            };
//----48.ID:

            if (($gameVariables.value(_var48ID) > 0 ) && ($gameSwitches.value(_switch48ID))) {               
                 $gameSwitches.setValue(_switch48ID, false);
            };
//----49.ID:

            if (($gameVariables.value(_var49ID) > 0 ) && ($gameSwitches.value(_switch49ID))) {               
                 $gameSwitches.setValue(_switch49ID, false);
            };
//----50.ID:

            if (($gameVariables.value(_var50ID) > 0 ) && ($gameSwitches.value(_switch50ID))) {               
                 $gameSwitches.setValue(_switch50ID, false);
            };
//----51.ID:

            if (($gameVariables.value(_var51ID) > 0 ) && ($gameSwitches.value(_switch51ID))) {               
                 $gameSwitches.setValue(_switch51ID, false);
            };
//----52.ID:

            if (($gameVariables.value(_var52ID) > 0 ) && ($gameSwitches.value(_switch52ID))) {               
                 $gameSwitches.setValue(_switch52ID, false);
            };
//----53.ID:

            if (($gameVariables.value(_var53ID) > 0 ) && ($gameSwitches.value(_switch53ID))) {               
                 $gameSwitches.setValue(_switch53ID, false);
            };
//----54.ID:

            if (($gameVariables.value(_var54ID) > 0 ) && ($gameSwitches.value(_switch54ID))) {               
                 $gameSwitches.setValue(_switch54ID, false);
            };
//----55.ID:

            if (($gameVariables.value(_var55ID) > 0 ) && ($gameSwitches.value(_switch55ID))) {               
                 $gameSwitches.setValue(_switch55ID, false);
            };
//----56.ID:

            if (($gameVariables.value(_var56ID) > 0 ) && ($gameSwitches.value(_switch56ID))) {               
                 $gameSwitches.setValue(_switch56ID, false);
            };
//----57.ID:

            if (($gameVariables.value(_var57ID) > 0 ) && ($gameSwitches.value(_switch57ID))) {               
                 $gameSwitches.setValue(_switch57ID, false);
            };
//----58.ID:

            if (($gameVariables.value(_var58ID) > 0 ) && ($gameSwitches.value(_switch58ID))) {               
                 $gameSwitches.setValue(_switch58ID, false);
            };
//----59.ID:

            if (($gameVariables.value(_var59ID) > 0 ) && ($gameSwitches.value(_switch59ID))) {               
                 $gameSwitches.setValue(_switch59ID, false);
            };
//----60.ID:

            if (($gameVariables.value(_var60ID) > 0 ) && ($gameSwitches.value(_switch60ID))) {               
                 $gameSwitches.setValue(_switch60ID, false);
            };
//----61.ID:

            if (($gameVariables.value(_var61ID) > 0 ) && ($gameSwitches.value(_switch61ID))) {               
                 $gameSwitches.setValue(_switch61ID, false);
            };
//----62.ID:

            if (($gameVariables.value(_var62ID) > 0 ) && ($gameSwitches.value(_switch62ID))) {               
                 $gameSwitches.setValue(_switch62ID, false);
            };
//----63.ID:

            if (($gameVariables.value(_var63ID) > 0 ) && ($gameSwitches.value(_switch63ID))) {               
                 $gameSwitches.setValue(_switch63ID, false);
            };
//----64.ID:

            if (($gameVariables.value(_var64ID) > 0 ) && ($gameSwitches.value(_switch64ID))) {               
                 $gameSwitches.setValue(_switch64ID, false);
            };
//----65.ID:

            if (($gameVariables.value(_var65ID) > 0 ) && ($gameSwitches.value(_switch65ID))) {               
                 $gameSwitches.setValue(_switch65ID, false);
            };
//----66.ID:

            if (($gameVariables.value(_var66ID) > 0 ) && ($gameSwitches.value(_switch66ID))) {               
                 $gameSwitches.setValue(_switch66ID, false);
            };
//----67.ID:

            if (($gameVariables.value(_var67ID) > 0 ) && ($gameSwitches.value(_switch67ID))) {               
                 $gameSwitches.setValue(_switch67ID, false);
            };
//----68.ID:

            if (($gameVariables.value(_var68ID) > 0 ) && ($gameSwitches.value(_switch68ID))) {               
                 $gameSwitches.setValue(_switch68ID, false);
            };
//----69.ID:

            if (($gameVariables.value(_var69ID) > 0 ) && ($gameSwitches.value(_switch69ID))) {               
                 $gameSwitches.setValue(_switch69ID, false);
            };
//----70.ID:

            if (($gameVariables.value(_var70ID) > 0 ) && ($gameSwitches.value(_switch70ID))) {               
                 $gameSwitches.setValue(_switch70ID, false);
            };
//----71.ID:

            if (($gameVariables.value(_var71ID) > 0 ) && ($gameSwitches.value(_switch71ID))) {               
                 $gameSwitches.setValue(_switch71ID, false);
            };
//----72.ID:

            if (($gameVariables.value(_var72ID) > 0 ) && ($gameSwitches.value(_switch72ID))) {               
                 $gameSwitches.setValue(_switch72ID, false);
            };
//----73.ID:

            if (($gameVariables.value(_var73ID) > 0 ) && ($gameSwitches.value(_switch73ID))) {               
                 $gameSwitches.setValue(_switch73ID, false);
            };
//----74.ID:

            if (($gameVariables.value(_var74ID) > 0 ) && ($gameSwitches.value(_switch74ID))) {               
                 $gameSwitches.setValue(_switch74ID, false);
            };
//----75.ID:

            if (($gameVariables.value(_var75ID) > 0 ) && ($gameSwitches.value(_switch75ID))) {               
                 $gameSwitches.setValue(_switch75ID, false);
            };
//----76.ID:

            if (($gameVariables.value(_var76ID) > 0 ) && ($gameSwitches.value(_switch76ID))) {               
                 $gameSwitches.setValue(_switch76ID, false);
            };
//----77.ID:

            if (($gameVariables.value(_var77ID) > 0 ) && ($gameSwitches.value(_switch77ID))) {               
                 $gameSwitches.setValue(_switch77ID, false);
            };
//----78.ID:

            if (($gameVariables.value(_var78ID) > 0 ) && ($gameSwitches.value(_switch78ID))) {               
                 $gameSwitches.setValue(_switch78ID, false);
            };
//----79.ID:

            if (($gameVariables.value(_var79ID) > 0 ) && ($gameSwitches.value(_switch79ID))) {               
                 $gameSwitches.setValue(_switch79ID, false);
            };
//----80.ID:

            if (($gameVariables.value(_var80ID) > 0 ) && ($gameSwitches.value(_switch80ID))) {               
                 $gameSwitches.setValue(_switch80ID, false);
            };
//----81.ID:

            if (($gameVariables.value(_var81ID) > 0 ) && ($gameSwitches.value(_switch81ID))) {               
                 $gameSwitches.setValue(_switch81ID, false);
            };
//----82.ID:

            if (($gameVariables.value(_var82ID) > 0 ) && ($gameSwitches.value(_switch82ID))) {               
                 $gameSwitches.setValue(_switch82ID, false);
            };
//----83.ID:

            if (($gameVariables.value(_var83ID) > 0 ) && ($gameSwitches.value(_switch83ID))) {               
                 $gameSwitches.setValue(_switch83ID, false);
            };
//----84.ID:

            if (($gameVariables.value(_var84ID) > 0 ) && ($gameSwitches.value(_switch84ID))) {               
                 $gameSwitches.setValue(_switch84ID, false);
            };
//----85.ID:

            if (($gameVariables.value(_var85ID) > 0 ) && ($gameSwitches.value(_switch85ID))) {               
                 $gameSwitches.setValue(_switch85ID, false);
            };
//----86.ID:

            if (($gameVariables.value(_var86ID) > 0 ) && ($gameSwitches.value(_switch86ID))) {               
                 $gameSwitches.setValue(_switch86ID, false);
            };
//----87.ID:

            if (($gameVariables.value(_var87ID) > 0 ) && ($gameSwitches.value(_switch87ID))) {               
                 $gameSwitches.setValue(_switch87ID, false);
            };
//----88.ID:

            if (($gameVariables.value(_var88ID) > 0 ) && ($gameSwitches.value(_switch88ID))) {               
                 $gameSwitches.setValue(_switch88ID, false);
            };
//----89.ID:

            if (($gameVariables.value(_var89ID) > 0 ) && ($gameSwitches.value(_switch89ID))) {               
                 $gameSwitches.setValue(_switch89ID, false);
            };
//----90.ID:

            if (($gameVariables.value(_var90ID) > 0 ) && ($gameSwitches.value(_switch90ID))) {               
                 $gameSwitches.setValue(_switch90ID, false);
            };
//----91.ID:

            if (($gameVariables.value(_var91ID) > 0 ) && ($gameSwitches.value(_switch91ID))) {               
                 $gameSwitches.setValue(_switch91ID, false);
            };
//----92.ID:

            if (($gameVariables.value(_var92ID) > 0 ) && ($gameSwitches.value(_switch92ID))) {               
                 $gameSwitches.setValue(_switch92ID, false);
            };
//----93.ID:

            if (($gameVariables.value(_var93ID) > 0 ) && ($gameSwitches.value(_switch93ID))) {               
                 $gameSwitches.setValue(_switch93ID, false);
            };
//----94.ID:

            if (($gameVariables.value(_var94ID) > 0 ) && ($gameSwitches.value(_switch94ID))) {               
                 $gameSwitches.setValue(_switch94ID, false);
            };
//----95.ID:

            if (($gameVariables.value(_var95ID) > 0 ) && ($gameSwitches.value(_switch95ID))) {               
                 $gameSwitches.setValue(_switch95ID, false);
            };
//----96.ID:

            if (($gameVariables.value(_var96ID) > 0 ) && ($gameSwitches.value(_switch96ID))) {               
                 $gameSwitches.setValue(_switch96ID, false);
            };
//----97.ID:

            if (($gameVariables.value(_var97ID) > 0 ) && ($gameSwitches.value(_switch97ID))) {               
                 $gameSwitches.setValue(_switch97ID, false);
            };
//----98.ID:

            if (($gameVariables.value(_var98ID) > 0 ) && ($gameSwitches.value(_switch98ID))) {               
                 $gameSwitches.setValue(_switch98ID, false);
            };
//----99.ID:

            if (($gameVariables.value(_var99ID) > 0 ) && ($gameSwitches.value(_switch99ID))) {               
                 $gameSwitches.setValue(_switch99ID, false);
            };
//---100.ID:

            if (($gameVariables.value(_var100ID) > 0 ) && ($gameSwitches.value(_switch100ID))) {               
                 $gameSwitches.setValue(_switch100ID, false);
            };
//--..End:
         };


//--------------------------------------------------------------------------------------------

// sets Event Ids of All Enemys to the Variables from SRPG_EnemyUnits.js Param,if _switchID "false".

        // => "this.allExSetEventID()"
        Game_Interpreter.prototype.allExSetEventID = function() {
            for (var i = 1; i <= $gameMap.events().length; i++) {     
                 var battleunit = $gameSystem.EventToUnit([i]);
                 var eventunit = $gameMap.event([i]);                      
                 if (battleunit && eventunit && (battleunit[0] === 'enemy')) {
                     var enemyunit = $gameMap.event([i]).event().meta.unit;
                  
                     if (enemyunit === "1") {
                         if (($gameSwitches.value(_switch1ID)) && ($gameVariables.value(_var1ID) === 0 ) ) { 
                              $gameVariables.setValue((_var1ID), i);
                              $gameSwitches.setValue((_switch1ID), false);
                         }                       
                     }
                     if (enemyunit === "2") {
                         if (($gameSwitches.value(_switch2ID)) && ($gameVariables.value(_var2ID) === 0 ) ) { 
                              $gameVariables.setValue((_var2ID), i);
                              $gameSwitches.setValue((_switch2ID), false);
                         }                       
                     }
                     if (enemyunit === "3") {
                         if (($gameSwitches.value(_switch3ID)) && ($gameVariables.value(_var3ID) === 0 ) ) { 
                              $gameVariables.setValue((_var3ID), i);
                              $gameSwitches.setValue((_switch3ID), false);
                         }                       
                     }
                     if (enemyunit === "4") {
                         if (($gameSwitches.value(_switch4ID)) && ($gameVariables.value(_var4ID) === 0 ) ) { 
                              $gameVariables.setValue((_var4ID), i);
                              $gameSwitches.setValue((_switch4ID), false);
                         }                       
                     }
                     if (enemyunit === "5") {
                         if (($gameSwitches.value(_switch5ID)) && ($gameVariables.value(_var5ID) === 0 ) ) { 
                              $gameVariables.setValue((_var5ID), i);
                              $gameSwitches.setValue((_switch5ID), false);
                         }                       
                     }
                     if (enemyunit === "6") {
                         if (($gameSwitches.value(_switch6ID)) && ($gameVariables.value(_var6ID) === 0 ) ) { 
                              $gameVariables.setValue((_var6ID), i);
                              $gameSwitches.setValue((_switch6ID), false);
                         }                       
                     }
                     if (enemyunit === "7") {
                         if (($gameSwitches.value(_switch7ID)) && ($gameVariables.value(_var7ID) === 0 ) ) { 
                              $gameVariables.setValue((_var7ID), i);
                              $gameSwitches.setValue((_switch7ID), false);
                         }                       
                     }
                     if (enemyunit === "8") {
                         if (($gameSwitches.value(_switch8ID)) && ($gameVariables.value(_var8ID) === 0 ) ) { 
                              $gameVariables.setValue((_var8ID), i);
                              $gameSwitches.setValue((_switch8ID), false);
                         }                       
                     }
                     if (enemyunit === "9") {
                         if (($gameSwitches.value(_switch9ID)) && ($gameVariables.value(_var9ID) === 0 ) ) { 
                              $gameVariables.setValue((_var9ID), i);
                              $gameSwitches.setValue((_switch9ID), false);
                         }                       
                     }
                     if (enemyunit === "10") {
                         if (($gameSwitches.value(_switch10ID)) && ($gameVariables.value(_var10ID) === 0 ) ) { 
                              $gameVariables.setValue((_var10ID), i);
                              $gameSwitches.setValue((_switch10ID), false);
                         }                       
                     }     
                     if (enemyunit === "11") {
                         if (($gameSwitches.value(_switch11ID)) && ($gameVariables.value(_var11ID) === 0 ) ) { 
                              $gameVariables.setValue((_var11ID), i);
                              $gameSwitches.setValue((_switch11ID), false);
                         }                       
                     }
                     if (enemyunit === "12") {
                         if (($gameSwitches.value(_switch12ID)) && ($gameVariables.value(_var12ID) === 0 ) ) { 
                              $gameVariables.setValue((_var12ID), i);
                              $gameSwitches.setValue((_switch12ID), false);
                         }                       
                     }
                     if (enemyunit === "13") {
                         if (($gameSwitches.value(_switch13ID)) && ($gameVariables.value(_var13ID) === 0 ) ) { 
                              $gameVariables.setValue((_var13ID), i);
                              $gameSwitches.setValue((_switch13ID), false);
                         }                       
                     }
                     if (enemyunit === "14") {
                         if (($gameSwitches.value(_switch14ID)) && ($gameVariables.value(_var14ID) === 0 ) ) { 
                              $gameVariables.setValue((_var14ID), i);
                              $gameSwitches.setValue((_switch14ID), false);
                         }                       
                     }
                     if (enemyunit === "15") {
                         if (($gameSwitches.value(_switch15ID)) && ($gameVariables.value(_var15ID) === 0 ) ) { 
                              $gameVariables.setValue((_var15ID), i);
                              $gameSwitches.setValue((_switch15ID), false);
                         }                       
                     }
                     if (enemyunit === "16") {
                         if (($gameSwitches.value(_switch16ID)) && ($gameVariables.value(_var16ID) === 0 ) ) { 
                              $gameVariables.setValue((_var16ID), i);
                              $gameSwitches.setValue((_switch16ID), false);
                         }                       
                     }
                     if (enemyunit === "17") {
                         if (($gameSwitches.value(_switch17ID)) && ($gameVariables.value(_var17ID) === 0 ) ) { 
                              $gameVariables.setValue((_var17ID), i);
                              $gameSwitches.setValue((_switch17ID), false);
                         }                       
                     }
                     if (enemyunit === "18") {
                         if (($gameSwitches.value(_switch18ID)) && ($gameVariables.value(_var18ID) === 0 ) ) { 
                              $gameVariables.setValue((_var18ID), i);
                              $gameSwitches.setValue((_switch18ID), false);
                         }                       
                     }
                     if (enemyunit === "19") {
                         if (($gameSwitches.value(_switch19ID)) && ($gameVariables.value(_var19ID) === 0 ) ) { 
                              $gameVariables.setValue((_var19ID), i);
                              $gameSwitches.setValue((_switch19ID), false);
                         }                       
                     }
                     if (enemyunit === "20") {
                         if (($gameSwitches.value(_switch20ID)) && ($gameVariables.value(_var20ID) === 0 ) ) { 
                              $gameVariables.setValue((_var20ID), i);
                              $gameSwitches.setValue((_switch20ID), false);
                         }                       
                     }   
                     if (enemyunit === "21") {
                         if (($gameSwitches.value(_switch21ID)) && ($gameVariables.value(_var21ID) === 0 ) ) { 
                              $gameVariables.setValue((_var21ID), i);
                              $gameSwitches.setValue((_switch21ID), false);
                         }                       
                     }
                     if (enemyunit === "22") {
                         if (($gameSwitches.value(_switch22ID)) && ($gameVariables.value(_var22ID) === 0 ) ) { 
                              $gameVariables.setValue((_var22ID), i);
                              $gameSwitches.setValue((_switch22ID), false);
                         }                       
                     }
                     if (enemyunit === "23") {
                         if (($gameSwitches.value(_switch23ID)) && ($gameVariables.value(_var23ID) === 0 ) ) { 
                              $gameVariables.setValue((_var23ID), i);
                              $gameSwitches.setValue((_switch23ID), false);
                         }                       
                     }
                     if (enemyunit === "24") {
                         if (($gameSwitches.value(_switch24ID)) && ($gameVariables.value(_var24ID) === 0 ) ) { 
                              $gameVariables.setValue((_var24ID), i);
                              $gameSwitches.setValue((_switch24ID), false);
                         }                       
                     }
                     if (enemyunit === "25") {
                         if (($gameSwitches.value(_switch25ID)) && ($gameVariables.value(_var25ID) === 0 ) ) { 
                              $gameVariables.setValue((_var25ID), i);
                              $gameSwitches.setValue((_switch25ID), false);
                         }                       
                     }
                     if (enemyunit === "26") {
                         if (($gameSwitches.value(_switch26ID)) && ($gameVariables.value(_var26ID) === 0 ) ) { 
                              $gameVariables.setValue((_var26ID), i);
                              $gameSwitches.setValue((_switch26ID), false);
                         }                       
                     }
                     if (enemyunit === "27") {
                         if (($gameSwitches.value(_switch27ID)) && ($gameVariables.value(_var27ID) === 0 ) ) { 
                              $gameVariables.setValue((_var27ID), i);
                              $gameSwitches.setValue((_switch27ID), false);
                         }                       
                     }
                     if (enemyunit === "28") {
                         if (($gameSwitches.value(_switch28ID)) && ($gameVariables.value(_var28ID) === 0 ) ) { 
                              $gameVariables.setValue((_var28ID), i);
                              $gameSwitches.setValue((_switch28ID), false);
                         }                       
                     }
                     if (enemyunit === "29") {
                         if (($gameSwitches.value(_switch29ID)) && ($gameVariables.value(_var29ID) === 0 ) ) { 
                              $gameVariables.setValue((_var29ID), i);
                              $gameSwitches.setValue((_switch29ID), false);
                         }                       
                     }
                     if (enemyunit === "30") {
                         if (($gameSwitches.value(_switch30ID)) && ($gameVariables.value(_var30ID) === 0 ) ) { 
                              $gameVariables.setValue((_var30ID), i);
                              $gameSwitches.setValue((_switch30ID), false);
                         }                       
                     }   
                     if (enemyunit === "31") {
                         if (($gameSwitches.value(_switch31ID)) && ($gameVariables.value(_var31ID) === 0 ) ) { 
                              $gameVariables.setValue((_var31ID), i);
                              $gameSwitches.setValue((_switch31ID), false);
                         }                       
                     }
                     if (enemyunit === "32") {
                         if (($gameSwitches.value(_switch32ID)) && ($gameVariables.value(_var32ID) === 0 ) ) { 
                              $gameVariables.setValue((_var32ID), i);
                              $gameSwitches.setValue((_switch32ID), false);
                         }                       
                     }
                     if (enemyunit === "33") {
                         if (($gameSwitches.value(_switch33ID)) && ($gameVariables.value(_var33ID) === 0 ) ) { 
                              $gameVariables.setValue((_var33ID), i);
                              $gameSwitches.setValue((_switch33ID), false);
                         }                       
                     }
                     if (enemyunit === "34") {
                         if (($gameSwitches.value(_switch34ID)) && ($gameVariables.value(_var34ID) === 0 ) ) { 
                              $gameVariables.setValue((_var34ID), i);
                              $gameSwitches.setValue((_switch34ID), false);
                         }                       
                     }
                     if (enemyunit === "35") {
                         if (($gameSwitches.value(_switch35ID)) && ($gameVariables.value(_var35ID) === 0 ) ) { 
                              $gameVariables.setValue((_var35ID), i);
                              $gameSwitches.setValue((_switch35ID), false);
                         }                       
                     }
                     if (enemyunit === "36") {
                         if (($gameSwitches.value(_switch36ID)) && ($gameVariables.value(_var36ID) === 0 ) ) { 
                              $gameVariables.setValue((_var36ID), i);
                              $gameSwitches.setValue((_switch36ID), false);
                         }                       
                     }
                     if (enemyunit === "37") {
                         if (($gameSwitches.value(_switch37ID)) && ($gameVariables.value(_var37ID) === 0 ) ) { 
                              $gameVariables.setValue((_var37ID), i);
                              $gameSwitches.setValue((_switch37ID), false);
                         }                       
                     }
                     if (enemyunit === "38") {
                         if (($gameSwitches.value(_switch38ID)) && ($gameVariables.value(_var38ID) === 0 ) ) { 
                              $gameVariables.setValue((_var38ID), i);
                              $gameSwitches.setValue((_switch38ID), false);
                         }                       
                     }
                     if (enemyunit === "39") {
                         if (($gameSwitches.value(_switch39ID)) && ($gameVariables.value(_var39ID) === 0 ) ) { 
                              $gameVariables.setValue((_var39ID), i);
                              $gameSwitches.setValue((_switch39ID), false);
                         }                       
                     }
                     if (enemyunit === "40") {
                         if (($gameSwitches.value(_switch40ID)) && ($gameVariables.value(_var40ID) === 0 ) ) { 
                              $gameVariables.setValue((_var40ID), i);
                              $gameSwitches.setValue((_switch40ID), false);
                         }                       
                     }   
                     if (enemyunit === "41") {
                         if (($gameSwitches.value(_switch41ID)) && ($gameVariables.value(_var41ID) === 0 ) ) { 
                              $gameVariables.setValue((_var41ID), i);
                              $gameSwitches.setValue((_switch41ID), false);
                         }                       
                     }
                     if (enemyunit === "42") {
                         if (($gameSwitches.value(_switch42ID)) && ($gameVariables.value(_var42ID) === 0 ) ) { 
                              $gameVariables.setValue((_var42ID), i);
                              $gameSwitches.setValue((_switch42ID), false);
                         }                       
                     }
                     if (enemyunit === "43") {
                         if (($gameSwitches.value(_switch43ID)) && ($gameVariables.value(_var43ID) === 0 ) ) { 
                              $gameVariables.setValue((_var43ID), i);
                              $gameSwitches.setValue((_switch43ID), false);
                         }                       
                     }
                     if (enemyunit === "44") {
                         if (($gameSwitches.value(_switch44ID)) && ($gameVariables.value(_var44ID) === 0 ) ) { 
                              $gameVariables.setValue((_var44ID), i);
                              $gameSwitches.setValue((_switch44ID), false);
                         }                       
                     }
                     if (enemyunit === "45") {
                         if (($gameSwitches.value(_switch45ID)) && ($gameVariables.value(_var45ID) === 0 ) ) { 
                              $gameVariables.setValue((_var45ID), i);
                              $gameSwitches.setValue((_switch45ID), false);
                         }                       
                     }
                     if (enemyunit === "46") {
                         if (($gameSwitches.value(_switch46ID)) && ($gameVariables.value(_var46ID) === 0 ) ) { 
                              $gameVariables.setValue((_var46ID), i);
                              $gameSwitches.setValue((_switch46ID), false);
                         }                       
                     }
                     if (enemyunit === "47") {
                         if (($gameSwitches.value(_switch47ID)) && ($gameVariables.value(_var47ID) === 0 ) ) { 
                              $gameVariables.setValue((_var47ID), i);
                              $gameSwitches.setValue((_switch47ID), false);
                         }                       
                     }
                     if (enemyunit === "48") {
                         if (($gameSwitches.value(_switch48ID)) && ($gameVariables.value(_var48ID) === 0 ) ) { 
                              $gameVariables.setValue((_var48ID), i);
                              $gameSwitches.setValue((_switch48ID), false);
                         }                       
                     }
                     if (enemyunit === "49") {
                         if (($gameSwitches.value(_switch49ID)) && ($gameVariables.value(_var49ID) === 0 ) ) { 
                              $gameVariables.setValue((_var49ID), i);
                              $gameSwitches.setValue((_switch49ID), false);
                         }                       
                     }
                     if (enemyunit === "50") {
                         if (($gameSwitches.value(_switch50ID)) && ($gameVariables.value(_var50ID) === 0 ) ) { 
                              $gameVariables.setValue((_var50ID), i);
                              $gameSwitches.setValue((_switch50ID), false);
                         }                       
                     }   
                     if (enemyunit === "51") {
                         if (($gameSwitches.value(_switch51ID)) && ($gameVariables.value(_var51ID) === 0 ) ) { 
                              $gameVariables.setValue((_var51ID), i);
                              $gameSwitches.setValue((_switch51ID), false);
                         }                       
                     }
                     if (enemyunit === "52") {
                         if (($gameSwitches.value(_switch52ID)) && ($gameVariables.value(_var52ID) === 0 ) ) { 
                              $gameVariables.setValue((_var52ID), i);
                              $gameSwitches.setValue((_switch52ID), false);
                         }                       
                     }
                     if (enemyunit === "53") {
                         if (($gameSwitches.value(_switch53ID)) && ($gameVariables.value(_var53ID) === 0 ) ) { 
                              $gameVariables.setValue((_var53ID), i);
                              $gameSwitches.setValue((_switch53ID), false);
                         }                       
                     }
                     if (enemyunit === "54") {
                         if (($gameSwitches.value(_switch54ID)) && ($gameVariables.value(_var54ID) === 0 ) ) { 
                              $gameVariables.setValue((_var54ID), i);
                              $gameSwitches.setValue((_switch54ID), false);
                         }                       
                     }
                     if (enemyunit === "55") {
                         if (($gameSwitches.value(_switch55ID)) && ($gameVariables.value(_var55ID) === 0 ) ) { 
                              $gameVariables.setValue((_var55ID), i);
                              $gameSwitches.setValue((_switch55ID), false);
                         }                       
                     }
                     if (enemyunit === "56") {
                         if (($gameSwitches.value(_switch56ID)) && ($gameVariables.value(_var56ID) === 0 ) ) { 
                              $gameVariables.setValue((_var56ID), i);
                              $gameSwitches.setValue((_switch56ID), false);
                         }                       
                     }
                     if (enemyunit === "57") {
                         if (($gameSwitches.value(_switch57ID)) && ($gameVariables.value(_var57ID) === 0 ) ) { 
                              $gameVariables.setValue((_var57ID), i);
                              $gameSwitches.setValue((_switch57ID), false);
                         }                       
                     }
                     if (enemyunit === "58") {
                         if (($gameSwitches.value(_switch58ID)) && ($gameVariables.value(_var58ID) === 0 ) ) { 
                              $gameVariables.setValue((_var58ID), i);
                              $gameSwitches.setValue((_switch58ID), false);
                         }                       
                     }
                     if (enemyunit === "59") {
                         if (($gameSwitches.value(_switch59ID)) && ($gameVariables.value(_var59ID) === 0 ) ) { 
                              $gameVariables.setValue((_var59ID), i);
                              $gameSwitches.setValue((_switch59ID), false);
                         }                       
                     }
                     if (enemyunit === "60") {
                         if (($gameSwitches.value(_switch60ID)) && ($gameVariables.value(_var60ID) === 0 ) ) { 
                              $gameVariables.setValue((_var60ID), i);
                              $gameSwitches.setValue((_switch60ID), false);
                         }                       
                     }   
                     if (enemyunit === "61") {
                         if (($gameSwitches.value(_switch61ID)) && ($gameVariables.value(_var61ID) === 0 ) ) { 
                              $gameVariables.setValue((_var61ID), i);
                              $gameSwitches.setValue((_switch61ID), false);
                         }                       
                     }
                     if (enemyunit === "62") {
                         if (($gameSwitches.value(_switch62ID)) && ($gameVariables.value(_var62ID) === 0 ) ) { 
                              $gameVariables.setValue((_var62ID), i);
                              $gameSwitches.setValue((_switch62ID), false);
                         }                       
                     }
                     if (enemyunit === "63") {
                         if (($gameSwitches.value(_switch63ID)) && ($gameVariables.value(_var63ID) === 0 ) ) { 
                              $gameVariables.setValue((_var63ID), i);
                              $gameSwitches.setValue((_switch63ID), false);
                         }                       
                     }
                     if (enemyunit === "64") {
                         if (($gameSwitches.value(_switch64ID)) && ($gameVariables.value(_var64ID) === 0 ) ) { 
                              $gameVariables.setValue((_var64ID), i);
                              $gameSwitches.setValue((_switch64ID), false);
                         }                       
                     }
                     if (enemyunit === "65") {
                         if (($gameSwitches.value(_switch65ID)) && ($gameVariables.value(_var65ID) === 0 ) ) { 
                              $gameVariables.setValue((_var65ID), i);
                              $gameSwitches.setValue((_switch65ID), false);
                         }                       
                     }
                     if (enemyunit === "66") {
                         if (($gameSwitches.value(_switch66ID)) && ($gameVariables.value(_var66ID) === 0 ) ) { 
                              $gameVariables.setValue((_var66ID), i);
                              $gameSwitches.setValue((_switch66ID), false);
                         }                       
                     }
                     if (enemyunit === "67") {
                         if (($gameSwitches.value(_switch67ID)) && ($gameVariables.value(_var67ID) === 0 ) ) { 
                              $gameVariables.setValue((_var67ID), i);
                              $gameSwitches.setValue((_switch67ID), false);
                         }                       
                     }
                     if (enemyunit === "68") {
                         if (($gameSwitches.value(_switch68ID)) && ($gameVariables.value(_var68ID) === 0 ) ) { 
                              $gameVariables.setValue((_var68ID), i);
                              $gameSwitches.setValue((_switch68ID), false);
                         }                       
                     }
                     if (enemyunit === "69") {
                         if (($gameSwitches.value(_switch69ID)) && ($gameVariables.value(_var69ID) === 0 ) ) { 
                              $gameVariables.setValue((_var69ID), i);
                              $gameSwitches.setValue((_switch69ID), false);
                         }                       
                     }
                     if (enemyunit === "70") {
                         if (($gameSwitches.value(_switch70ID)) && ($gameVariables.value(_var70ID) === 0 ) ) { 
                              $gameVariables.setValue((_var70ID), i);
                              $gameSwitches.setValue((_switch70ID), false);
                         }                       
                     }   
                     if (enemyunit === "71") {
                         if (($gameSwitches.value(_switch71ID)) && ($gameVariables.value(_var71ID) === 0 ) ) { 
                              $gameVariables.setValue((_var71ID), i);
                              $gameSwitches.setValue((_switch71ID), false);
                         }                       
                     }
                     if (enemyunit === "72") {
                         if (($gameSwitches.value(_switch72ID)) && ($gameVariables.value(_var72ID) === 0 ) ) { 
                              $gameVariables.setValue((_var72ID), i);
                              $gameSwitches.setValue((_switch72ID), false);
                         }                       
                     }
                     if (enemyunit === "73") {
                         if (($gameSwitches.value(_switch73ID)) && ($gameVariables.value(_var73ID) === 0 ) ) { 
                              $gameVariables.setValue((_var73ID), i);
                              $gameSwitches.setValue((_switch73ID), false);
                         }                       
                     }
                     if (enemyunit === "74") {
                         if (($gameSwitches.value(_switch74ID)) && ($gameVariables.value(_var74ID) === 0 ) ) { 
                              $gameVariables.setValue((_var74ID), i);
                              $gameSwitches.setValue((_switch74ID), false);
                         }                       
                     }
                     if (enemyunit === "75") {
                         if (($gameSwitches.value(_switch75ID)) && ($gameVariables.value(_var75ID) === 0 ) ) { 
                              $gameVariables.setValue((_var75ID), i);
                              $gameSwitches.setValue((_switch75ID), false);
                         }                       
                     }
                     if (enemyunit === "76") {
                         if (($gameSwitches.value(_switch76ID)) && ($gameVariables.value(_var76ID) === 0 ) ) { 
                              $gameVariables.setValue((_var76ID), i);
                              $gameSwitches.setValue((_switch76ID), false);
                         }                       
                     }
                     if (enemyunit === "77") {
                         if (($gameSwitches.value(_switch77ID)) && ($gameVariables.value(_var77ID) === 0 ) ) { 
                              $gameVariables.setValue((_var77ID), i);
                              $gameSwitches.setValue((_switch77ID), false);
                         }                       
                     }
                     if (enemyunit === "78") {
                         if (($gameSwitches.value(_switch78ID)) && ($gameVariables.value(_var78ID) === 0 ) ) { 
                              $gameVariables.setValue((_var78ID), i);
                              $gameSwitches.setValue((_switch78ID), false);
                         }                       
                     }
                     if (enemyunit === "79") {
                         if (($gameSwitches.value(_switch79ID)) && ($gameVariables.value(_var79ID) === 0 ) ) { 
                              $gameVariables.setValue((_var79ID), i);
                              $gameSwitches.setValue((_switch79ID), false);
                         }                       
                     }
                     if (enemyunit === "80") {
                         if (($gameSwitches.value(_switch80ID)) && ($gameVariables.value(_var80ID) === 0 ) ) { 
                              $gameVariables.setValue((_var80ID), i);
                              $gameSwitches.setValue((_switch80ID), false);
                         }                       
                     }   
                     if (enemyunit === "81") {
                         if (($gameSwitches.value(_switch81ID)) && ($gameVariables.value(_var81ID) === 0 ) ) { 
                              $gameVariables.setValue((_var81ID), i);
                              $gameSwitches.setValue((_switch81ID), false);
                         }                       
                     }
                     if (enemyunit === "82") {
                         if (($gameSwitches.value(_switch82ID)) && ($gameVariables.value(_var82ID) === 0 ) ) { 
                              $gameVariables.setValue((_var82ID), i);
                              $gameSwitches.setValue((_switch82ID), false);
                         }                       
                     }
                     if (enemyunit === "83") {
                         if (($gameSwitches.value(_switch83ID)) && ($gameVariables.value(_var83ID) === 0 ) ) { 
                              $gameVariables.setValue((_var83ID), i);
                              $gameSwitches.setValue((_switch83ID), false);
                         }                       
                     }
                     if (enemyunit === "84") {
                         if (($gameSwitches.value(_switch84ID)) && ($gameVariables.value(_var84ID) === 0 ) ) { 
                              $gameVariables.setValue((_var84ID), i);
                              $gameSwitches.setValue((_switch84ID), false);
                         }                       
                     }
                     if (enemyunit === "85") {
                         if (($gameSwitches.value(_switch85ID)) && ($gameVariables.value(_var85ID) === 0 ) ) { 
                              $gameVariables.setValue((_var85ID), i);
                              $gameSwitches.setValue((_switch85ID), false);
                         }                       
                     }
                     if (enemyunit === "86") {
                         if (($gameSwitches.value(_switch86ID)) && ($gameVariables.value(_var86ID) === 0 ) ) { 
                              $gameVariables.setValue((_var86ID), i);
                              $gameSwitches.setValue((_switch86ID), false);
                         }                       
                     }
                     if (enemyunit === "87") {
                         if (($gameSwitches.value(_switch87ID)) && ($gameVariables.value(_var87ID) === 0 ) ) { 
                              $gameVariables.setValue((_var87ID), i);
                              $gameSwitches.setValue((_switch87ID), false);
                         }                       
                     }
                     if (enemyunit === "88") {
                         if (($gameSwitches.value(_switch88ID)) && ($gameVariables.value(_var88ID) === 0 ) ) { 
                              $gameVariables.setValue((_var88ID), i);
                              $gameSwitches.setValue((_switch88ID), false);
                         }                       
                     }
                     if (enemyunit === "89") {
                         if (($gameSwitches.value(_switch89ID)) && ($gameVariables.value(_var89ID) === 0 ) ) { 
                              $gameVariables.setValue((_var89ID), i);
                              $gameSwitches.setValue((_switch89ID), false);
                         }                       
                     }
                     if (enemyunit === "90") {
                         if (($gameSwitches.value(_switch90ID)) && ($gameVariables.value(_var90ID) === 0 ) ) { 
                              $gameVariables.setValue((_var90ID), i);
                              $gameSwitches.setValue((_switch90ID), false);
                         }                       
                     }   
                     if (enemyunit === "91") {
                         if (($gameSwitches.value(_switch91ID)) && ($gameVariables.value(_var91ID) === 0 ) ) { 
                              $gameVariables.setValue((_var91ID), i);
                              $gameSwitches.setValue((_switch91ID), false);
                         }                       
                     }
                     if (enemyunit === "92") {
                         if (($gameSwitches.value(_switch92ID)) && ($gameVariables.value(_var92ID) === 0 ) ) { 
                              $gameVariables.setValue((_var92ID), i);
                              $gameSwitches.setValue((_switch92ID), false);
                         }                       
                     }
                     if (enemyunit === "93") {
                         if (($gameSwitches.value(_switch93ID)) && ($gameVariables.value(_var93ID) === 0 ) ) { 
                              $gameVariables.setValue((_var93ID), i);
                              $gameSwitches.setValue((_switch93ID), false);
                         }                       
                     }
                     if (enemyunit === "94") {
                         if (($gameSwitches.value(_switch94ID)) && ($gameVariables.value(_var94ID) === 0 ) ) { 
                              $gameVariables.setValue((_var94ID), i);
                              $gameSwitches.setValue((_switch94ID), false);
                         }                       
                     }
                     if (enemyunit === "95") {
                         if (($gameSwitches.value(_switch95ID)) && ($gameVariables.value(_var95ID) === 0 ) ) { 
                              $gameVariables.setValue((_var95ID), i);
                              $gameSwitches.setValue((_switch95ID), false);
                         }                       
                     }
                     if (enemyunit === "96") {
                         if (($gameSwitches.value(_switch96ID)) && ($gameVariables.value(_var96ID) === 0 ) ) { 
                              $gameVariables.setValue((_var96ID), i);
                              $gameSwitches.setValue((_switch96ID), false);
                         }                       
                     }
                     if (enemyunit === "97") {
                         if (($gameSwitches.value(_switch97ID)) && ($gameVariables.value(_var97ID) === 0 ) ) { 
                              $gameVariables.setValue((_var97ID), i);
                              $gameSwitches.setValue((_switch97ID), false);
                         }                       
                     }
                     if (enemyunit === "98") {
                         if (($gameSwitches.value(_switch98ID)) && ($gameVariables.value(_var98ID) === 0 ) ) { 
                              $gameVariables.setValue((_var98ID), i);
                              $gameSwitches.setValue((_switch98ID), false);
                         }                       
                     }
                     if (enemyunit === "99") {
                         if (($gameSwitches.value(_switch99ID)) && ($gameVariables.value(_var99ID) === 0 ) ) { 
                              $gameVariables.setValue((_var99ID), i);
                              $gameSwitches.setValue((_switch99ID), false);
                         }                       
                     }
                     if (enemyunit === "100") {
                         if (($gameSwitches.value(_switch100ID)) && ($gameVariables.value(_var100ID) === 0 ) ) { 
                              $gameVariables.setValue((_var100ID), i);
                              $gameSwitches.setValue((_switch100ID), false);
                         }                       
                     }                                            
                 }
            }            
        };
  
//--------------------------------------------------------------------------------------------
//Plugin Command :
//--------------------------------------------------------------------------------------------

    var _Game_Interpreter_pluginCommand =
                Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function(command, args) {
            _Game_Interpreter_pluginCommand.call(this, command, args);

            if (command === 'SRPG_EnemyUnits') {
                switch (args[0]) {

//------->Start: 
            //---> set ALL eventID-Varibles back to 0 and set Switches to "true":

                case 'Reset': // Plugin Command = "SRPG_EnemyUnits Reset"

                    $gameVariables.setValue(_var1ID, 0); $gameSwitches.setValue(_switch1ID , true);
                    $gameVariables.setValue(_var2ID, 0); $gameSwitches.setValue(_switch2ID , true);
                    $gameVariables.setValue(_var3ID, 0); $gameSwitches.setValue(_switch3ID , true);
                    $gameVariables.setValue(_var4ID, 0); $gameSwitches.setValue(_switch4ID , true);
                    $gameVariables.setValue(_var5ID, 0); $gameSwitches.setValue(_switch5ID , true);
                    $gameVariables.setValue(_var6ID, 0); $gameSwitches.setValue(_switch6ID , true);
                    $gameVariables.setValue(_var7ID, 0); $gameSwitches.setValue(_switch7ID , true);
                    $gameVariables.setValue(_var8ID, 0); $gameSwitches.setValue(_switch8ID , true);
                    $gameVariables.setValue(_var9ID, 0); $gameSwitches.setValue(_switch9ID , true);
                    $gameVariables.setValue(_var10ID, 0); $gameSwitches.setValue(_switch10ID , true);
//--> 10+
                    $gameVariables.setValue(_var11ID, 0); $gameSwitches.setValue(_switch11ID , true);
                    $gameVariables.setValue(_var12ID, 0); $gameSwitches.setValue(_switch12ID , true);
                    $gameVariables.setValue(_var13ID, 0); $gameSwitches.setValue(_switch13ID , true);
                    $gameVariables.setValue(_var14ID, 0); $gameSwitches.setValue(_switch14ID , true);
                    $gameVariables.setValue(_var15ID, 0); $gameSwitches.setValue(_switch15ID , true);
                    $gameVariables.setValue(_var16ID, 0); $gameSwitches.setValue(_switch16ID , true);
                    $gameVariables.setValue(_var17ID, 0); $gameSwitches.setValue(_switch17ID , true);
                    $gameVariables.setValue(_var18ID, 0); $gameSwitches.setValue(_switch18ID , true);
                    $gameVariables.setValue(_var19ID, 0); $gameSwitches.setValue(_switch19ID , true);
                    $gameVariables.setValue(_var20ID, 0); $gameSwitches.setValue(_switch20ID , true);
//--> 20+
                    $gameVariables.setValue(_var21ID, 0); $gameSwitches.setValue(_switch21ID , true);
                    $gameVariables.setValue(_var22ID, 0); $gameSwitches.setValue(_switch22ID , true);
                    $gameVariables.setValue(_var23ID, 0); $gameSwitches.setValue(_switch23ID , true);
                    $gameVariables.setValue(_var24ID, 0); $gameSwitches.setValue(_switch24ID , true);
                    $gameVariables.setValue(_var25ID, 0); $gameSwitches.setValue(_switch25ID , true);
                    $gameVariables.setValue(_var26ID, 0); $gameSwitches.setValue(_switch26ID , true);
                    $gameVariables.setValue(_var27ID, 0); $gameSwitches.setValue(_switch27ID , true);
                    $gameVariables.setValue(_var28ID, 0); $gameSwitches.setValue(_switch28ID , true);
                    $gameVariables.setValue(_var29ID, 0); $gameSwitches.setValue(_switch29ID , true);
                    $gameVariables.setValue(_var30ID, 0); $gameSwitches.setValue(_switch30ID , true);
//--> 30+
                    $gameVariables.setValue(_var31ID, 0); $gameSwitches.setValue(_switch31ID , true);
                    $gameVariables.setValue(_var32ID, 0); $gameSwitches.setValue(_switch32ID , true);
                    $gameVariables.setValue(_var33ID, 0); $gameSwitches.setValue(_switch33ID , true);
                    $gameVariables.setValue(_var34ID, 0); $gameSwitches.setValue(_switch34ID , true);
                    $gameVariables.setValue(_var35ID, 0); $gameSwitches.setValue(_switch35ID , true);
                    $gameVariables.setValue(_var36ID, 0); $gameSwitches.setValue(_switch36ID , true);
                    $gameVariables.setValue(_var37ID, 0); $gameSwitches.setValue(_switch37ID , true);
                    $gameVariables.setValue(_var38ID, 0); $gameSwitches.setValue(_switch38ID , true);
                    $gameVariables.setValue(_var39ID, 0); $gameSwitches.setValue(_switch39ID , true);
                    $gameVariables.setValue(_var40ID, 0); $gameSwitches.setValue(_switch40ID , true);
//--> 40+
                    $gameVariables.setValue(_var41ID, 0); $gameSwitches.setValue(_switch41ID , true);
                    $gameVariables.setValue(_var42ID, 0); $gameSwitches.setValue(_switch42ID , true);
                    $gameVariables.setValue(_var43ID, 0); $gameSwitches.setValue(_switch43ID , true);
                    $gameVariables.setValue(_var44ID, 0); $gameSwitches.setValue(_switch44ID , true);
                    $gameVariables.setValue(_var45ID, 0); $gameSwitches.setValue(_switch45ID , true);
                    $gameVariables.setValue(_var46ID, 0); $gameSwitches.setValue(_switch46ID , true);
                    $gameVariables.setValue(_var47ID, 0); $gameSwitches.setValue(_switch47ID , true);
                    $gameVariables.setValue(_var48ID, 0); $gameSwitches.setValue(_switch48ID , true);
                    $gameVariables.setValue(_var49ID, 0); $gameSwitches.setValue(_switch49ID , true);
                    $gameVariables.setValue(_var50ID, 0); $gameSwitches.setValue(_switch50ID , true);
//--> 50+
                    $gameVariables.setValue(_var51ID, 0); $gameSwitches.setValue(_switch51ID , true);
                    $gameVariables.setValue(_var52ID, 0); $gameSwitches.setValue(_switch52ID , true);
                    $gameVariables.setValue(_var53ID, 0); $gameSwitches.setValue(_switch53ID , true);
                    $gameVariables.setValue(_var54ID, 0); $gameSwitches.setValue(_switch54ID , true);
                    $gameVariables.setValue(_var55ID, 0); $gameSwitches.setValue(_switch55ID , true);
                    $gameVariables.setValue(_var56ID, 0); $gameSwitches.setValue(_switch56ID , true);
                    $gameVariables.setValue(_var57ID, 0); $gameSwitches.setValue(_switch57ID , true);
                    $gameVariables.setValue(_var58ID, 0); $gameSwitches.setValue(_switch58ID , true);
                    $gameVariables.setValue(_var59ID, 0); $gameSwitches.setValue(_switch59ID , true);
                    $gameVariables.setValue(_var60ID, 0); $gameSwitches.setValue(_switch60ID , true);
//--> 60+
                    $gameVariables.setValue(_var61ID, 0); $gameSwitches.setValue(_switch61ID , true);
                    $gameVariables.setValue(_var62ID, 0); $gameSwitches.setValue(_switch62ID , true);
                    $gameVariables.setValue(_var63ID, 0); $gameSwitches.setValue(_switch63ID , true);
                    $gameVariables.setValue(_var64ID, 0); $gameSwitches.setValue(_switch64ID , true);
                    $gameVariables.setValue(_var65ID, 0); $gameSwitches.setValue(_switch65ID , true);
                    $gameVariables.setValue(_var66ID, 0); $gameSwitches.setValue(_switch66ID , true);
                    $gameVariables.setValue(_var67ID, 0); $gameSwitches.setValue(_switch67ID , true);
                    $gameVariables.setValue(_var68ID, 0); $gameSwitches.setValue(_switch68ID , true);
                    $gameVariables.setValue(_var69ID, 0); $gameSwitches.setValue(_switch69ID , true);
                    $gameVariables.setValue(_var70ID, 0); $gameSwitches.setValue(_switch70ID , true);
//--> 70+
                    $gameVariables.setValue(_var71ID, 0); $gameSwitches.setValue(_switch71ID , true);
                    $gameVariables.setValue(_var72ID, 0); $gameSwitches.setValue(_switch72ID , true);
                    $gameVariables.setValue(_var73ID, 0); $gameSwitches.setValue(_switch73ID , true);
                    $gameVariables.setValue(_var74ID, 0); $gameSwitches.setValue(_switch74ID , true);
                    $gameVariables.setValue(_var75ID, 0); $gameSwitches.setValue(_switch75ID , true);
                    $gameVariables.setValue(_var76ID, 0); $gameSwitches.setValue(_switch76ID , true);
                    $gameVariables.setValue(_var77ID, 0); $gameSwitches.setValue(_switch77ID , true);
                    $gameVariables.setValue(_var78ID, 0); $gameSwitches.setValue(_switch78ID , true);
                    $gameVariables.setValue(_var79ID, 0); $gameSwitches.setValue(_switch79ID , true);
                    $gameVariables.setValue(_var80ID, 0); $gameSwitches.setValue(_switch80ID , true);
//--> 80+
                    $gameVariables.setValue(_var81ID, 0); $gameSwitches.setValue(_switch81ID , true);
                    $gameVariables.setValue(_var82ID, 0); $gameSwitches.setValue(_switch82ID , true);
                    $gameVariables.setValue(_var83ID, 0); $gameSwitches.setValue(_switch83ID , true);
                    $gameVariables.setValue(_var84ID, 0); $gameSwitches.setValue(_switch84ID , true);
                    $gameVariables.setValue(_var85ID, 0); $gameSwitches.setValue(_switch85ID , true);
                    $gameVariables.setValue(_var86ID, 0); $gameSwitches.setValue(_switch86ID , true);
                    $gameVariables.setValue(_var87ID, 0); $gameSwitches.setValue(_switch87ID , true);
                    $gameVariables.setValue(_var88ID, 0); $gameSwitches.setValue(_switch88ID , true);
                    $gameVariables.setValue(_var89ID, 0); $gameSwitches.setValue(_switch89ID , true);
                    $gameVariables.setValue(_var90ID, 0); $gameSwitches.setValue(_switch90ID , true);
//--> 90+
                    $gameVariables.setValue(_var91ID, 0); $gameSwitches.setValue(_switch91ID , true);
                    $gameVariables.setValue(_var92ID, 0); $gameSwitches.setValue(_switch92ID , true);
                    $gameVariables.setValue(_var93ID, 0); $gameSwitches.setValue(_switch93ID , true);
                    $gameVariables.setValue(_var94ID, 0); $gameSwitches.setValue(_switch94ID , true);
                    $gameVariables.setValue(_var95ID, 0); $gameSwitches.setValue(_switch95ID , true);
                    $gameVariables.setValue(_var96ID, 0); $gameSwitches.setValue(_switch96ID , true);
                    $gameVariables.setValue(_var97ID, 0); $gameSwitches.setValue(_switch97ID , true);
                    $gameVariables.setValue(_var98ID, 0); $gameSwitches.setValue(_switch98ID , true);
                    $gameVariables.setValue(_var99ID, 0); $gameSwitches.setValue(_switch99ID , true);
                    $gameVariables.setValue(_var100ID, 0); $gameSwitches.setValue(_switch100ID , true);
//--> 100_END
                    break;
        

//Plugin Command-End:

                }

            }
        };

//---End :

 
})();