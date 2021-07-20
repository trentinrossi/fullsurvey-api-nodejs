const express = require('express');
const router = express.Router();
const RespondenController = require('./respondent.controller');
const respondentController = require('./respondent.controller');

// router.all('*', (req, res, next) => {
//   body('email').isEmail().normalizeEmail();

//   // If is necessary to manipulate dates
//   // body([
//   //   'admissionDate',
//   //   'expContractExpiration',
//   //   'dismissalDate',
//   //   'visitDate',
//   // ]);

//   next();
// });

router.get('/', respondentController.list);
router.get('/:email', respondentController.getByEmail);
router.post('/', respondentController.insert);
router.patch('/:email', respondentController.update);
router.delete('/:email', RespondenController.remove);

module.exports = router;
