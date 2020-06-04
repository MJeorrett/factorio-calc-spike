import createEngine, { DiagramModel } from '@projectstorm/react-diagrams';

import * as Machine from './components/Machine';

const engine = createEngine();

const state = engine.getStateMachine().getCurrentState();
state.dragNewLink.config.allowLooseLinks = false;

const nodeFactories = engine.getNodeFactories();
nodeFactories.registerFactory(new Machine.Factory());

const model = new DiagramModel();

const handleLinkEvent = event => {
  const { entity: link } = event;
  const eventType = event.function;

  if (
    eventType !== 'targetPortChanged' &&
    eventType !== 'entityRemoved'
  ) {
    return;
  }

  if (!link.targetPort) return;

  link.sourcePort.updateCraftingSpeed();
}

model.registerListener({
  linksUpdated: event => {
    if (event.isCreated) {
      event.link.registerListener({
        eventDidFire: handleLinkEvent
      });
    }
  },
});

engine.setModel(model);

export default engine;