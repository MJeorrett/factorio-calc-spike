import { NodeModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';

import itemsConfig from '../../data/items-config.json';

class MachineNodeModel extends NodeModel {
  constructor(label, iconCol, iconRow, craftableItems) {
    super({
      type: 'machine',
      label,
      iconCol,
      iconRow,
      inputs: [],
      craftableItems,
    });
  }

  setProductionItem = item => {
    Object.keys(this.ports).forEach(portName => {
      this.removePort(this.ports[portName]);
    });
    const ingredients = itemsConfig[item].ingredients;
    const results = itemsConfig[item].results;
    this.options.inputs = ingredients;
    ingredients
      .forEach(ingredient => {
        const ingredientConfig = itemsConfig[ingredient.name];
        const ingredientLabel = ingredientConfig.localized_name.en;
        this.addPort(new DefaultPortModel({
          alignment: PortModelAlignment.LEFT,
          name: `ingredient-${ingredient.name}`,
          label: `${ingredient.amount} x ${ingredientLabel}`,
        }));
      });
    results.forEach(result => {
      this.addPort(new DefaultPortModel({
        alignment: PortModelAlignment.RIGHT,
        name: `result-${result.name}`,
        label: `${itemsConfig[result.name].localized_name.en} x ${result.amount}`,
      }));
    });
  }
}

export default MachineNodeModel;