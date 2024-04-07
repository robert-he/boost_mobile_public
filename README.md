# 📱project-boost-mobile 

This project was built using JavaScript, React, Express.js, Node, React-Router, Redux

## 🎨 Design 

Link to Figma: https://www.figma.com/file/YOd5zqcyhMSz66wYNJ39lh3w/Boost-CS52-19S?node-id=1%3A6

## ⚙️ Setup Steps  

## 📐 Architecture 

```
├──[project-boost-mobile]/       # root directory
|  └──[App.js]                   # loads resources and base render
|  └──[components]/              # contains basic components 
|  └──[screens]/                 # contains screens w/ hierarchy
|  └──[navigation]/              # manages navigation stacks
|  └──[state]/                   # redux store
|  └──[assets]/                  # images/graphics
|  └──[constants]/               # react native screen basics
|  └──[ios]/                     # iOS specifics
|     └──[Podfile]               # manages Swift/Xcode dependencies
|  └──[android]/                 # android specifics
```

## 🛠️ Installation 

1. If you don't have homebrew installed, install it by following the instructions linked [here](https://brew.sh/).
2. If you don't have node installed, run `brew install node`.
3. If you don't have watchman installed, run `brew install watchman`.
4. If you don't have support for `expo-cli` setup, run `npm install -g expo-cli`.
5. If you haven't downloaded an iOS Simulator, follow the installation steps [here](https://docs.expo.io/versions/v32.0.0/introduction/installation/).

## 🧰 Setting Up Project 

- `git clone https://github.com/dartmouth-cs52-19S/project-boost-mobile`
- `cd project-boost-mobile/`
- `yarn install`

## 🍎 Installing for iOS 

- `sudo gem install cocoapods -v 1.5.3`
- `cd ios/`
- `pod install`
- If this fails, run the following:
    - `brew install git-lfs`
    - `git lfs install`
    - `pod update`
- Open the `xcworkspace` file in Xcode (make sure you have the latest version of Xcode installed).
- Use Xcode to build, install and run the project on your test device or simulator. Once it's running, the iOS app should automatically request the JS bundle from the project you're serving from Expo CLI.

## 🏃‍♀️ Running Dev Environment 

- `cd` into root directory
- `yarn start`
- Run the project in Xcode by pressing the triangle start button.
- If you haven't followed the directions above for installing for iOS, you must do so before running the iOS Simulator. Specifically, you must run `pod install` and **you must build** the project in Xcode. After doing so, you can run the app in the iOS Simulator (with hot-reloading for changes).

**Important!**
If you happen to get a `Error: File 'file:///Users/[username]/Library/Developer/CoreSimulator/Devices/F9FE3531-7797-4A6D-8869-F3D9807F63F3/data/Containers/Bundle/Application/B877E994-3065-4CAA-B61F-364961FEEA30/boost.app/asset_b2e0fc821c6886fb3940f85a3320003e.ttf' for font '320F258F-C01A-4D91-9620-B18B45B87F36-ionicons' doesn't exist` Error that prevents the app from rendering, follow the steps below:

- Copy your Podfile (located here: `project-boost-mobile/ios/Podfile`) and move it to a folder you can access later
- Delete the `project-boost-mobile/ios` folder
- Delete the `project-boost-mobile/android` folder
- Run `yarn eject`
- When the prompt comes up, choose `ExpoKit: ` option
- You can ignore the warning about the working tree being dirty
- Copy the contents of the Podfile you moved earlier into `project-boost-mobile/ios/Podfile`
- Run `pod install` in the `project-boost-mobile/ios` directory
- Proceed to follow steps in Running Dev Environment for further instruction

## 🚀 Deployment 

Application was deployed on the Expo app. Contact one of the repo administrators in order to gain access to it or follow the steps above to run it locally.

## 👵 Authors 

Thomas Monfre '21,
Robert He '19,
Faustino Cortina '21,
Varsha Iyer '21,
Syed Tanveer '21

## 💓 Acknowledgments 

We would like to thank Tim for being a great prof and providing a wealth of knowledge, and Sofia for being an amazing resource for help and support. Also thank you to stack overflow, and just generally google.
