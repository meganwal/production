// JS for STUDY condition

jatos.onLoad(function() {



  // INITIALIZE JSPSYCH

  let jsPsych = initJsPsych({
    on_finish: function() {
      let resultJson = jsPsych.data.get().json();
      jatos.submitResultData(resultJson);
      jatos.startNextComponent();
    },
  });



  // FUNCTION TO RANDOMIZE ORDER OF AN ARRAY IN PLACE

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

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

  // temporary order, replace with JATOS Batch Session variable
  let condition = 3

  let sem_index_list = [{ index: 0, block: 'semantic' }, { index: 1, block: 'semantic' }, { index: 2, block: 'semantic' }, { index: 3, block: 'semantic' }, { index: 4, block: 'semantic' }, { index: 5, block: 'semantic' }, { index: 6, block: 'semantic' }, { index: 7, block: 'semantic' }, { index: 8, block: 'semantic' }]
  let phon_index_list = [{ index: 0, block: 'phonological' }, { index: 1, block: 'phonological' }, { index: 2, block: 'phonological' }, { index: 3, block: 'phonological' }, { index: 4, block: 'phonological' }, { index: 5, block: 'phonological' }, { index: 6, block: 'phonological' }, { index: 7, block: 'phonological' }, { index: 8, block: 'phonological' }]
  let unrel_index_list = [{ index: 0, block: 'unrelated' }, { index: 1, block: 'unrelated' }, { index: 2, block: 'unrelated' }, { index: 3, block: 'unrelated' }, { index: 4, block: 'unrelated' }, { index: 5, block: 'unrelated' }, { index: 6, block: 'unrelated' }, { index: 7, block: 'unrelated' }, { index: 8, block: 'unrelated' }]


  // BUILD EXPERIMENTAL TRIALS

  // Fixation cross
  let fixation = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div class = "fixation">+</div>',
    choices: "NO_KEYS",
    trial_duration: 1000,
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
      task: 'training',
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
      task: 'training',
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
        target_word = phon_word_list[jsPsych.timelineVariable('index')];
      }

      // Add target image to grid of nine images, with blue border
      let html_target_image = "<img class = 'selected' id = 'target' target-word = '" + target_word + "' src = '" + image_list[jsPsych.timelineVariable('index')] + "'>";
      let html_image_list = [html_target_image];

      // Add each of the eight foil images to grid of nine images, with no border
      for (let i = 0; i < image_list.length; i++) {
        if (i != jsPsych.timelineVariable('index')) {
          let html_foil_image = "<img class = 'unselected' id = 'foil' src = '" + image_list[i] + "'>";
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
    show_done_button: true,
    data: {
      task: 'training',
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



  // Final BLOCK
  var trial_structure = function(){
    var all_stims = []
    var targets = [
      {type: "sem", indicies: _.range(8)},
      {type: "neither", indicies: _.range(8)},
      {type: "phon", indicies: _.range(8)}]

    var original_foils = _.cloneDeep(targets)
    var foils = _.cloneDeep(original_foils)

    _.map(targets, function(o){o['indicies'] = _.shuffle(o['indicies'])})
    _.map(foils, function(o){o['indicies'] = _.shuffle(o['indicies'])})

    var types = ["sem", "unrel", "phon"]

    var this_type_array;
    var this_target;
    var this_foils = [];
    var tmp_foils;
    var tmp_foil_images;
    var target_idx;

    for (var i = 0; i < 9; i++) {
      for(const this_type of types) {

        this_type_array =  _.find(targets, ['type', this_type])
        this_target = this_type_array['indicies'].splice(0,1)
        var target_image;
        var target_word;
        switch (this_type) {
          case 'sem':
            target_image = sem_image_list[i]
            target_word = sem_word_list[i]
            break;
          case 'unrel':
            target_image = unrel_image_list[i]
            target_word = unrel_word_list[i]
            break;
          case 'phon':
            target_image = phon_image_list[i]
            target_word = phon_word_list[i]
            break;
        }
        this_foils = [];

        for(const this_foil_type of types) {

          if(this_foil_type == this_type) {
            tmp_foils = _.find(foils, ['type', this_foil_type])
            tmp_foil_images = tmp_foils['indicies']
            target_idx = tmp_foil_images.findIndex((element) => element == this_target)

            if(target_idx == 0) {
              this_foils.push(tmp_foil_images.splice(1,2))
            } else if(target_idx == 1) {
              this_foils.push(tmp_foil_images.splice(0,1))
              this_foils.push(tmp_foil_images.splice(1,1))
            } else {
              this_foils.push(tmp_foil_images.splice(0,2))
            }

          } else {
            tmp_foils = _.find(foils, ['type', this_foil_type])
            this_foils.push(tmp_foils['indicies'].splice(0,3))
          }
        }

        all_stims.push({target:_.first(this_target), foils: _.flatten(this_foils)})
        //[”index” : index, “images”: image_list, “sound”: target_word, “type”: type]
      }
      foils = _.cloneDeep(original_foils)
    }
    return all_stims
  }


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

  // Introduction directions
  let intro_directions = {
    type: jsPsychHtmlButtonResponse,
    stimulus: `
              <div class = "instructions_text">
                <p>You will now be shown nine pictures and told their names.</p>
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
                <p>You will now see all nine pictures and will be told the name of the image in the blue border.</p>
                <p> When the border turns green <b> click on that image </b> to proceed to the next trial.
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
                <p>You will now see all nine pictures, and one will have a blue border.</p>
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
                <p>You will now see all nine pictures and will be told to <b> click on </b> one of the images.</p>
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

  // Establish condition
  if (condition == 1) {
    var training = study_training
    var training_directions = study_directions
  }
  else if (condition == 2) {
    var training = comp_training
    var training_directions = comp_directions
  } else {
    var training = prod_training
    var training_directions = prod_directions
  }

  // SEMANTIC BLOCK

  // Preload images and audio for semantic block
  let sem_preload = {
    type: jsPsychPreload,
    images: sem_image_list,
    audio: function() {
      let audio_list = [];
      for (let i = 0; i < sem_word_list.length; i++) {
        audio_list.push("media/audio/This" + sem_word_list[i] + ".flac")
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
    timeline: [unrel_preload, intro_directions, unrel_introduction_trials,
      training_directions, unrel_training_trials, test_directions, unrel_test_trials],
  };

  // CREATE AND RUN TIMELINE
  let timeline = [welcome, loop_mic_check]
  let blocks = [sem_block, phon_block, unrel_block]
  shuffle(blocks);
  timeline.push(blocks[0], break_directions, blocks[1], break_directions, blocks[2])
  console.log(timeline)
  jsPsych.run(timeline);



});
