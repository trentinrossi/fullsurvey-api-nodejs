const mongoose = require('mongoose');

class FilterHelper {
  regexExpression(search) {
    if (!search) {
      return false;
    }

    if (search === 'true') {
      return true;
    }

    if (search === 'false') {
      return false;
    }

    return {
      $regex: search,
      $options: 'i',
    };
  }

  regexExpressionObjectId(search) {
    if (!search) {
      return false;
    }

    return mongoose.Types.ObjectId(search);
  }

  build(query = {}) {
    const filters = Object.assign({}, query);
    delete filters.offset;
    delete filters.limit;
    Object.keys(query).forEach((prop) => {
      if (prop.match('_sort_')) {
        delete filters[prop];
      }
      if (prop.match('components')) {
        filters[prop] = {
          $in: query[prop]
            .split(',')
            .map((component) => this.regexExpressionObjectId(component)),
        };
      }
    });

    const props = [
      'description',
      'name',
      'title',
      'fullname',
      'nickname',
      'displayName',
      'alias',
      'repository',
      'firstName',
    ];

    props.forEach((prop) => {
      if (query[prop]) {
        if (query[prop] === 'true') {
          filters[prop] = { $exists: true };
        } else {
          filters[prop] = {
            $regex: query[prop].replace(
              /[\[\]\+\\\.]+/gi,
              (match) => '\\' + match
            ),
            $options: 'i',
          };
        }
      }
    });

    return filters;
  }
}

module.exports = new FilterHelper();
