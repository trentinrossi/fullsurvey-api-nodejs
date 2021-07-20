const pagingHelper = require('../../helpers/paging.helper');
const filterHelper = require('../../helpers/filter.helper');
const repository = require('./respondent.repository');

class RespondentService {
  async list(params) {
    const query = filterHelper.build(params);
    const paging = pagingHelper.build(params);
    const total = await repository.count(query);
    const data = await repository.list(query, paging);

    return {
      meta: pagingHelper.resolve(paging, total),
      data,
    };
  }

  async getByEmail(email) {
    return repository.findOne({ email });
  }

  async insert(respondent) {
    return repository.create(respondent);
  }

  async update(email, respondent) {
    return repository.updateOne(email, respondent);
  }

  async delete(email) {
    return repository.delete(email);
  }

  async deleteAll() {
    return repository.deleteAll();
  }
}

module.exports = new RespondentService();
