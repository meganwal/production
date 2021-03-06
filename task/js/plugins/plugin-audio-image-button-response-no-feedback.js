// Modifications:
// - Removed code to build buttons.
// - trial.response is not an integer, so removed parseInt
// - Added button_html to trial data.
// - Added border after image is selected



var jsPsychAudioImageButtonResponseNoFeedback = (function (jspsych) {
  'use strict';

  const info = {
      name: "audio-image-button-response-no-feedback",
      parameters: {
          /** The audio to be played. */
          stimulus: {
              type: jspsych.ParameterType.AUDIO,
              pretty_name: "Stimulus",
              default: undefined,
          },
          /** Array containing the label(s) for the button(s). */
          choices: {
              type: jspsych.ParameterType.STRING,
              pretty_name: "Choices",
              default: undefined,
              array: true,
          },
          /** The HTML for creating button. Can create own style. Use the "%choice%" string to indicate where the label from the choices parameter should be inserted. */
          button_html: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Button HTML",
              default: '<button class="jspsych-btn">%choice%</button>',
              array: true,
          },
          /** Any content here will be displayed below the stimulus. */
          prompt: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Prompt",
              default: null,
          },
          /** The maximum duration to wait for a response. */
          trial_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Trial duration",
              default: null,
          },
          /** Vertical margin of button. */
          margin_vertical: {
              type: jspsych.ParameterType.STRING,
              pretty_name: "Margin vertical",
              default: "0px",
          },
          /** Horizontal margin of button. */
          margin_horizontal: {
              type: jspsych.ParameterType.STRING,
              pretty_name: "Margin horizontal",
              default: "8px",
          },
          /** If true, the trial will end when user makes a response. */
          response_ends_trial: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Response ends trial",
              default: true,
          },
          /** If true, then the trial will end as soon as the audio file finishes playing. */
          trial_ends_after_audio: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Trial ends after audio",
              default: false,
          },
          /**
           * If true, then responses are allowed while the audio is playing.
           * If false, then the audio must finish playing before a response is accepted.
           */
          response_allowed_while_playing: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Response allowed while playing",
              default: true,
          },
      },
  };
  /**
   * **audio-button-response**
   *
   * jsPsych plugin for playing an audio file and getting a button response
   *
   * @author Kristin Diep
   * @see {@link https://www.jspsych.org/plugins/jspsych-audio-button-response/ audio-button-response plugin documentation on jspsych.org}
   */
  class AudioImageButtonResponseNoFeedbackPlugin {
      constructor(jsPsych) {
          this.jsPsych = jsPsych;
      }
      trial(display_element, trial, on_load) {
          // hold the .resolve() function from the Promise that ends the trial
          let trial_complete;
          // setup stimulus
          var context = this.jsPsych.pluginAPI.audioContext();
          // store response
          var response = {
              rt: null,
              button: null,
          };
          // record webaudio context start time
          var startTime;
          // load audio file
          this.jsPsych.pluginAPI
              .getAudioBuffer(trial.stimulus)
              .then((buffer) => {
              if (context !== null) {
                  this.audio = context.createBufferSource();
                  this.audio.buffer = buffer;
                  this.audio.connect(context.destination);
              }
              else {
                  this.audio = buffer;
                  this.audio.currentTime = 0;
              }
              setupTrial();
          })
              .catch((err) => {
              console.error(`Failed to load audio file "${trial.stimulus}". Try checking the file path. We recommend using the preload plugin to load audio files.`);
              console.error(err);
          });
          const setupTrial = () => {
              // set up end event if trial needs it
              if (trial.trial_ends_after_audio) {
                  this.audio.addEventListener("ended", end_trial);
              }
              // enable buttons after audio ends if necessary
              if (!trial.response_allowed_while_playing && !trial.trial_ends_after_audio) {
                  this.audio.addEventListener("ended", enable_buttons);
              }

              // MODIFICATION: Removed all building of image-buttons. This is instead done when the plugin is called, and added to the HTML here via button_html.
              //display buttons
              var html = '<div id="jspsych-audio-button-response-btngroup">';
              html += trial.button_html;
              html += '<span class = "hidden_text" id = "reminder"> Please respond. </span>'
              html += "</div>";

              //MODIFICATION: hidden message becomes visible after 5 seconds
              var hidden_message = null;
              this.jsPsych.pluginAPI.setTimeout(()=> {
                  hidden_message = document.getElementById("reminder"),
                  hidden_message.classList.replace('hidden_text','visible_text')
                }, 7000);

              //show prompt if there is one
              if (trial.prompt !== null) {
                  html += trial.prompt;
              }
              display_element.innerHTML = html;
              if (trial.response_allowed_while_playing) {
                  enable_buttons();
              }
              else {
                  disable_buttons();
              }
              // start time
              startTime = performance.now();
              // start audio
              if (context !== null) {
                  startTime = context.currentTime;
                  this.jsPsych.pluginAPI.setTimeout(()=> {
                    this.audio.start(startTime);
                  }, 2000);
              }
              else {
                  this.audio.play();
              }
              // end trial if time limit is set
              if (trial.trial_duration !== null) {
                  this.jsPsych.pluginAPI.setTimeout(() => {
                      end_trial();
                  }, trial.trial_duration);
              }
              on_load();
          };
          // function to handle responses by the subject
          function after_response(choice) {
              // measure rt
              var endTime = performance.now();
              var rt = Math.round(endTime - startTime);
              if (context !== null) {
                  endTime = context.currentTime;
                  rt = Math.round((endTime - startTime) * 1000);
              }

              // MODIFICATION: RESPONSE IS NOT AN INTEGER
              response.button = choice;
              response.rt = rt;
              // disable all the buttons after a response
              disable_buttons();
              if (trial.response_ends_trial) {
                  end_trial();
              }
          }
          // function to end trial when it is time
          const end_trial = () => {
              // kill any remaining setTimeout handlers
              this.jsPsych.pluginAPI.clearAllTimeouts();
              // stop the audio file if it is playing
              // remove end event listeners if they exist
              if (context !== null) {
                  this.audio.stop();
              }
              else {
                  this.audio.pause();
              }
              this.audio.removeEventListener("ended", end_trial);
              this.audio.removeEventListener("ended", enable_buttons);
              // gather the data to store for the trial
              var trial_data = {
                  rt: response.rt,
                  stimulus: trial.stimulus,
                  response: response.button,

                  // MODIFICATION: ADDED button_html TO TRIAL DATA
                  button_html: trial.button_html,
            };
              // MODIFICATION: SHOW ITEM SELECTED BY HIGHLIGHTING CLICKED IMAGE WITH BLUE BORDER
              var clicked_image = null;
              var nodes = document.querySelectorAll("img.unselected");
                for (var i = 0; i < nodes.length; i++) {
                  if (nodes[i].getAttribute("data-choice") == response.button) {
                    clicked_image = nodes[i];
                  }
                }
              clicked_image.classList.replace('unselected','selected')
              this.jsPsych.pluginAPI.setTimeout(() => {
                  // clear the display
                  display_element.innerHTML = "";
                  // move on to the next trial
                  this.jsPsych.finishTrial(trial_data);
                  trial_complete();
              }, 1000); // CHANGE TIME-LENGTH OF FEEDBACK HERE

          };

          function button_response(e) {
              var choice = e.currentTarget.getAttribute("data-choice"); // don't use dataset for jsdom compatibility
              after_response(choice);
          }
          function disable_buttons() {
              var btns = document.querySelectorAll(".jspsych-audio-button-response-button");
              for (var i = 0; i < btns.length; i++) {
                  var btn_el = btns[i].querySelector("button");
                  if (btn_el) {
                      btn_el.disabled = true;
                  }
                  btns[i].removeEventListener("click", button_response);
              }
          }
          function enable_buttons() {
              var btns = document.querySelectorAll(".jspsych-audio-button-response-button");
              for (var i = 0; i < btns.length; i++) {
                  var btn_el = btns[i].querySelector("button");
                  if (btn_el) {
                      btn_el.disabled = false;
                  }
                  btns[i].addEventListener("click", button_response);
              }
          }
          return new Promise((resolve) => {
              trial_complete = resolve;
          });
      }
      simulate(trial, simulation_mode, simulation_options, load_callback) {
          if (simulation_mode == "data-only") {
              load_callback();
              this.simulate_data_only(trial, simulation_options);
          }
          if (simulation_mode == "visual") {
              this.simulate_visual(trial, simulation_options, load_callback);
          }
      }
      create_simulation_data(trial, simulation_options) {
          const default_data = {
              stimulus: trial.stimulus,
              rt: this.jsPsych.randomization.sampleExGaussian(500, 50, 1 / 150, true),
              response: this.jsPsych.randomization.randomInt(0, trial.choices.length - 1),
          };
          const data = this.jsPsych.pluginAPI.mergeSimulationData(default_data, simulation_options);
          this.jsPsych.pluginAPI.ensureSimulationDataConsistency(trial, data);
          return data;
      }
      simulate_data_only(trial, simulation_options) {
          const data = this.create_simulation_data(trial, simulation_options);
          this.jsPsych.finishTrial(data);
      }
      simulate_visual(trial, simulation_options, load_callback) {
          const data = this.create_simulation_data(trial, simulation_options);
          const display_element = this.jsPsych.getDisplayElement();
          const respond = () => {
              if (data.rt !== null) {
                  this.jsPsych.pluginAPI.clickTarget(display_element.querySelector(`div[data-choice="${data.response}"] button`), data.rt);
              }
          };
          this.trial(display_element, trial, () => {
              load_callback();
              if (!trial.response_allowed_while_playing) {
                  this.audio.addEventListener("ended", respond);
              }
              else {
                  respond();
              }
          });
      }
  }
  AudioImageButtonResponseNoFeedbackPlugin.info = info;

  return AudioImageButtonResponseNoFeedbackPlugin;

})(jsPsychModule);
