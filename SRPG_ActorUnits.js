//=============================================================================
// SRPG_ActorUnits.js
//=============================================================================
/*:
 * @plugindesc v1.0 Adds <SRPG_ActorUnits> to Store and control Actors event_Ids in Variables in SRPG 
 * @author dopan
 *
 *
 *
 *
 *
 *
 * @param Disable.A-Unit1_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 1 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit1VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit2_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 2 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit2VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit3_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 3 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit3VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit4_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 4 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit4VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit5_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 5 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit5VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit6_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 6 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit6VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit7_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 7 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit7VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit8_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 8 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit8VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit9_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 9 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit9VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit10_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 10 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit10VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit11_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 11 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit11VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit12_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 12 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit12VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit13_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 13 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit13VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit14_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 14 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit14VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit15_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 15 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit15VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit16_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 16 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit16VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit17_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 17 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit17VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit18_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 18 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit18VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit19_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 19 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit19VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit20_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 20 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit20VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit21_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 21 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit21VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit22_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 22 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit22VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit23_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 23 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit23VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit24_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 24 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit24VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit25_SwitchID 
 * @desc SwitchID: Control-Switch = ActorBattle Unit 25 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit25VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit26_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 26 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit26VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit27_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 27 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit27VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit28_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 28 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit28VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit29_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 29 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit29VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit30_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 30 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit30VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit31_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 31 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit31VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit32_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 32 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit32VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit33_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 33 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit33VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit34_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 34 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit34VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit35_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 35 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit35VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit36_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 36 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit36VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit37_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 37 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit37VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit38_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 38 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit38VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit39_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 39 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit39VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit40_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 40 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit40VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit41_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 41 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit41VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit42_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 42 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit42VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit43_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 43 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit43VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit44_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 44 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit44VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit45_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 45 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit45VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit46_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 46 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit46VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit47_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 47 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit47VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit48_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 48 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit48VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit49_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 49 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit49VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit50_SwitchID
 * @desc SwitchID: Control-Switch = ActorBattle Unit 50 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit50VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit51_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 51 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit51VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit52_SwitchID
 * @desc SwitchID: Control-Switch = ActorBattle Unit 52 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit52VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit53_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 53 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit53VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit54_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 54 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit54VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit55_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 55 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit55VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit56_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 56 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit56VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit57_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 57 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit57VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit58_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 58 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit58VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit59_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 59 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit59VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit60_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 60 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit60VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit61_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 61 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit61VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit62_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 62 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit62VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit63_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 63 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit63VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit64_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 64 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit64VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit65_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 65 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit65VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit66_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 66 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit66VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit67_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 67 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit67VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit68_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 68 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit68VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit69_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 69 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit69VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit70_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 70 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit70VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit71_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 71 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit71VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit72_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 72 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit72VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit73_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 73 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit73VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit74_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 74 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit74VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit75_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 75 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit75VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit76_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 76 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit76VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit77_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 77 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit77VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit78_SwitchID 
 * @desc SwitchID: Control-Switch = ActorBattle Unit 78 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit78VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit79_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 79 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit79VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit80_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 80 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit80VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit81_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 81 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit81VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit82_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 82 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit82VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit83_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 83 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit83VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit84_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 84 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit84VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit85_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 85 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit85VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit86_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 86 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit86VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit87_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 87 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit87VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit88_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 88 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit88VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit89_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 89 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit89VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit90_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 90 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit90VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit91_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 91 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit91VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit92_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 92 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit92VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit93_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 93 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit93VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit94_SwitchID
 * @desc SwitchID: Control-Switch = ActorBattle Unit 94 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit94VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit95_SwitchID 
 * @desc SwitchID: Control-Switch = ActorBattle Unit 95 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit95VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit96_SwitchID 
 * @desc SwitchID: Control-Switch = ActorBattle Unit 96 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit96VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit97_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 97 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit97VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit98_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 98 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit98VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit99_SwitchID 
 * @desc SwitchID: Control-Switch = DisableActor Unit 99 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit99VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 * @param Disable.A-Unit100_SwitchID
 * @desc SwitchID: Control-Switch = DisableActor Unit 100 if "true"
 * @type switch
 * @default 0
 *
 *
 * @param ActorUnit100VarEvID
 * @desc variable ID of ActorUnit_Event ,to activate set Value (=EventID) to this VarID.
 * @type variable
 * @default 0
 *
 *
 *
 * @help 
 * -- This is made for 100 ActorUnits ,but with a bit of JS knowlegde its easy to extend --
 *
 * This plugin stores the Variables for ActorUnits-EVENT_ID and connect them to Switches..
 * 
 * -> the Event IDs must be inserted by the Plugin User by setting-> "VariableValue" = "Event ID".
 *  settingVarValue=>this can be done for each Map individually in a Event or for all Maps with Common Event
 *
 * ->Or you can use :
 * The Plugin SriptCalls and the PluginCommand from this Plugin to handle this on all *ActorUnits*.. 
 *
 * - Actors can be located from the System by "actor ID" ,..this Plugin will allways put Actor 1 in Var 1 with Switch 1 ect
 *-----------------------------------------------------------------------------------------------------
 *-----------------------------------------------------------------------------------------------------
 * How to use the Plugin Command and ScriptCalls? :
 *-----------------------------------------------------------------------------------------------------
 *..If u Use this Plugin & "SRPG_ActorUnits", most work can be done with PluginCommands and Plugin ScriptCalls:
 * 
 *- at BattleStart use Plugin Command => "SRPG_ActorUnits Reset" 
 *- than use : "this.allAxSetEventID();" (Plugin ScriptCall)
 *-> ..and use this on "after Action Phase": "this.allAxCheckDeath();" 
 * => this way all your Actors on Map have there eventId Stored in Variables and Switches are handled
 * if u add Actors later to the Map use this again =>:"this.allAxSetEventID();" (Plugin ScriptCall)
 * 
 *-----------------------------------------------------------------------------------------------------
 *
 * -the Event ID Varibles for ActorUnits, can also be used to use other functions in ScriptCalls like:
 *   "this.isUnitDead(SwitchID, EventID);" or "this.unitRevive(EventID);"
 * Example : "this.unitRevive($gameVariables.value(varID));" //-> EnemY_Unit_VarID inserts Event ID) 
 *
 * This is really helpfull if the Event IDs of your Maps and Units are different on every Map,..
 * you only have to set the Value of the EnemyUnitVariables,or use the Unit EventPage,
 * to insert EventIDs in VarValue, for each Map.(Or use the Plugin Function..) 
 * 
 * (the UpdatedSRPGdemo has an Example for "set variable Value",
 * in order to give the EventID data to the Variables) 
 *
 * =>its recommended to use States "Actor" and  "Enemy" ( optional in addittion "all b.Units")
 * (this can be very usefull for "If Conditions" where u want to seperate friends from Enemys)
 *
 *
 *-------------------------------------------------------------------------------------------------
 *
 * Plugin Command:
 *
 *-------------------------------------------------------------------------------------------------
 *
 *- Plugin Command = "SRPG_ActorUnits Reset"
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
 *-"this.allAxCheckDeath();" // if Switch "false" -> checks on all Units if they are death and set Switch "true" if death. 
 *
 *--------------------------
 *-"this.allAxCheckValue();" // this Checks the Value of Each Variable and set connected Switch "false" ,if Value more than 0 ( = EventID is set)
 *
 *--------------------------
 *-"this.allAxSetEventID();" // sets Event Ids of All Actors to the Variables from SRPG_ActorUnits.js Param,if Switch is "true" (and set Switch to false)
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

  var parameters = $plugins.filter(function (plugin) { return plugin.description.contains('SRPG_ActorUnits'); });
  var parameters = PluginManager.parameters("SRPG_ActorUnits");
  

  var _switch1AID = Number(parameters['Disable.A-Unit1_SwitchID'] || 0);
  var _switch2AID = Number(parameters['Disable.A-Unit2_SwitchID'] || 0);
  var _switch3AID = Number(parameters['Disable.A-Unit3_SwitchID'] || 0);
  var _switch4AID = Number(parameters['Disable.A-Unit4_SwitchID'] || 0);
  var _switch5AID = Number(parameters['Disable.A-Unit5_SwitchID'] || 0);
  var _switch6AID = Number(parameters['Disable.A-Unit6_SwitchID'] || 0);
  var _switch7AID = Number(parameters['Disable.A-Unit7_SwitchID'] || 0);
  var _switch8AID = Number(parameters['Disable.A-Unit8_SwitchID'] || 0);
  var _switch9AID = Number(parameters['Disable.A-Unit9_SwitchID'] || 0);
  var _switch10AID = Number(parameters['Disable.A-Unit10_SwitchID'] || 0);
  var _switch11AID = Number(parameters['Disable.A-Unit11_SwitchID'] || 0);
  var _switch12AID = Number(parameters['Disable.A-Unit12_SwitchID'] || 0);
  var _switch13AID = Number(parameters['Disable.A-Unit13_SwitchID'] || 0);
  var _switch14AID = Number(parameters['Disable.A-Unit14_SwitchID'] || 0);
  var _switch15AID = Number(parameters['Disable.A-Unit15_SwitchID'] || 0);
  var _switch16AID = Number(parameters['Disable.A-Unit16_SwitchID'] || 0);
  var _switch17AID = Number(parameters['Disable.A-Unit17_SwitchID'] || 0);
  var _switch18AID = Number(parameters['Disable.A-Unit18_SwitchID'] || 0);
  var _switch19AID = Number(parameters['Disable.A-Unit19_SwitchID'] || 0);
  var _switch20AID = Number(parameters['Disable.A-Unit20_SwitchID'] || 0);
  var _switch21AID = Number(parameters['Disable.A-Unit21_SwitchID'] || 0);
  var _switch22AID = Number(parameters['Disable.A-Unit22_SwitchID'] || 0);
  var _switch23AID = Number(parameters['Disable.A-Unit23_SwitchID'] || 0);
  var _switch24AID = Number(parameters['Disable.A-Unit24_SwitchID'] || 0);
  var _switch25AID = Number(parameters['Disable.A-Unit25_SwitchID'] || 0);
  var _switch26AID = Number(parameters['Disable.A-Unit26_SwitchID'] || 0);
  var _switch27AID = Number(parameters['Disable.A-Unit27_SwitchID'] || 0);
  var _switch28AID = Number(parameters['Disable.A-Unit28_SwitchID'] || 0);
  var _switch29AID = Number(parameters['Disable.A-Unit29_SwitchID'] || 0);
  var _switch30AID = Number(parameters['Disable.A-Unit30_SwitchID'] || 0);
  var _switch31AID = Number(parameters['Disable.A-Unit31_SwitchID'] || 0);
  var _switch32AID = Number(parameters['Disable.A-Unit32_SwitchID'] || 0);
  var _switch33AID = Number(parameters['Disable.A-Unit33_SwitchID'] || 0);
  var _switch34AID = Number(parameters['Disable.A-Unit34_SwitchID'] || 0);
  var _switch35AID = Number(parameters['Disable.A-Unit35_SwitchID'] || 0);
  var _switch36AID = Number(parameters['Disable.A-Unit36_SwitchID'] || 0);
  var _switch37AID = Number(parameters['Disable.A-Unit37_SwitchID'] || 0);
  var _switch38AID = Number(parameters['Disable.A-Unit38_SwitchID'] || 0);
  var _switch39AID = Number(parameters['Disable.A-Unit39_SwitchID'] || 0);
  var _switch40AID = Number(parameters['Disable.A-Unit40_SwitchID'] || 0);
  var _switch41AID = Number(parameters['Disable.A-Unit41_SwitchID'] || 0);
  var _switch42AID = Number(parameters['Disable.A-Unit42_SwitchID'] || 0);
  var _switch43AID = Number(parameters['Disable.A-Unit43_SwitchID'] || 0);
  var _switch44AID = Number(parameters['Disable.A-Unit44_SwitchID'] || 0);
  var _switch45AID = Number(parameters['Disable.A-Unit45_SwitchID'] || 0);
  var _switch46AID = Number(parameters['Disable.A-Unit46_SwitchID'] || 0);
  var _switch47AID = Number(parameters['Disable.A-Unit47_SwitchID'] || 0);
  var _switch48AID = Number(parameters['Disable.A-Unit48_SwitchID'] || 0);
  var _switch49AID = Number(parameters['Disable.A-Unit49_SwitchID'] || 0);
  var _switch50AID = Number(parameters['Disable.A-Unit50_SwitchID'] || 0);
  var _switch51AID = Number(parameters['Disable.A-Unit51_SwitchID'] || 0);
  var _switch52AID = Number(parameters['Disable.A-Unit52_SwitchID'] || 0);
  var _switch53AID = Number(parameters['Disable.A-Unit53_SwitchID'] || 0);
  var _switch54AID = Number(parameters['Disable.A-Unit54_SwitchID'] || 0);
  var _switch55AID = Number(parameters['Disable.A-Unit55_SwitchID'] || 0);
  var _switch56AID = Number(parameters['Disable.A-Unit56_SwitchID'] || 0);
  var _switch57AID = Number(parameters['Disable.A-Unit57_SwitchID'] || 0);
  var _switch58AID = Number(parameters['Disable.A-Unit58_SwitchID'] || 0);
  var _switch59AID = Number(parameters['Disable.A-Unit59_SwitchID'] || 0);
  var _switch60AID = Number(parameters['Disable.A-Unit60_SwitchID'] || 0);
  var _switch61AID = Number(parameters['Disable.A-Unit61_SwitchID'] || 0);
  var _switch62AID = Number(parameters['Disable.A-Unit62_SwitchID'] || 0);
  var _switch63AID = Number(parameters['Disable.A-Unit63_SwitchID'] || 0);
  var _switch64AID = Number(parameters['Disable.A-Unit64_SwitchID'] || 0);
  var _switch65AID = Number(parameters['Disable.A-Unit65_SwitchID'] || 0);
  var _switch66AID = Number(parameters['Disable.A-Unit66_SwitchID'] || 0);
  var _switch67AID = Number(parameters['Disable.A-Unit67_SwitchID'] || 0);
  var _switch68AID = Number(parameters['Disable.A-Unit68_SwitchID'] || 0);
  var _switch69AID = Number(parameters['Disable.A-Unit69_SwitchID'] || 0);
  var _switch70AID = Number(parameters['Disable.A-Unit70_SwitchID'] || 0);
  var _switch71AID = Number(parameters['Disable.A-Unit71_SwitchID'] || 0);
  var _switch72AID = Number(parameters['Disable.A-Unit72_SwitchID'] || 0);
  var _switch73AID = Number(parameters['Disable.A-Unit73_SwitchID'] || 0);
  var _switch74AID = Number(parameters['Disable.A-Unit74_SwitchID'] || 0);
  var _switch75AID = Number(parameters['Disable.A-Unit75_SwitchID'] || 0);
  var _switch76AID = Number(parameters['Disable.A-Unit76_SwitchID'] || 0);
  var _switch77AID = Number(parameters['Disable.A-Unit77_SwitchID'] || 0);
  var _switch78AID = Number(parameters['Disable.A-Unit78_SwitchID'] || 0);
  var _switch79AID = Number(parameters['Disable.A-Unit79_SwitchID'] || 0);
  var _switch80AID = Number(parameters['Disable.A-Unit80_SwitchID'] || 0);
  var _switch81AID = Number(parameters['Disable.A-Unit81_SwitchID'] || 0);
  var _switch82AID = Number(parameters['Disable.A-Unit82_SwitchID'] || 0);
  var _switch83AID = Number(parameters['Disable.A-Unit83_SwitchID'] || 0);
  var _switch84AID = Number(parameters['Disable.A-Unit84_SwitchID'] || 0);
  var _switch85AID = Number(parameters['Disable.A-Unit85_SwitchID'] || 0);
  var _switch86AID = Number(parameters['Disable.A-Unit86_SwitchID'] || 0);
  var _switch87AID = Number(parameters['Disable.A-Unit87_SwitchID'] || 0);
  var _switch88AID = Number(parameters['Disable.A-Unit88_SwitchID'] || 0);
  var _switch89AID = Number(parameters['Disable.A-Unit89_SwitchID'] || 0);
  var _switch90AID = Number(parameters['Disable.A-Unit90_SwitchID'] || 0);
  var _switch91AID = Number(parameters['Disable.A-Unit91_SwitchID'] || 0);
  var _switch92AID = Number(parameters['Disable.A-Unit92_SwitchID'] || 0);
  var _switch93AID = Number(parameters['Disable.A-Unit93_SwitchID'] || 0);
  var _switch94AID = Number(parameters['Disable.A-Unit94_SwitchID'] || 0);
  var _switch95AID = Number(parameters['Disable.A-Unit95_SwitchID'] || 0);
  var _switch96AID = Number(parameters['Disable.A-Unit96_SwitchID'] || 0);
  var _switch97AID = Number(parameters['Disable.A-Unit97_SwitchID'] || 0);
  var _switch98AID = Number(parameters['Disable.A-Unit98_SwitchID'] || 0);
  var _switch99AID = Number(parameters['Disable.A-Unit99_SwitchID'] || 0);
  var _switch100AID = Number(parameters['Disable.A-Unit100_SwitchID'] || 0);

  var _var1AID = Number(parameters['ActorUnit1VarEvID'] || 0);
  var _var2AID = Number(parameters['ActorUnit2VarEvID'] || 0);
  var _var3AID = Number(parameters['ActorUnit3VarEvID'] || 0);
  var _var4AID = Number(parameters['ActorUnit4VarEvID'] || 0);
  var _var5AID = Number(parameters['ActorUnit5VarEvID'] || 0);
  var _var6AID = Number(parameters['ActorUnit6VarEvID'] || 0);
  var _var7AID = Number(parameters['ActorUnit7VarEvID'] || 0);
  var _var8AID = Number(parameters['ActorUnit8VarEvID'] || 0);
  var _var9AID = Number(parameters['ActorUnit9VarEvID'] || 0);
  var _var10AID = Number(parameters['ActorUnit10VarEvID'] || 0);
  var _var11AID = Number(parameters['ActorUnit11VarEvID'] || 0);
  var _var12AID = Number(parameters['ActorUnit12VarEvID'] || 0);
  var _var13AID = Number(parameters['ActorUnit13VarEvID'] || 0);
  var _var14AID = Number(parameters['ActorUnit14VarEvID'] || 0);
  var _var15AID = Number(parameters['ActorUnit15VarEvID'] || 0);
  var _var16AID = Number(parameters['ActorUnit16VarEvID'] || 0);
  var _var17AID = Number(parameters['ActorUnit17VarEvID'] || 0);
  var _var18AID = Number(parameters['ActorUnit18VarEvID'] || 0);
  var _var19AID = Number(parameters['ActorUnit19VarEvID'] || 0);
  var _var20AID = Number(parameters['ActorUnit20VarEvID'] || 0);
  var _var21AID = Number(parameters['ActorUnit21VarEvID'] || 0);
  var _var22AID = Number(parameters['ActorUnit22VarEvID'] || 0);
  var _var23AID = Number(parameters['ActorUnit23VarEvID'] || 0);
  var _var24AID = Number(parameters['ActorUnit24VarEvID'] || 0);
  var _var25AID = Number(parameters['ActorUnit25VarEvID'] || 0);
  var _var26AID = Number(parameters['ActorUnit26VarEvID'] || 0);
  var _var27AID = Number(parameters['ActorUnit27VarEvID'] || 0);
  var _var28AID = Number(parameters['ActorUnit28VarEvID'] || 0);
  var _var29AID = Number(parameters['ActorUnit29VarEvID'] || 0);
  var _var30AID = Number(parameters['ActorUnit30VarEvID'] || 0);
  var _var31AID = Number(parameters['ActorUnit31VarEvID'] || 0);
  var _var32AID = Number(parameters['ActorUnit32VarEvID'] || 0);
  var _var33AID = Number(parameters['ActorUnit33VarEvID'] || 0);
  var _var34AID = Number(parameters['ActorUnit34VarEvID'] || 0);
  var _var35AID = Number(parameters['ActorUnit35VarEvID'] || 0);
  var _var36AID = Number(parameters['ActorUnit36VarEvID'] || 0);
  var _var37AID = Number(parameters['ActorUnit37VarEvID'] || 0);
  var _var38AID = Number(parameters['ActorUnit38VarEvID'] || 0);
  var _var39AID = Number(parameters['ActorUnit39VarEvID'] || 0);
  var _var40AID = Number(parameters['ActorUnit40VarEvID'] || 0);
  var _var41AID = Number(parameters['ActorUnit41VarEvID'] || 0);
  var _var42AID = Number(parameters['ActorUnit42VarEvID'] || 0);
  var _var43AID = Number(parameters['ActorUnit43VarEvID'] || 0);
  var _var44AID = Number(parameters['ActorUnit44VarEvID'] || 0);
  var _var45AID = Number(parameters['ActorUnit45VarEvID'] || 0);
  var _var46AID = Number(parameters['ActorUnit46VarEvID'] || 0);
  var _var47AID = Number(parameters['ActorUnit47VarEvID'] || 0);
  var _var48AID = Number(parameters['ActorUnit48VarEvID'] || 0);
  var _var49AID = Number(parameters['ActorUnit49VarEvID'] || 0);
  var _var50AID = Number(parameters['ActorUnit50VarEvID'] || 0);
  var _var51AID = Number(parameters['ActorUnit51VarEvID'] || 0);
  var _var52AID = Number(parameters['ActorUnit52VarEvID'] || 0);
  var _var53AID = Number(parameters['ActorUnit53VarEvID'] || 0);
  var _var54AID = Number(parameters['ActorUnit54VarEvID'] || 0);
  var _var55AID = Number(parameters['ActorUnit55VarEvID'] || 0);
  var _var56AID = Number(parameters['ActorUnit56VarEvID'] || 0);
  var _var57AID = Number(parameters['ActorUnit57VarEvID'] || 0);
  var _var58AID = Number(parameters['ActorUnit58VarEvID'] || 0);
  var _var59AID = Number(parameters['ActorUnit59VarEvID'] || 0);
  var _var60AID = Number(parameters['ActorUnit60VarEvID'] || 0);
  var _var61AID = Number(parameters['ActorUnit61VarEvID'] || 0);
  var _var62AID = Number(parameters['ActorUnit62VarEvID'] || 0);
  var _var63AID = Number(parameters['ActorUnit63VarEvID'] || 0);
  var _var64AID = Number(parameters['ActorUnit64VarEvID'] || 0);
  var _var65AID = Number(parameters['ActorUnit65VarEvID'] || 0);
  var _var66AID = Number(parameters['ActorUnit66VarEvID'] || 0);
  var _var67AID = Number(parameters['ActorUnit67VarEvID'] || 0);
  var _var68AID = Number(parameters['ActorUnit68VarEvID'] || 0);
  var _var69AID = Number(parameters['ActorUnit69VarEvID'] || 0);
  var _var70AID = Number(parameters['ActorUnit70VarEvID'] || 0);
  var _var71AID = Number(parameters['ActorUnit71VarEvID'] || 0);
  var _var72AID = Number(parameters['ActorUnit72VarEvID'] || 0);
  var _var73AID = Number(parameters['ActorUnit73VarEvID'] || 0);
  var _var74AID = Number(parameters['ActorUnit74VarEvID'] || 0);
  var _var75AID = Number(parameters['ActorUnit75VarEvID'] || 0);
  var _var76AID = Number(parameters['ActorUnit76VarEvID'] || 0);
  var _var77AID = Number(parameters['ActorUnit77VarEvID'] || 0);
  var _var78AID = Number(parameters['ActorUnit78VarEvID'] || 0);
  var _var79AID = Number(parameters['ActorUnit79VarEvID'] || 0);
  var _var80AID = Number(parameters['ActorUnit80VarEvID'] || 0);
  var _var81AID = Number(parameters['ActorUnit81VarEvID'] || 0);
  var _var82AID = Number(parameters['ActorUnit82VarEvID'] || 0);
  var _var83AID = Number(parameters['ActorUnit83VarEvID'] || 0);
  var _var84AID = Number(parameters['ActorUnit84VarEvID'] || 0);
  var _var85AID = Number(parameters['ActorUnit85VarEvID'] || 0);
  var _var86AID = Number(parameters['ActorUnit86VarEvID'] || 0);
  var _var87AID = Number(parameters['ActorUnit87VarEvID'] || 0);
  var _var88AID = Number(parameters['ActorUnit88VarEvID'] || 0);
  var _var89AID = Number(parameters['ActorUnit89VarEvID'] || 0);
  var _var90AID = Number(parameters['ActorUnit90VarEvID'] || 0);
  var _var91AID = Number(parameters['ActorUnit91VarEvID'] || 0);
  var _var92AID = Number(parameters['ActorUnit92VarEvID'] || 0);
  var _var93AID = Number(parameters['ActorUnit93VarEvID'] || 0);
  var _var94AID = Number(parameters['ActorUnit94VarEvID'] || 0);
  var _var95AID = Number(parameters['ActorUnit95VarEvID'] || 0);
  var _var96AID = Number(parameters['ActorUnit96VarEvID'] || 0);
  var _var97AID = Number(parameters['ActorUnit97VarEvID'] || 0);
  var _var98AID = Number(parameters['ActorUnit98VarEvID'] || 0);
  var _var99AID = Number(parameters['ActorUnit99VarEvID'] || 0);
  var _var100AID = Number(parameters['ActorUnit100VarEvID'] || 0);


//--------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------

//use "this.isUnitDead": to check if the Event which ID is stored in the Variable is Dead,if Dead turn Switch "true"

     // => "this.allAxCheckDeath()"
     Game_Interpreter.prototype.allAxCheckDeath = function() {

//-----1.ID:

            if (!$gameSwitches.value(_switch1AID) ) {               
                this.isUnitDead(_switch1AID, $gameVariables.value(_var1AID));
            };
//-----2.ID:

            if (!$gameSwitches.value(_switch2AID) ) {               
                this.isUnitDead(_switch2AID, $gameVariables.value(_var2AID));
            };
//-----3.ID:

            if (!$gameSwitches.value(_switch3AID) ) {               
                this.isUnitDead(_switch3AID, $gameVariables.value(_var3AID));
            };
//-----4.ID:

            if (!$gameSwitches.value(_switch4AID) ) {               
                this.isUnitDead(_switch4AID, $gameVariables.value(_var4AID));
            };
//-----5.ID:

            if (!$gameSwitches.value(_switch5AID) ) {               
                this.isUnitDead(_switch5AID, $gameVariables.value(_var5AID));
            };
//-----6.ID:

            if (!$gameSwitches.value(_switch6AID) ) {               
                this.isUnitDead(_switch6AID, $gameVariables.value(_var6AID));
            };
//-----7.ID:

            if (!$gameSwitches.value(_switch7AID) ) {               
                this.isUnitDead(_switch7AID, $gameVariables.value(_var7AID));
            };
//-----8.ID:

            if (!$gameSwitches.value(_switch8AID) ) {               
                this.isUnitDead(_switch8AID, $gameVariables.value(_var8AID));
            };
//-----9.ID:

            if (!$gameSwitches.value(_switch9AID) ) {               
                this.isUnitDead(_switch9AID, $gameVariables.value(_var9AID));
            };
//----10.ID:

            if (!$gameSwitches.value(_switch10AID) ) {               
                this.isUnitDead(_switch10AID, $gameVariables.value(_var10AID));
            };
//----11.ID:

            if (!$gameSwitches.value(_switch11AID) ) {               
                this.isUnitDead(_switch11AID, $gameVariables.value(_var11AID));
            };
//----12.ID:

            if (!$gameSwitches.value(_switch12AID) ) {               
                this.isUnitDead(_switch12AID, $gameVariables.value(_var12AID));
            };
//----13.ID:

            if (!$gameSwitches.value(_switch13AID) ) {               
                this.isUnitDead(_switch13AID, $gameVariables.value(_var13AID));
            };
//----14.ID:

            if (!$gameSwitches.value(_switch14AID) ) {               
                this.isUnitDead(_switch14AID, $gameVariables.value(_var14AID));
            };
//----15.ID:

            if (!$gameSwitches.value(_switch15AID) ) {               
                this.isUnitDead(_switch15AID, $gameVariables.value(_var15AID));
            };
//----16.ID:

            if (!$gameSwitches.value(_switch16AID) ) {               
                this.isUnitDead(_switch16AID, $gameVariables.value(_var16AID));
            };
//----17.ID:

            if (!$gameSwitches.value(_switch17AID) ) {               
                this.isUnitDead(_switch17AID, $gameVariables.value(_var17AID));
            };
//----18.ID:

            if (!$gameSwitches.value(_switch18AID) ) {               
                this.isUnitDead(_switch18AID, $gameVariables.value(_var18AID));
            };
//----19.ID:

            if (!$gameSwitches.value(_switch19AID) ) {               
                this.isUnitDead(_switch19AID, $gameVariables.value(_var19AID));
            };
//----20.ID:

            if (!$gameSwitches.value(_switch20AID) ) {               
                this.isUnitDead(_switch20AID, $gameVariables.value(_var20AID));
            };
//----21.ID:

            if (!$gameSwitches.value(_switch21AID) ) {               
                this.isUnitDead(_switch21AID, $gameVariables.value(_var21AID));
            };
//----22.ID:

            if (!$gameSwitches.value(_switch22AID) ) {               
                this.isUnitDead(_switch22AID, $gameVariables.value(_var22AID));
            };
//----23.ID:

            if (!$gameSwitches.value(_switch23AID) ) {               
                this.isUnitDead(_switch23AID, $gameVariables.value(_var23AID));
            };
//----24.ID:

            if (!$gameSwitches.value(_switch24AID) ) {               
                this.isUnitDead(_switch24AID, $gameVariables.value(_var24AID));
            };
//----25.ID:

            if (!$gameSwitches.value(_switch25AID) ) {               
                this.isUnitDead(_switch25AID, $gameVariables.value(_var25AID));
            };
//----26.ID:

            if (!$gameSwitches.value(_switch26AID) ) {               
                this.isUnitDead(_switch26AID, $gameVariables.value(_var26AID));
            };
//----27.ID:

            if (!$gameSwitches.value(_switch27AID) ) {               
                this.isUnitDead(_switch27AID, $gameVariables.value(_var27AID));
            };
//----28.ID:

            if (!$gameSwitches.value(_switch28AID) ) {               
                this.isUnitDead(_switch28AID, $gameVariables.value(_var28AID));
            };
//----29.ID:

            if (!$gameSwitches.value(_switch29AID) ) {               
                this.isUnitDead(_switch29AID, $gameVariables.value(_var29AID));
            };
//----30.ID:

            if (!$gameSwitches.value(_switch30AID) ) {               
                this.isUnitDead(_switch30AID, $gameVariables.value(_var30AID));
            };
//----31.ID:

            if (!$gameSwitches.value(_switch31AID) ) {               
                this.isUnitDead(_switch31AID, $gameVariables.value(_var31AID));
            };
//----32.ID:

            if (!$gameSwitches.value(_switch32AID) ) {               
                this.isUnitDead(_switch32AID, $gameVariables.value(_var32AID));
            };
//----33.ID:

            if (!$gameSwitches.value(_switch33AID) ) {               
                this.isUnitDead(_switch33AID, $gameVariables.value(_var33AID));
            };
//----34.ID:

            if (!$gameSwitches.value(_switch34AID) ) {               
                this.isUnitDead(_switch34AID, $gameVariables.value(_var34AID));
            };
//----35.ID:

            if (!$gameSwitches.value(_switch35AID) ) {               
                this.isUnitDead(_switch35AID, $gameVariables.value(_var35AID));
            };
//----36.ID:

            if (!$gameSwitches.value(_switch36AID) ) {               
                this.isUnitDead(_switch36AID, $gameVariables.value(_var36AID));
            };
//----37.ID:

            if (!$gameSwitches.value(_switch37AID) ) {               
                this.isUnitDead(_switch37AID, $gameVariables.value(_var37AID));
            };
//----38.ID:

            if (!$gameSwitches.value(_switch38AID) ) {               
                this.isUnitDead(_switch38AID, $gameVariables.value(_var38AID));
            };
//----39.ID:

            if (!$gameSwitches.value(_switch39AID) ) {               
                this.isUnitDead(_switch39AID, $gameVariables.value(_var39AID));
            };
//----40.ID:

            if (!$gameSwitches.value(_switch40AID) ) {               
                this.isUnitDead(_switch40AID, $gameVariables.value(_var40AID));
            };
//----41.ID:

            if (!$gameSwitches.value(_switch41AID) ) {               
                this.isUnitDead(_switch41AID, $gameVariables.value(_var41AID));
            };
//----42.ID:

            if (!$gameSwitches.value(_switch42AID) ) {               
                this.isUnitDead(_switch42AID, $gameVariables.value(_var42AID));
            };
//----43.ID:

            if (!$gameSwitches.value(_switch43AID) ) {               
                this.isUnitDead(_switch43AID, $gameVariables.value(_var43AID));
            };
//----44.ID:

            if (!$gameSwitches.value(_switch44AID) ) {               
                this.isUnitDead(_switch44AID, $gameVariables.value(_var44AID));
            };
//----45.ID:

            if (!$gameSwitches.value(_switch45AID) ) {               
                this.isUnitDead(_switch45AID, $gameVariables.value(_var45AID));
            };
//----46.ID:

            if (!$gameSwitches.value(_switch46AID) ) {               
                this.isUnitDead(_switch46AID, $gameVariables.value(_var46AID));
            };
//----47.ID:

            if (!$gameSwitches.value(_switch47AID) ) {               
                this.isUnitDead(_switch47AID, $gameVariables.value(_var47AID));
            };
//----48.ID:

            if (!$gameSwitches.value(_switch48AID) ) {               
                this.isUnitDead(_switch48AID, $gameVariables.value(_var48AID));
            };
//----49.ID:

            if (!$gameSwitches.value(_switch49AID) ) {               
                this.isUnitDead(_switch49AID, $gameVariables.value(_var49AID));
            };
//----50.ID:

            if (!$gameSwitches.value(_switch50AID) ) {               
                this.isUnitDead(_switch50AID, $gameVariables.value(_var50AID));
            };
//----51.ID:

            if (!$gameSwitches.value(_switch51AID) ) {               
                this.isUnitDead(_switch51AID, $gameVariables.value(_var51AID));
            };
//----52.ID:

            if (!$gameSwitches.value(_switch52AID) ) {               
                this.isUnitDead(_switch52AID, $gameVariables.value(_var52AID));
            };
//----53.ID:

            if (!$gameSwitches.value(_switch53AID) ) {               
                this.isUnitDead(_switch53AID, $gameVariables.value(_var53AID));
            };
//----54.ID:

            if (!$gameSwitches.value(_switch54AID) ) {               
                this.isUnitDead(_switch54AID, $gameVariables.value(_var54AID));
            };
//----55.ID:

            if (!$gameSwitches.value(_switch55AID) ) {               
                this.isUnitDead(_switch55AID, $gameVariables.value(_var55AID));
            };
//----56.ID:

            if (!$gameSwitches.value(_switch56AID) ) {               
                this.isUnitDead(_switch56AID, $gameVariables.value(_var56AID));
            };
//----57.ID:

            if (!$gameSwitches.value(_switch57AID) ) {               
                this.isUnitDead(_switch57AID, $gameVariables.value(_var57AID));
            };
//----58.ID:

            if (!$gameSwitches.value(_switch58AID) ) {               
                this.isUnitDead(_switch58AID, $gameVariables.value(_var58AID));
            };
//----59.ID:

            if (!$gameSwitches.value(_switch59AID) ) {               
                this.isUnitDead(_switch59AID, $gameVariables.value(_var59AID));
            };
//----60.ID:

            if (!$gameSwitches.value(_switch60AID) ) {               
                this.isUnitDead(_switch60AID, $gameVariables.value(_var60AID));
            };
//----61.ID:

            if (!$gameSwitches.value(_switch61AID) ) {               
                this.isUnitDead(_switch61AID, $gameVariables.value(_var61AID));
            };
//----62.ID:

            if (!$gameSwitches.value(_switch62AID) ) {               
                this.isUnitDead(_switch62AID, $gameVariables.value(_var62AID));
            };
//----63.ID:

            if (!$gameSwitches.value(_switch63AID) ) {               
                this.isUnitDead(_switch63AID, $gameVariables.value(_var63AID));
            };
//----64.ID:

            if (!$gameSwitches.value(_switch64AID) ) {               
                this.isUnitDead(_switch64AID, $gameVariables.value(_var64AID));
            };
//----65.ID:

            if (!$gameSwitches.value(_switch65AID) ) {               
                this.isUnitDead(_switch65AID, $gameVariables.value(_var65AID));
            };
//----66.ID:

            if (!$gameSwitches.value(_switch66AID) ) {               
                this.isUnitDead(_switch66AID, $gameVariables.value(_var66AID));
            };
//----67.ID:

            if (!$gameSwitches.value(_switch67AID) ) {               
                this.isUnitDead(_switch67AID, $gameVariables.value(_var67AID));
            };
//----68.ID:

            if (!$gameSwitches.value(_switch68AID) ) {               
                this.isUnitDead(_switch68AID, $gameVariables.value(_var68AID));
            };
//----69.ID:

            if (!$gameSwitches.value(_switch69AID) ) {               
                this.isUnitDead(_switch69AID, $gameVariables.value(_var69AID));
            };
//----70.ID:

            if (!$gameSwitches.value(_switch70AID) ) {               
                this.isUnitDead(_switch70AID, $gameVariables.value(_var70AID));
            };
//----71.ID:

            if (!$gameSwitches.value(_switch71AID) ) {               
                this.isUnitDead(_switch71AID, $gameVariables.value(_var71AID));
            };
//----72.ID:

            if (!$gameSwitches.value(_switch72AID) ) {               
                this.isUnitDead(_switch72AID, $gameVariables.value(_var72AID));
            };
//----73.ID:

            if (!$gameSwitches.value(_switch73AID) ) {               
                this.isUnitDead(_switch73AID, $gameVariables.value(_var73AID));
            };
//----74.ID:

            if (!$gameSwitches.value(_switch74AID) ) {               
                this.isUnitDead(_switch74AID, $gameVariables.value(_var74AID));
            };
//----75.ID:

            if (!$gameSwitches.value(_switch75AID) ) {               
                this.isUnitDead(_switch75AID, $gameVariables.value(_var75AID));
            };
//----76.ID:

            if (!$gameSwitches.value(_switch76AID) ) {               
                this.isUnitDead(_switch76AID, $gameVariables.value(_var76AID));
            };
//----77.ID:

            if (!$gameSwitches.value(_switch77AID) ) {               
                this.isUnitDead(_switch77AID, $gameVariables.value(_var77AID));
            };
//----78.ID:

            if (!$gameSwitches.value(_switch78AID) ) {               
                this.isUnitDead(_switch78AID, $gameVariables.value(_var78AID));
            };
//----79.ID:

            if (!$gameSwitches.value(_switch79AID) ) {               
                this.isUnitDead(_switch79AID, $gameVariables.value(_var79AID));
            };
//----80.ID:

            if (!$gameSwitches.value(_switch80AID) ) {               
                this.isUnitDead(_switch80AID, $gameVariables.value(_var80AID));
            };
//----81.ID:

            if (!$gameSwitches.value(_switch81AID) ) {               
                this.isUnitDead(_switch81AID, $gameVariables.value(_var81AID));
            };
//----82.ID:

            if (!$gameSwitches.value(_switch82AID) ) {               
                this.isUnitDead(_switch82AID, $gameVariables.value(_var82AID));
            };
//----83.ID:

            if (!$gameSwitches.value(_switch83AID) ) {               
                this.isUnitDead(_switch83AID, $gameVariables.value(_var83AID));
            };
//----84.ID:

            if (!$gameSwitches.value(_switch84AID) ) {               
                this.isUnitDead(_switch84AID, $gameVariables.value(_var84AID));
            };
//----85.ID:

            if (!$gameSwitches.value(_switch85AID) ) {               
                this.isUnitDead(_switch85AID, $gameVariables.value(_var85AID));
            };
//----86.ID:

            if (!$gameSwitches.value(_switch86AID) ) {               
                this.isUnitDead(_switch86AID, $gameVariables.value(_var86AID));
            };
//----87.ID:

            if (!$gameSwitches.value(_switch87AID) ) {               
                this.isUnitDead(_switch87AID, $gameVariables.value(_var87AID));
            };
//----88.ID:

            if (!$gameSwitches.value(_switch88AID) ) {               
                this.isUnitDead(_switch88AID, $gameVariables.value(_var88AID));
            };
//----89.ID:

            if (!$gameSwitches.value(_switch89AID) ) {               
                this.isUnitDead(_switch89AID, $gameVariables.value(_var89AID));
            };
//----90.ID:

            if (!$gameSwitches.value(_switch90AID) ) {               
                this.isUnitDead(_switch90AID, $gameVariables.value(_var90AID));
            };
//----91.ID:

            if (!$gameSwitches.value(_switch91AID) ) {               
                this.isUnitDead(_switch91AID, $gameVariables.value(_var91AID));
            };
//----92.ID:

            if (!$gameSwitches.value(_switch92AID) ) {               
                this.isUnitDead(_switch92AID, $gameVariables.value(_var92AID));
            };
//----93.ID:

            if (!$gameSwitches.value(_switch93AID) ) {               
                this.isUnitDead(_switch93AID, $gameVariables.value(_var93AID));
            };
//----94.ID:

            if (!$gameSwitches.value(_switch94AID) ) {               
                this.isUnitDead(_switch94AID, $gameVariables.value(_var94AID));
            };
//----95.ID:

            if (!$gameSwitches.value(_switch95AID) ) {               
                this.isUnitDead(_switch95AID, $gameVariables.value(_var95AID));
            };
//----96.ID:

            if (!$gameSwitches.value(_switch96AID) ) {               
                this.isUnitDead(_switch96AID, $gameVariables.value(_var96AID));
            };
//----97.ID:

            if (!$gameSwitches.value(_switch97AID) ) {               
                this.isUnitDead(_switch97AID, $gameVariables.value(_var97AID));
            };
//----98.ID:

            if (!$gameSwitches.value(_switch98AID) ) {               
                this.isUnitDead(_switch98AID, $gameVariables.value(_var98AID));
            };
//----99.ID:

            if (!$gameSwitches.value(_switch99AID) ) {               
                this.isUnitDead(_switch99AID, $gameVariables.value(_var99AID));
            };
//---100.ID:

            if (!$gameSwitches.value(_switch100AID) ) {               
                this.isUnitDead(_switch100AID, $gameVariables.value(_var100AID));
            };

//--..End:

         };


//--------------------------------------------------------------------------------------------

//Checks Value of the Variables that store  Actor-event-IDs ,if Value more than 0 set Disable Unit Switch to "false"

     // => "this.allAxCheckValue()"
     Game_Interpreter.prototype.allAxCheckValue = function() {

//-----1.ID:

            if (($gameVariables.value(_var1AID) > 0 ) && ($gameSwitches.value(_switch1AID))) {               
                 $gameSwitches.setValue(_switch1AID, false);
            };
//-----2.ID:

            if (($gameVariables.value(_var2AID) > 0 ) && ($gameSwitches.value(_switch2AID))) {               
                 $gameSwitches.setValue(_switch2AID, false);
            };
//-----3.ID:

            if (($gameVariables.value(_var3AID) > 0 ) && ($gameSwitches.value(_switch3AID))) {               
                 $gameSwitches.setValue(_switch3AID, false);
            };
//-----4.ID:

            if (($gameVariables.value(_var4AID) > 0 ) && ($gameSwitches.value(_switch4AID))) {               
                 $gameSwitches.setValue(_switch4AID, false);
            };
//-----5.ID:

            if (($gameVariables.value(_var5AID) > 0 ) && ($gameSwitches.value(_switch5AID))) {               
                 $gameSwitches.setValue(_switch5AID, false);
            };
//-----6.ID:

            if (($gameVariables.value(_var6AID) > 0 ) && ($gameSwitches.value(_switch6AID))) {               
                 $gameSwitches.setValue(_switch6AID, false);
            };
//-----7.ID:

            if (($gameVariables.value(_var7AID) > 0 ) && ($gameSwitches.value(_switch7AID))) {               
                 $gameSwitches.setValue(_switch7AID, false);
            };
//-----8.ID:

            if (($gameVariables.value(_var8AID) > 0 ) && ($gameSwitches.value(_switch8AID))) {               
                 $gameSwitches.setValue(_switch8AID, false);
            };
//-----9.ID:

            if (($gameVariables.value(_var9AID) > 0 ) && ($gameSwitches.value(_switch9AID))) {               
                 $gameSwitches.setValue(_switch9AID, false);
            };
//----10.ID:

            if (($gameVariables.value(_var10AID) > 0 ) && ($gameSwitches.value(_switch10AID))) {               
                 $gameSwitches.setValue(_switch10AID, false);
            };
//----11.ID:

            if (($gameVariables.value(_var11AID) > 0 ) && ($gameSwitches.value(_switch11AID))) {               
                 $gameSwitches.setValue(_switch11AID, false);
            };
//----12.ID:

            if (($gameVariables.value(_var12AID) > 0 ) && ($gameSwitches.value(_switch12AID))) {               
                 $gameSwitches.setValue(_switch12AID, false);
            };
//----13.ID:

            if (($gameVariables.value(_var13AID) > 0 ) && ($gameSwitches.value(_switch13AID))) {               
                 $gameSwitches.setValue(_switch13AID, false);
            };
//----14.ID:

            if (($gameVariables.value(_var14AID) > 0 ) && ($gameSwitches.value(_switch14AID))) {               
                 $gameSwitches.setValue(_switch14AID, false);
            };
//----15.ID:

            if (($gameVariables.value(_var15AID) > 0 ) && ($gameSwitches.value(_switch15AID))) {               
                 $gameSwitches.setValue(_switch15AID, false);
            };
//----16.ID:

            if (($gameVariables.value(_var16AID) > 0 ) && ($gameSwitches.value(_switch16AID))) {               
                 $gameSwitches.setValue(_switch16AID, false);
            };
//----17.ID:

            if (($gameVariables.value(_var17AID) > 0 ) && ($gameSwitches.value(_switch17AID))) {               
                 $gameSwitches.setValue(_switch17AID, false);
            };
//----18.ID:

            if (($gameVariables.value(_var18AID) > 0 ) && ($gameSwitches.value(_switch18AID))) {               
                 $gameSwitches.setValue(_switch18AID, false);
            };
//----19.ID:

            if (($gameVariables.value(_var19AID) > 0 ) && ($gameSwitches.value(_switch19AID))) {               
                 $gameSwitches.setValue(_switch19AID, false);
            };
//----20.ID:

            if (($gameVariables.value(_var20AID) > 0 ) && ($gameSwitches.value(_switch20AID))) {               
                 $gameSwitches.setValue(_switch20AID, false);
            };
//----21.ID:

            if (($gameVariables.value(_var21AID) > 0 ) && ($gameSwitches.value(_switch21AID))) {               
                 $gameSwitches.setValue(_switch21AID, false);
            };
//----22.ID:

            if (($gameVariables.value(_var22AID) > 0 ) && ($gameSwitches.value(_switch22AID))) {               
                 $gameSwitches.setValue(_switch22AID, false);
            };
//----23.ID:

            if (($gameVariables.value(_var23AID) > 0 ) && ($gameSwitches.value(_switch23AID))) {               
                 $gameSwitches.setValue(_switch23AID, false);
            };
//----24.ID:

            if (($gameVariables.value(_var24AID) > 0 ) && ($gameSwitches.value(_switch24AID))) {               
                 $gameSwitches.setValue(_switch24AID, false);
            };
//----25.ID:

            if (($gameVariables.value(_var25AID) > 0 ) && ($gameSwitches.value(_switch25AID))) {               
                 $gameSwitches.setValue(_switch25AID, false);
            };
//----26.ID:

            if (($gameVariables.value(_var26AID) > 0 ) && ($gameSwitches.value(_switch26AID))) {               
                 $gameSwitches.setValue(_switch26AID, false);
            };
//----27.ID:

            if (($gameVariables.value(_var27AID) > 0 ) && ($gameSwitches.value(_switch27AID))) {               
                 $gameSwitches.setValue(_switch27AID, false);
            };
//----28.ID:

            if (($gameVariables.value(_var28AID) > 0 ) && ($gameSwitches.value(_switch28AID))) {               
                 $gameSwitches.setValue(_switch28AID, false);
            };
//----29.ID:

            if (($gameVariables.value(_var29AID) > 0 ) && ($gameSwitches.value(_switch29AID))) {               
                 $gameSwitches.setValue(_switch29AID, false);
            };
//----30.ID:

            if (($gameVariables.value(_var30AID) > 0 ) && ($gameSwitches.value(_switch30AID))) {               
                 $gameSwitches.setValue(_switch30AID, false);
            };
//----31.ID:

            if (($gameVariables.value(_var31AID) > 0 ) && ($gameSwitches.value(_switch31AID))) {               
                 $gameSwitches.setValue(_switch31AID, false);
            };
//----32.ID:

            if (($gameVariables.value(_var32AID) > 0 ) && ($gameSwitches.value(_switch32AID))) {               
                 $gameSwitches.setValue(_switch32AID, false);
            };
//----33.ID:

            if (($gameVariables.value(_var33AID) > 0 ) && ($gameSwitches.value(_switch33AID))) {               
                 $gameSwitches.setValue(_switch33AID, false);
            };
//----34.ID:

            if (($gameVariables.value(_var34AID) > 0 ) && ($gameSwitches.value(_switch34AID))) {               
                 $gameSwitches.setValue(_switch34AID, false);
            };
//----35.ID:

            if (($gameVariables.value(_var35AID) > 0 ) && ($gameSwitches.value(_switch35AID))) {               
                 $gameSwitches.setValue(_switch35AID, false);
            };
//----36.ID:

            if (($gameVariables.value(_var36AID) > 0 ) && ($gameSwitches.value(_switch36AID))) {               
                 $gameSwitches.setValue(_switch36AID, false);
            };
//----37.ID:

            if (($gameVariables.value(_var37AID) > 0 ) && ($gameSwitches.value(_switch37AID))) {               
                 $gameSwitches.setValue(_switch37AID, false);
            };
//----38.ID:

            if (($gameVariables.value(_var38AID) > 0 ) && ($gameSwitches.value(_switch38AID))) {               
                 $gameSwitches.setValue(_switch38AID, false);
            };
//----39.ID:

            if (($gameVariables.value(_var39AID) > 0 ) && ($gameSwitches.value(_switch39AID))) {               
                 $gameSwitches.setValue(_switch39AID, false);
            };
//----40.ID:

            if (($gameVariables.value(_var40AID) > 0 ) && ($gameSwitches.value(_switch40AID))) {               
                 $gameSwitches.setValue(_switch40AID, false);
            };
//----41.ID:

            if (($gameVariables.value(_var41AID) > 0 ) && ($gameSwitches.value(_switch41AID))) {               
                 $gameSwitches.setValue(_switch41AID, false);
            };
//----42.ID:

            if (($gameVariables.value(_var42AID) > 0 ) && ($gameSwitches.value(_switch42AID))) {               
                 $gameSwitches.setValue(_switch42AID, false);
            };
//----43.ID:

            if (($gameVariables.value(_var43AID) > 0 ) && ($gameSwitches.value(_switch43AID))) {               
                 $gameSwitches.setValue(_switch43AID, false);
            };
//----44.ID:

            if (($gameVariables.value(_var44AID) > 0 ) && ($gameSwitches.value(_switch44AID))) {               
                 $gameSwitches.setValue(_switch44AID, false);
            };
//----45.ID:

            if (($gameVariables.value(_var45AID) > 0 ) && ($gameSwitches.value(_switch45AID))) {               
                 $gameSwitches.setValue(_switch45AID, false);
            };
//----46.ID:

            if (($gameVariables.value(_var46AID) > 0 ) && ($gameSwitches.value(_switch46AID))) {               
                 $gameSwitches.setValue(_switch46AID, false);
            };
//----47.ID:

            if (($gameVariables.value(_var47AID) > 0 ) && ($gameSwitches.value(_switch47AID))) {               
                 $gameSwitches.setValue(_switch47AID, false);
            };
//----48.ID:

            if (($gameVariables.value(_var48AID) > 0 ) && ($gameSwitches.value(_switch48AID))) {               
                 $gameSwitches.setValue(_switch48ID, false);
            };
//----49.ID:

            if (($gameVariables.value(_var49AID) > 0 ) && ($gameSwitches.value(_switch49AID))) {               
                 $gameSwitches.setValue(_switch49AID, false);
            };
//----50.ID:

            if (($gameVariables.value(_var50AID) > 0 ) && ($gameSwitches.value(_switch50AID))) {               
                 $gameSwitches.setValue(_switch50AID, false);
            };
//----51.ID:

            if (($gameVariables.value(_var51AID) > 0 ) && ($gameSwitches.value(_switch51AID))) {               
                 $gameSwitches.setValue(_switch51AID, false);
            };
//----52.ID:

            if (($gameVariables.value(_var52AID) > 0 ) && ($gameSwitches.value(_switch52AID))) {               
                 $gameSwitches.setValue(_switch52AID, false);
            };
//----53.ID:

            if (($gameVariables.value(_var53AID) > 0 ) && ($gameSwitches.value(_switch53AID))) {               
                 $gameSwitches.setValue(_switch53AID, false);
            };
//----54.ID:

            if (($gameVariables.value(_var54AID) > 0 ) && ($gameSwitches.value(_switch54AID))) {               
                 $gameSwitches.setValue(_switch54AID, false);
            };
//----55.ID:

            if (($gameVariables.value(_var55AID) > 0 ) && ($gameSwitches.value(_switch55AID))) {               
                 $gameSwitches.setValue(_switch55AID, false);
            };
//----56.ID:

            if (($gameVariables.value(_var56AID) > 0 ) && ($gameSwitches.value(_switch56AID))) {               
                 $gameSwitches.setValue(_switch56AID, false);
            };
//----57.ID:

            if (($gameVariables.value(_var57AID) > 0 ) && ($gameSwitches.value(_switch57AID))) {               
                 $gameSwitches.setValue(_switch57AID, false);
            };
//----58.ID:

            if (($gameVariables.value(_var58AID) > 0 ) && ($gameSwitches.value(_switch58AID))) {               
                 $gameSwitches.setValue(_switch58AID, false);
            };
//----59.ID:

            if (($gameVariables.value(_var59AID) > 0 ) && ($gameSwitches.value(_switch59AID))) {               
                 $gameSwitches.setValue(_switch59AID, false);
            };
//----60.ID:

            if (($gameVariables.value(_var60AID) > 0 ) && ($gameSwitches.value(_switch60AID))) {               
                 $gameSwitches.setValue(_switch60AID, false);
            };
//----61.ID:

            if (($gameVariables.value(_var61AID) > 0 ) && ($gameSwitches.value(_switch61AID))) {               
                 $gameSwitches.setValue(_switch61AID, false);
            };
//----62.ID:

            if (($gameVariables.value(_var62AID) > 0 ) && ($gameSwitches.value(_switch62AID))) {               
                 $gameSwitches.setValue(_switch62AID, false);
            };
//----63.ID:

            if (($gameVariables.value(_var63AID) > 0 ) && ($gameSwitches.value(_switch63AID))) {               
                 $gameSwitches.setValue(_switch63AID, false);
            };
//----64.ID:

            if (($gameVariables.value(_var64AID) > 0 ) && ($gameSwitches.value(_switch64AID))) {               
                 $gameSwitches.setValue(_switch64AID, false);
            };
//----65.ID:

            if (($gameVariables.value(_var65AID) > 0 ) && ($gameSwitches.value(_switch65AID))) {               
                 $gameSwitches.setValue(_switch65AID, false);
            };
//----66.ID:

            if (($gameVariables.value(_var66AID) > 0 ) && ($gameSwitches.value(_switch66AID))) {               
                 $gameSwitches.setValue(_switch66AID, false);
            };
//----67.ID:

            if (($gameVariables.value(_var67AID) > 0 ) && ($gameSwitches.value(_switch67AID))) {               
                 $gameSwitches.setValue(_switch67AID, false);
            };
//----68.ID:

            if (($gameVariables.value(_var68AID) > 0 ) && ($gameSwitches.value(_switch68AID))) {               
                 $gameSwitches.setValue(_switch68AID, false);
            };
//----69.ID:

            if (($gameVariables.value(_var69AID) > 0 ) && ($gameSwitches.value(_switch69AID))) {               
                 $gameSwitches.setValue(_switch69AID, false);
            };
//----70.ID:

            if (($gameVariables.value(_var70AID) > 0 ) && ($gameSwitches.value(_switch70AID))) {               
                 $gameSwitches.setValue(_switch70AID, false);
            };
//----71.ID:

            if (($gameVariables.value(_var71AID) > 0 ) && ($gameSwitches.value(_switch71AID))) {               
                 $gameSwitches.setValue(_switch71AID, false);
            };
//----72.ID:

            if (($gameVariables.value(_var72AID) > 0 ) && ($gameSwitches.value(_switch72AID))) {               
                 $gameSwitches.setValue(_switch72AID, false);
            };
//----73.ID:

            if (($gameVariables.value(_var73AID) > 0 ) && ($gameSwitches.value(_switch73AID))) {               
                 $gameSwitches.setValue(_switch73AID, false);
            };
//----74.ID:

            if (($gameVariables.value(_var74AID) > 0 ) && ($gameSwitches.value(_switch74AID))) {               
                 $gameSwitches.setValue(_switch74AID, false);
            };
//----75.ID:

            if (($gameVariables.value(_var75AID) > 0 ) && ($gameSwitches.value(_switch75AID))) {               
                 $gameSwitches.setValue(_switch75AID, false);
            };
//----76.ID:

            if (($gameVariables.value(_var76AID) > 0 ) && ($gameSwitches.value(_switch76AID))) {               
                 $gameSwitches.setValue(_switch76AID, false);
            };
//----77.ID:

            if (($gameVariables.value(_var77AID) > 0 ) && ($gameSwitches.value(_switch77AID))) {               
                 $gameSwitches.setValue(_switch77AID, false);
            };
//----78.ID:

            if (($gameVariables.value(_var78AID) > 0 ) && ($gameSwitches.value(_switch78AID))) {               
                 $gameSwitches.setValue(_switch78AID, false);
            };
//----79.ID:

            if (($gameVariables.value(_var79AID) > 0 ) && ($gameSwitches.value(_switch79AID))) {               
                 $gameSwitches.setValue(_switch79AID, false);
            };
//----80.ID:

            if (($gameVariables.value(_var80AID) > 0 ) && ($gameSwitches.value(_switch80AID))) {               
                 $gameSwitches.setValue(_switch80AID, false);
            };
//----81.ID:

            if (($gameVariables.value(_var81AID) > 0 ) && ($gameSwitches.value(_switch81AID))) {               
                 $gameSwitches.setValue(_switch81AID, false);
            };
//----82.ID:

            if (($gameVariables.value(_var82AID) > 0 ) && ($gameSwitches.value(_switch82AID))) {               
                 $gameSwitches.setValue(_switch82AID, false);
            };
//----83.ID:

            if (($gameVariables.value(_var83AID) > 0 ) && ($gameSwitches.value(_switch83AID))) {               
                 $gameSwitches.setValue(_switch83AID, false);
            };
//----84.ID:

            if (($gameVariables.value(_var84AID) > 0 ) && ($gameSwitches.value(_switch84AID))) {               
                 $gameSwitches.setValue(_switch84AID, false);
            };
//----85.ID:

            if (($gameVariables.value(_var85AID) > 0 ) && ($gameSwitches.value(_switch85AID))) {               
                 $gameSwitches.setValue(_switch85AID, false);
            };
//----86.ID:

            if (($gameVariables.value(_var86AID) > 0 ) && ($gameSwitches.value(_switch86AID))) {               
                 $gameSwitches.setValue(_switch86AID, false);
            };
//----87.ID:

            if (($gameVariables.value(_var87AID) > 0 ) && ($gameSwitches.value(_switch87AID))) {               
                 $gameSwitches.setValue(_switch87AID, false);
            };
//----88.ID:

            if (($gameVariables.value(_var88AID) > 0 ) && ($gameSwitches.value(_switch88AID))) {               
                 $gameSwitches.setValue(_switch88AID, false);
            };
//----89.ID:

            if (($gameVariables.value(_var89AID) > 0 ) && ($gameSwitches.value(_switch89AID))) {               
                 $gameSwitches.setValue(_switch89AID, false);
            };
//----90.ID:

            if (($gameVariables.value(_var90AID) > 0 ) && ($gameSwitches.value(_switch90AID))) {               
                 $gameSwitches.setValue(_switch90AID, false);
            };
//----91.ID:

            if (($gameVariables.value(_var91AID) > 0 ) && ($gameSwitches.value(_switch91AID))) {               
                 $gameSwitches.setValue(_switch91AID, false);
            };
//----92.ID:

            if (($gameVariables.value(_var92AID) > 0 ) && ($gameSwitches.value(_switch92AID))) {               
                 $gameSwitches.setValue(_switch92AID, false);
            };
//----93.ID:

            if (($gameVariables.value(_var93AID) > 0 ) && ($gameSwitches.value(_switch93AID))) {               
                 $gameSwitches.setValue(_switch93AID, false);
            };
//----94.ID:

            if (($gameVariables.value(_var94AID) > 0 ) && ($gameSwitches.value(_switch94AID))) {               
                 $gameSwitches.setValue(_switch94ID, false);
            };
//----95.ID:

            if (($gameVariables.value(_var95AID) > 0 ) && ($gameSwitches.value(_switch95AID))) {               
                 $gameSwitches.setValue(_switch95AID, false);
            };
//----96.ID:

            if (($gameVariables.value(_var96AID) > 0 ) && ($gameSwitches.value(_switch96AID))) {               
                 $gameSwitches.setValue(_switch96AID, false);
            };
//----97.ID:

            if (($gameVariables.value(_var97AID) > 0 ) && ($gameSwitches.value(_switch97AID))) {               
                 $gameSwitches.setValue(_switch97AID, false);
            };
//----98.ID:

            if (($gameVariables.value(_var98AID) > 0 ) && ($gameSwitches.value(_switch98AID))) {               
                 $gameSwitches.setValue(_switch98AID, false);
            };
//----99.ID:

            if (($gameVariables.value(_var99AID) > 0 ) && ($gameSwitches.value(_switch99AID))) {               
                 $gameSwitches.setValue(_switch99AID, false);
            };
//---100.ID:

            if (($gameVariables.value(_var100AID) > 0 ) && ($gameSwitches.value(_switch100AID))) {               
                 $gameSwitches.setValue(_switch100AID, false);
            };
//--..End:
         };


//-- next function-->(...)

//--------------------------------------------------------------------------------------------$gameActors.actor(aid)._actorId

// sets Event Ids of All Actors(max 100) to the Variables from SRPG_ActorUnits.js-Param,if _switchAID"true".

// Scriptcall used => "this.allAxSetEventID();"
        Game_Interpreter.prototype.allAxSetEventID = function() {
            for (var i = 1; i <= $gameMap.events().length; i++) {                           
                      var battleunit = $gameSystem.EventToUnit([i]);
                      var eventunit = $gameMap.event([i]);                         
                           if (battleunit && eventunit && (battleunit[0] === 'actor')) {
                               var actorunit = 1; actorunit === battleunit[1]._actorId;

                               if (actorunit === 1) {
                                   if (($gameSwitches.value(_switch1AID)) && ($gameVariables.value(_var1AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var1AID), eventunit._eventId); $gameSwitches.setValue((_var1AID), false)
                                   }                       
                               }
                               if (actorunit === 2) {
                                   if (($gameSwitches.value(_switch2AID)) && ($gameVariables.value(_var2AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var2AID), eventunit._eventId); $gameSwitches.setValue((_var2AID), false)
                                   } 
                               }
                               if (actorunit === 3) {
                                   if (($gameSwitches.value(_switch3AID)) && ($gameVariables.value(_var3AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var3AID), eventunit._eventId); $gameSwitches.setValue((_var3AID), false)
                                   }                      
                               }
                               if (actorunit === 4) {
                                   if (($gameSwitches.value(_switch4AID)) && ($gameVariables.value(_var4AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var4AID), eventunit._eventId); $gameSwitches.setValue((_var4AID), false)
                                   } 
                               }
                               if (actorunit === 5) {
                                   if (($gameSwitches.value(_switch5AID)) && ($gameVariables.value(_var5AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var5AID), eventunit._eventId); $gameSwitches.setValue((_var5AID), false)
                                   }                       
                               }
                               if (actorunit === 6) {
                                   if (($gameSwitches.value(_switch6AID)) && ($gameVariables.value(_var6AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var6AID), eventunit._eventId); $gameSwitches.setValue((_var6AID), false)
                                   } 
                               }
                               if (actorunit === 7) {
                                   if (($gameSwitches.value(_switch7AID)) && ($gameVariables.value(_var7AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var7AID), eventunit._eventId); $gameSwitches.setValue((_var7AID), false)
                                   }                        
                               }
                               if (actorunit === 8) {
                                   if (($gameSwitches.value(_switch8AID)) && ($gameVariables.value(_var8AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var8AID), eventunit._eventId); $gameSwitches.setValue((_var8AID), false)
                                   } 
                               }
                               if (actorunit === 9) {
                                   if (($gameSwitches.value(_switch9AID)) && ($gameVariables.value(_var9AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var9AID), eventunit._eventId); $gameSwitches.setValue((_var9AID), false)
                                   }                       
                               }
                               if (actorunit === 10) {
                                   if (($gameSwitches.value(_switch10AID)) && ($gameVariables.value(_var10AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var10AID), eventunit._eventId); $gameSwitches.setValue((_var10AID), false)
                                   } 
                               }
                               if (actorunit === 11) {
                                   if (($gameSwitches.value(_switch11AID)) && ($gameVariables.value(_var11AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var11AID), eventunit._eventId); $gameSwitches.setValue((_var11AID), false)
                                   }                       
                               }
                               if (actorunit === 12) {
                                   if (($gameSwitches.value(_switch12AID)) && ($gameVariables.value(_var12AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var12AID), eventunit._eventId); $gameSwitches.setValue((_var12AID), false)
                                   } 
                               }
                               if (actorunit === 13) {
                                   if (($gameSwitches.value(_switch13AID)) && ($gameVariables.value(_var13AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var13AID), eventunit._eventId); $gameSwitches.setValue((_var13AID), false)
                                   }                      
                               }
                               if (actorunit === 14) {
                                   if (($gameSwitches.value(_switch14AID)) && ($gameVariables.value(_var14AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var14AID), eventunit._eventId); $gameSwitches.setValue((_var14AID), false)
                                   } 
                               }
                               if (actorunit === 15) {
                                   if (($gameSwitches.value(_switch15AID)) && ($gameVariables.value(_var15AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var15AID), eventunit._eventId); $gameSwitches.setValue((_var15AID), false)
                                   }                       
                               }
                               if (actorunit === 16) {
                                   if (($gameSwitches.value(_switch16AID)) && ($gameVariables.value(_var16AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var16AID), eventunit._eventId); $gameSwitches.setValue((_var16AID), false)
                                   } 
                               }
                               if (actorunit === 17) {
                                   if (($gameSwitches.value(_switch17AID)) && ($gameVariables.value(_var17AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var17AID), eventunit._eventId); $gameSwitches.setValue((_var17AID), false)
                                   }                        
                               }
                               if (actorunit === 18) {
                                   if (($gameSwitches.value(_switch18AID)) && ($gameVariables.value(_var18AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var18AID), eventunit._eventId); $gameSwitches.setValue((_var18AID), false)
                                   } 
                               }
                               if (actorunit === 19) {
                                   if (($gameSwitches.value(_switch19AID)) && ($gameVariables.value(_var19AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var19AID), eventunit._eventId); $gameSwitches.setValue((_var19AID), false)
                                   }                       
                               }
                               if (actorunit === 20) {
                                   if (($gameSwitches.value(_switch20AID)) && ($gameVariables.value(_var20AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var20AID), eventunit._eventId); $gameSwitches.setValue((_var20AID), false)
                                   } 
                               }
                               if (actorunit === 21) {
                                   if (($gameSwitches.value(_switch21AID)) && ($gameVariables.value(_var21AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var21AID), eventunit._eventId); $gameSwitches.setValue((_var21AID), false)
                                   }                       
                               }
                               if (actorunit === 22) {
                                   if (($gameSwitches.value(_switch22AID)) && ($gameVariables.value(_var22AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var22AID), eventunit._eventId); $gameSwitches.setValue((_var22AID), false)
                                   } 
                               }
                               if (actorunit === 23) {
                                   if (($gameSwitches.value(_switch23AID)) && ($gameVariables.value(_var23AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var23AID), eventunit._eventId); $gameSwitches.setValue((_var23AID), false)
                                   }                      
                               }
                               if (actorunit === 24) {
                                   if (($gameSwitches.value(_switch24AID)) && ($gameVariables.value(_var24AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var24AID), eventunit._eventId); $gameSwitches.setValue((_var24AID), false)
                                   } 
                               }
                               if (actorunit === 25) {
                                   if (($gameSwitches.value(_switch25AID)) && ($gameVariables.value(_var25AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var25AID), eventunit._eventId); $gameSwitches.setValue((_var25AID), false)
                                   }                       
                               }
                               if (actorunit === 26) {
                                   if (($gameSwitches.value(_switch26AID)) && ($gameVariables.value(_var26AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var26AID), eventunit._eventId); $gameSwitches.setValue((_var26AID), false)
                                   } 
                               }
                               if (actorunit === 27) {
                                   if (($gameSwitches.value(_switch27AID)) && ($gameVariables.value(_var27AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var27AID), eventunit._eventId); $gameSwitches.setValue((_var27AID), false)
                                   }                        
                               }
                               if (actorunit === 28) {
                                   if (($gameSwitches.value(_switch28AID)) && ($gameVariables.value(_var28AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var28AID), eventunit._eventId); $gameSwitches.setValue((_var28AID), false)
                                   } 
                               }
                               if (actorunit === 29) {
                                   if (($gameSwitches.value(_switch29AID)) && ($gameVariables.value(_var29AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var29AID), eventunit._eventId); $gameSwitches.setValue((_var29AID), false)
                                   }                       
                               }
                               if (actorunit === 30) {
                                   if (($gameSwitches.value(_switch30AID)) && ($gameVariables.value(_var30AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var30AID), eventunit._eventId); $gameSwitches.setValue((_var30AID), false)
                                   } 
                               }
                               if (actorunit === 31) {
                                   if (($gameSwitches.value(_switch31AID)) && ($gameVariables.value(_var31AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var31AID), eventunit._eventId); $gameSwitches.setValue((_var31AID), false)
                                   }                       
                               }
                               if (actorunit === 32) {
                                   if (($gameSwitches.value(_switch32AID)) && ($gameVariables.value(_var32AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var32AID), eventunit._eventId); $gameSwitches.setValue((_var32AID), false)
                                   } 
                               }
                               if (actorunit === 33) {
                                   if (($gameSwitches.value(_switch33AID)) && ($gameVariables.value(_var33AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var33AID), eventunit._eventId); $gameSwitches.setValue((_var33AID), false)
                                   }                      
                               }
                               if (actorunit === 34) {
                                   if (($gameSwitches.value(_switch34AID)) && ($gameVariables.value(_var34AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var34AID), eventunit._eventId); $gameSwitches.setValue((_var34AID), false)
                                   } 
                               }
                               if (actorunit === 35) {
                                   if (($gameSwitches.value(_switch35AID)) && ($gameVariables.value(_var35AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var35AID), eventunit._eventId); $gameSwitches.setValue((_var35AID), false)
                                   }                       
                               }
                               if (actorunit === 36) {
                                   if (($gameSwitches.value(_switch36AID)) && ($gameVariables.value(_var36AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var36AID), eventunit._eventId); $gameSwitches.setValue((_var36AID), false)
                                   } 
                               }
                               if (actorunit === 37) {
                                   if (($gameSwitches.value(_switch37AID)) && ($gameVariables.value(_var37AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var37AID), eventunit._eventId); $gameSwitches.setValue((_var37AID), false)
                                   }                        
                               }
                               if (actorunit === 38) {
                                   if (($gameSwitches.value(_switch38AID)) && ($gameVariables.value(_var38AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var38AID), eventunit._eventId); $gameSwitches.setValue((_var38AID), false)
                                   } 
                               }
                               if (actorunit === 39) {
                                   if (($gameSwitches.value(_switch39AID)) && ($gameVariables.value(_var39AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var39AID), eventunit._eventId); $gameSwitches.setValue((_var39AID), false)
                                   }                       
                               }
                               if (actorunit === 40) {
                                   if (($gameSwitches.value(_switch40AID)) && ($gameVariables.value(_var40AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var40AID), eventunit._eventId); $gameSwitches.setValue((_var40AID), false)
                                   } 
                               }
                               if (actorunit === 41) {
                                   if (($gameSwitches.value(_switch41AID)) && ($gameVariables.value(_var41AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var41AID), eventunit._eventId); $gameSwitches.setValue((_var41AID), false)
                                   }                       
                               }
                               if (actorunit === 42) {
                                   if (($gameSwitches.value(_switch42AID)) && ($gameVariables.value(_var42AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var42AID), eventunit._eventId); $gameSwitches.setValue((_var42AID), false)
                                   } 
                               }
                               if (actorunit === 43) {
                                   if (($gameSwitches.value(_switch43AID)) && ($gameVariables.value(_var43AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var43AID), eventunit._eventId); $gameSwitches.setValue((_var43AID), false)
                                   }                      
                               }
                               if (actorunit === 44) {
                                   if (($gameSwitches.value(_switch44AID)) && ($gameVariables.value(_var44AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var44AID), eventunit._eventId); $gameSwitches.setValue((_var44AID), false)
                                   } 
                               }
                               if (actorunit === 45) {
                                   if (($gameSwitches.value(_switch45AID)) && ($gameVariables.value(_var45AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var45AID), eventunit._eventId); $gameSwitches.setValue((_var45AID), false)
                                   }                       
                               }
                               if (actorunit === 46) {
                                   if (($gameSwitches.value(_switch46AID)) && ($gameVariables.value(_var46AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var46AID), eventunit._eventId); $gameSwitches.setValue((_var46AID), false)
                                   } 
                               }
                               if (actorunit === 47) {
                                   if (($gameSwitches.value(_switch47AID)) && ($gameVariables.value(_var47AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var47AID), eventunit._eventId); $gameSwitches.setValue((_var47AID), false)
                                   }                        
                               }
                               if (actorunit === 48) {
                                   if (($gameSwitches.value(_switch48AID)) && ($gameVariables.value(_var48AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var48AID), eventunit._eventId); $gameSwitches.setValue((_var48AID), false)
                                   } 
                               }
                               if (actorunit === 49) {
                                   if (($gameSwitches.value(_switch49AID)) && ($gameVariables.value(_var49AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var49AID), eventunit._eventId); $gameSwitches.setValue((_var49AID), false)
                                   }                       
                               }
                               if (actorunit === 50) {
                                   if (($gameSwitches.value(_switch50AID)) && ($gameVariables.value(_var50AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var50AID), eventunit._eventId); $gameSwitches.setValue((_var50AID), false)
                                   } 
                               }
                               if (actorunit === 51) {
                                   if (($gameSwitches.value(_switch51AID)) && ($gameVariables.value(_var51AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var51AID), eventunit._eventId); $gameSwitches.setValue((_var51AID), false)
                                   }                       
                               }
                               if (actorunit === 52) {
                                   if (($gameSwitches.value(_switch52AID)) && ($gameVariables.value(_var52AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var52AID), eventunit._eventId); $gameSwitches.setValue((_var52AID), false)
                                   } 
                               }
                               if (actorunit === 53) {
                                   if (($gameSwitches.value(_switch53AID)) && ($gameVariables.value(_var53AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var53AID), eventunit._eventId); $gameSwitches.setValue((_var53AID), false)
                                   }                      
                               }
                               if (actorunit === 54) {
                                   if (($gameSwitches.value(_switch54AID)) && ($gameVariables.value(_var54AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var54AID), eventunit._eventId); $gameSwitches.setValue((_var54AID), false)
                                   } 
                               }
                               if (actorunit === 55) {
                                   if (($gameSwitches.value(_switch55AID)) && ($gameVariables.value(_var55AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var55AID), eventunit._eventId); $gameSwitches.setValue((_var55AID), false)
                                   }                       
                               }
                               if (actorunit === 56) {
                                   if (($gameSwitches.value(_switch56AID)) && ($gameVariables.value(_var56AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var56AID), eventunit._eventId); $gameSwitches.setValue((_var56AID), false)
                                   } 
                               }
                               if (actorunit === 57) {
                                   if (($gameSwitches.value(_switch57AID)) && ($gameVariables.value(_var57AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var57AID), eventunit._eventId); $gameSwitches.setValue((_var57AID), false)
                                   }                        
                               }
                               if (actorunit === 58) {
                                   if (($gameSwitches.value(_switch58AID)) && ($gameVariables.value(_var58AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var58AID), eventunit._eventId); $gameSwitches.setValue((_var58AID), false)
                                   } 
                               }
                               if (actorunit === 59) {
                                   if (($gameSwitches.value(_switch59AID)) && ($gameVariables.value(_var59AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var59AID), eventunit._eventId); $gameSwitches.setValue((_var59AID), false)
                                   }                       
                               }
                               if (actorunit === 60) {
                                   if (($gameSwitches.value(_switch60AID)) && ($gameVariables.value(_var60AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var60AID), eventunit._eventId); $gameSwitches.setValue((_var60AID), false)
                                   } 
                               }
                               if (actorunit === 61) {
                                   if (($gameSwitches.value(_switch61AID)) && ($gameVariables.value(_var61AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var61AID), eventunit._eventId); $gameSwitches.setValue((_var61AID), false)
                                   }                       
                               }
                               if (actorunit === 62) {
                                   if (($gameSwitches.value(_switch62AID)) && ($gameVariables.value(_var62AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var62AID), eventunit._eventId); $gameSwitches.setValue((_var62AID), false)
                                   } 
                               }
                               if (actorunit === 63) {
                                   if (($gameSwitches.value(_switch63AID)) && ($gameVariables.value(_var63AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var63AID), eventunit._eventId); $gameSwitches.setValue((_var63AID), false)
                                   }                      
                               }
                               if (actorunit === 64) {
                                   if (($gameSwitches.value(_switch64AID)) && ($gameVariables.value(_var64AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var64AID), eventunit._eventId); $gameSwitches.setValue((_var64AID), false)
                                   } 
                               }
                               if (actorunit === 65) {
                                   if (($gameSwitches.value(_switch65AID)) && ($gameVariables.value(_var65AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var65AID), eventunit._eventId); $gameSwitches.setValue((_var65AID), false)
                                   }                       
                               }
                               if (actorunit === 66) {
                                   if (($gameSwitches.value(_switch66AID)) && ($gameVariables.value(_var66AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var66AID), eventunit._eventId); $gameSwitches.setValue((_var66AID), false)
                                   } 
                               }
                               if (actorunit === 67) {
                                   if (($gameSwitches.value(_switch67AID)) && ($gameVariables.value(_var67AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var67AID), eventunit._eventId); $gameSwitches.setValue((_var67AID), false)
                                   }                        
                               }
                               if (actorunit === 68) {
                                   if (($gameSwitches.value(_switch68AID)) && ($gameVariables.value(_var68AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var68AID), eventunit._eventId); $gameSwitches.setValue((_var68AID), false)
                                   } 
                               }
                               if (actorunit === 69) {
                                   if (($gameSwitches.value(_switch69AID)) && ($gameVariables.value(_var69AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var69AID), eventunit._eventId); $gameSwitches.setValue((_var69AID), false)
                                   }                       
                               }
                               if (actorunit === 70) {
                                   if (($gameSwitches.value(_switch70AID)) && ($gameVariables.value(_var70AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var70AID), eventunit._eventId); $gameSwitches.setValue((_var70AID), false)
                                   } 
                               }
                               if (actorunit === 71) {
                                   if (($gameSwitches.value(_switch71AID)) && ($gameVariables.value(_var71AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var71AID), eventunit._eventId); $gameSwitches.setValue((_var71AID), false)
                                   }                       
                               }
                               if (actorunit === 72) {
                                   if (($gameSwitches.value(_switch72AID)) && ($gameVariables.value(_var72AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var72AID), eventunit._eventId); $gameSwitches.setValue((_var72AID), false)
                                   } 
                               }
                               if (actorunit === 73) {
                                   if (($gameSwitches.value(_switch73AID)) && ($gameVariables.value(_var73AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var73AID), eventunit._eventId); $gameSwitches.setValue((_var73AID), false)
                                   }                      
                               }
                               if (actorunit === 74) {
                                   if (($gameSwitches.value(_switch74AID)) && ($gameVariables.value(_var74AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var74AID), eventunit._eventId); $gameSwitches.setValue((_var74AID), false)
                                   } 
                               }
                               if (actorunit === 75) {
                                   if (($gameSwitches.value(_switch75AID)) && ($gameVariables.value(_var75AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var75AID), eventunit._eventId); $gameSwitches.setValue((_var75AID), false)
                                   }                       
                               }
                               if (actorunit === 76) {
                                   if (($gameSwitches.value(_switch76AID)) && ($gameVariables.value(_var76AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var76AID), eventunit._eventId); $gameSwitches.setValue((_var76AID), false)
                                   } 
                               }
                               if (actorunit === 77) {
                                   if (($gameSwitches.value(_switch77AID)) && ($gameVariables.value(_var77AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var77AID), eventunit._eventId); $gameSwitches.setValue((_var77AID), false)
                                   }                        
                               }
                               if (actorunit === 78) {
                                   if (($gameSwitches.value(_switch78AID)) && ($gameVariables.value(_var78AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var78AID), eventunit._eventId); $gameSwitches.setValue((_var78AID), false)
                                   } 
                               }
                               if (actorunit === 79) {
                                   if (($gameSwitches.value(_switch79AID)) && ($gameVariables.value(_var79AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var79AID), eventunit._eventId); $gameSwitches.setValue((_var79AID), false)
                                   }                       
                               }
                               if (actorunit === 80) {
                                   if (($gameSwitches.value(_switch80AID)) && ($gameVariables.value(_var80AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var80AID), eventunit._eventId); $gameSwitches.setValue((_var80AID), false)
                                   } 
                               }
                               if (actorunit === 81) {
                                   if (($gameSwitches.value(_switch81AID)) && ($gameVariables.value(_var81AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var81AID), eventunit._eventId); $gameSwitches.setValue((_var81AID), false)
                                   }                       
                               }
                               if (actorunit === 82) {
                                   if (($gameSwitches.value(_switch82AID)) && ($gameVariables.value(_var82AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var82AID), eventunit._eventId); $gameSwitches.setValue((_var82AID), false)
                                   } 
                               }
                               if (actorunit === 83) {
                                   if (($gameSwitches.value(_switch83AID)) && ($gameVariables.value(_var83AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var83AID), eventunit._eventId); $gameSwitches.setValue((_var83AID), false)
                                   }                      
                               }
                               if (actorunit === 84) {
                                   if (($gameSwitches.value(_switch84AID)) && ($gameVariables.value(_var84AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var84AID), eventunit._eventId); $gameSwitches.setValue((_var84AID), false)
                                   } 
                               }
                               if (actorunit === 85) {
                                   if (($gameSwitches.value(_switch85AID)) && ($gameVariables.value(_var85AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var85AID), eventunit._eventId); $gameSwitches.setValue((_var85AID), false)
                                   }                       
                               }
                               if (actorunit === 86) {
                                   if (($gameSwitches.value(_switch86AID)) && ($gameVariables.value(_var86AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var86AID), eventunit._eventId); $gameSwitches.setValue((_var86AID), false)
                                   } 
                               }
                               if (actorunit === 87) {
                                   if (($gameSwitches.value(_switch87AID)) && ($gameVariables.value(_var87AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var87AID), eventunit._eventId); $gameSwitches.setValue((_var87AID), false)
                                   }                        
                               }
                               if (actorunit === 88) {
                                   if (($gameSwitches.value(_switch88AID)) && ($gameVariables.value(_var88AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var88AID), eventunit._eventId); $gameSwitches.setValue((_var88AID), false)
                                   } 
                               }
                               if (actorunit === 89) {
                                   if (($gameSwitches.value(_switch89AID)) && ($gameVariables.value(_var89AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var89AID), eventunit._eventId); $gameSwitches.setValue((_var89AID), false)
                                   }                       
                               }
                               if (actorunit === 90) {
                                   if (($gameSwitches.value(_switch90AID)) && ($gameVariables.value(_var90AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var90AID), eventunit._eventId); $gameSwitches.setValue((_var90AID), false)
                                   } 
                               }
                               if (actorunit === 91) {
                                   if (($gameSwitches.value(_switch91AID)) && ($gameVariables.value(_var91AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var91AID), eventunit._eventId); $gameSwitches.setValue((_var91AID), false)
                                   }                       
                               }
                               if (actorunit === 92) {
                                   if (($gameSwitches.value(_switch92AID)) && ($gameVariables.value(_var92AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var92AID), eventunit._eventId); $gameSwitches.setValue((_var92AID), false)
                                   } 
                               }
                               if (actorunit === 93) {
                                   if (($gameSwitches.value(_switch93AID)) && ($gameVariables.value(_var93AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var93AID), eventunit._eventId); $gameSwitches.setValue((_var93AID), false)
                                   }                      
                               }
                               if (actorunit === 94) {
                                   if (($gameSwitches.value(_switch94AID)) && ($gameVariables.value(_var94AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var94AID), eventunit._eventId); $gameSwitches.setValue((_var94AID), false)
                                   } 
                               }
                               if (actorunit === 95) {
                                   if (($gameSwitches.value(_switch95AID)) && ($gameVariables.value(_var95AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var95AID), eventunit._eventId); $gameSwitches.setValue((_var95AID), false)
                                   }                       
                               }
                               if (actorunit === 96) {
                                   if (($gameSwitches.value(_switch96AID)) && ($gameVariables.value(_var96AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var96AID), eventunit._eventId); $gameSwitches.setValue((_var96AID), false)
                                   } 
                               }
                               if (actorunit === 97) {
                                   if (($gameSwitches.value(_switch97AID)) && ($gameVariables.value(_var97AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var97AID), eventunit._eventId); $gameSwitches.setValue((_var97AID), false)
                                   }                        
                               }
                               if (actorunit === 98) {
                                   if (($gameSwitches.value(_switch98AID)) && ($gameVariables.value(_var98AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var98AID), eventunit._eventId); $gameSwitches.setValue((_var98AID), false)
                                   } 
                               }
                               if (actorunit === 99) {
                                   if (($gameSwitches.value(_switch99AID)) && ($gameVariables.value(_var99AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var99AID), eventunit._eventId); $gameSwitches.setValue((_var99AID), false)
                                   }                       
                               }
                               if (actorunit === 100) {
                                   if (($gameSwitches.value(_switch100AID)) && ($gameVariables.value(_var100AID) === 0 ) ) { 
                                        $gameVariables.setValue((_var100AID), eventunit._eventId); $gameSwitches.setValue((_var100AID), false)
                                   } 
                               }
                           }   
            }
            return true;
        };

//---> END "Set Actor EventId to VarId" Part.// $gameSystem.TopActor()


//--------------------------------------------------------------------------------------------

//Plugin Command :

    var _Game_Interpreter_pluginCommand =
                Game_Interpreter.prototype.pluginCommand;
        Game_Interpreter.prototype.pluginCommand = function(command, args) {
            _Game_Interpreter_pluginCommand.call(this, command, args);

            if (command === 'SRPG_ActorUnits') {
                switch (args[0]) {

//------->Start: 
                //---> set ALL eventID-Varibles back to 0 and set Switches to "true"
                case 'Reset': // Plugin Command = "SRPG_ActorUnits Reset"

                    $gameVariables.setValue(_var1AID, 0); $gameSwitches.setValue(_var1AID , true);
                    $gameVariables.setValue(_var2AID, 0); $gameSwitches.setValue(_var2AID , true);
                    $gameVariables.setValue(_var3AID, 0); $gameSwitches.setValue(_var3AID , true);
                    $gameVariables.setValue(_var4AID, 0); $gameSwitches.setValue(_var4AID , true);
                    $gameVariables.setValue(_var5AID, 0); $gameSwitches.setValue(_var5AID , true);
                    $gameVariables.setValue(_var6AID, 0); $gameSwitches.setValue(_var6AID , true);
                    $gameVariables.setValue(_var7AID, 0); $gameSwitches.setValue(_var7AID , true);
                    $gameVariables.setValue(_var8AID, 0); $gameSwitches.setValue(_var8AID , true);
                    $gameVariables.setValue(_var9AID, 0); $gameSwitches.setValue(_var9AID , true);
                    $gameVariables.setValue(_var10AID, 0); $gameSwitches.setValue(_var10AID , true);
//--> 10+
                    $gameVariables.setValue(_var11AID, 0); $gameSwitches.setValue(_var11AID , true);
                    $gameVariables.setValue(_var12AID, 0); $gameSwitches.setValue(_var12AID , true);
                    $gameVariables.setValue(_var13AID, 0); $gameSwitches.setValue(_var13AID , true);
                    $gameVariables.setValue(_var14AID, 0); $gameSwitches.setValue(_var14AID , true);
                    $gameVariables.setValue(_var15AID, 0); $gameSwitches.setValue(_var15AID , true);
                    $gameVariables.setValue(_var16AID, 0); $gameSwitches.setValue(_var16AID , true);
                    $gameVariables.setValue(_var17AID, 0); $gameSwitches.setValue(_var17AID , true);
                    $gameVariables.setValue(_var18AID, 0); $gameSwitches.setValue(_var18AID , true);
                    $gameVariables.setValue(_var19AID, 0); $gameSwitches.setValue(_var19AID , true);
                    $gameVariables.setValue(_var20AID, 0); $gameSwitches.setValue(_var20AID , true);
//--> 20+
                    $gameVariables.setValue(_var21AID, 0); $gameSwitches.setValue(_var21AID , true);
                    $gameVariables.setValue(_var22AID, 0); $gameSwitches.setValue(_var22AID , true);
                    $gameVariables.setValue(_var23AID, 0); $gameSwitches.setValue(_var23AID , true);
                    $gameVariables.setValue(_var24AID, 0); $gameSwitches.setValue(_var24AID , true);
                    $gameVariables.setValue(_var25AID, 0); $gameSwitches.setValue(_var25AID , true);
                    $gameVariables.setValue(_var26AID, 0); $gameSwitches.setValue(_var26AID , true);
                    $gameVariables.setValue(_var27AID, 0); $gameSwitches.setValue(_var27AID , true);
                    $gameVariables.setValue(_var28AID, 0); $gameSwitches.setValue(_var28AID , true);
                    $gameVariables.setValue(_var29AID, 0); $gameSwitches.setValue(_var29AID , true);
                    $gameVariables.setValue(_var30AID, 0); $gameSwitches.setValue(_var30AID , true);
//--> 30+
                    $gameVariables.setValue(_var31AID, 0); $gameSwitches.setValue(_var31AID , true);
                    $gameVariables.setValue(_var32AID, 0); $gameSwitches.setValue(_var32AID , true);
                    $gameVariables.setValue(_var33AID, 0); $gameSwitches.setValue(_var33AID , true);
                    $gameVariables.setValue(_var34AID, 0); $gameSwitches.setValue(_var34AID , true);
                    $gameVariables.setValue(_var35AID, 0); $gameSwitches.setValue(_var35AID , true);
                    $gameVariables.setValue(_var36AID, 0); $gameSwitches.setValue(_var36AID , true);
                    $gameVariables.setValue(_var37AID, 0); $gameSwitches.setValue(_var37AID , true);
                    $gameVariables.setValue(_var38AID, 0); $gameSwitches.setValue(_var38AID , true);
                    $gameVariables.setValue(_var39AID, 0); $gameSwitches.setValue(_var39AID , true);
                    $gameVariables.setValue(_var40AID, 0); $gameSwitches.setValue(_var40AID , true);
//--> 40+
                    $gameVariables.setValue(_var41AID, 0); $gameSwitches.setValue(_var41AID , true);
                    $gameVariables.setValue(_var42AID, 0); $gameSwitches.setValue(_var42AID , true);
                    $gameVariables.setValue(_var43AID, 0); $gameSwitches.setValue(_var43AID , true);
                    $gameVariables.setValue(_var44AID, 0); $gameSwitches.setValue(_var44AID , true);
                    $gameVariables.setValue(_var45AID, 0); $gameSwitches.setValue(_var45AID , true);
                    $gameVariables.setValue(_var46AID, 0); $gameSwitches.setValue(_var46AID , true);
                    $gameVariables.setValue(_var47AID, 0); $gameSwitches.setValue(_var47AID , true);
                    $gameVariables.setValue(_var48AID, 0); $gameSwitches.setValue(_var48AID , true);
                    $gameVariables.setValue(_var49AID, 0); $gameSwitches.setValue(_var49AID , true);
                    $gameVariables.setValue(_var50AID, 0); $gameSwitches.setValue(_var50AID , true);
//--> 50+
                    $gameVariables.setValue(_var51AID, 0); $gameSwitches.setValue(_var51AID , true);
                    $gameVariables.setValue(_var52AID, 0); $gameSwitches.setValue(_var52AID , true);
                    $gameVariables.setValue(_var53AID, 0); $gameSwitches.setValue(_var53AID , true);
                    $gameVariables.setValue(_var54AID, 0); $gameSwitches.setValue(_var54AID , true);
                    $gameVariables.setValue(_var55AID, 0); $gameSwitches.setValue(_var55AID , true);
                    $gameVariables.setValue(_var56AID, 0); $gameSwitches.setValue(_var56AID , true);
                    $gameVariables.setValue(_var57AID, 0); $gameSwitches.setValue(_var57AID , true);
                    $gameVariables.setValue(_var58AID, 0); $gameSwitches.setValue(_var58AID , true);
                    $gameVariables.setValue(_var59AID, 0); $gameSwitches.setValue(_var59AID , true);
                    $gameVariables.setValue(_var60AID, 0); $gameSwitches.setValue(_var60AID , true);
//--> 60+
                    $gameVariables.setValue(_var61AID, 0); $gameSwitches.setValue(_var61AID , true);
                    $gameVariables.setValue(_var62AID, 0); $gameSwitches.setValue(_var62AID , true);
                    $gameVariables.setValue(_var63AID, 0); $gameSwitches.setValue(_var63AID , true);
                    $gameVariables.setValue(_var64AID, 0); $gameSwitches.setValue(_var64AID , true);
                    $gameVariables.setValue(_var65AID, 0); $gameSwitches.setValue(_var65AID , true);
                    $gameVariables.setValue(_var66AID, 0); $gameSwitches.setValue(_var66AID , true);
                    $gameVariables.setValue(_var67AID, 0); $gameSwitches.setValue(_var67AID , true);
                    $gameVariables.setValue(_var68AID, 0); $gameSwitches.setValue(_var68AID , true);
                    $gameVariables.setValue(_var69AID, 0); $gameSwitches.setValue(_var69AID , true);
                    $gameVariables.setValue(_var70AID, 0); $gameSwitches.setValue(_var70AID , true);
//--> 70+
                    $gameVariables.setValue(_var71AID, 0); $gameSwitches.setValue(_var71AID , true);
                    $gameVariables.setValue(_var72AID, 0); $gameSwitches.setValue(_var72AID , true);
                    $gameVariables.setValue(_var73AID, 0); $gameSwitches.setValue(_var73AID , true);
                    $gameVariables.setValue(_var74AID, 0); $gameSwitches.setValue(_var74AID , true);
                    $gameVariables.setValue(_var75AID, 0); $gameSwitches.setValue(_var75AID , true);
                    $gameVariables.setValue(_var76AID, 0); $gameSwitches.setValue(_var76AID , true);
                    $gameVariables.setValue(_var77AID, 0); $gameSwitches.setValue(_var77AID , true);
                    $gameVariables.setValue(_var78AID, 0); $gameSwitches.setValue(_var78AID , true);
                    $gameVariables.setValue(_var79AID, 0); $gameSwitches.setValue(_var79AID , true);
                    $gameVariables.setValue(_var80AID, 0); $gameSwitches.setValue(_var80AID , true);
//--> 80+
                    $gameVariables.setValue(_var81AID, 0); $gameSwitches.setValue(_var81AID , true);
                    $gameVariables.setValue(_var82AID, 0); $gameSwitches.setValue(_var82AID , true);
                    $gameVariables.setValue(_var83AID, 0); $gameSwitches.setValue(_var83AID , true);
                    $gameVariables.setValue(_var84AID, 0); $gameSwitches.setValue(_var84AID , true);
                    $gameVariables.setValue(_var85AID, 0); $gameSwitches.setValue(_var85AID , true);
                    $gameVariables.setValue(_var86AID, 0); $gameSwitches.setValue(_var86AID , true);
                    $gameVariables.setValue(_var87AID, 0); $gameSwitches.setValue(_var87AID , true);
                    $gameVariables.setValue(_var88AID, 0); $gameSwitches.setValue(_var88AID , true);
                    $gameVariables.setValue(_var89AID, 0); $gameSwitches.setValue(_var89AID , true);
                    $gameVariables.setValue(_var90AID, 0); $gameSwitches.setValue(_var90AID , true);
//--> 90+
                    $gameVariables.setValue(_var91AID, 0); $gameSwitches.setValue(_var91AID , true);
                    $gameVariables.setValue(_var92AID, 0); $gameSwitches.setValue(_var92AID , true);
                    $gameVariables.setValue(_var93AID, 0); $gameSwitches.setValue(_var93AID , true);
                    $gameVariables.setValue(_var94AID, 0); $gameSwitches.setValue(_var94AID , true);
                    $gameVariables.setValue(_var95AID, 0); $gameSwitches.setValue(_var95AID , true);
                    $gameVariables.setValue(_var96AID, 0); $gameSwitches.setValue(_var96AID , true);
                    $gameVariables.setValue(_var97AID, 0); $gameSwitches.setValue(_var97AID , true);
                    $gameVariables.setValue(_var98AID, 0); $gameSwitches.setValue(_var98AID , true);
                    $gameVariables.setValue(_var99AID, 0); $gameSwitches.setValue(_var99AID , true);
                    $gameVariables.setValue(_var100AID, 0); $gameSwitches.setValue(_var100AID , true);
//-> 100_END
                    break;
                 }

            }

//Plugin Command-End:

        };

//--------------------------------------------------------------------------------------------


//---End:


})();