import { NodeModel } from '@projectstorm/react-diagrams';

import itemsConfig from '../../data/items-config.json';
import producers from '../../data/producers';
import round from '../../utils/round';

import MachinePortModel from './MachinePortModel';

class MachineNodeModel extends NodeModel {
  constructor(producerName) {
    const producerConfig = producers[producerName];
    const producer = itemsConfig[producerName][producerConfig.defaultType];
    
    super({
      type: 'machine',
      producerName,
      producer,
      productionItem: null,
      producerTypes: Object.keys(itemsConfig[producerName]),
    });
  }

  getCraftableItems() {
    return Object.keys(itemsConfig.recipes)
      .filter(itemkey => {
        return this.options.producer.crafting_categories.includes(itemsConfig.recipes[itemkey].category)
      });
  }

  setProducerType(newType) {
    this.options.producer = itemsConfig[this.options.producerName][newType];
    if (this.options.productionItem && !this.options.producer.crafting_categories.includes(itemsConfig.recipes[this.options.productionItem].category)) {
      this.setProductionItem(null);
    }
    else {
      // Required to reset crafting speed;
      this.setProductionItem(this.options.productionItem);
    }
  }

  setProductionItem = item => {
    Object.keys(this.ports).forEach(portName => {
      const port = this.ports[portName];
      port.removeAllLinks();
      this.removePort(port);
    });

    if (item === null) return;

    this.options.productionItem = item;
    const recipe = itemsConfig.recipes[item];
    const craftTime = recipe.energy_required / this.options.producer.crafting_speed;
    this.options.inputs = recipe.ingredients;
    recipe.ingredients
      .forEach(ingredient => {
        const ingredientConfig = itemsConfig.items[ingredient.name];
        const ingredientLabel = ingredientConfig.localized_name.en;
        this.addPort(new MachinePortModel({
          itemName: ingredient.name,
          itemAmount: ingredient.amount,
          craftTime,
          label: ingredientLabel,
          isInput: true,
        }));
      });
    recipe.results.forEach(result => {
      const resultConfig = itemsConfig.items[result.name];
      this.addPort(new MachinePortModel({
        itemName: result.name,
        itemAmount: result.amount,
        craftTime,
        label: resultConfig.localized_name.en,
        isInput: false,
      }));
    });
  }
}

export default MachineNodeModel;
