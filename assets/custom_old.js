// Put your applicaiton javascript here

// Accordion
// Accordion
// Accordion
var acc = document.getElementsByClassName("accordion");
var i;
var padding = 20;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      //panel.style.maxHeight = panel.scrollHeight + padding * 2 + "px";
      panel.style.maxHeight = "500px";
    }
  });
  if (acc[i].classList.contains("active")) {
    var panel = acc[i].nextElementSibling;
    //panel.style.maxHeight = panel.scrollHeight + padding * 2 + "px";
    panel.style.maxHeight = "500px";
  }
}

// Show Selected Option in Product Page
// Show Selected Option in Product Page
// Show Selected Option in Product Page
function updateAccordionLabels() {
  var $panels = jQuery(".panel.show-selected-option");

  $panels.each(function () {
    $this = jQuery(this);

    var $selectedOption = $this
      .find("a.active")
      .clone()
      .addClass("chosen-option");

    $selectedOption.appendTo($this.prev("label"));
  });

  watchForChoicesChange();
}

// on DOM Content loaded...
//  -> updateAccordionLabels
//  -> handleColorLabelsByBaseMetal_Init
//  -> handleCustomizer
document.addEventListener("DOMContentLoaded", function () {
  updateAccordionLabels();
  handleBaseMetalsCustomizations();
  handleColorLabelsByBaseMetal_Init();
  handleCustomizer();
});

// Watch for CLICK events on all drop-downs
function watchForChoicesChange() {
  // Watch for Base Metal Clicked
  $(".clickyboxes.options-1-base-metal a").on("click", function () {
    var selectedBaseMetal = $(this).data("value");
    console.log("Base Metal was changed to", selectedBaseMetal);
    $(document).triggerHandler("BaseMetalChanged", {
      activeBaseMetal: selectedBaseMetal,
    });
  });

  // Watch for changes for non metallic choices (Color, Scents, Customer, ie)
  $(".clickyboxes:not(.options-1-base-metal) a").on("click", function () {
    var $newSelectedOption = $(this),
      $prevSelectedOption = $newSelectedOption
        .parents(".panel")
        .prev("label")
        .find("a.chosen-option"),
      $newOptionClone = $newSelectedOption.clone().addClass("chosen-option");

    $prevSelectedOption.replaceWith($newOptionClone);
  });

  // Whach for all CLICK events on all dropdowns
  $(".clickyboxes a").on("click", function () {
    // Update Klarna
    window.KOSMApp.updatePurchaseAmount();
  });
}

function handleBaseMetalsCustomizations() {
  var variants = meta.product.variants;
  $("#clickyboxes-option-base-metal a").each(function () {
    var $this = $(this),
      label = $this.text(),
      baseMetalName = $this.data("value"),
      price = 0;

    // Get the first price of the variant that matches this base metal
    for (index in variants) {
      if (variants[index].public_title.indexOf(baseMetalName) != -1) {
        price = theme.Shopify.formatMoney(
          variants[index].price,
          theme.money_format
        );
        break;
      }
    }

    $this.html(label + "<br>" + price + "");
  });
}

// 14K Gold Exception
// When 14k Gold is loaded or changed, color labels are changed

// 14K Gold Exception - Labels
var FourteenKGoldColorLabels = {
  gold: "14k yellow gold",
  silver: "14k White gold",
  "rose gold": "14k Rose Gold",
};

// 14K Gold Exception - Init
// TODO: Break down into 2 separate functions. One to combine stuff for Base Metals and one for the 14k Exception
function handleColorLabelsByBaseMetal_Init() {
  // We handle the changing of the labels when user interacts with the UI
  $(document).on("BaseMetalChanged", function (e, data) {
    console.log("EVENT: BaseMetalChanged Fired and listened...");
    handleColorLabelsByBaseMetal(data.activeBaseMetal);
  });

  // We handle the changing of labels for colors when the page loads for 14k GOLD...
  if ($(".opt---14k-gold").is(".active")) {
    changeColorLabelsFor14kGold();
  }
}

// 14K Gold Exception - BaseMetalChanged CallBack (handleColorLabelsByBaseMetal_Init)
function handleColorLabelsByBaseMetal(selectedMetal) {
  if (selectedMetal == "14K GOLD") {
    changeColorLabelsFor14kGold();
  } else {
    revertColorLabels();
  }
}

// 14K Gold Exception - Change Color Labels when it is "active"
function changeColorLabelsFor14kGold() {
  console.log("changeColorLabelsFor14kGold()");
  var $colorOptions = $(".clickyboxes.options-2-color a");
  $colorOptions.each(function () {
    var link = $(this),
      label = $(this).text().trim().toLowerCase();

    link.text(FourteenKGoldColorLabels[label]);
  });
}

// 14K Gold Exception - Change Color Labels when it is "not active"
function revertColorLabels() {
  console.log("revertColorLabels()");
  var $colorOptions = $(".clickyboxes.options-2-color a");
  $colorOptions.each(function () {
    console.log($(this));
    $(this).text($(this).data("value"));
  });
}

// Handle Customizer (called from DOMContentLoaded)
// Here we handle the different feature sets
// 1. Moves the customizer accordion
function handleCustomizer() {
  $this = $(".product-form .customize");
  // Temporary fix: Removing step 3 for candle
  if ($this && meta.product.type != "Candle")
    $(".product-form .customize").addClass("active");

  $("#clickyboxes-option-customize a").each(function () {
    // Represents the 'a' tag
    var $choice = $(this),
      custom_feature_name = $choice.data("value"),
      $custom_feature_uis = $(".custom-feature-ui-single");

    // Get the feature which matches this option
    $this_features_ui = $custom_feature_uis.filter("." + custom_feature_name);

    // Insert it after this A tag
    $this_features_ui.insertAfter($choice);
  });
}

// This part will change the label of the color variant so that it ads 14k... when 14k Gold is selected
