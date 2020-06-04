import { NodeModel } from '@projectstorm/react-diagrams';

import itemsConfig from '../../data/items-config.json';
import producers from '../../data/producers';

import MachinePortModel from './MachinePortModel';

const roundPrecision = 1000;
const round = number => {
  return Math.round((number + Number.EPSILON) * roundPrecision) / roundPrecision;
}

class MachineNodeModel extends NodeModel {
  constructor(itemName) {
    const itemConfig = itemsConfig.items[itemName];
    const producerConfig = producers[itemName];
    
    super({
      type: 'machine',
      label: itemConfig.localized_name.en,
      itemName,
      craftableItems: Object.keys(itemsConfig.recipes)
        .filter(itemkey => producerConfig.crafting_categories.includes(itemsConfig.recipes[itemkey].category)),
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
        this.addPort(new MachinePortModel({
          itemName: ingredient.name,
          craftingSpeed: round(ingredient.amount / craftTime),
          label: ingredientLabel,
          isInput: true,
        }));
      });
    recipe.results.forEach(result => {
      const resultConfig = itemsConfig.items[result.name];
      this.addPort(new MachinePortModel({
        itemName: result.name,
        craftingSpeed: round(result.amount / craftTime),
        label: resultConfig.localized_name.en,
        isInput: false,
      }));
    });
  }
}

export default MachineNodeModel;
