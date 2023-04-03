import githubConfig from "../config/github";

export function ajaxService(url, method, data, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (githubConfig.hasOwnProperty('PAT') && githubConfig.PAT) {
        xhr.setRequestHeader('Authorization', `token ${githubConfig.PAT}`);
    }
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            onSuccess(xhr.responseText);
        } else {
            onError(xhr.statusText);
        }
    };
    xhr.onerror = function () {
        onError(xhr.statusText);
    };
    xhr.send(data);
}
