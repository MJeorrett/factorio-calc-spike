import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';

import * as Machine from './components/Machine';

const engine = createEngine();

const state = engine.getStateMachine().getCurrentState();
state.dragNewLink.config.allowLooseLinks = false;

const nodeFactories = engine.getNodeFactories();
nodeFactories.registerFactory(new Machine.Factory());

const model = new DiagramModel();

engine.setModel(model);

export default engine;