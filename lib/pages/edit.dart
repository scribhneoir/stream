import 'package:flutter/material.dart';
import 'package:stream/pages/flow.dart';

import '../controllers/regexp.style.controller.dart';

class EditPage extends StatefulWidget {
  const EditPage({super.key});

  @override
  State<EditPage> createState() => _EditPageState();
}

class _EditPageState extends State<EditPage> {
  String _text = "";

  _setText(String s) {
    setState(() {
      _text = s;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text("edit")),
        drawer: Drawer(
            child: ListView(
          children: [
            ListTile(
                title: const Text('Flow'),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => const FlowPage()),
                  );
                })
          ],
        )),
        body: Column(children: [
          Expanded(
              flex: 1,
              child: Center(
                  child: Padding(
                      padding: const EdgeInsets.all(20),
                      child: TextField(
                        decoration: const InputDecoration(
                            border: InputBorder.none,
                            contentPadding: EdgeInsets.all(10)),
                        autofocus: true,
                        keyboardType: TextInputType.multiline,
                        maxLines: null,
                        expands: true,
                        style: const TextStyle(fontSize: 20),
                        controller: RegexpStyleController({
                          RegExp('^(#{1}\\s)(.{1,})', multiLine: true):
                              TextModifier(TextStyle(
                            color: Theme.of(context).colorScheme.secondary,
                            fontWeight: FontWeight.w700,
                          )),
                          RegExp('^(#{2}\\s)(.{1,})', multiLine: true):
                              TextModifier(TextStyle(
                            color: Theme.of(context).colorScheme.tertiary,
                            fontWeight: FontWeight.w600,
                          )),
                          RegExp('^(#{3}\\s)(.{1,})', multiLine: true):
                              TextModifier(TextStyle(
                            color: Theme.of(context).colorScheme.error,
                            fontWeight: FontWeight.w500,
                          )),
                          RegExp('(\\_\\*|\\*\\_)+(\\S+)+(\\_\\*|\\*\\_)',
                                  multiLine: true):
                              TextModifier(const TextStyle(
                                  fontWeight: FontWeight.w700,
                                  fontStyle: FontStyle.italic)),
                          RegExp('(\\*)+(\\S+)(\\*)+', multiLine: true):
                              TextModifier(const TextStyle(
                            fontWeight: FontWeight.w700,
                          )),
                          RegExp('(\\_)+(\\S+)(\\_)+', multiLine: true):
                              TextModifier(
                                  const TextStyle(fontStyle: FontStyle.italic)),
                          RegExp('(^(\\W{1})(\\s)(.*)(?:\$)?)+', multiLine: true):
                              TextModifier(
                                  TextStyle(
                                    color:
                                        Theme.of(context).colorScheme.tertiary,
                                  ),
                                  (String s) => "•${s.substring(1)}"),
                          RegExp('(^(\\d+\\.)(\\s)(.*)(?:\$)?)+',
                              multiLine: true): TextModifier(
                            TextStyle(
                              color: Theme.of(context).colorScheme.tertiary,
                            ),
                          )
                        }),
                      ))))
        ]));
  }
}
