import 'package:flutter/material.dart';

String defaultString(String s) => s;

class TextModifier {
  String Function(String) modify;
  TextStyle style;

  TextModifier(this.style, [this.modify = defaultString]);
}

class RegexpStyleController extends TextEditingController {
  final Map<RegExp, TextModifier> mapping;
  final List<Pattern> patterns;

  List<InlineSpan> matchChildren(
      String text, List<Pattern> p, TextStyle? style) {
    List<InlineSpan> children = [];
    if (p.isEmpty) {
      return [TextSpan(text: text, style: style)];
    }
    text.splitMapJoin(
      p.first,
      onMatch: (Match match) {
        children.add(TextSpan(
            text: mapping[p.first]?.modify(match[0]!),
            style: style?.merge(mapping[p.first]?.style)));
        return "";
      },
      onNonMatch: (String text) {
        children.addAll(matchChildren(text, p.sublist(1), style));
        return "";
      },
    );
    return children;
  }

  RegexpStyleController(this.mapping) : patterns = mapping.keys.toList();
  @override
  TextSpan buildTextSpan(
      {required BuildContext context,
      TextStyle? style,
      required bool withComposing}) {
    List<InlineSpan> children = matchChildren(text, patterns, style);
    return TextSpan(style: style, children: children);
  }
}
