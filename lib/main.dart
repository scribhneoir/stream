import 'package:flutter/material.dart';
import 'package:stream/pages/edit.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        title: 'Stream',
        theme: ThemeData(
            colorScheme: ColorScheme.fromSeed(
              seedColor: const Color(0xffd1bfb0),
              background: const Color(0xff292a2a),
              primary: const Color(0xffd1bfb0),
              secondary: const Color(0xff7b99c8),
              tertiary: const Color(0xff508d76),
              error: const Color(0xffbe7979),
              brightness: Brightness.dark,
            ),
            useMaterial3: true,
            fontFamily: "FiraCode"),
        debugShowCheckedModeBanner: false,

        // home: const FlowPage(),

        home: const EditPage());
  }
}
