/**
 * Generate a selective update query based on a request body:
 *
 * - table: where to make the query
 * - items: the list of columns you want to update
 * - key: the column that we query by (e.g. username, handle, id)
 * - id: current record ID
 *
 * Returns object containing a DB query as a string, and array of
 * string values to be updated
 *
 */

function sqlForPartialUpdate(table, items, key, id) {
  // keep track of item indexes
  // store all the columns we want to update and associate with vals

  let idx = 1;
  let columns = [];


  //**************************************************************** FIXES BUG #2

  const allowed = ["first_name", "last_name", "phone", "email"]

  const updatedItems = {};
  Object.entries(items).forEach( function ([key, value]) {
    if (allowed.includes(key)) {
      updatedItems[key] = value;
  }});

  for (let column in updatedItems) {
    columns.push(`${column}=$${idx}`);
    idx += 1;
  }

  // build query
  let cols = columns.join(", ");
  let query = `UPDATE ${table} SET ${cols} WHERE ${key}=$${idx} RETURNING *`;

  let values = Object.values(updatedItems); 
  values.push(id);

  return {query, values};
}


module.exports = sqlForPartialUpdate;
