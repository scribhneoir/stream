import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

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
        body: Column(children: [
      Expanded(
          flex: 1,
          child: Center(
              child: SizedBox(
                  width: 800,
                  child: TextField(
                    decoration: const InputDecoration(
                      border: InputBorder.none,
                    ),
                    autofocus: true,
                    keyboardType: TextInputType.multiline,
                    maxLines: null,
                    expands: true,
                    style: const TextStyle(fontSize: 20),
                    controller: RegexpStyleController({
                      RegExp('^(#{1}\\s)(.{1,})', multiLine: true):
                          TextModifier(TextStyle(
                        color: Theme.of(context).colorScheme.secondary,
                        fontWeight: FontWeight(700),
                      )),
                    }),
                  ))))
    ]));
  }
}
