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
            version = jatos.studySessionData.version;
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
    let maxVersion = 3
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
  //PRACTICE TRIAL CONTENT
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

  // CODE TO GENERATE SEMANTIC, PHONOLOGICAL, AND UNRELATED IMAGE/WORD LISTS
  var sem_image_1 = ["media/images/bird1.png", "media/images/bird2.png",
  "media/images/bird3.png", "media/images/bird4.png", "media/images/bird5.png",
  "media/images/bird6.png", "media/images/bird7.png", "media/images/bird8.png",
  "media/images/bird9.png"]
  var sem_image_2 = ["media/images/flower1.png", "media/images/flower2.png",
  "media/images/flower3.png", "media/images/flower4.png",
  "media/images/flower5.png", "media/images/flower6.png",
  "media/images/flower7.png", "media/images/flower8.png",
  "media/images/flower9.png"]
  var sem_image_3 = ["media/images/fruit1.png", "media/images/fruit2.png",
  "media/images/fruit3.png", "media/images/fruit4.png",
  "media/images/fruit5.png", "media/images/fruit6.png",
  "media/images/fruit7.png", "media/images/fruit8.png",
  "media/images/fruit9.png"]
  var no_conflict_image_1 = ["media/images/group1_1.png", "media/images/group1_2.png",
  "media/images/group1_3.png", "media/images/group1_4.png",
  "media/images/group1_5.png", "media/images/group1_6.png",
  "media/images/group1_7.png", "media/images/group1_8.png",
  "media/images/group1_9.png"]
  var no_conflict_image_2 = ["media/images/group2_1.png", "media/images/group2_2.png",
  "media/images/group2_3.png", "media/images/group2_4.png",
  "media/images/group2_5.png", "media/images/group2_6.png",
  "media/images/group2_7.png", "media/images/group2_8.png",
  "media/images/group2_9.png"]

  var possible_sem = [sem_image_1, sem_image_2, sem_image_3]
  shuffle(possible_sem);

  var possible_no_conflict_image = [no_conflict_image_1, no_conflict_image_2]
  shuffle(possible_no_conflict_image);

  let sem_image_list = possible_sem[0]
  let phon_image_list = possible_no_conflict_image[0]
  let unrel_image_list = possible_no_conflict_image[1]

  var no_conflict_audio_1 = ["Lopi", "Hane","Nush","Jick","Bola","Darg","Raf",
  "Veng", "Manit"]
  shuffle(no_conflict_audio_1)
  var no_conflict_audio_2 = ["Soodle", "Goke", "Pazz", "Fupp", "Wilp", "Cheem",
  "Zev", "Kiben", "Tevo"]
  shuffle(no_conflict_audio_2)
  var possible_no_conflict_audio = [no_conflict_audio_1, no_conflict_audio_2]
  shuffle(possible_no_conflict_audio)

  let sem_word_list = possible_no_conflict_audio[0]
  let unrel_word_list = possible_no_conflict_audio[1]

  var phon_word_list = ["Ratu", "Ribe", "Biss", "Sar", "Riso", "Bast", "Seb",
  "Tib", "Tasser"]
  shuffle(phon_word_list)

  var all_image_list = [sem_image_list, unrel_image_list, phon_image_list]
  var all_word_list = [sem_word_list, unrel_word_list, phon_word_list]

  jatos.studySessionData.all_image_list = all_image_list;
  jatos.studySessionData.all_word_list = all_word_list;

  let sem_index_list = [{ index: 0, block: 'semantic' },
  { index: 1, block: 'semantic' },{ index: 2, block: 'semantic' },
  { index: 3, block: 'semantic' }, { index: 4, block: 'semantic' },
  { index: 5, block: 'semantic' }, { index: 6, block: 'semantic' },
   { index: 7, block: 'semantic' }, { index: 8, block: 'semantic' }]
  let phon_index_list = [{ index: 0, block: 'phonological' },
  { index: 1, block: 'phonological' }, { index: 2, block: 'phonological' },
  { index: 3, block: 'phonological' }, { index: 4, block: 'phonological' },
  { index: 5, block: 'phonological' }, { index: 6, block: 'phonological' },
  { index: 7, block: 'phonological' }, { index: 8, block: 'phonological' }]
  let unrel_index_list = [{ index: 0, block: 'unrelated' },
  { index: 1, block: 'unrelated' }, { index: 2, block: 'unrelated' },
  { index: 3, block: 'unrelated' }, { index: 4, block: 'unrelated' },
  { index: 5, block: 'unrelated' }, { index: 6, block: 'unrelated' },
  { index: 7, block: 'unrelated' }, { index: 8, block: 'unrelated' }]

  var tempAcc = false

  // BUILD EXPERIMENTAL TRIALS
  // Fixation cross
  let fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div class = "fixation">+</div>',
    choices: "NO_KEYS",
    trial_duration: 1000,
  };
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
          task: 'introduction_training',
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
        task: 'study_training_practice',
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
        task: 'comp_training_practice',
        block: 'practice',
      },
     //  on_finish: function(){
     //    var data = jsPsych.data.get().last(1).values()[0];
     //    var response = data['response'];
     //    if ('{image: "media/images/practice1.png"}' == response){
     //      tempAcc = true;
     //    }
     // },
    };

    // let practice_feedback = {
    //     type: jsPsychHtmlButtonResponse,
    //     stimulus: function(){
    //         if (tempAcc){
    //             return '<p><span style="font-size: 36px; color: rgb(65, 168, 95);">Correct!</span></p>';
    //         }
    //         return '<p><span style="font-size: 36px; color: rgb(209, 72, 65);">Incorrect</span></p>';
    //     },
    //     choices: ['Continue']
    // }


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
        task: 'prod_training_practice',
        block: 'practice',
      },
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
        task: 'test_training',
        block: 'practice',
      },
    };

  // Introduction trials - one image at a time with corresponding "This is a..." audio
  let introduction = {
    type: jsPsychHtmlAudioResponseNoFeedback,
    stimulus: function() {
      if (jsPsych.timelineVariable('block') == "semantic") {
        image = sem_image_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "phonological") {
        image = phon_image_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "unrelated") {
        image = unrel_image_list[jsPsych.timelineVariable('index')];
      }
      console.log(jsPsych.timelineVariable('block'))
      return "<img class = 'img' src = '" + image + "'>";
    },
    audio_stimulus: function() {
      if (jsPsych.timelineVariable('block') == "semantic") {
        word = sem_word_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "phonological") {
        word = phon_word_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "unrelated") {
        word = unrel_word_list[jsPsych.timelineVariable('index')];
      }
      return "media/audio/This" + word + ".flac"
    },
    recording_duration: 1000000,
    show_done_button: true,
    data: {
      task: 'introduction',
      block: jsPsych.timelineVariable('block'),
      image: function() {
        if (jsPsych.timelineVariable('block') == "semantic") {
          return sem_image_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "phonological") {
          return phon_image_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "unrelated") {
          return unrel_image_list[jsPsych.timelineVariable('index')];
        }
      },
      word: function() {
        if (jsPsych.timelineVariable('block') == "semantic") {
          return sem_word_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "phonological") {
          return phon_word_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "unrelated") {
          return unrel_word_list[jsPsych.timelineVariable('index')];
        }
      },
    },
  };

  // Study training trials - grid of nine images, each trial highlights one of the nine images with corresponding "This is a..." audio
  let study_training = {
    type: jsPsychAudioImageButtonResponseStudy,
    stimulus: function() {
      if (jsPsych.timelineVariable('block') == "semantic") {
        word = sem_word_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "phonological") {
        word = phon_word_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "unrelated") {
        word = unrel_word_list[jsPsych.timelineVariable('index')];
      }
      return "media/audio/This" + word + ".flac"
    },
    choices: "",
    button_html: function() {
      if (jsPsych.timelineVariable('block') == "semantic") {
        image_list = sem_image_list;
        word_list = sem_word_list;
      }
      if (jsPsych.timelineVariable('block') == "phonological") {
        image_list = phon_image_list;
        word_list = phon_word_list;
      }
      if (jsPsych.timelineVariable('block') == "unrelated") {
        image_list = unrel_image_list;
        word_list = unrel_word_list;
      }

      // Add target image to grid of nine images
      let html_target_image = "<img class = 'jspsych-audio-button-response-button unselected' style = 'cursor: pointer;' id = 'target' data-choice = '{image: " + image_list[jsPsych.timelineVariable('index')] + ", word: " + word_list[jsPsych.timelineVariable('index')] + "}' src = '" + image_list[jsPsych.timelineVariable('index')] + "'>";
      let html_image_list = [html_target_image];

      // Add each of the eight foil images to grid of nine images
      for (let i = 0; i < image_list.length; i++) {
        if (i != jsPsych.timelineVariable('index')) {
          let html_foil_image = "<img class = 'unselected' style = 'cursor: pointer;' id = 'foil' data-choice = '{image: " + image_list[i] + ", word: " + word_list[i] + "}' src = '" + image_list[i] + "'>";
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
      task: 'study_training',
      block: jsPsych.timelineVariable('block'),
      image: function() {
        if (jsPsych.timelineVariable('block') == "semantic") {
          return sem_image_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "phonological") {
          return phon_image_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "unrelated") {
          return unrel_image_list[jsPsych.timelineVariable('index')];
        }
      },
      word: function() {
        if (jsPsych.timelineVariable('block') == "semantic") {
          return sem_word_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "phonological") {
          return phon_word_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "unrelated") {
          return unrel_word_list[jsPsych.timelineVariable('index')];
        }
      },
    },
  };


  // comprehsion training trials
  let comp_training = {
    type: jsPsychAudioImageButtonResponseFeedback,
    stimulus: function() {
      if (jsPsych.timelineVariable('block') == "semantic") {
        word = sem_word_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "phonological") {
        word = phon_word_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "unrelated") {
        word = unrel_word_list[jsPsych.timelineVariable('index')];
      }
      return "media/audio/Click" + word + ".flac"
    },
    choices: "",
    button_html: function() {
      if (jsPsych.timelineVariable('block') == "semantic") {
        image_list = sem_image_list;
        word_list = sem_word_list;
      }
      if (jsPsych.timelineVariable('block') == "phonological") {
        image_list = phon_image_list;
        word_list = phon_word_list;
      }
      if (jsPsych.timelineVariable('block') == "unrelated") {
        image_list = unrel_image_list;
        word_list = unrel_word_list;
      }

      // Add target image to grid of nine images
      let html_target_image = "<img class = 'jspsych-audio-button-response-button unselected' style = 'cursor: pointer;' id = 'target' data-choice = '{image: " + image_list[jsPsych.timelineVariable('index')] + ", word: " + word_list[jsPsych.timelineVariable('index')] + "}' src = '" + image_list[jsPsych.timelineVariable('index')] + "'>";
      let html_image_list = [html_target_image];

      // Add each of the eight foil images to grid of nine images
      for (let i = 0; i < image_list.length; i++) {
        if (i != jsPsych.timelineVariable('index')) {
          let html_foil_image = "<img class = 'jspsych-audio-button-response-button unselected' style = 'cursor: pointer;' id = 'foil' data-choice = '{image: " + image_list[i] + ", word: " + word_list[i] + "}' src = '" + image_list[i] + "'>";
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
      task: 'comp_training',
      block: jsPsych.timelineVariable('block'),
      image: function() {
        if (jsPsych.timelineVariable('block') == "semantic") {
          return sem_image_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "phonological") {
          return phon_image_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "unrelated") {
          return unrel_image_list[jsPsych.timelineVariable('index')];
        }
      },
      word: function() {
        if (jsPsych.timelineVariable('block') == "semantic") {
          return sem_word_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "phonological") {
          return phon_word_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "unrelated") {
          return unrel_word_list[jsPsych.timelineVariable('index')];
        }
      },
    },
  };

  // Production training trials - grid of nine images, each trial highlights one of the nine images and plays "This is a...", participant names image out loud, followed by feedback (audio of correct name)
  let prod_training = {
    type: jsPsychHtmlAudioResponseMod,
    stimulus: function() {
      if (jsPsych.timelineVariable('block') == "semantic") {
        image_list = sem_image_list;
        target_word = sem_word_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "phonological") {
        image_list = phon_image_list;
        target_word = phon_word_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "unrelated") {
        image_list = unrel_image_list;
        target_word = unrel_word_list[jsPsych.timelineVariable('index')];
      }

      // Add target image to grid of nine images, with blue border
      let html_target_image = "<img class = 'unselected' style = 'cursor: pointer;' id= 'target' target-word = '" + target_word + "' src = '" + image_list[jsPsych.timelineVariable('index')] + "'>";
      let html_image_list = [html_target_image];

      // Add each of the eight foil images to grid of nine images, with no border
      for (let i = 0; i < image_list.length; i++) {
        if (i != jsPsych.timelineVariable('index')) {
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
      task: 'prod_training',
      block: jsPsych.timelineVariable('block'),
      image: function() {
        if (jsPsych.timelineVariable('block') == "semantic") {
          return sem_image_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "phonological") {
          return phon_image_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "unrelated") {
          return unrel_image_list[jsPsych.timelineVariable('index')];
        }
      },
      word: function() {
        if (jsPsych.timelineVariable('block') == "semantic") {
          return sem_word_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "phonological") {
          return phon_word_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "unrelated") {
          return unrel_word_list[jsPsych.timelineVariable('index')];
        }
      },
      // also collect html layout of images
    },
  };

  // Test trials - grid of nine images, each trial plays audio "Click on the..." for one of the nine words, participant clicks on image
  let test = {
    type: jsPsychAudioImageButtonResponseNoFeedback,
    stimulus: function() {
      if (jsPsych.timelineVariable('block') == "semantic") {
        word = sem_word_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "phonological") {
        word = phon_word_list[jsPsych.timelineVariable('index')];
      }
      if (jsPsych.timelineVariable('block') == "unrelated") {
        word = unrel_word_list[jsPsych.timelineVariable('index')];
      }
      return "media/audio/Click" + word + ".flac"
    },
    choices: "",
    button_html: function() {
      if (jsPsych.timelineVariable('block') == "semantic") {
        image_list = sem_image_list;
        word_list = sem_word_list;
      }
      if (jsPsych.timelineVariable('block') == "phonological") {
        image_list = phon_image_list;
        word_list = phon_word_list;
      }
      if (jsPsych.timelineVariable('block') == "unrelated") {
        image_list = unrel_image_list;
        word_list = unrel_word_list;
      }

      // Add target image to grid of nine images
      let html_target_image = "<img class = 'jspsych-audio-button-response-button unselected' style = 'cursor: pointer;' id = 'target' data-choice = '{image: " + image_list[jsPsych.timelineVariable('index')] + ", word: " + word_list[jsPsych.timelineVariable('index')] + "}' src = '" + image_list[jsPsych.timelineVariable('index')] + "'>";
      let html_image_list = [html_target_image];

      // Add each of the eight foil images to grid of nine images
      for (let i = 0; i < image_list.length; i++) {
        if (i != jsPsych.timelineVariable('index')) {
          let html_foil_image = "<img class = 'jspsych-audio-button-response-button unselected' style = 'cursor: pointer;' id = 'foil' data-choice = '{image: " + image_list[i] + ", word: " + word_list[i] + "}' src = '" + image_list[i] + "'>";
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
      task: 'test',
      block: jsPsych.timelineVariable('block'),
      image: function() {
        if (jsPsych.timelineVariable('block') == "semantic") {
          return sem_image_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "phonological") {
          return phon_image_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "unrelated") {
          return unrel_image_list[jsPsych.timelineVariable('index')];
        }
      },
      word: function() {
        if (jsPsych.timelineVariable('block') == "semantic") {
          return sem_word_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "phonological") {
          return phon_word_list[jsPsych.timelineVariable('index')];
        }
        if (jsPsych.timelineVariable('block') == "unrelated") {
          return unrel_word_list[jsPsych.timelineVariable('index')];
        }
      },
    },
  };

  // BEGIN EXPERIMENT

  let welcome = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
              <div class = "instructions_text">
                <p>Now you will proceed to the experiment.</p>
                <p>In this study, you will be asked to remember the names of 3 sets of 9 pictures.</p>
                <p>Press "Continue" to proceed.</p>
              </div>
              `,
    choices: ['Continue'],
    data: {
      condition: version,
      sem_image_list: sem_image_list,
      sem_word_list: sem_word_list,
      phon_image_list: phon_image_list,
      phon_word_list: phon_word_list,
      unrel_image_list: unrel_image_list,
      unrel_word_list: unrel_word_list,
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

// PRACTICE VIDEOS
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
        prompt: "Here is a video demonstrating a participant selecting the <b>correct</b> picture.",
        response_allowed_while_playing: false,
        width: 600,
        height: 400,
      }

      let comp_incorrect_video = {
        type:jsPsychVideoButtonResponse,
        stimulus: ["media/video/CompIncorrect.mp4"],
        choices: ['Continue'],
        prompt: "Here is a video demonstrating a participant selecting the <b>incorrect</b> picture.",
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
// PRACTICE DIRECTIONS
    let practice_start = {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
                <div class = "instructions_text">
                 <p>You will first practice learning one word before proceeding to the study. </p>
                 <p>For each task, you will first see a video demonstration, then you will practice the task yourself. </p>
                 <p>Press 'Continue' to proceed.</p>
               </div>
              `,
      choices: ['Continue'],
    };

    let experiment_start = {
      type: jsPsychHtmlButtonResponse,
      stimulus: `
                <div class = "instructions_text">
                 <p>You will now begin the experiment.</p>
                 <p>Press 'Continue' to proceed.</p>
               </div>
              `,
      choices: ['Continue'],
    };
  // Introduction directions
  let intro_directions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
              <div class = "instructions_text">
                <p>You will now see a picture and hear its name.</p>
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
                <p>You will now see all nine pictures and will be told the name of the image in the <span style = 'font-weight: bold; color: blue'> blue border.</p>
                <p> When the border turns <span style = 'font-weight: bold; color: green'> green</span> <b> click on that image </b> to proceed to the next trial.
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
                <p>You will now see all nine pictures and will be told to <b> click on </b> one of the images.</p>
                <p>After you select, the correct response will be shown by a <span style = 'font-weight: bold; color: green'> green </span> border.</p>
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
                <p>You will now see all nine pictures, and one will have a <span style = 'font-weight: bold; color: blue'> blue </span> border.</p>
                <p>Please <b> speak aloud </b> the correct name for the image in the <span style = 'font-weight: bold; color: blue'> blue </span> border. </p>
                <p>Then <b> click on </b> the image in the <span style = 'font-weight: bold; color: blue'> blue </span> border to hear the correct name. </p>
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
                <p>You will now see all nine pictures and will be told to <b> click on </b> one of the images.</p>
                <p> You will <b> not </b> receive any feedback after your selection.</p>
                <p>Press "Continue" to proceed.</p>
              </div>
              `,
    choices: ['Continue'],
  }

  // Break Directions
  let break_directions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
              <div class = "instructions_text">
                <p>You may now take a pause before continuing the next set of images.</p>
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

  let video_directions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
              <div class = "instructions_text">
                <p>You will first see a video demonstration of the task.</p>
                <p>Press "Continue" to proceed.</p>
              </div>
              `,
    choices: ['Continue'],

  }

  // Establish condition
  if (version == 1) {
    var training = study_training
    var training_directions = study_directions
  }
  else if (version == 2) {
    var training = comp_training
    var training_directions = comp_directions
  } else {
    var training = prod_training
    var training_directions = prod_directions
  }

  //PRACTICE PRELOAD
    let practice_preload = {
      type: jsPsychPreload,
      images: practice_image_list,
      audio: practice_audio_list,
      video: practice_video_list,
    };

  // SEMANTIC BLOCK

  // Preload images and audio for semantic block
  let sem_preload = {
    type: jsPsychPreload,
    images: sem_image_list,
    audio: function() {
      let audio_list = [];
      for (let i = 0; i < sem_word_list.length; i++) {
        audio_list.push("media/audio/This" + sem_word_list[i] + ".flac")
        audio_list.push("media/audio/" + sem_word_list[i] + ".flac")
        audio_list.push("media/audio/Click" + sem_word_list[i] + ".flac")
      }
      return audio_list;
    },
  };

  // Introduction trials for semantic block, in randomized order
  let sem_introduction_trials = {
    timeline: [fixation, introduction],
    timeline_variables: sem_index_list,
    randomize_order: true,
  };

  // Training trials for semantic block, in randomized order
  let sem_training_trials = {
    timeline: [fixation, training],
    timeline_variables: sem_index_list,
    randomize_order: true,
  };

  // Test trials for semantic block, in randomized order
  let sem_test_trials = {
    timeline: [fixation, test],
    timeline_variables: sem_index_list,
    randomize_order: true,
  };

  // Complete semantic block
  let sem_block = {
    name: 'sem-block',
    timeline: [sem_preload, intro_directions, sem_introduction_trials,
      training_directions, sem_training_trials, test_directions, sem_test_trials],
  };

  // PHONOLOGICAL BLOCK

  // Preload images and audio for phonological block
  let phon_preload = {
    type: jsPsychPreload,
    images: phon_image_list,
    audio: function() {
      let audio_list = [];
      for (let i = 0; i < phon_word_list.length; i++) {
        audio_list.push("media/audio/This" + phon_word_list[i] + ".flac")
        audio_list.push("media/audio/" + phon_word_list[i] + ".flac")
        audio_list.push("media/audio/Click" + phon_word_list[i] + ".flac")
      }
      return audio_list;
    },
  };

  // Introduction trials for phonological block, in randomized order
  let phon_introduction_trials = {
    timeline: [fixation, introduction],
    timeline_variables: phon_index_list,
    randomize_order: true,
  };

  // Training trials for phonological block, in randomized order
  let phon_training_trials = {
    timeline: [fixation, training],
    timeline_variables: phon_index_list,
    randomize_order: true,
  };

  // Test trials for phonological block, in randomized order
  let phon_test_trials = {
    timeline: [fixation, test],
    timeline_variables: phon_index_list,
    randomize_order: true,
  };

  // Complete phonological block
  let phon_block = {
    name: 'phon-block',
    timeline: [phon_preload, intro_directions, phon_introduction_trials,
      training_directions, phon_training_trials, test_directions, phon_test_trials],
  };

  // UNRELATED BLOCK

  // Preload images and audio for unrelated block
  let unrel_preload = {
    type: jsPsychPreload,
    images: unrel_image_list,
    audio: function() {
      let audio_list = [];
      for (let i = 0; i < unrel_word_list.length; i++) {
        audio_list.push("media/audio/This" + unrel_word_list[i] + ".flac")
        audio_list.push("media/audio/" + unrel_word_list[i] + ".flac")
        audio_list.push("media/audio/Click" + unrel_word_list[i] + ".flac")
      }
      return audio_list;
    },
  };

  // Introduction trials for unrelated block, in randomized order
  let unrel_introduction_trials = {
    timeline: [fixation, introduction],
    timeline_variables: unrel_index_list,
    randomize_order: true,
  };

  // Training trials for unrelated block, in randomized order
  let unrel_training_trials = {
    timeline: [fixation, training],
    timeline_variables: unrel_index_list,
    randomize_order: true,
  };

  // Test trials for unrelated block, in randomized order
  let unrel_test_trials = {
    timeline: [fixation, test],
    timeline_variables: unrel_index_list,
    randomize_order: true,
  };

  // Complete unrelated block
  let unrel_block = {
    name: 'unrel-block',
    timeline: [unrel_preload, intro_directions,
      unrel_introduction_trials, training_directions, unrel_training_trials,
      test_directions, unrel_test_trials],
  };

  // CREATE AND RUN TIMELINE
  let timelineBare = [welcome, practice_preload, loop_mic_check, practice_start,
    intro_directions, video_directions, intro_video, turn_directions,
    intro_practice]
  // // Establish condition
  if (version == 1) {
    timelineBare.push(study_directions, video_directions, study_video,
      turn_directions, study_practice)
  } else if (version == 2) {
    timelineBare.push(comp_directions, video_directions, comp_correct_video,
      comp_incorrect_video, turn_directions, comp_practice, practice_feedback)
  } else {
    timelineBare.push(prod_directions, video_directions, prod_video,
      turn_directions, prod_practice)
  }
  timelineBare.push(test_directions, video_directions, test_video, turn_directions,
    test_practice)

  let blocks = [sem_block, phon_block, unrel_block]
  shuffle(blocks);

  let order = blocks.map(a => a.name)
  jatos.studySessionData.order = order;

  timelineBare.push(experiment_start, blocks[0], break_directions, blocks[1], break_directions, blocks[2])

  let completeTimeline = {
      timeline: timelineBare,
      data: {
          version: version,
          order: order,
          // This key-value pair labels every trial as part of the Component "experiment". This is useful when parsing your raw data.
          // For example, you can use this label to categorize your data and create separate CSVs for different Components.
          // You will most likely want to change this for each component.
          component: 'experiment',
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
