import { NodeModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';

import itemsConfig from '../../data/items-config.json';

const roundPrecision = 1000;
const round = number => {
  return Math.round((number + Number.EPSILON) * roundPrecision) / roundPrecision;
}

class MachineNodeModel extends NodeModel {
  constructor(label, itemName, craftableItems) {
    super({
      type: 'machine',
      label,
      itemName,
      inputs: [],
      craftableItems,
    });
  }

  setProductionItem = item => {
    Object.keys(this.ports).forEach(portName => {
      this.removePort(this.ports[portName]);
    });
    const itemConfig = itemsConfig.recipes[item];
    const ingredients = itemConfig.ingredients;
    const results = itemConfig.results;
    const craftTime = itemConfig.energy_required;
    this.options.inputs = ingredients;
    ingredients
      .forEach(ingredient => {
        const ingredientConfig = itemsConfig.recipes[ingredient.name];
        const ingredientLabel = ingredientConfig.localized_name.en;
        this.addPort(new DefaultPortModel({
          alignment: PortModelAlignment.LEFT,
          name: `ingredient-${ingredient.name}`,
          label: `${round(ingredient.amount / craftTime)} x ${ingredientLabel}`,
        }));
      });
    results.forEach(result => {
      const resultConfig = itemsConfig.recipes[result.name];
      this.addPort(new DefaultPortModel({
        alignment: PortModelAlignment.RIGHT,
        name: `result-${result.name}`,
        label: `${round(result.amount / craftTime)} x ${resultConfig.localized_name.en}`,
      }));
    });
  }
}

export default MachineNodeModel;
