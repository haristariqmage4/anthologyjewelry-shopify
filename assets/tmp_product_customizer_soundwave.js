soundwave: function ( data ) {

    // TODO
    //      - Functions
    //          - Make functions part of the customization
    //          - See if any functions can be localized if they won't remain in memory
    //      - Create an init function if it means not too much rehashing of the code

    // Fired when user clicks the large grey button
    function Customization_onSelectFileButtonClicked ( evt ) {
        
        WaveSurfer_unloadSoundVisual ( this.wavesurfer )
        
        this.inputFile.click()

    }

    function Customization_clearAll ( customization ) {

        // Get the upload field (uplift app) button
        var uploadField = getUpliftFieldById('uploadlift-soundwave');

        // Hide uploadlift
        uploadField.element.classList.add('hide')

        // Click delete uploaded image
        window.Cloudlift.upload.App.destroy()
        //var uploadLiftDeleteButton = customization.el.querySelector( customization.uploadLiftDeleteSelector );
        //uploadLiftDeleteButton.click();

        // Clear image
        /*
        var imgFinal = customization.el.querySelector( customization.uploadliftSoundwaveLoader )
        imgFinal.src=""
        */

        // Empty Wavesurfer
        WaveSurfer_unloadSoundVisual( customization.ws )

    }

    // Fired after user selected an audio file thru the select modal window
    function FileInput_onInputFileChange ( evt ) {

        var customization = this
        var elInputFile = evt.target
        var file = FileInput_getFirstAudioFile( elInputFile )
        var isAudio = customization.mimeTypes.sound.includes( file.type );
        
        if ( isAudio ) 
        {
            window.URL = window.URL || window.webkitURL;
            var objectURL = window.URL.createObjectURL( file );

            customization.eventLoader.details = { load:true }
            customization.el.dispatchEvent( customization.eventLoader )

            // Load uplift
            if ( ! customization.upliftElmnt ) {

                // Create the uplift and insert
                customization.upliftElmnt = document.createElement('div');
                customization.upliftElmnt.id = "uploadlift-soundwave"
                customization.upliftContainerElmnt.appendChild( customization.upliftElmnt )
            }

            window.Cloudlift.upload.App.setup();
            
            // Create the visual
            WaveSurfer_loadSoundVisual( objectURL, customization )

        }

    }

    // Returns the first selected audio file
    function FileInput_getFirstAudioFile ( inputFile ) {
        // TODO, use item(0)
        return inputFile.files[0]
    }

    // Load WaveSurfer - Draws the audio into line art
    function WaveSurfer_loadSoundVisual ( objectURL, customization ) 
    {
        customization.ws = new WaveSurfer({
            container: customization.wavesurferContainerSelector,
            barWidth: 1,
            hideScrollbar: true,
            interact: false,    // was disableDragSelection, offering cropping thru uploadlift
            height: 90,
            cursorWidth: 0,
            minPxPerSec: 2,
            responsive: true,
            waveColor: '#858585',
            barGap: 2,
            normalize: true,
            mediaType: 'audio'
        });
        
        var wavesurfer = customization.ws

        wavesurfer.on('ready', function ( evt ) {
            
            // this = Window Object
            // evt  = undefined

            console.log("wavesurfer.ready")

            customization.eventLoader.details = { load:false }
            customization.el.dispatchEvent( customization.eventLoader )

            // Prevent the image from being empty. Not the best way but it works most of the time :/
            var interval = setInterval(() => {

                // Get Base64 data URL
                var wsDataURL = wavesurfer.exportImage()

                if ( emptyCanvasDataURL != wsDataURL )
                {

                    Uplift_uploadWaveformImage( wsDataURL )
                        .then(
                            function ( file ) {
                                console.debug('got file upload: ', file);
                            }
                    )

                    clearInterval( interval )
                }
                
            },1000)

                
            // Update Properties?! No need to. Uploadlift creates one already
            // updatePropertyField( uploadedFile.url ) 

            // Remove the temp background
            //$("#uploadlift-soundwave-final").removeClass("no-waveform");

            // Use if able to delete upload programmatically
            // var img = document.querySelector('#uploadlift-soundwave-final')
            // img.src = uploadedFile.url;
            
        })

        wavesurfer.init()

        // Used to compare an empty canvas with the exportImage() from WaveSurfer's DataURL
        var emptyCanvasDataURL = wavesurfer.container.querySelector('canvas').toDataURL()

        // Load the objectURL into the <wave>
        wavesurfer.load(objectURL);

        console.log("wavesurfer.load")
        
    }

    // Empty Wavesurfer
    function WaveSurfer_unloadSoundVisual ( wavesurfer ) {
        if ( customization.ws ) 
             customization.ws.destroy();
    }

    // Takes the image data from wavesurfer export image
    // Uploads using uplift app
    async function Uplift_uploadWaveformImage ( imageData ) {

        // Get the upload field (uplift app) button
        var uploadField = getUpliftFieldById('uploadlift-soundwave');
        console.dir( uploadField )

        // Show uploadlift
        uploadField.element.classList.remove('hide')            

        // Upload the waveform
        return uploadField.uploadFile( imageData )

    }
    
    // TODO: rename customization to "cstmz"
    var customization = data.customization

    // TODO: Make isEventSupported part of Main Class
    var changeEvent = isEventSupported('input')?'input':'change';
    
    customization.updatePropertyField = data.updatePropertyField
    customization.mimeTypes = {
        image: ["image/jpeg","image/jpg","image/gif","image/png"],
        sound: ["audio/mp3","audio/mpeg","audio/wav"]
    }
    customization.uploadLiftDeleteSelector = ".filepond--action-revert-item-processing"
    customization.uuid = null    // Main img, not thumbnail
    customization.loadIcon = customization.el.querySelector('img.loading-ajax')
    customization.eventLoader = new Event('Customization:loading');
    customization.uploadliftSoundwaveLoaderSelector = "#uploadlift-soundwave-loader"
    customization.wavesurferContainerSelector = '#waveform'
    
    // Create the uplift and insert
    customization.upliftContainerElmnt = customization.el.querySelector( '#uploadlift-wrapper' )
    customization.upliftElmnt = null
            
    // File Input Field
    var inputFile = customization.el.querySelector('input[type="file"]')

    // Button (SELECT AUDIO FILE)
    var buttonSelectFile = customization.el.querySelector('button#soundwave-select-button')

    // TODO: Move this up
    // Instantiate WaveSurfer
    customization.ws = null

    /* New audio file selected */
    registerEvent( changeEvent, inputFile, FileInput_onInputFileChange, customization );

    // User clicked the large button
    registerEvent( 'click', buttonSelectFile, Customization_onSelectFileButtonClicked, { inputFile:inputFile, wavesurfer: customization.ws } )

    registerEvent('Customization:onCancel', document, function ( evt ) {
        
        var customization = evt.details.customization;

        if ( customization.name === "soundwave" )
        {   
            Customization_clearAll( customization )
        }

    }, customization)

    registerEvent('Customization:loading', customization.el, function ( evt ){
        this.loadIcon.classList.remove('loading')
        if ( evt.details.load )
        this.loadIcon.classList.add('loading')
    }, customization)
    
    // Listen for the uplift widgets to load and register 'upload:removed'
    document
        .querySelector('form[action*="/cart/add"]')
            .addEventListener('upload:ready', function ( evt )
            {
                var uplift = evt.detail;    // uplift object

                if ( "soundwave" === uplift.config.field.toLowerCase() )
                {
                    
                    registerEvent('upload:removed', uplift.element, function ( evt ){
                        if ( ! evt.detail.parent ) {
                            console.log("file removed")
                            customization.uuid = null
                            customization.ws.destroy()
                            uplift.destroy()
                        }
                    })

                    registerEvent('upload:added', uplift.element, function ( evt ){
                        if ( ! evt.detail.parent ) {
                            console.log("file added")
                            customization.uuid = evt.detail.uuid
                        }
                    })

                }
                
            }
        )
},