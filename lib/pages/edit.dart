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
        body: TextField(
      autofocus: true,
      keyboardType: TextInputType.multiline,
      maxLines: null,
      style: const TextStyle(fontSize: 20),
      controller: RegexpStyleController({
        RegExp('^(#{1}\\s)(.*)', multiLine: true): TextModifier(
            const TextStyle(
                color: Colors.green, decoration: TextDecoration.underline),
            (String s) => "  ${s.substring(2)}"),
        RegExp('^(#{2}\\s)(.*)', multiLine: true): TextModifier(const TextStyle(
            color: Colors.blue, decoration: TextDecoration.underline)),
      }),
    ));
  }
}
