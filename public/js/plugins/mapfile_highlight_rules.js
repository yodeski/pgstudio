define(function(require, exports, module) {
"use strict";


var oop = require("../lib/oop");
var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var MapfileHighlightRules = function() {

    // taken from http://download.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html
    var keywords = (
            "NAME|ALIGN|ALPHACOLOR|ANCHORPOINT|ANGLE|BACKGROUNDCOLOR|BUFFER|"+
            "CENTER|CHARACTER|CLASSGROUP|CLASSITEM|COLOR|COLORRANGE|CONFIG|CONNECTION|CONNECTIONTYPE|"+
            "DATA|DATAPATTERN|DATARANGE|DEBUG|DEFRESOLUTION|DRIVER|"+
            "EMPTY|ENCODING|ERROR|EXPRESSION|EXTENSION|EXTENT|"+
            "FILLED|FILTER|FILTERITEM|FONT|FONTSET|FOOTER|FORCE|FORMATOPTION|FROM|"+
            "GAP|GEOMTRANSFORM|GRATICULE|GRID|GRIDSTEP|GROUP|HEADER|"+
            "IMAGE|IMAGECOLOR|IMAGEMODE|IMAGEPATH|IMAGEQUALITY|IMAGETYPE|IMAGEURL|INCLUDE|INDEX|INITIALGAP|INTERVALS|ITEMS|"+
            "KEYIMAGE|KEYSIZE|KEYSPACING|"+
            "LABELCACHE_MAP_EDGE_BUFFER|LABELCACHE|LABELFORMAT|LABELITEM|LABELMAXSCALEDENOM|LABELMINSCALEDENOM|LABELREQUIRES|LABELSIZEITEM|LATLON|LINECAP|LINEJOIN|LINEJOINMAXSIZE|LOG|"+
            "MARKER|MARKERSIZE|MASK|MAXARCS|MAXBOXSIZE|MAXDISTANCE|MAXFEATURES|MAXINTERVAL|MAXLENGTH|MAXOVERLAPANGLE|MAXSCALE|MAXSCALEDENOM|MAXSIZE|MAXSUBDIVIDE|MAXTEMPLATE|MAXWIDTH|MIMETYPE|"+
            "MINARCS|MINBOXSIZE|MINDISTANCE|MINFEATURESIZE|MININTERVAL|MINSCALE|MINSCALEDENOM|MINSIZE|MINSUBDIVIDE|MINTEMPLATE|MINWIDTH|"+
            "OFFSET|OFFSITE|OPACITY|OUTLINECOLOR|OUTLINEWIDTH||"+
            "PARTIALS|POLAROFFSET|POSITION|POSTLABELCACHE|PRIORITY|PROCESSING|"+
            "QUERYFORMAT|TRANSPARENT|"+
            "REPEATDISTANCE|REQUIRES|RESOLUTION|"+
            "SCALE|SHADOWCOLOR|SHADOWSIZE|SHAPEPATH|SIZE|SIZEUNITS|STATUS|STYLEITEM|SYMBOLSCALE|SYMBOLSCALEDENOM|SYMBOLSET|"+
            "TABLE|TEMPLATE|TEMPLATEPATTERN|TEXT|TILEINDEX|TILEITEM|TITLE|TO|TOLERANCE|TOLERANCEUNITS|TRANSFORM|TRANSPAREN|TYPE|"+
            "UNITS|WIDTH|WRAP|" +
            "case|default|do|else|for|if|match|while|throw|return|try|catch|finally|yield|" +
            "abstract|class|def|extends|final|forSome|implicit|implicits|import|lazy|new|object|" +
            "override|package|private|protected|sealed|super|this|trait|type|val|var|with"
    );

    var buildinConstants = ("true|false|ON|OFF");

    var langClasses = (
        "CLASS|END|FEATURE|JOIN|LABEL|LAYER|LEADER|LEGEND|MAP|METADATA|OUTPUTFORMAT|"+
        "PATTERN|POINTS|PROJECTION|QUERYMAP|REFERENCE|SCALEBAR|STYLE|SYMBOL|VALIDATION|WEB"
    );

    var keywordMapper = this.createKeywordMapper({
        "variable.language": "this",
        "keyword": keywords,
        "support.function": langClasses,
        "constant.language": buildinConstants
    }, "identifier");

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : "#.*$"
            },
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token : "comment",
                merge : true,
                regex : "#.*$",
                next : "comment"
            }, {
                token : "string.regexp",
                regex : "[/](?:(?:\\[(?:\\\\]|[^\\]])+\\])|(?:\\\\/|[^\\]/]))*[/]\\w*\\s*(?=[).,;]|$)"
            }, {
                token : "string",
                regex : '"""',
                next : "tstring"
            }, {
                token : "string.regexp",
                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
            }, {
                token : "string",
                regex : '"(?=.)', // " strings can't span multiple lines
                next : "string"
            }, {
                token : "constant.numeric", // hex
                regex : "0[xX][0-9a-fA-F]+\\b"
            }, {
                token : "constant.numeric", // float
                regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token : "constant.language.boolean",
                regex : "(?:true|false)\\b"
            }, {
                token : keywordMapper,
                // TODO: Unicode escape sequences
                // TODO: Unicode identifiers
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }, {
                token : "keyword.operator",
                regex : "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>)"
            }, {
                token : "paren.lparen",
                regex : "[[({]"
            }, {
                token : "paren.rparen",
                regex : "[\\])}]"
            }, {
                token : "text",
                regex : "\\s+"
            }
        ],
        "comment" : [
            {
                token : "comment", // closing comment
                regex : ".*?\\*\\/",
                next : "start"
            }, {
                token : "comment", // comment spanning whole line
                merge : true,
                regex : ".+"
            }
        ],
        "string" : [
            {
                token : "escape",
                regex : '\\\\"'
            }, {
                token : "string",
                merge : true,
                regex : '"',
                next : "start"
            }, {
                token : "string.invalid",
                regex : '[^"\\\\]*$',
                next : "start"
            }, {
                token : "string",
                regex : '[^"\\\\]+',
                merge : true
            }
        ],
        "tstring" : [
            {
                token : "string", // closing comment
                regex : '"{3,5}',
                next : "start"
            }, {
                token : "string", // comment spanning whole line
                merge : true,
                regex : ".+?"
            }
        ]
    };

    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
};

oop.inherits(MapfileHighlightRules, TextHighlightRules);

exports.MapfileHighlightRules = MapfileHighlightRules;

});
