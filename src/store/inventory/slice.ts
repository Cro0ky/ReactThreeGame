import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  InventoryStateI,
  MoveItemI,
  EnumEntities,
} from "../../types/inventory";

const initialState: InventoryStateI = {
  playerInventory: [],
  unitInventories: {
    unit1: ["item1", "item2", "item3"],
    unit2: ["item4", "item5"],
    unit3: ["item6", "item7"],
  },
};

export const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    moveItem: (state, action: PayloadAction<MoveItemI>) => {
      const { from, to, item } = action.payload;

      if (from === EnumEntities.PLAYER) {
        state.playerInventory = state.playerInventory.filter((i) => i !== item);
      } else {
        state.unitInventories[from] = state.unitInventories[from].filter(
          (i) => i !== item
        );
      }

      if (to === EnumEntities.PLAYER) {
        state.playerInventory.push(item);
      } else {
        state.unitInventories[to].push(item);
      }
    },
  },
});

export const { moveItem } = inventorySlice.actions;
export default inventorySlice.reducer;
