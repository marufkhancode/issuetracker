// saving issue data to local storage after Form submit
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueId = chance.guid();
    var issueStatus = 'Open';
    // Creating issue Object
    var issue = {
        id: issueId,
        desc: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }
    // code to insert new object into local storage
    if (localStorage.getItem('issues') == null) {
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    document.getElementById('issueInputForm').reset();
    fetchIssues();
    e.preventDefault();
}
// retrieve issues from localstorage
function fetchIssues() {
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        var id = issues[i].id;
        var desc = issues[i].desc;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;
        console.log(desc);
        issuesList.innerHTML += '<div class="card bg-light" style="margin-top:10px;">' +
            '<div class="card-body">' +
            '<h6>Issue ID: ' + id + '</h6>' +
            '<p><span class="badge badge-info">' + status + '</span></p>' +
            '<h3>' + desc + '</h3>' +
            '<p><i class="far fa-clock"></i> ' + severity + '</p>' +
            '<p><i class="fas fa-user"></i></span> ' + assignedTo + '</p>' +
            '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\'' + id + '\')">Close</a> ' +
            '<a href="#" class="btn btn-danger" onclick="deleteIssue(\'' + id + '\')">Delete</a>' +
            '</div>' +
            '</div>';
    }
}

// Setting the Closed Status function
function setStatusClosed(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues[i].status = 'Closed';
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}
// Deleting An Issue function
function deleteIssue(id) {
    var issues = JSON.parse(localStorage.getItem('issues'));
    for (var i = 0; i < issues.length; i++) {
        if (issues[i].id == id) {
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}