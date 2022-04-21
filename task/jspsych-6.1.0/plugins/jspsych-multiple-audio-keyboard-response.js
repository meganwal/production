/**
 * jspsych-multiple-audio-keyboard-response
 * Francis Ng
 *
 * plugin for playing an audio file and getting a keyboard response
 *
 * documentation: built off docs.jspsych.org 
 *
 * Requires howler library
 **/

jsPsych.plugins["audio-keyboard-response"] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('audio-keyboard-response', 'stimulus', 'audio');

  plugin.info = {
    name: 'audio-keyboard-response',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.AUDIO,
        pretty_name: 'Stimulus',
        array: true,
        default: undefined,
        description: 'The audio to be played.'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Choices',
        array: true,
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'The maximum duration to wait for a response.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, the trial will end when user makes a response.'
      },
      trial_ends_after_audio: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Trial ends after audio',
        default: false,
        description: 'If true, then the trial will end as soon as the audio file finishes playing.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    // show prompt if there is one
    if (trial.prompt !== null) {
      display_element.innerHTML = trial.prompt;
    }

    // function to end trial when it is time
    function end_trial() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();


      // gather the data to store for the trial

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };


    // start audio
    var audio = new Audio();
    audio.addEventListener('ended', function(){
      for (var i = 0; i <= trial.stimulus.length; i++){
        audio.src = trial.stimulus[i];
        audio.play();
      }
    }, true);
    audio.play();
    

    // end trial if time limit is set
    // if (trial.trial_duration !== null) {
    //   jsPsych.pluginAPI.setTimeout(function() {
    //     end_trial();
    //   }, trial.trial_duration);
    // }

  };

  return plugin;
})();
