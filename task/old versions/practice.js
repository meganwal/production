jatos.onLoad(function() {
  // INITIALIZE JSPSYCH

  let jsPsych = initJsPsych({
    on_finish: function() {
      let resultJson = jsPsych.data.get().json();
      jatos.submitResultData(resultJson);
      component_ending = true
      jatos.startNextComponent();
    },
    on_close: function() {
        // Only execute if the Component is not being ended by JATOS (but instead, by manual close by the participant).
        if (typeof component_ending === "undefined") {
            // Retrieve all data from the Batch Session.
            let batchSession = jatos.batchSession.getAll();

            // Retrieve the list of versions you manually entered as per 'Instructions for Running an Online Experiment: Rotating participant versions'
            let versionsList = batchSession.versionsList;

            // Get present version
            version =  jatos.studySessionData.version;

            // As long as the version list exists, add the present version back into the list.
            if (versionsList) {
                versionsList.push(version)
                jatos.batchSession.set("versionsList", versionsList)
            }
        }
    },
});

// Retrieve all data from the Batch Session. This is in the form of an object with various key-value pairs.
let batchSession = jatos.batchSession.getAll();

// Retrieve the list of versions you manually entered as per 'Instructions for Running an Online Experiment: Rotating participant versions'
let versionsList = batchSession.versionsList;

// We will use the variable 'version' to refer to the version of the present participant.
let version;

if (versionsList != undefined && versionsList != []) {
    // If versionsList exists and is not empty, then pull the present participant's version from that list at random.
    version = versionsList[Math.floor(Math.random() * versionsList.length)]

    // Remove one instance of that version from the Batch Session versionsList
    versionsList.splice(versionsList.indexOf(version), 1)
    jatos.batchSession.set("versionsList", versionsList)

    // IMPORTANT: If the participant leaves the experiment early, we want to add their version BACK into the versionsList.
    // We implement this in the on_close function above when we initialize JATOS, which only executes if the participant manually leaves the experiment.
} else {
    // This is a default way of assigning versions in case the other way fails i.e. the versionsList is empty or does not exist.
    // Here, we just randomly assign one of the versions (this assumes your versions are a number between 1 and some integer).

    // ACTION NEEDED: Set this to the maximum version number for your experiment. In this example, since the max version is 4, the set of versions is assumed to be: 1, 2, 3, 4
    let maxVersion = 3

    // Randomly set 'version' to be 1, 2, 3... up to your max version.
    version = String(Math.floor(Math.random() * maxVersion + 1))
}

// The Study Session (jatos.studySessionData) is an object, similar to the Batch Session, and it is accessible between different Components accessed by the same participant.
// We will add the version to the Study Session so that it can be retrieved in another Component- for example, if you are splitting your experiment into multiple Components.
// IMPORTANT: To retrieve this in another Component, include the following line at the beginning of that Component: version =  jatos.studySessionData.version;
jatos.studySessionData.version = version;

  // FUNCTION TO RANDOMIZE ORDER OF AN ARRAY IN PLACE

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // PRACTICE STIMS

  var practice_image_list = ["media/images/practice1.png", "media/images/practice2.png",
  "media/images/practice3.png", "media/images/practice4.png",
  "media/images/practice5.png", "media/images/practice6.png",
  "media/images/practice7.png", "media/images/practice8.png",
  "media/images/practice9.png"]

  var practice_audio_list = ["media/audio/ThisGam.flac", "media/audio/ClickGam.flac",
  "media/audio/Gam.flac"]

  var practice_video_list = ["media/video/Intro.mp4", "media/video/Study.mp4",
  "media/video/CompCorrect.mp4", "media/video/CompIncorrect.mp4",
  "media/video/Test.mp4"]

  let condition = 3

  var study_video_list =["media/video/Intro.mp4", "media/video/Study.mp4",
    "media/video/Test.mp4"]

  var comp_video_list =["media/video/Intro.mp4", "media/video/CompCorrect.mp4",
      "media/video/Test.mp4"]

  var prod_video_list = ["media/video/Intro.mp4", "media/video/Study.mp4",
      "media/video/Test.mp4"]

  // BEGIN EXPERIMENT

  let welcome = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
              <div class = "instructions_text">
                <p>Welcome to the experiement.</p>
                <p>In this study, you will be asked to remember the names of a series of pictures.</p>
                <p>Press "Continue" to proceed.</p>
              </div>
              `,
    choices: ['Continue'],
    data: {
      condition: condition,
      urlparameters_and_date: jatos.studySessionData,
    }
  };

  // MICROPHONE CHECK

  let mic_check_intro = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
              <div class = "instructions_text">
                <p>We will be recording audio in this experiment, so need to ensure you have a functioning microphone.</p>
                <p>On the next page, select your microphone.</p>
                <p>Press "Continue" to proceed.</p>
              </div>
              `,
    choices: ['Continue']
  };
  let init_mic = {
    type: jsPsychInitializeMicrophone
  };
  let mic_check_transition = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
              <div class = "instructions_text">
                <p>Now, we will test your microphone.</p>
                <p>On the next page, count from 1 to 5 out loud.</p>
                <p>Press "Continue" to proceed.</p>
              </div>
              `,
    choices: ['Continue']
  };
  let mic_check = {
    type: jsPsychHtmlAudioResponse,
    stimulus: `
              <div class = "instructions_text">
                <p style = 'font-weight: bold; color: red'>RECORDING IN PROGRESS: COUNT TO 5</p>
              </div>
              `,
    allow_playback: true,
    recording_duration: 8000,
    save_trial_parameters: {
      response: false,
      audio_url: false,
    },
  };
  let mic_check_finalize = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
              <div class = "instructions_text">
               <p>If you'd like to choose a different microphone or perform the test again, click the "Back" button.</p>
               <p>Otherwise, click "Continue" to proceed.</p>
             </div>
            `,
    choices: ['Back', 'Continue'],
  };

  // Allow people to repeat the mic selection/check if they need to
  let loop_mic_check = {
      timeline: [init_mic, mic_check_transition, mic_check, mic_check_finalize],
      loop_function: function(data){
          if (data.last().trials[0].response == 0) {
              return true;
          } else {
              return false;
          }
      }
  }

  let intro_video = {
    type:jsPsychVideoButtonResponse,
    stimulus: ["media/video/Intro.mp4"],
    choices: ['Continue'],
    prompt: "Here is a video demonstrating this part of the task.",
    response_allowed_while_playing: false,
    width: 600,
    height: 400,
  }

  let study_video = {
    type:jsPsychVideoButtonResponse,
    stimulus: ["media/video/Study.mp4"],
    choices: ['Continue'],
    prompt: "Here is a video demonstrating this part of the task.",
    response_allowed_while_playing: false,
    width: 600,
    height: 400,
  }

  let comp_correct_video = {
    type:jsPsychVideoButtonResponse,
    stimulus: ["media/video/CompCorrect.mp4"],
    choices: ['Continue'],
    prompt: "Here is a video demonstrating a participant selecting the correct picture.",
    response_allowed_while_playing: false,
    width: 600,
    height: 400,
  }

  let comp_incorrect_video = {
    type:jsPsychVideoButtonResponse,
    stimulus: ["media/video/CompIncorrect.mp4"],
    choices: ['Continue'],
    prompt: "Here is a video demonstrating a participant selecting the incorrect picture.",
    response_allowed_while_playing: false,
    width: 600,
    height: 400,
  }

  let prod_video = {
    type:jsPsychVideoButtonResponse,
    stimulus: ["media/video/Prod.mp4"],
    choices: ['Continue'],
    prompt: "Here is a video demonstrating this part of the task.",
    response_allowed_while_playing: false,
    width: 600,
    height: 400,
  }

  let test_video = {
    type:jsPsychVideoButtonResponse,
    stimulus: ["media/video/Test.mp4"],
    choices: ['Continue'],
    prompt: "Here is a video demonstrating this part of the task.",
    response_allowed_while_playing: false,
    width: 600,
    height: 400,
  }

    // Introduction directions
    let intro_directions = {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
                <div class = "instructions_text">
                  <p>Your goal in this task will be to learn the names of a set of pictures.</p>
                  <p>You will first be shown each picture individually and be told their name.</p>
                  <p>Please <b> repeat the name aloud </b> before hitting "Continue".</p>
                  <p>Press "Continue" to proceed.</p>
                </div>
                `,
      choices: ['Continue'],
    }

    // Study directions
    let study_directions = {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
                <div class = "instructions_text">
                  <p>You will now see a group of nine pictures and will be told the name of the image in the blue border.</p>
                  <p> When the border turns green <b> click on that image </b> to proceed to the next trial.</p>
                  <p>Press "Continue" to proceed.</p>
                </div>
                `,
      choices: ['Continue'],
    }

    // comp directions
    let comp_directions = {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
                <div class = "instructions_text">
                  <p>You will now see a group of nine pictures and will be told to <b> click on </b> one of the images.</p>
                  <p>If you are not sure, <b> give your best guess. </b> </p>
                  <p>After you select, the correct response will be shown by a green border.</p>
                  <p>Press "Continue" to proceed.</p>
                </div>
                `,
      choices: ['Continue'],
    }

    // production directions
    let prod_directions = {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
                <div class = "instructions_text">
                  <p>You will now see a group of nine pictures, and one will have a blue border.</p>
                  <p>Please <b> speak aloud </b> the correct name for the image in the blue border. </p>
                  <p>If you don't know the word, <b> give your best guess. </b> </p>
                  <p>After you press "Continue", you will then hear the speaker say the correct name.</p>
                  <p>Press "Continue" to proceed.</p>
                </div>
                `,
      choices: ['Continue'],
    }

    // Test Directions
    let test_directions = {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
                <div class = "instructions_text">
                  <p>Finally, you will now see all nine pictures and will be told to <b> click on </b> one of the images.</p>
                  <p>If you are not sure, <b> give your best guess. </b> </p>
                  <p>You will <b> not </b> receive feedback on your responses. </p>
                  <p>Press "Continue" to proceed.</p>
                </div>
                `,
      choices: ['Continue'],
    }

    let turn_directions = {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
                <div class = "instructions_text">
                  <p>Now you will practice this part of the task.</p>
                  <p>Press "Continue" to proceed.</p>
                </div>
                `,
      choices: ['Continue'],

    }

//Practice Trials
    let intro_practice = {
      type: jsPsychHtmlAudioResponseNoFeedback,
      stimulus: function() {
        let image_list = practice_image_list
        return "<img class = 'img' src = '" + image_list[0] + "'>";
      },
      audio_stimulus: "media/audio/ThisGam.flac",
      recording_duration: 1000000,
      show_done_button: true,
      data: {
        task: 'introduction',
        block: 'practice',
      },
    };

  // Study practice trials - grid of nine images, each trial highlights one of the nine images with corresponding "This is a..." audio
  let study_practice = {
    type: jsPsychAudioImageButtonResponseStudy,
    stimulus: "media/audio/ThisGam.flac",
    choices: "",
    button_html: function() {
      let image_list = practice_image_list;
      // Add target image to grid of nine images
      let html_target_image = "<img class = 'jspsych-audio-button-response-button unselected' style = 'cursor: pointer;' id = 'target' data-choice = '{image: media/images/practice1.png'}' src = '"+ image_list[0] + "'>";
      let html_image_list = [html_target_image];

      // Add each of the eight foil images to grid of nine images
      for (let i = 0; i < image_list.length; i++) {
        if (i != 0) {
          let html_foil_image = "<img class = 'unselected' style = 'cursor: pointer;' id = 'foil' data-choice = '{image: " + image_list[i] + "}' src = '" + image_list[i] + "'>";
          html_image_list.push(html_foil_image);
        }
      }

      // Randomize order of the images on the grid
      shuffle(html_image_list);

      // Create HTML for grid
      let html_images_string = html_image_list.join("");
      return "<div class = 'grid'>" + html_images_string + "</div>";
    },
    trial_duration: null, // ADD TRIAL DURATION??
    response_allowed_while_playing: false,
    data: {
      task: 'training',
      block: 'practice',
    },
  };

  // comprehsion training trials
  let comp_practice = {
    type: jsPsychAudioImageButtonResponseFeedback,
    stimulus: "media/audio/ClickGam.flac",
    choices: "",
    button_html: function() {
      let image_list = practice_image_list;

      // Add target image to grid of nine images
      let html_target_image = "<img class = 'jspsych-audio-button-response-button unselected' style = 'cursor: pointer;' id = 'target' data-choice = '{image: " + image_list[0] + "}' src = '" + image_list[0] +"'>";
      let html_image_list = [html_target_image];

      // Add each of the eight foil images to grid of nine images
      for (let i = 0; i < image_list.length; i++) {
        if (i != 0) {
          let html_foil_image = "<img class = 'jspsych-audio-button-response-button unselected' style = 'cursor: pointer;' id = 'foil' data-choice = '{image: " + image_list[i] + "}' src = '" + image_list[i] + "'>";
          html_image_list.push(html_foil_image);
        }
      }

      // Randomize order of the images on the grid
      shuffle(html_image_list);

      // Create HTML for grid
      let html_images_string = html_image_list.join("");
      return "<div class = 'grid'>" + html_images_string + "</div>";
    },
    trial_duration: null, // ADD TRIAL DURATION??
    response_allowed_while_playing: false,
    data: {
      task: 'training',
      block: 'practice',
    },
  };

  // Production training trials - grid of nine images, each trial highlights one of the nine images and plays "This is a...", participant names image out loud, followed by feedback (audio of correct name)
  let prod_practice = {
    type: jsPsychHtmlAudioResponseMod,
    stimulus: function() {
      let image_list = practice_image_list;

      // Add target image to grid of nine images, with blue border
      let html_target_image = "<img class = 'unselected' style = 'cursor: pointer;' id= 'target' target-word = 'Gam' src = '" + image_list[0] +"'>";
      let html_image_list = [html_target_image];

      // Add each of the eight foil images to grid of nine images, with no border
      for (let i = 0; i < image_list.length; i++) {
        if (i != 0) {
          let html_foil_image = "<img class = 'unselected' style = 'cursor: pointer;' id = 'foil' src = '" + image_list[i] + "'>";
          html_image_list.push(html_foil_image);
        }
      }

      // Randomize order of the images on the grid
      shuffle(html_image_list);

      // Create HTML for grid
      let html_images_string = html_image_list.join("");
      return "<div class = 'grid'>" + html_images_string + "</div>";
    },
    recording_duration: 1000000,
    show_done_button: false,
    data: {
      task: 'training',
      block: 'practice',
    },
  };

  // Fixation cross
  let fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div class = "fixation">+</div>',
    choices: "NO_KEYS",
    trial_duration: 1000,
  };


  // Test trials - grid of nine images, each trial plays audio "Click on the..." for one of the nine words, participant clicks on image
  let test_practice = {
    type: jsPsychAudioImageButtonResponseNoFeedback,
    stimulus: "media/audio/ClickGam.flac",
    choices: "",
    button_html: function() {
      let image_list = practice_image_list;

      // Add target image to grid of nine images
      let html_target_image = "<img class = 'jspsych-audio-button-response-button unselected' style = 'cursor: pointer;' id = 'target' data-choice = '{image: " + image_list[0] + "}' src = '" + image_list[0] +"'>";
      let html_image_list = [html_target_image];

      // Add each of the eight foil images to grid of nine images
      for (let i = 0; i < image_list.length; i++) {
        if (i != 0) {
          let html_foil_image = "<img class = 'jspsych-audio-button-response-button unselected' style = 'cursor: pointer;' id = 'foil' data-choice = '{image: " + image_list[i] + "}' src = '" + image_list[i] + "'>";
          html_image_list.push(html_foil_image);
        }
      }

      // Randomize order of the images on the grid
      shuffle(html_image_list);

      // Create HTML for grid
      let html_images_string = html_image_list.join("");
      return "<div class = 'grid'>" + html_images_string + "</div>";
    },
    trial_duration: null, // ADD TRIAL DURATION??
    response_allowed_while_playing: false,
    data: {
      task: 'training',
      block: 'practice',
    },
  };

//Preload
  let practice_preload = {
    type: jsPsychPreload,
    images: practice_image_list,
    audio: practice_audio_list,
    video: practice_video_list,
  };

  let timelineBare = [welcome, practice_preload, loop_mic_check,
    intro_directions, intro_video, turn_directions, intro_practice]
  // Establish condition
  if (condition == 1) {
    timelineBare.push(study_directions, study_video, turn_directions,
      study_practice)
  } else if (condition == 2) {
    timelineBare.push(comp_directions, comp_correct_video, comp_incorrect_video,
      turn_directions, comp_practice)
  } else {
    timelineBare.push(prod_directions, prod_video, turn_directions,
      prod_practice)
  }

  timelineBare.push(test_directions, test_video, turn_directions,
    test_practice)


// CREATE AND RUN TIMELINE
let completeTimeline = {
    timeline: timelineBare,
    data: {
        version: version,

        // This key-value pair labels every trial as part of the Component "experiment". This is useful when parsing your raw data.
        // For example, you can use this label to categorize your data and create separate CSVs for different Components.
        // You will most likely want to change this for each component.
        component: 'practice',

        // We recommend you keep this addition to each trial.
        // jatos.studySessionData was described above in the counterbalancing section. This data is accessible to every Component in a single participant's run of the study.
        // In the 'consent.html' template, Study Session data was created. It is an object with:
        //      The URL parameters pulled from Prolific or Sona (e.g. a participant's Prolific or Sona ID), an automatically-assigned JATOS ID, the data/time of consent, and version assigned above.
        urlparameters_and_date: jatos.studySessionData,
    },
}
let timeline = [completeTimeline];
jsPsych.run(timeline);

});
