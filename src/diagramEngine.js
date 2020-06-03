import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';

import * as Machine from './components/Machine';

import itemsConfig from './data/items-config.json';

const engine = createEngine();

const nodeFactories = engine.getNodeFactories();
nodeFactories.registerFactory(new Machine.Factory());

const nodes = [];
const spacingX = 200;
const spacingY = 300;
const columnCount = 20;
let x = spacingX;
let y = spacingY;

Object.keys(itemsConfig).forEach(itemKey => {
  const itemConfig = itemsConfig[itemKey];
  if (itemConfig.ingredients.length === 0) return;
  const node = new Machine.Model(
    itemConfig.localized_name.en,
    itemConfig.ingredients.map(ingredient => {
      console.log("Ingredient:", ingredient);
      return {
        name: ingredient.name,
        label: itemsConfig[ingredient.name].localized_name.en,
      };
    }),
    itemConfig.icon_col,
    itemConfig.icon_row
  );

  node.setPosition(x, y);
  x += spacingX;
  if (x >= spacingX * columnCount) {
    x = spacingX;
    y += spacingY;
  }
  nodes.push(node);
});

const model = new DiagramModel();
model.addAll(...nodes);

engine.setModel(model);

export default engine;