module.exports = {
    entry:{ 
        start: "./src/start.js",
        // calendar: "./src/calendar.js",
        calendarmanagement: './src/calendarmanagement.js',
        mainjs: "./bin/main.js"
    },
    output:{
        path: './bin/',
        filename: '[name].bundle.js'
    },
    module:{
        loaders: [
            {test: /\.js$/, exclude:/node_modules/, loader: "babel"}
        ]
    }
}