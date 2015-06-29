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

// Initialize Evaluator
new dataStorage.Evaluator({
  email: 'vladimir.ikryanov@teamdev.com',
  firstName: 'Vladimir',
  notes: 'Some custom notes...',
  dateTime: Date.now()
}).save(function (err, evaluator) {
    saveCallback(err, 'Evaluator');
    // Initialize Pipeline
    new dataStorage.Pipeline({
      title: 'JxBrowser 30-days Evaluation'
    }).save(function (err, pipeline) {
        saveCallback(err, 'Pipeline');
        // Initialize PipelinePhase
        for (var index = 0; index < 5; index++) {
          new dataStorage.PipelinePhase({
            pipelineId: pipeline._id,
            emailIndex: index
          }).save(function (err, pipelinePhase) {
              saveCallback(err, 'PipelinePhase');
              // Initialize EvaluatorPipelinePhase
              new dataStorage.EvaluatorPipelinePhase({
                evaluatorId: evaluator._id,
                pipelinePhaseId: pipelinePhase._id,
                offsetInDays: 1,
                status: 'Open'
              }).save(function (err) {
                  saveCallback(err, 'EvaluatorPipelinePhase');
                });
            });
        }
      });
  });