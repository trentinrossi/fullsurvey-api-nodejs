// let mongoose = require('mongoose');
let Respondent = require('./respondent.model');

let server = require('../../index');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.should();
chai.use(chaiHttp);

describe('Respondent API test suite', () => {
  beforeEach((done) => {
    Respondent.remove({}, (err) => {
      done();
    });
  });

  /**
   * Test de /GET routes
   */
  describe('/GET respondent', () => {
    it('It should return empty respondents', (done) => {
      chai
        .request(server)
        .get('/respondent')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('data');
          res.body.should.have.property('meta');
          res.body.data.should.be.a('array');          
          done();
        });
    });

    it('It should return 404', (done) => {
      chai
        .request(server)
        .get('/respondenthotfound')
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test de /POST routes
   */
  describe('/POST respondent', () => {
    it('It should return a Validation Error', (done) => {
      let respondent = {
        identifier: '02394823094830432',
        type: 'EMPLOYEE',
        registration: '321',
        // name: 'Rodrigo Rossi',
        cpf: '059.020.049-69',
        // email: 'rdrg.rossi@gmail.com',
        phone: '987987987987',
        admissionDate: new Date().toISOString(),
        expContractExpiration: new Date().toISOString(),
        educationLevel: 'POS graduação completa',
        workstationId: '112.326',
        workstationName: 'Professional Services',
        positionName: 'Integration Engineer',
        dismissalDate: new Date('2020-10-05').toISOString(),
        dismissalCause: '',
        companyId: '5545',
        companyName: 'LinkApi Soluções em Tecnologia Ltda',
        branchId: '1',
        branchName: 'Filial Matriz',
        visitDate: '',
        visitDescription: '',
      };

      chai
        .request(server)
        .post('/respondent')
        .send(respondent)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a('object');
          res.body.should.have.property('moreInfo');
          res.body.moreInfo.should.have.property('email');
          res.body.moreInfo.should.have.property('name');
          res.body.moreInfo.email.should.have.property('kind').eql('required');
          res.body.moreInfo.name.should.have.property('kind').eql('required');
          done();
        });
    });
    it('It should POST a respondent', (done) => {
      let respondent = {
        identifier: '02394823094830432',
        type: 'EMPLOYEE',
        registration: '321',
        name: 'Rodrigo Rossi',
        cpf: '059.020.049-69',
        email: 'rdrg.rossi@gmail.com',
        phone: '987987987987',
        admissionDate: new Date().toISOString(),
        expContractExpiration: new Date().toISOString(),
        educationLevel: 'POS graduação completa',
        workstationId: '112.326',
        workstationName: 'Professional Services',
        positionName: 'Integration Engineer',
        dismissalDate: '',
        dismissalCause: '',
        companyId: '5545',
        companyName: 'LinkApi Soluções em Tecnologia Ltda',
        branchId: '1',
        branchName: 'Filial Matriz',
        visitDate: '',
        visitDescription: '',
      };

      chai
        .request(server)
        .post('/respondent')
        .send(respondent)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('identifier');
          res.body.should.have.property('type');
          res.body.should.have.property('registration');
          res.body.should.have.property('name');
          res.body.should.have.property('cpf');
          res.body.should.have.property('email');
          res.body.should.have.property('phone');
          res.body.should.have.property('admissionDate');
          res.body.should.have.property('expContractExpiration');
          res.body.should.have.property('educationLevel');
          res.body.should.have.property('workstationId');
          res.body.should.have.property('positionName');
          res.body.should.have.property('dismissalDate');
          res.body.should.have.property('dismissalCause');
          res.body.should.have.property('companyId');
          res.body.should.have.property('companyName');
          res.body.should.have.property('branchId');
          res.body.should.have.property('branchName');
          res.body.should.have.property('visitDate');
          res.body.should.have.property('visitDescription');
          done();
        });
    });
  });

  describe('/GET/:id respondent', () => {
    it('It should GET a respondent by the given id', (done) => {
      let respondent = new Respondent({
        identifier: '92384723984734923',
        type: 'EMPLOYEE',
        registration: '8837',
        name: 'Alexandre Martins',
        cpf: '045.659.556-598',
        email: 'alexandre.martins@demonstra.com.br',
        phone: '4857884745847',
        admissionDate: new Date().toISOString(),
        expContractExpiration: new Date().toISOString(),
        educationLevel: 'Superior Completo',
        workstationId: '112.223',
        workstationName: 'Suporte ao Cliente',
        positionName: 'Analista de Suporte II',
        dismissalDate: '',
        dismissalCause: '',
        companyId: '5545',
        companyName: 'LinkApi Soluções em Tecnologia Ltda',
        branchId: '1',
        branchName: 'Filial Matriz',
        visitDate: '',
        visitDescription: '',
      });
      respondent.save((err, respondent) => {
        chai
          .request(server)
          .get(`/respondent/${respondent.email}`)
          .send(respondent)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('identifier');
            res.body.should.have.property('type');
            res.body.should.have.property('registration');
            res.body.should.have.property('name');
            res.body.should.have.property('cpf');
            res.body.should.have.property('email');
            res.body.should.have.property('phone');
            res.body.should.have.property('admissionDate');
            res.body.should.have.property('expContractExpiration');
            res.body.should.have.property('educationLevel');
            res.body.should.have.property('workstationId');
            res.body.should.have.property('positionName');
            res.body.should.have.property('dismissalDate');
            res.body.should.have.property('dismissalCause');
            res.body.should.have.property('companyId');
            res.body.should.have.property('companyName');
            res.body.should.have.property('branchId');
            res.body.should.have.property('branchName');
            res.body.should.have.property('visitDate');
            res.body.should.have.property('visitDescription');
            done();
          });
      });
    });
  });

  describe('/PATCH/:id respondent', () => {
    // it('It NOT should UPDATE a respondent', (done) => {
    //   let respondent = new Respondent({
    //     identifier: '92384723984734923',
    //     type: 'EMPLOYEE',
    //     registration: '8837',
    //     name: 'Alexandre Martins',
    //     cpf: '045.659.556-59',
    //     email: 'alexandre.martins@demonstra.com.br',
    //     phone: '4857884745847',
    //     admissionDate: new Date().toISOString(),
    //     expContractExpiration: new Date().toISOString(),
    //     educationLevel: 'Superior Completo',
    //     workstationId: '112.223',
    //     workstationName: 'Suporte ao Cliente',
    //     positionName: 'Analista de Suporte II',
    //     dismissalDate: '',
    //     dismissalCause: '',
    //     companyId: '5545',
    //     companyName: 'LinkApi Soluções em Tecnologia Ltda',
    //     branchId: '1',
    //     branchName: 'Filial Matriz',
    //     visitDate: '',
    //     visitDescription: '',
    //   });
    //   respondent.save((err, respondent) => {
    //     chai
    //       .request(server)
    //       .patch(`/respondent/${respondent.email}`)
    //       .send({ email: 'alexandre.martins2@demonstra.com.br' })
    //       .end((err, res) => {
    //         res.should.have.status(400);
    //         res.body.should.be.a('object');
    //         res.body.should.have.property('code');
    //         res.body.code.should.equal(10403);
    //         done();
    //       });
    //   });
    // });

    it('It should UPDATE a respondent', (done) => {
      const datSis = new Date().toISOString();
      const datZer = new Date('1970-01-01T00:00:00');

      let respondent = new Respondent({
        identifier: '320942384093284',
        type: 'EMPLOYEE',
        registration: '1232',
        name: 'Maria Eduarda de Freitas',
        cpf: '393.009.938-49',
        email: 'maria.freitas38347@hotmail.com',
        phone: '11998923839',
        admissionDate: datSis,
        expContractExpiration: datSis,
        educationLevel: 'Superior Incompleto',
        workstationId: '223.222',
        workstationName: 'Vendas',
        positionName: 'Analista de Compras Jr II',
        dismissalDate: '',
        dismissalCause: '',
        companyId: '5545',
        companyName: 'LinkApi Soluções em Tecnologia Ltda',
        branchId: '1',
        branchName: 'Filial Matriz',
        visitDate: '',
        visitDescription: '',
      });
      respondent.save((err, respondent) => {
        chai
          .request(server)
          .patch(`/respondent/${respondent.email}`)
          .send({
            identifier: '323344444',
            type: 'EMPLOYEE',
            registration: '1233',
            name: 'Maria Eduarda de Freitas Alterado',
            cpf: '393.009.938-50',
            phone: '333333333333',
            educationLevel: 'Superior Incompleto II',
            workstationId: '223.22233',
            workstationName: 'Vendas II',
            positionName: 'Analista de Compras Jr',
            admissionDate: datSis,
            dismissalDate: datSis,
            visitDate: datZer,
          })
          .end((err, res) => {
            // console.log(res.res);
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('identifier');
            res.body.should.have.property('type');
            res.body.should.have.property('registration');
            res.body.should.have.property('name');
            res.body.should.have.property('cpf');
            res.body.should.have.property('email');
            res.body.should.have.property('phone');
            res.body.should.have.property('admissionDate');
            res.body.should.have.property('expContractExpiration');
            res.body.should.have.property('educationLevel');
            res.body.should.have.property('workstationId');
            res.body.should.have.property('positionName');
            res.body.should.have.property('dismissalDate');
            res.body.should.have.property('dismissalCause');
            res.body.should.have.property('companyId');
            res.body.should.have.property('companyName');
            res.body.should.have.property('branchId');
            res.body.should.have.property('branchName');
            res.body.should.have.property('visitDate');
            res.body.should.have.property('visitDescription');

            res.body.identifier.should.equal('323344444');
            res.body.type.should.equal('EMPLOYEE');
            res.body.registration.should.equal(1233);
            res.body.name.should.equal('Maria Eduarda de Freitas Alterado');
            res.body.cpf.should.equal('393.009.938-50');
            res.body.email.should.equal('maria.freitas38347@hotmail.com');
            res.body.phone.should.equal('333333333333');
            res.body.admissionDate.should.equal(datSis);
            res.body.educationLevel.should.equal('Superior Incompleto II');
            res.body.workstationId.should.equal('223.22233');
            res.body.workstationName.should.equal('Vendas II');
            res.body.positionName.should.equal('Analista de Compras Jr');
            res.body.dismissalDate.should.equal(datSis);
            res.body.dismissalCause.should.equal('');
            res.body.companyId.should.equal(5545);
            res.body.companyName.should.equal(
              'LinkApi Soluções em Tecnologia Ltda'
            );
            res.body.branchId.should.equal(1);
            res.body.branchName.should.equal('Filial Matriz');
            res.body.visitDate.should.equal('1970-01-01T03:00:00.000Z');
            res.body.visitDescription.should.equal('');
            done();
          });
      });
    });
  });

  describe('/DELETE/:id respondent', () => {
    it('it should DELETE a respondent given the id', (done) => {
      let respondent = new Respondent({
        identifier: '9876543246854',
        type: 'EMPLOYEE',
        registration: '123123',
        name: 'Carlos Eduardo dos Passos',
        email: 'carlos39489@empresa.com',
        phone: '11998923839',
      });

      respondent.save((err, respondent) => {
        chai
          .request(server)
          .delete('/respondent/' + respondent.email)
          .end((err, res) => {
            res.should.have.status(204);
            done();
          });
      });
    });
  });
});
