var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = {
  Evaluator: mongoose.model('Evaluator', {
    email: {type: String, required: true},
    firstName: String,
    notes: String,
    dateTime: {type: Date, required: true}
  }),
  Pipeline: mongoose.model('Pipeline', {
    title: {type: String, required: true}
  }),
  PipelinePhase: mongoose.model('PipelinePhase', {
    pipelineId: {type: ObjectId, required: true},
    emailIndex: {type: Number, required: true}
  }),
  EvaluatorPipelinePhase: mongoose.model('EvaluatorPipelinePhase', {
    evaluatorId: {type: ObjectId, required: true},
    pipelinePhaseId: {type: ObjectId, required: true},
    offsetInDays: {type: Number, required: true},
    status: {type: String, enum: ['Open', 'Canceled', 'Completed'], required: true}
  }),
  User: mongoose.model('User', {
    oauthID: Number,
    name: String
  })
};