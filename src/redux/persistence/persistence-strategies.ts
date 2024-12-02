import State from '../state';
import PersistenceStrategy from './persistence-strategy.ts';
import connectionPersist from '$models/connection/persist';
import eventPersist from '$models/event/persist';
import internalPropertyPersist from '$models/internal-property/persist';
import projectPersist from '$models/project/persist';
import savedPayloadPersist from '$models/saved-payload/persist';
import tabPersist from '$models/tab/persist';
import userInterfacePropertyPersist from '$models/user-interface-property/persist';
import windowPersist from '$models/window/persist';

const persistenceStrategies: { [key in keyof State ]?: PersistenceStrategy<any> } = {
  connections: connectionPersist,
  events: eventPersist,
  internalProperties: internalPropertyPersist,
  projects: projectPersist,
  savedPayloads: savedPayloadPersist,
  tabs: tabPersist,
  userInterfaceProperties: userInterfacePropertyPersist,
  windows: windowPersist,
};

export default persistenceStrategies;
