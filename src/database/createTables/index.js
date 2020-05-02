import createUsersTable from './users';
import createArticlesTable from './articles';
import insertAllToTables from '../seeder';


(async () => {
  try {
    await createUsersTable();
    await createArticlesTable();
    await insertAllToTables();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
})();
