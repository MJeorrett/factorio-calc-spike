import { NodeModel, DefaultPortModel, PortModelAlignment } from '@projectstorm/react-diagrams';

import itemsConfig from '../../data/items-config.json';
import producers from '../../data/producers';

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
      craftableItems,
    });
  }

  setProductionItem = item => {
    Object.keys(this.ports).forEach(portName => {
      this.removePort(this.ports[portName]);
    });
    const recipe = itemsConfig.recipes[item];
    const craftTime = recipe.energy_required / producers[this.options.itemName].crafting_speed;
    this.options.inputs = recipe.ingredients;
    recipe.ingredients
      .forEach(ingredient => {
        const ingredientConfig = itemsConfig.items[ingredient.name];
        const ingredientLabel = ingredientConfig.localized_name.en;
        this.addPort(new DefaultPortModel({
          alignment: PortModelAlignment.LEFT,
          name: `ingredient-${ingredient.name}`,
          label: `${round(ingredient.amount / craftTime)} x ${ingredientLabel}`,
        }));
      });
    recipe.results.forEach(result => {
      const resultConfig = itemsConfig.items[result.name];
      this.addPort(new DefaultPortModel({
        alignment: PortModelAlignment.RIGHT,
        name: `result-${result.name}`,
        label: `${round(result.amount / craftTime)} x ${resultConfig.localized_name.en}`,
      }));
    });
  }
}

export default MachineNodeModel;
