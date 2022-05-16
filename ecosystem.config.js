module.exports = {
    apps: [{
        name: "defina-hub",
        script: "./app.js"
    }],
    deploy: {
        production: {
            user: "exsys",
            host: "45.131.109.30 -p 42069",
            key: "~/.ssh/id_ed25519.pub",
            ref: "origin/main",
            repo: "git@github.com:exsyss/defina-hub.git",
            path: "/home/exsys/defina-hub",
            "post-deploy": "npm install && pm2 startOrRestart ecosystem.config.js"
        }
    }
}