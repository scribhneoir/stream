import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:stream/pages/edit.dart';

import 'pages/flow.dart';

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
              background: const Color(0xff392b35),
              primary: const Color(0xffd1bfb0),
              secondary: const Color(0xff486b7f),
              tertiary: const Color(0xff7a9c96),
              error: const Color(0xffbb474f),
              brightness: Brightness.dark,
            ),
            useMaterial3: true,
            fontFamily: "Cozette"),
        debugShowCheckedModeBanner: false,

        // home: const FlowPage(),

        home: const EditPage());
  }
}
