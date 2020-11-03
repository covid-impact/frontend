module.exports = {
    locales: {
        "/": {
            lang: "en-US",
            title: "COVID Finance",
            description: "Documentation site for COVID Finance",
        },
    },

    themeConfig: {
        repoLabel: "Contribute!",
        // git repo here... gitlab, github
        repo: "https://github.com/covid-impact/prototype",
        docsDir: "docs",
        editLinks: true,
        docsBranch: "dev",
        editLinkText: "Help us improve this page!",
        search: false,
        locales: {
            "/": {
                label: "English",
                selectText: "Languages",
                lastUpdated: "Last Updated",
                // service worker is configured but will only register in production
                serviceWorker: {
                    updatePopup: {
                        message: "New content is available.",
                        buttonText: "Refresh",
                    },
                },
                nav: [
                    {text: "Getting Started", link: "/guide"},
                    // external link to git repo...again
                    {
                        text: "GitHub",
                        link: "https://github.com/covid-impact/prototype",
                    },
                ],
                sidebar: {
                    "/components/": [
                        {
                            title: "Components",
                            collapsable: false,
                            children: ["standard-component"],
                        },
                    ],
                },
            },
        },
    },
};
