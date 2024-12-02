import State from './state';

import migration0 from "./migrations/2020-01-04-0110-move-projects-to-object";
import migration1 from "./migrations/2020-01-30-2131-remove-extra-root-keys";
import migration2 from "./migrations/2020-01-30-2135-create-connections";
import migration3 from "./migrations/2020-02-10-2340-add-default-values-to-projects";
import migration4 from "./migrations/2020-02-16-1201-add-created-at-to-projects";
import migration5 from "./migrations/2020-10-18-1744-add-name-to-connections";
import migration6 from "./migrations/2020-10-21-2355-add-order-to-connections";
import migration7 from "./migrations/2020-10-22-1816-add-sidebar-open";
import migration8 from "./migrations/2020-11-02-2210-update-socket-protocols-format";
import migration9 from "./migrations/2020-11-13-0822-remove-options-panel-open-from-connections";
import migration10 from "./migrations/2020-11-15-1655-move-selected-project-id-to-user-interface";
import migration11 from "./migrations/2020-11-22-2244-add-meta";
import migration12 from "./migrations/2020-12-08-2201-add-user-interface-and-windows";

export const migrations = [
  migration0,
  migration1,
  migration2,
  migration3,
  migration4,
  migration5,
  migration6,
  migration7,
  migration8,
  migration9,
  migration10,
  migration11,
  migration12,
];

export const generateMigrationsWithKeys = () => {
  const migrationsWithKeys: any = { };

  migrations.forEach((migration) => {
    migrationsWithKeys[migration.id] = { id: migration.id };
  });

  return migrationsWithKeys;
};

export const migrate = (storedState: any): State => {
  let liveState = JSON.parse(
    JSON.stringify(storedState),
  );

  if (!liveState.migrations) {
    liveState.migrations = { };
  }

  liveState = migrations.reduce(
    (state, migration) => {
      if (state.migrations[migration.id]) {
        return state;
      }

      const migratedState = migration.migrator(
        JSON.parse(
          JSON.stringify(state),
        ),
      );

      migratedState.migrations[migration.id] = { id: migration.id };

      return migratedState;
    },
    liveState,
  );

  return liveState;
};
