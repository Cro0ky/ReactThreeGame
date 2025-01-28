export interface InventoryStateI {
  playerInventory: string[];
  unitInventories: {
    [key: string]: string[];
  };
}

export interface MoveItemI {
  from: string;
  to: string;
  item: string;
}

export interface UnitProps {
  position: [number, number, number];
  unitId: string;
}

export interface InventoryProps {
  items: string[];
  type: EnumEntities;
  id?: string;
}

export enum EnumEntities {
  PLAYER = "player",
  UNIT = "unit",
}

export enum EnumDragTypes {
  ITEM = "ITEM",
}
