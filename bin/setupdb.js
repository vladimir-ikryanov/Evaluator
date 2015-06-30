var dataStorage = require('../model/data.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/evaluator');

// Remove all Documents
dataStorage.Pipeline.find({}).remove().exec();
dataStorage.Evaluator.find({}).remove().exec();
dataStorage.PipelinePhase.find({}).remove().exec();
dataStorage.EvaluatorPipelinePhase.find({}).remove().exec();

// Save callback
var saveCallback = function (err, info) {
  if (err) {
    console.error(err);
  } else {
    console.info(info + ' [OK]');
  }
};

var createPipelinePhase = function (evaluator, pipeline, emailIndex, offsetInDays) {
  new dataStorage.PipelinePhase({
    pipelineId: pipeline._id,
    emailIndex: emailIndex
  }).save(function (err, pipelinePhase) {
      saveCallback(err, 'PipelinePhase');
      new dataStorage.EvaluatorPipelinePhase({
        evaluatorId: evaluator._id,
        pipelinePhaseId: pipelinePhase._id,
        offsetInDays: offsetInDays,
        status: 'Open'
      }).save(function (err) {
          saveCallback(err, 'EvaluatorPipelinePhase ' + emailIndex);
        });
    });
};

var createPipeline = function (evaluator) {
  new dataStorage.Pipeline({
    title: 'JxBrowser 30-days Evaluation'
  }).save(function (err, pipeline) {
      saveCallback(err, 'Pipeline');
      createPipelinePhase(evaluator, pipeline, 0, 1);
      createPipelinePhase(evaluator, pipeline, 1, 7);
      createPipelinePhase(evaluator, pipeline, 2, 20);
      createPipelinePhase(evaluator, pipeline, 3, 29);
      createPipelinePhase(evaluator, pipeline, 4, 30);
    });
};

var createEvaluator = function () {
  new dataStorage.Evaluator({
    email: 'vladimir.ikryanov@teamdev.com',
    firstName: 'Vladimir',
    notes: 'Some custom notes...',
    dateTime: Date.now()
  }).save(function (err, evaluator) {
      saveCallback(err, 'Evaluator');
      createPipeline(evaluator);
    });
};

// Fill Data Base with data
createEvaluator();