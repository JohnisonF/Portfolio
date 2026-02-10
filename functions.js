import {animateJobs, animateTyping, animateProjects} from './assets/js/animations.js'
import {getGithubProjects} from './assets/js/requests.js'

window.addEventListener('load', async function() {
    const dados = await getGithubProjects();

    animateJobs();
    animateTyping();
    animateProjects();

    renderGithubProjects(dados);
})

async function renderGithubProjects(dados) {
    if(dados.length === 0) {
        document.getElementById('github-projects').remove();
    }

    const element = document.getElementById("repositories-github");
    const novosDados = dados.filter(e => e.fork === false && e.full_name !== "JohnisonF/JohnisonF").slice(0, 3);
    
    const html = await novosDados.map(e => {
        return `<div class="card-repository">
            <div class="top">
                <img src="${e.owner.avatar_url}" alt="${e.owner.login}">
                <span class="repository-name">
                    ${
                        e.full_name.length > 35
                        ? e.full_name.slice(0, 35 - 3) + "..."
                        : e.full_name
                    }
                </span>
            </div>
            <div class="separator"></div>
            <div class="content">
                ${e.description}
            </div>
            <div class="bottom">
                <a href="${e.html_url}" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-external-link">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path class="stroke-style" d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
                        <path class="stroke-style" d="M11 13l9 -9" />
                        <path class="stroke-style" d="M15 4h5v5" />
                    </svg>
                </a>
                <div class="stars-forks">
                    <div class="forks">
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-repo-forked mr-2">
                            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"></path>
                        </svg>
                        <span class="number">${e.forks_count}</span>
                    </div>
                    <div class="stars">
                        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" class="octicon octicon-star d-inline-block mr-2">
                            <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"></path>
                        </svg>
                        <span class="number">${e.stargazers_count}</span>
                    </div>
                </div>
            </div>
        </div>`;
    });

    element.innerHTML = html;
}