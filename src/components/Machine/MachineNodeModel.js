import { NodeModel } from '@projectstorm/react-diagrams';

import itemsConfig from '../../data/items-config.json';
import producers from '../../data/producers';

import MachinePortModel from './MachinePortModel';

const roundPrecision = 1000;
const round = number => {
  return Math.round((number + Number.EPSILON) * roundPrecision) / roundPrecision;
}

class MachineNodeModel extends NodeModel {
  constructor(producerName) {
    const producerConfig = producers[producerName];
    const itemConfig = itemsConfig.items[producerConfig.defaultType];
    
    super({
      type: 'machine',
      label: itemConfig.localized_name.en,
      producerName,
      itemName: itemConfig.name,
      craftableItems: Object.keys(itemsConfig.recipes)
        .filter(itemkey => itemsConfig[producerName][itemConfig.name].crafting_categories.includes(itemsConfig.recipes[itemkey].category)),
    });
  }

  setProductionItem = item => {
    Object.keys(this.ports).forEach(portName => {
      const port = this.ports[portName];
      port.removeAllLinks();
      this.removePort(port);
    });
    const recipe = itemsConfig.recipes[item];
    const craftTime = recipe.energy_required / itemsConfig[this.options.producerName][this.options.itemName].crafting_speed;
    this.options.inputs = recipe.ingredients;
    recipe.ingredients
      .forEach(ingredient => {
        const ingredientConfig = itemsConfig.items[ingredient.name];
        const ingredientLabel = ingredientConfig.localized_name.en;
        this.addPort(new MachinePortModel({
          itemName: ingredient.name,
          productionSpeed: round(ingredient.amount / craftTime),
          label: ingredientLabel,
          isInput: true,
        }));
      });
    recipe.results.forEach(result => {
      const resultConfig = itemsConfig.items[result.name];
      this.addPort(new MachinePortModel({
        itemName: result.name,
        productionSpeed: round(result.amount / craftTime),
        label: resultConfig.localized_name.en,
        isInput: false,
      }));
    });
  }
}

export default MachineNodeModel;
