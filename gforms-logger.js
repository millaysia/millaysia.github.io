/// Replace these values with your own form ID and field ID

const formID = "1FAIpQLSepSpWZRtR8hALL6vWRLse2_surTTa2adYJ5Urf4yp3AcmNKw"; // from URL bar
const fieldIDs = ['entry.378650038', 'entry.1974413379', 'entry.1382647658']; // from JS console
//const timestampID = "entry.378650038"; // from JS console
//const playerID = "entry.1974413379"; // from JS console
//const eventID = "entry.1382647658"; // from JS console

/// Actual logging machinery

const formURLTemplate = "https://docs.google.com/forms/d/e/FORMID/formResponse";

function encodeParams(params) {
  return Object.entries(params).map(([k, v]) => k + "=" + encodeURIComponent(v)).join("&");
}

function logToGforms(strs, cb) {
  // Set up the XMLHttpRequest
  const formURL = formURLTemplate.replace("FORMID", formID);
  const xhr = new XMLHttpRequest();
  xhr.open("POST", formURL, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  if (cb) xhr.onreadystatechange = cb;
  // Submit the form with the appropriate values substituted in
  const params = {};
  if (strs.length !== fieldIDs.length) {
    console.warn(`Wrong number of form fields (${fieldIDs.length}) or parameters to log (${strs.length})`);
  }
  for (let i = 0; i < fieldIDs.length; i++) {
    params[fieldIDs[i]] = strs[i];
  }
  paramsPart = encodeParams(params);
  xhr.send(paramsPart);
}
