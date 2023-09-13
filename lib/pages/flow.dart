import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class FlowPage extends StatefulWidget {
  const FlowPage({super.key});

  @override
  State<FlowPage> createState() => _FlowPageState();
}

class _FlowPageState extends State<FlowPage> {
  String _text = "";
  String _title = "";
  List<String> _tags = [];
  int _enterCount = 0;
  bool _settingTitle = true;
  int _editTagIndex = -1;

  KeyEventResult _handleKeyPress(FocusNode node, RawKeyEvent event) {
    if (event is RawKeyDownEvent) {
      if (event.logicalKey == LogicalKeyboardKey.delete ||
          event.logicalKey == LogicalKeyboardKey.backspace) {
        if (_settingTitle) {
          setState(() {
            _title = _title.substring(0, _title.length - 1);
            _enterCount = 0;
          });
        } else if (_editTagIndex > -1) {
          if (_tags[_editTagIndex].length <= 1) {
            var oldTags = _tags;
            oldTags.removeAt(_editTagIndex);
            setState(() {
              _tags = oldTags;
              _editTagIndex = -1;
            });
          } else {
            setState(() {
              _tags[_editTagIndex] = _tags[_editTagIndex]
                  .substring(0, _tags[_editTagIndex].length - 1);
            });
          }
        } else {
          if (_text == "") {
            setState(() {
              _settingTitle = true;
            });
          } else {
            setState(() {
              _text = _text.substring(0, _text.length - 1);
              _enterCount = 0;
            });
          }
        }
        return KeyEventResult.handled;
      } else if (event.logicalKey == LogicalKeyboardKey.enter) {
        if (_settingTitle) {
          setState(() {
            _settingTitle = false;
          });
        } else if (_editTagIndex > -1) {
          if (_tags[_editTagIndex].length <= 1) {
            var oldTags = _tags;
            oldTags.removeAt(_editTagIndex);
            setState(() {
              _tags = oldTags;
              _editTagIndex = -1;
            });
          } else {
            setState(() {
              _editTagIndex = -1;
            });
          }
        } else {
          if (_enterCount > 1) {
            setState(() {
              _text = "";
              _title = "";
              _tags = [];
              _enterCount = 0;
              _settingTitle = true;
              _editTagIndex = -1;
            });
          } else {
            setState(() {
              _text += "\n";
              _enterCount++;
            });
          }
        }
        return KeyEventResult.handled;
      } else if (event.character != null) {
        String c = event.character as String;
        if (_settingTitle) {
          if (c == " ") {
            setState(() {
              _title += ".";
              _enterCount = 0;
            });
          } else {
            setState(() {
              _title += c.toLowerCase();
              _enterCount = 0;
            });
          }
        } else if (_editTagIndex > -1) {
          if (c == " ") {
            if (_tags[_editTagIndex].length <= 1) {
              var oldTags = _tags;
              oldTags.removeAt(_editTagIndex);
              setState(() {
                _tags = oldTags;
                _editTagIndex = -1;
              });
            } else {
              setState(() {
                _editTagIndex = -1;
              });
            }
          } else {
            setState(() {
              _tags[_editTagIndex] += c.toLowerCase();
            });
          }
        } else {
          if (c == "#") {
            setState(() {
              _editTagIndex = _tags.length;
              _enterCount = 0;
              _tags = [..._tags, "#"];
            });
          } else if (event.isShiftPressed) {
            setState(() {
              _text += c.toUpperCase();
              _enterCount = 0;
            });
          } else {
            setState(() {
              _text += c.toLowerCase();
              _enterCount = 0;
            });
          }
        }
        debugPrint(_text);
        return KeyEventResult.handled;
      }
    }
    return KeyEventResult.ignored;
  }

  @override
  Widget build(BuildContext context) {
    return FocusScope(
      debugLabel: 'FlowScope',
      onKey: _handleKeyPress,
      autofocus: true,
      child: Scaffold(
        body: Focus(child: Builder(builder: (BuildContext context) {
          return Center(
            child:
                Column(mainAxisAlignment: MainAxisAlignment.center, children: [
              InkWell(
                  onTap: () {
                    setState(() {
                      _settingTitle = true;
                    });
                  }, // Image tapped
                  borderRadius: BorderRadius.circular(8.0),
                  splashColor: Colors.white10, // Splash color over image
                  child: Padding(
                      padding: const EdgeInsets.fromLTRB(10, 2, 10, 2),
                      child: Text(
                        _title == "" ? "untitled" : _title,
                        style: Theme.of(context).textTheme.headlineMedium,
                      ))),
              Row(
                children: [
                  ..._tags.asMap().entries.map((tag) {
                    return InkWell(
                        onTap: () {
                          setState(() {
                            _editTagIndex = tag.key;
                          });
                        }, // Image tapped
                        borderRadius: BorderRadius.circular(8.0),
                        splashColor: Colors.white10, // Splash color over image
                        child: Text(
                          tag.value,
                          style: Theme.of(context).textTheme.bodyLarge,
                        ));
                  })
                ],
              ),
              ShaderMask(
                  shaderCallback: (bounds) {
                    return LinearGradient(
                            colors: [
                          Colors.white.withOpacity(0.0),
                          Colors.black,
                        ],
                            begin: FractionalOffset.topCenter,
                            end: const FractionalOffset(0.5, 0.5))
                        .createShader(bounds);
                  },
                  blendMode: BlendMode.srcIn,
                  child: Container(
                    height: 300.0,
                    width: 400.0,
                    alignment: Alignment.bottomLeft,
                    child: ScrollConfiguration(
                        behavior: ScrollConfiguration.of(context)
                            .copyWith(scrollbars: false),
                        child: SingleChildScrollView(
                          scrollDirection: Axis.vertical,
                          reverse: true,
                          physics: const NeverScrollableScrollPhysics(),
                          child: SelectionContainer.disabled(
                              child: Text(_text,
                                  softWrap: true,
                                  overflow: TextOverflow.fade,
                                  style: const TextStyle(fontSize: 20)
                                  // style: Theme.of(context).textTheme.headlineSmall,
                                  )),
                        )),
                  )),
            ]),
          );
        })),
      ),
    );
  }
}
