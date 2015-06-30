var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = {

  // Models
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
  }),

  // Functions
  CreateEvaluatorPipelinePhase: function (evaluatorId, pipelinePhaseId, offsetInDays, callback) {
    new this.EvaluatorPipelinePhase({
      evaluatorId: evaluatorId,
      pipelinePhaseId: pipelinePhaseId,
      offsetInDays: offsetInDays,
      status: 'Open'
    }).save(function (err, evaluatorPipelinePhase) {
        callback(err, evaluatorPipelinePhase);
      });
  },
  CreateEvaluator: function (email, firstName, notes, dateTime, callback) {
    new this.Evaluator({
      email: email,
      firstName: firstName,
      notes: notes,
      dateTime: dateTime
    }).save(function (err, evaluator) {
        callback(err, evaluator);
      });
  },
  CreatePipelinePhase: function (pipelineId, emailIndex, callback) {
    new this.PipelinePhase({
      pipelineId: pipelineId,
      emailIndex: emailIndex
    }).save(function (err, pipelinePhase) {
        callback(err, pipelinePhase);
      });
  },
  CreatePipeline: function (title, callback) {
    new this.Pipeline({
      title: title
    }).save(function (err, pipeline) {
        callback(err, pipeline);
      });
  }
};