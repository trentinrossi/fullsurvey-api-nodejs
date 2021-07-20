class PagingHelper {
  build(query = {}) {
    const sort = {};
    const page = parseInt(query.offset, 10) + 1 || 1;
    const limit = parseInt(query.limit, 10) || 20;
    let offset = parseInt(query.offset, 10) * limit;
    offset = offset < 0 ? 0 : offset;

    Object.keys(query).forEach((prop) => {
      if (prop.match('_sort_')) {
        sort[prop.replace('_sort_', '')] = query[prop] === 'desc' ? -1 : 1;
      }
    });

    return {
      page,
      limit,
      offset,
      sort,
    };
  }

  resolve(meta, total) {
    let pages = parseInt(total / meta.limit, 10);
    if (total % 2 > 0) {
      pages += 1;
    }

    if (pages === 0) pages = 1;

    const previous = meta.offset > 0;
    const next = total > meta.page * meta.limit;

    return {
      currentPage: meta.page,
      itemsPerPage: meta.limit,
      next,
      pages,
      previous,
      offset: meta.page - 1,
      totalItems: total,
    };
  }

  resolveAllActivities(meta) {
    const previous = meta.offset > 0;

    return {
      currentPage: meta.page,
      itemsPerPage: meta.limit,
      previous,
      offset: meta.page - 1,
    };
  }
}

module.exports = new PagingHelper();
