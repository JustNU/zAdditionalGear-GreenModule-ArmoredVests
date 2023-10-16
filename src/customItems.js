"use strict";

class CustomItems {
	static handleCustomItems(database, core, config, itemConfig, itemData)
	{
		if (itemConfig["Armored Vests"]["AddGearGreen_TacTec_Armor"]) {
			core.addItemRetexture("AddGearGreen_TacTec_Armor", itemData["AddGearGreen_TacTec_Armor"].BaseItemID, itemData["AddGearGreen_TacTec_Armor"].BundlePath, false, config.AddToBots, itemData["AddGearGreen_TacTec_Armor"].LootWeigthMult);
			const dbItem = database.templates.items["AddGearGreen_TacTec_Armor"];
			const rigItem = database.templates.items["5b44cad286f77402a54ae7e5"];
			
			// change weight
			if (rigItem._props.Weight > 0) {
				dbItem._props.Weight = rigItem._props.Weight - 1.5; // 8
			} else {
				dbItem._props.Weight = rigItem._props.Weight;
			}
			
			// change inventory space
			if (rigItem._props.Width != 1 && rigItem._props.Height != 1) {
				dbItem._props.Width = 3;
				dbItem._props.Height = 3;
			} else {
				dbItem._props.Width = rigItem._props.Width;
				dbItem._props.Height = rigItem._props.Height;
			}
			
			// same stats as rig
			dbItem._props.RepairCost = rigItem._props.RepairCost;
			dbItem._props.CanSellOnRagfair = rigItem._props.CanSellOnRagfair;
			dbItem._props.armorClass = rigItem._props.armorClass;
			dbItem._props.BluntThroughput = rigItem._props.BluntThroughput;
			dbItem._props.ArmorMaterial = rigItem._props.ArmorMaterial;
			dbItem._props.ArmorType = rigItem._props.ArmorType;
			dbItem._props.Durability = rigItem._props.Durability;
			dbItem._props.MaxDurability = rigItem._props.MaxDurability;
			dbItem._props.Indestructibility = rigItem._props.Indestructibility;
			dbItem._props.MaterialType = rigItem._props.MaterialType;
			dbItem._props.armorZone = rigItem._props.armorZone;
			
			// change debuffs
			dbItem._props.speedPenaltyPercent = Math.round(rigItem._props.speedPenaltyPercent - (rigItem._props.speedPenaltyPercent * 0.28)); // -5
			dbItem._props.mousePenalty = Math.round(rigItem._props.mousePenalty - (rigItem._props.mousePenalty * 0.33)); // -2
			dbItem._props.weaponErgonomicPenalty = Math.round(rigItem._props.weaponErgonomicPenalty - (rigItem._props.weaponErgonomicPenalty * 0.66)); // -1
			
			// find handbook entry
			const dbItemHandbook = database.templates.handbook.Items.find((item) => {return item.Id === "AddGearGreen_TacTec_Armor"});
			const rigHandbookEntry = database.templates.handbook.Items.find((item) => {return item.Id === "5b44cad286f77402a54ae7e5"});
			
			// change handbook price
			dbItemHandbook.Price = Math.round(rigHandbookEntry.Price - (rigHandbookEntry.Price * 0.10)); // 81900
			
			// change flea price (if it has one)
			if (database.templates.prices["AddGearGreen_TacTec_Armor"])
				database.templates.prices["AddGearGreen_TacTec_Armor"] = dbItemHandbook.Price;
			
			// add trade offer
			if (config.EnableTradeOffers)
				core.createTraderOffer("AddGearGreen_TacTec_Armor", "5ac3b934156ae10c4430e83c", "5449016a4bdc2d6f028b456f", dbItemHandbook.Price, 4);
		}
	}
}

module.exports = CustomItems;