import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';

import * as Machine from './components/Machine';

import itemsConfig from './data/items-config.json';

const engine = createEngine();

const nodeFactories = engine.getNodeFactories();
nodeFactories.registerFactory(new Machine.Factory());

const nodes = [];
const spacingX = 275;
let x = spacingX;

Object.keys(itemsConfig["assembling-machine"]).forEach(producerKey => {
  console.log(producerKey)
  const producerConfig = itemsConfig["assembling-machine"][producerKey]
  const itemConfig = itemsConfig.recipes[producerKey];
  const node = new Machine.Model(
    itemConfig.localized_name.en,
    producerKey,
    Object.keys(itemsConfig.recipes)
      .filter(itemkey => producerConfig.crafting_categories.includes(itemsConfig.recipes[itemkey].category))
  );
  node.setPosition(x, 100);
  x += spacingX;

  nodes.push(node);
});

const model = new DiagramModel();
model.addAll(...nodes);

engine.setModel(model);

export default engine;