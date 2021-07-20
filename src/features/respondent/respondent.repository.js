const Respondent = require('./respondent.model');

class RespondentRepository {
  list(conditions = {}, paging = {}) {
    return Respondent.find(conditions)
      .skip(paging.offset)
      .limit(paging.limit)
      .sort(paging.sort)
      .lean();
  }

  count(conditions = {}) {
    return Respondent.countDocuments(conditions);
  }

  findOne(conditions = {}, projection = {}, options = {}) {
    return Respondent.findOne(conditions, projection, options).lean();
  }

  create(respondent) {
    return Respondent.create(respondent);
  }

  updateOne(email, respondent) {
    return Respondent.updateOne({ email }, { $set: respondent });
  }

  delete(email) {
    return Respondent.deleteOne({ email });
  }

  deleteAll() {
    return Respondent.deleteMany();
  }
}

module.exports = new RespondentRepository();
