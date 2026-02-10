// Request da API do github para trazer os repositórios do usuário
export async function getGithubProjects() {
    try {
        const response = await fetch("https://api.github.com/users/JohnisonF/repos?type=owner&per_page=10&sort=pushed&direction=desc", {
            method: "GET",
            headers: {
                "Accept": "application/vnd.github+json"
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar repositórios");
        }

        return response.json();
    } catch (error) {
        console.error("Erro ao acessar API:", error);
        document.getElementById('github-projects').remove();
    }
}