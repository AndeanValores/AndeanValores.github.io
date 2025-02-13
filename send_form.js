function formFieldsToHSJSON(form) {
    let fieldArray = [];
    let formData = new FormData(form);
    for (let field of formData) {
        let values = {
            "name": field[0],
            "value": field[1]
        }
        fieldArray.push(values)
    }
    return fieldArray;
}

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) {
        return parts.pop().split(";").shift();
    }
};

function prepareHSFormSubmission(form) {
    var submissionData = new Object()
    submissionData.submittedAt = Date.now()
    submissionData.fields = formFieldsToHSJSON(form)
    submissionData.context = buildHSContext()
    return submissionData
}

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json() // parses JSON response into native JS objects
}

function submitHSForm(hsFormURL, data) {
    postData(hsFormURL, data).then(data => {
        if (data.inlineMessage) {
            // Set an inline thank you message
            document.querySelector("#thankyou").innerHTML = data.inlineMessage
        }
    });

    var form = document.querySelector('#contact-form') //alter for your forms ID or CSS selector
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var baseSubmitURL = 'https://api.hsforms.com/submissions/v3/integration/submit'
        // Add the HubSpot portalID where the form should submit
        var portalId = '47375629'
        // Add the HubSpot form GUID from your HubSpot portal
        var formGuid = '4ea2e46a-72e1-4133-9df1-edcadaf6d9f4' //replace with the formGUID copied from the form created inside HubSpot Forms
        var submitURL = `${baseSubmitURL}/${portalId}/${formGuid}`
        var formData = prepareHSFormSubmission(form);
        submitHSForm(submitURL, formData)
    });
}



