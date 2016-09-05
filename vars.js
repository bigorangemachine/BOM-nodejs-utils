var vars={
    'content_types':{
        'css':'text/css',
        'json':'text/json',
        'html':'text/html',
        'js':'text/javascript',
        'js_app':'application/javascript',
        'json':'application/x-javascript'
    }
};
vars.capture_types={//files that can be captured as a text file - headers to file extension
    'css':vars.content_types.css,
    'json':vars.content_types.json,
    'html':vars.content_types.html,
    'js':vars.content_types.js,
    'js_app':vars.content_types.js_app,
    'json':vars.content_types.js_app
};
vars.console_chrs={
    'bold': '\033[1m',
    'unbold': '\033[0m'
};
vars.emonji={
    "beer":"\uD83C\uDF7A",
    "beers":"\uD83C\uDF7B",
    'siren': "\uD83D\uDEA8",
    'key': "\uD83D\uDD11",
    "skull":"\u2620"
};
vars.const_str={
    'omitted': "**"+vars.emonji.key+"** OMITTED **"+vars.emonji.key+"**"
};
module.exports = vars;
