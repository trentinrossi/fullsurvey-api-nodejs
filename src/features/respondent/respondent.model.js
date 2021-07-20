const mongoose = require('mongoose');
const { Schema } = mongoose;

const respondentSchema = new Schema(
  {
    identifier: { type: String },
    type: {
      type: String,
      enum: ['EMPLOYEE', 'CANDIDATE', 'INTERN', 'VISITOR'],
      default: 'EMPLOYEE',
    },
    registration: { type: Number },
    name: { type: String, required: true },
    cpf: { type: String },
    email: { type: String, required: true },
    phone: { type: String },
    admissionDate: { type: Date, default: new Date('1970-01-01T00:00:00') },
    expContractExpiration: {
      type: Date,
      default: new Date('1970-01-01T00:00:00'),
    },
    educationLevel: { type: String },
    workstationId: { type: String },
    workstationName: { type: String },
    positionName: { type: String },
    dismissalDate: { type: Date, default: new Date('1970-01-01T00:00:00') },
    dismissalCause: { type: String },
    companyId: { type: Number },
    companyName: { type: String },
    branchId: { type: Number },
    branchName: { type: String },
    visitDate: { type: Date, default: new Date('1970-01-01T00:00:00') },
    visitDescription: { type: String },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model('Respondent', respondentSchema);
