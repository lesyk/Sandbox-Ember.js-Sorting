export default function() {
  this.get('/algorithms', function() {
    return {
      data: [
      {
        type: 'algorithms',
        id: 1,
        attributes: {
          name: 'Buble Sort',
          wiki_page: 'Estate',
          code: "var array = [74, 40, 59, 87, 91, 23, 72, 122, 46, 66];\ninspect(array);\nfunction sort(values) {\n  var length = values.length - 1;\n  do {\n    var swapped = false;\n    for(var i = 0; i < length; ++i) {\n      if (values[i] > values[i+1]) {\n        var temp = values[i];\n        values[i] = values[i+1];\n        inspect(array);\n        values[i+1] = temp;\n        inspect(array);\n        swapped = true;\n      }\n    }\n  }\n  while(swapped == true)\n};\nsort(array);"
        }
      }, {
        type: 'algorithms',
        id: 2,
        attributes: {
          name: 'Insertion Sort',
          wiki_page: 'Estate',
          code: "var array = [74, 40, 59, 87, 91, 23, 72, 122, 46, 66];\ninspect(array);\nfunction sort(values) {\n  var length = values.length;\n  for(var i = 1; i < length; ++i) {\n    var temp = values[i];\n    var j = i - 1;\n    for(; j >= 0 && values[j] > temp; --j) {\n      values[j+1] = values[j];\n      inspect(array);\n    }\n    values[j+1] = temp;\n    inspect(array);\n  }\n};\nsort(array)"
        }
      }, {
        type: 'algorithms',
        id: 3,
        attributes: {
          name: 'Quick Sort',
          wiki_page: 'Estate',
          code: "var array = [74, 40, 59, 87, 91, 23, 72, 122, 46, 66];\nfunction sort(a) {\n  if (a.length == 0) return [];\n  var left = [], right = [], pivot = a[0];\n  for (var i = 1; i < a.length; i++) {\n    inspect(a);\n    a[i] < pivot ? left.push(a[i]) : right.push(a[i]);\n    inspect(a);\n  }\n  return sort(left).concat(pivot, sort(right));\n}\ninspect(sort(array));"
        }
      }, {
        type: 'algorithms',
        id: 4,
        attributes: {
          name: 'Merge sort',
          wiki_page: 'Estate',
          code: "var array = [74, 40, 59, 87, 91, 23, 72, 122, 46, 66];\nfunction mergeSort(arr) {\n  if (arr.length < 2)\n    return arr;\n\n  var middle = parseInt(arr.length / 2);\n  inspect(middle);\n  var left   = arr.slice(0, middle);\n  inspect(left);\n  var right  = arr.slice(middle, arr.length);\n  inspect(right);\n\n  return merge(mergeSort(left), mergeSort(right));\n}\nfunction merge(left, right) {\n  var result = [];\n\n  while (left.length && right.length) {\n    inspect(result);\n    if (left[0] <= right[0]) {\n      result.push(left.shift());\n    } else {\n      result.push(right.shift());\n    }\n  }\n \n  while (left.length)\n    result.push(left.shift());\n  inspect(result);\n\n  while (right.length)\n    result.push(right.shift());\n  inspect(result);\n\n  return result;\n}\ninspect(mergeSort(array));\n"
        }
      }]
    }
  });

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
