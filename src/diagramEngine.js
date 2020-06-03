import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';

import * as Machine from './components/Machine';

import itemsConfig from './data/items-config.json';
import producersConfig from './data/producers-config.json';

const engine = createEngine();

const nodeFactories = engine.getNodeFactories();
nodeFactories.registerFactory(new Machine.Factory());

const nodes = [];
const spacingX = 200;
let x = spacingX;

Object.keys(producersConfig).forEach(producerKey => {
  const producerConfig = producersConfig[producerKey]
  const itemConfig = itemsConfig[producerKey];
  const node = new Machine.Model(
    itemConfig.localized_name.en,
    itemConfig.icon_col,
    itemConfig.icon_row,
    Object.keys(itemsConfig)
      .filter(itemkey => producerConfig.includes(itemsConfig[itemkey].category))
  );
  node.setPosition(x, 100);
  x += spacingX;

  nodes.push(node);
});

const model = new DiagramModel();
model.addAll(...nodes);

engine.setModel(model);

export default engine;