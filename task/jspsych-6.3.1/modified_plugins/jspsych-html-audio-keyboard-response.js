/**
 * jspsych-html-audio-keyboard-response
 * Josh de Leeuw
 *
 * plugin for displaying a stimulus and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/


jsPsych.plugins["html-audio-keyboard-response"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-audio-keyboard-response',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEY,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
      audio: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Audio File',
        default: undefined,
        description: 'The Audio File to play'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      audio_start_time: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Audio start time',
        default: 0,
        description: 'How long to wait before playing audio.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when subject makes a response.'
      },

    }
  }

  plugin.trial = function(display_element, trial) {

    // RESEARCHER EDIT: Added function 'playThisIs'
    // When called, this function waits 100ms, then plays the audio file 'ThisIs.mp3' which contains the phrase "This is..."
    // This is called at the start of every trial using this plugin.
    function playSound() {

        var context = jsPsych.pluginAPI.audioContext();

        var startTime;

        // load audio file
        var audio;

        jsPsych.pluginAPI.getAudioBuffer(trial.audio)
          .then(function (buffer) {
            if (context !== null) {
              audio = context.createBufferSource();
              audio.buffer = buffer;
              audio.connect(context.destination);
            } else {
              audio = buffer;
              audio.currentTime = 0;
            }

            // start time
            startTime = performance.now();

            // start audio in audio context
            if (context !== null) {
                startTime = context.currentTime;

                // play audio after 1 second
                audio.start(startTime);
            }
            // or, start audio using js player
            else {
                let playAudio = function() {
                    audio.play();
                }

                // play audio after 1000ms
                setTimeout(playAudio,trial.audio_start_time);
            }
        });
    }

    var new_html = '<div id="jspsych-html-keyboard-response-stimulus">'+trial.stimulus+'</div>';

    // add prompt
    if(trial.prompt !== null){
      new_html += trial.prompt;
    }


    //if you want a delay- setTimeout(playThisIs(),1000ms)
    playSound()
    //after this is--play correct with setTimeout(playLabel(),1000)
    //trial.parameter is the syntax for accessing parameter

    // draw
    display_element.innerHTML = new_html;

    // store response
    var response = {
      rt: null,
      key: null
    };

    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // gather the data to store for the trial
      var trial_data = {
        rt: response.rt,
        stimulus: trial.stimulus,
        response: response.key
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // function to handle responses by the subject
    var after_response = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#jspsych-html-keyboard-response-stimulus').className += ' responded';

      // only record the first response
      if (response.key == null) {
        response = info;
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }

    // hide stimulus if stimulus_duration is set
    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-keyboard-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }



  };

  return plugin;
})();
