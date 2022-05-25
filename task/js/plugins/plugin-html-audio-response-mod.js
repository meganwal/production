// Modifications:
// - Play "This is a..." at beginning of trial
// - Modify Done Button to appear like button in audio-button-response plugin
// - Initially disable Done Button, then enable after specified time
// - Disable Done Button and play feedback (audio of target word) at end of trial



var jsPsychHtmlAudioResponseMod = (function (jspsych) {
  'use strict';

  const info = {
      name: "html-audio-response-mod",
      parameters: {
          /** The HTML string to be displayed */
          stimulus: {
              type: jspsych.ParameterType.HTML_STRING,
              default: undefined,
          },
          /** How long to show the stimulus. */
          stimulus_duration: {
              type: jspsych.ParameterType.INT,
              default: null,
          },
          /** How long to show the trial. */
          recording_duration: {
              type: jspsych.ParameterType.INT,
              default: 2000,
          },
          show_done_button: {
              type: jspsych.ParameterType.BOOL,
              default: true,
          },
          done_button_label: {
              type: jspsych.ParameterType.STRING,
              default: "Continue",
          },
          record_again_button_label: {
              type: jspsych.ParameterType.STRING,
              default: "Record again",
          },
          accept_button_label: {
              type: jspsych.ParameterType.STRING,
              default: "Continue",
          },
          allow_playback: {
              type: jspsych.ParameterType.BOOL,
              default: false,
          },
          save_audio_url: {
              type: jspsych.ParameterType.BOOL,
              default: false,
          },
      },
  };
  /**
   * html-audio-response
   * jsPsych plugin for displaying a stimulus and recording an audio response through a microphone
   * @author Josh de Leeuw
   * @see {@link https://www.jspsych.org/plugins/jspsych-html-audio-response/ html-audio-response plugin documentation on jspsych.org}
   */
  class HtmlAudioResponseModPlugin {
      constructor(jsPsych) {
          this.jsPsych = jsPsych;
          this.rt = null;
          this.recorded_data_chunks = [];
      }
      trial(display_element, trial) {
          this.recorder = this.jsPsych.pluginAPI.getMicrophoneRecorder();
          this.setupRecordingEvents(display_element, trial);
          this.startRecording();
      }
      showDisplay(display_element, trial) {
          const ro = new ResizeObserver((entries, observer) => {
              this.stimulus_start_time = performance.now();
              observer.unobserve(display_element);
              //observer.disconnect();
          });
          ro.observe(display_element);
          //MODIFICATION: ADD REMINDER AT TOP
          let html = '<span class= "reminder_text"> Please say the name of the image in the blue border </span>';
          html += `<div id="jspsych-html-audio-response-stimulus">${trial.stimulus}</div>`;

          // MODIFICATION: MAKE DONE BUTTON LOOK LIKE BUTTON IN AUDIO-BUTTON-RESPONSE PLUGIN
          if (trial.show_done_button) {
              html += `
                        <div class="lower_btn" style="cursor: pointer; display: inline-block; margin:0px 4px">
                          <button class="jspsych-btn" id="finish-trial">${trial.done_button_label}</button>
                        </div>
                      `;
          }

          html += '<br> <span class = "hidden_text" id = "reminder"> Please respond. </span>';
          display_element.innerHTML = html;
          var target_selected = null
          this.jsPsych.pluginAPI.setTimeout(()=> {
              target_selected = document.getElementById("finish-trial"),
              target_selected.classList.replace('unselected','selected')
            }, 2000);
          var hidden_message = null
          this.jsPsych.pluginAPI.setTimeout(()=> {
              hidden_message = document.getElementById("reminder"),
              hidden_message.classList.replace('hidden_text','visible_text')
            }, 7000);
      }
      hideStimulus(display_element) {
          const el = display_element.querySelector("#jspsych-html-audio-response-stimulus");
          if (el) {
              el.style.visibility = "hidden";
          }
      }
      addButtonEvent(display_element, trial) {
          const btn = display_element.querySelector("#finish-trial");

          // MODIFICATION: INITIALLY DISABLE DONE BUTTON, ENABLE AFTER SPECIFIED TIME
          btn.disabled = true;
          setTimeout(() => {
              btn.disabled = false;
              btn.addEventListener("click", () => {
                  const end_time = performance.now();
                  this.rt = Math.round(end_time - this.stimulus_start_time);
                  this.stopRecording().then(() => {
                      if (trial.allow_playback) {
                          this.showPlaybackControls(display_element, trial);
                      }
                      else {
                          this.endTrial(display_element, trial);
                      }
                  });
              });
          }, 3000) // CHANGE TIME-LENGTH OF DISABLED BUTTON HERE

      }
      setupRecordingEvents(display_element, trial) {
          this.data_available_handler = (e) => {
              if (e.data.size > 0) {
                  this.recorded_data_chunks.push(e.data);
              }
          };
          this.stop_event_handler = () => {
              const data = new Blob(this.recorded_data_chunks, { type: "audio/webm" });
              this.audio_url = URL.createObjectURL(data);
              const reader = new FileReader();
              reader.addEventListener("load", () => {
                  const base64 = reader.result.split(",")[1];
                  this.response = base64;
                  this.load_resolver();
              });
              reader.readAsDataURL(data);
          };
          this.start_event_handler = (e) => {
              // resets the recorded data
              this.recorded_data_chunks.length = 0;
              this.recorder_start_time = e.timeStamp;
              this.showDisplay(display_element, trial);
              this.addButtonEvent(display_element, trial);
              // setup timer for hiding the stimulus
              if (trial.stimulus_duration !== null) {
                  this.jsPsych.pluginAPI.setTimeout(() => {
                      this.hideStimulus(display_element);
                  }, trial.stimulus_duration);
              }
              // setup timer for ending the trial
              if (trial.recording_duration !== null) {
                  this.jsPsych.pluginAPI.setTimeout(() => {
                      // this check is necessary for cases where the
                      // done_button is clicked before the timer expires
                      if (this.recorder.state !== "inactive") {
                          this.stopRecording().then(() => {
                              if (trial.allow_playback) {
                                  this.showPlaybackControls(display_element, trial);
                              }
                              else {
                                  this.endTrial(display_element, trial);
                              }
                          });
                      }
                  }, trial.recording_duration);
              }
          };
          this.recorder.addEventListener("dataavailable", this.data_available_handler);
          this.recorder.addEventListener("stop", this.stop_event_handler);
          this.recorder.addEventListener("start", this.start_event_handler);
      }
      startRecording() {
          this.recorder.start();
      }
      stopRecording() {
          this.recorder.stop();
          return new Promise((resolve) => {
              this.load_resolver = resolve;
          });
      }
      showPlaybackControls(display_element, trial) {
          display_element.innerHTML = `
      <p><audio id="playback" src="${this.audio_url}" controls></audio></p>
      <button id="record-again" class="jspsych-btn">${trial.record_again_button_label}</button>
      <button id="continue" class="jspsych-btn">${trial.accept_button_label}</button>
    `;
          display_element.querySelector("#record-again").addEventListener("click", () => {
              // release object url to save memory
              URL.revokeObjectURL(this.audio_url);
              this.startRecording();
          });
          display_element.querySelector("#continue").addEventListener("click", () => {
              this.endTrial(display_element, trial);
          });
          // const audio = display_element.querySelector('#playback');
          // audio.src =
      }
      endTrial(display_element, trial) {
          // clear recordering event handler
          this.recorder.removeEventListener("dataavailable", this.data_available_handler);
          this.recorder.removeEventListener("start", this.start_event_handler);
          this.recorder.removeEventListener("stop", this.stop_event_handler);

          // kill any remaining setTimeout handlers
          this.jsPsych.pluginAPI.clearAllTimeouts();
          // gather the data to store for the trial
          var trial_data = {
              rt: this.rt,
              stimulus: trial.stimulus,
              response: this.response,
              estimated_stimulus_onset: Math.round(this.stimulus_start_time - this.recorder_start_time),
          };
          if (trial.save_audio_url) {
              trial_data.audio_url = this.audio_url;
          }
          else {
              URL.revokeObjectURL(this.audio_url);
          }

          // MODIFICATION: DISABLE DONE BUTTON, PLAY FEEDBACK (AUDIO OF TARGET WORD), AND THEN END TRIAL
          const btn = display_element.querySelector("#finish-trial");
          btn.disabled = true;

          var target_image = display_element.querySelector("#target");
          var target_word = target_image.getAttribute("target-word")

          var context = this.jsPsych.pluginAPI.audioContext();
          var startTime;
          this.jsPsych.pluginAPI
              .getAudioBuffer('media/audio/' + target_word + '.flac') // CHANGE CORRECT AUDIO FILE NAME HERE
              .then((buffer) => {
                  if (context !== null) {
                      this.audio = context.createBufferSource();
                      this.audio.buffer = buffer;
                      this.audio.connect(context.destination);

                      startTime = performance.now();
                      startTime = context.currentTime;
                      this.audio.start(startTime);
                  }
                  else {
                      this.audio = buffer;
                      this.audio.currentTime = 0;
                      this.audio.play();
                  }
              }).catch((err) => {console.error(err)})
            setTimeout(() => {
                display_element.innerHTML = "";
                this.jsPsych.finishTrial(trial_data);
            }, 3000) // CHANGE TIME-LENGTH OF WHEN TO END TRIAL HERE (E.G. AFTER LENGTH OF LONGEST AUDIO FILE) -- THIS IS A CONSTANT REGARDLESS OF LENGTH OF AUDIO FILE!

      }
  }
  HtmlAudioResponseModPlugin.info = info;

  return HtmlAudioResponseModPlugin;

})(jsPsychModule);
