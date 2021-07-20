// @ts-check
const Respondent = require('./respondent.model');
const service = require('./respondent.service');

class RespondentController {
  async list(req, res, next) {
    try {
      let { query } = req;

      query.offset = parseInt(query.offset) || 0;
      query.limit = parseInt(query.limit) || 500;

      const results = await service.list(query);

      res.status(200).json(results);
    } catch (err) {
      next({
        code: 10402,
        status: 400,
        message: err._message || err,
        moreInfo: err.errors || err,
      });
    }
  }

  async getByEmail(req, res, next) {
    try {
      const { email } = req.params;
      const respondent = await service.getByEmail(email);

      if (!respondent) {
        next({
          code: 10404,
          status: 404,
          message: `Respondent not found by given email: ${email}`,
          moreInfo: `Please, inform the correct e-mail`,
        });
      }

      res.status(200).json(respondent);
    } catch (err) {
      next({
        code: 10402,
        status: 400,
        message: err._message || err,
        moreInfo: err.errors || err,
      });
    }
  }

  async insert(req, res, next) {
    try {
      const isAlreadyExists = await service.getByEmail(req.body.email);

      if (isAlreadyExists) {
        next({
          code: 10401,
          status: 400,
          message: `Respondent already exists by given e-mail: ${req.body.email}`,
          moreInfo: ``,
        });
      }

      const respondent = new Respondent(req.body);

      const inserted = await service.insert(respondent);
      res.status(201).json(inserted);
    } catch (err) {
      next({
        code: 10400,
        status: 400,
        message: err._message,
        moreInfo: err.errors,
      });
    }
  }

  async update(req, res, next) {
    try {
      const { email } = req.params;
      const { body } = req;

      const resp = await service.getByEmail(email);

      if (!resp) {
        next({
          code: 10404,
          status: 400,
          message: `Respondent not found by given email: ${email}`,
          moreInfo: `Please, inform the correct e-mail`,
        });
      }

      delete body.email; // email can't be updated

      await service.update(email, body);

      const respondent = await service.getByEmail(email);

      res.status(200).json(respondent);
    } catch (err) {
      next({
        code: 10402,
        status: 400,
        message: err._message || err,
        moreInfo: err.errors || err,
      });
    }
  }

  async remove(req, res, next) {
    try {
      const { email } = req.params;

      const resp = await service.getByEmail(email);

      if (!resp) {
        next({
          code: 10404,
          status: 400,
          message: `Respondent not found by given email: ${email}`,
          moreInfo: `Please, inform the correct e-mail`,
        });
      }

      await service.delete(email);
      res.status(204).json();
    } catch (err) {
      next({
        code: 10405,
        status: 400,
        message: err._message,
        moreInfo: err.errors,
      });
    }
  }

  async removeAll(req, res, next) {
    try {      
      await service.deleteAll();
      res.status(204).json();
    } catch (err) {
      next({
        code: 10405,
        status: 400,
        message: err._message,
        moreInfo: err.errors,
      });
    }
  }
}

module.exports = new RespondentController();
