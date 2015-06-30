var dataStorage = require('../lib/data.js');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/evaluator');

// Remove all Documents
dataStorage.Pipeline.find({}).remove().exec();
dataStorage.Evaluator.find({}).remove().exec();
dataStorage.PipelinePhase.find({}).remove().exec();
dataStorage.EvaluatorPipelinePhase.find({}).remove().exec();

// Fill Data Base with data
dataStorage.CreateEvaluator('vladimir.ikryanov@teamdev.com', 'Vladimir', 'Some custom notes...', Date.now(), function (err, evaluator) {
  dataStorage.CreatePipeline('JxBrowser 30-days Evaluation', function (err, pipeline) {
    dataStorage.CreatePipelinePhase(pipeline._id, 0, function (err, pipelinePhase) {
      dataStorage.CreateEvaluatorPipelinePhase(evaluator._id, pipelinePhase._id, 1, function (err, evaluatorPipelinePhase) {
        console.info('Done');
      });
    });
    dataStorage.CreatePipelinePhase(pipeline._id, 1, function (err, pipelinePhase) {
      dataStorage.CreateEvaluatorPipelinePhase(evaluator._id, pipelinePhase._id, 7, function (err, evaluatorPipelinePhase) {
        console.info('Done');
      });
    });
    dataStorage.CreatePipelinePhase(pipeline._id, 2, function (err, pipelinePhase) {
      dataStorage.CreateEvaluatorPipelinePhase(evaluator._id, pipelinePhase._id, 20, function (err, evaluatorPipelinePhase) {
        console.info('Done');
      });
    });
    dataStorage.CreatePipelinePhase(pipeline._id, 3, function (err, pipelinePhase) {
      dataStorage.CreateEvaluatorPipelinePhase(evaluator._id, pipelinePhase._id, 29, function (err, evaluatorPipelinePhase) {
        console.info('Done');
      });
    });
    dataStorage.CreatePipelinePhase(pipeline._id, 4, function (err, pipelinePhase) {
      dataStorage.CreateEvaluatorPipelinePhase(evaluator._id, pipelinePhase._id, 30, function (err, evaluatorPipelinePhase) {
        console.info('Done');
      });
    });
  });
});