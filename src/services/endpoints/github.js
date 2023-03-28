import githubConfig from "../../config/github";

const BASE_URL = 'https://api.github.com/repos';
export const ISSUES_URL = `${BASE_URL}/${githubConfig.REPO_OWNER}/${githubConfig.REPO}/issues`;
export const PR_URL = `${BASE_URL}/${githubConfig.REPO_OWNER}/${githubConfig.REPO}/pulls`;
export const LABELS_URL = `${BASE_URL}/${githubConfig.REPO_OWNER}/${githubConfig.REPO}/labels`;
