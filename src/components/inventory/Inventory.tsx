import { FC } from "react";
import {
  EnumDragTypes,
  EnumEntities,
  InventoryProps,
} from "../../types/inventory";
import { useDrag } from "react-dnd";

const Inventory: FC<InventoryProps> = ({ items, id, type }) => {
  const [, drag] = useDrag({
    type: EnumDragTypes.ITEM,
    item: { type, id },
  });

  return (
    <div ref={drag}>
      <h3>
        {type === EnumEntities.PLAYER ? "Player" : `Unit ${id} `} inventory
      </h3>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
