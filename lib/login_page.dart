// ignore_for_file: avoid_print

import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:todo_app/config.dart';
import 'package:todo_app/dashboard.dart';
import 'package:todo_app/registration.dart';
import 'package:velocity_x/velocity_x.dart';
import 'applogo.dart';



class SignInPage extends StatefulWidget {
  const SignInPage({super.key});

  @override
  SignInPageState createState() => SignInPageState();
}

class SignInPageState extends State<SignInPage> {
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  bool _isNotValidate = false;
  late SharedPreferences prefs;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    initSharedPref();
  }

  void initSharedPref() async{
    prefs = await SharedPreferences.getInstance();
  }

void loginUser() async {
  if (emailController.text.isNotEmpty && passwordController.text.isNotEmpty) {
    var reqBody = {
      "email": emailController.text,
      "password": passwordController.text
    };

    try {
      var response = await http.post(
        Uri.parse(login),
        headers: {'Content-Type': "application/json"},
        body: jsonEncode(reqBody),
      );

      print("Response Code: ${response.statusCode}");
      print("Response Body: ${response.body}");

      var jsonResponse = jsonDecode(response.body);
      print("Parsed JSON: $jsonResponse"); // Debugging

      if (response.statusCode == 200 && jsonResponse['status'] == true) {
        var tokenData = jsonResponse['token'];

        if (tokenData is String && tokenData.isNotEmpty) {
          prefs.setString('token', tokenData);
          print("Token saved: $tokenData"); // Debugging

          Navigator.pushReplacement(
            context,
            MaterialPageRoute(builder: (context) => Dashboard(token: tokenData)),
          );
        } else {
          print("Invalid Token Received: $tokenData");
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Invalid token received. Please try again.')),
          );
        }
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(jsonResponse['message'] ?? 'Login Failed')),
        );
      }
    } catch (e) {
      print("Login Error: $e");
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Server connection error.')),
      );
    }
  } else {
    setState(() {
      _isNotValidate = true;
    });
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text('Please enter email & password.')),
    );
  }
}


  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Container(
          width: MediaQuery.of(context).size.width,
          height: MediaQuery.of(context).size.height,
          decoration: BoxDecoration(
            gradient: LinearGradient(
                colors: [const Color(0XFFF95A3B),const Color(0XFFF96713)],
                begin: FractionalOffset.topLeft,
                end: FractionalOffset.bottomCenter,
                stops: [0.0,0.8],
                tileMode: TileMode.mirror
            ),
          ),
          child: Center(
            child: SingleChildScrollView(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  CommonLogo(),
                  HeightBox(10),
                  "Email Sign-In".text.size(22).yellow100.make(),

                  TextField(
                    controller: emailController,
                    keyboardType: TextInputType.text,
                    decoration: InputDecoration(
                        filled: true,
                        fillColor: Colors.white,
                        hintText: "Email",
                        errorText: _isNotValidate ? "Enter Proper Info" : null,
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(10.0)))),
                  ).p4().px24(),
                  TextField(
                    controller: passwordController,
                    keyboardType: TextInputType.text,
                    decoration: InputDecoration(
                        filled: true,
                        fillColor: Colors.white,
                        hintText: "Password",
                        errorText: _isNotValidate ? "Enter Proper Info" : null,
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.all(Radius.circular(10.0)))),
                  ).p4().px24(),
                  GestureDetector(
                    onTap: (){
                        loginUser();
                    },
                    child: HStack([
                      VxBox(child: "LogIn".text.white.makeCentered().p16()).green600.roundedLg.make(),
                    ]),
                  ),
                ],
              ),
            ),
          ),
        ),
        bottomNavigationBar: GestureDetector(
          onTap: (){
            Navigator.push(context, MaterialPageRoute(builder: (context)=>Registration()));
          },
          child: Container(
              height: 25,
              color: Colors.lightBlue,
              child: Center(child: "Create a new Account..! Sign Up".text.white.makeCentered())),
        ),
      ),
    );
  }
}