const toCamelCase = (key) => {
  return key.split(' ').map((word, index) => {
    if (index == 0) {
      return word.toLowerCase();
    }
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('');
};

const makeJsonDoc = (fields) => {
  const jsonDoc = {};

  for (const field of fields) {
    let key = field.split(': ')[0];
    let value = field.split(': ')[1];

    key = toCamelCase(key);
    if (key === 'stars') {
      value = value.split(', ');
    }

    jsonDoc[key] = value;
  }
  return jsonDoc;
};

module.exports = (stringData) => {
  stringData = stringData.trim();
  const stringDocs = stringData.split('\n\n');

  const jsonDocuments = [];

  for (const doc of stringDocs) {
    if (doc === '') {
      continue;
    }

    const fields = doc.split('\n');
    jsonDocuments.push(makeJsonDoc(fields));
  }

  return jsonDocuments;
};
