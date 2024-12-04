import PersistenceDriver from '../persistence-driver';
import config from "@/config.ts";

const prefix: string = config.persistencePrefix;

const driver: PersistenceDriver = {
  load: () => {
    const storedState = localStorage[prefix];

    if (!storedState) {
      return null;
    }

    return JSON.parse(storedState);
  },
  store: (state) => {
    localStorage[prefix] = JSON.stringify(state);
  },
};

export default driver;
