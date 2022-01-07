const { readFile } = require('fs').promises;

module.exports = async (page) => {
  try {
    // Перечитываем данные при каждом изменении
    // Здесь может быть обращение к БД или API, если данные для проекта готовы
    const [mainData, pageData] = await Promise.all([
      readFile(`${__dirname}/main.json`, 'utf-8'),
      readFile(`${__dirname}/pages/${page}.json`, 'utf-8'),
    ]);

    return {
      ...JSON.parse(mainData),
      ...JSON.parse(pageData),
      page,
      isDev: process.env.NODE_ENV === 'development'
    };
  } catch (err) {
    console.error(err);
    return {
      err
    }
  }
};
