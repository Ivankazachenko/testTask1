
/**
 * @param {string} action 
 * @param {[number, string[]]} result
 */
export function migrationResults(action, result) {
  if (result[1].length === 0) {
    console.log(["latest", "up"].includes(action) ? "All migrations are up to date" : "All migrations have been rolled back");
    return
  }
  console.log(`Batch ${result[0]} ${["latest", "up"].includes(action) ? "ran" : "rolled back"} the following migrations:`);
  for (const migration of result[1]) {
    console.log("- " + migration);
  }
}

/**
 * @param {[{ name: string }[], { file: string }[]]} list 
 */
export function migrationList(list) {
  console.log(`Found ${list[0].length} Completed Migration file/files.`);
  for (const migration of list[0]) {
    console.log("- " + migration.name);
  }
  console.log(`Found ${list[1].length} Pending Migration file/files.`);
  for (const migration of list[1]) {
    console.log("- " + migration.file);
  }
}

/**
 * @param {[string[]]} result 
 */
export function seedRun(result) {
  if (result[0].length === 0) {
    console.log("No seeds to run");
  }
  console.log(`Ran ${result[0].length} seed files`);
  for (const seed of result[0]) {
    console.log("- " + seed?.split(/\/|\\/).pop());
  }
  // Ran 5 seed files
}

/**
 * @param {string} name 
 */
export function seedMake(name) {
  console.log(`Created seed: ${name.split(/\/|\\/).pop()}`);
}