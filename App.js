import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Picker } from 'react-native';
import FileSystem from 'react-native-fs';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromText: 'mp3',
      toText: 'mp3',
    }
    this.filePathStr = [];
  }


  readFile = path => {
    const { fromText, toText } = this.state;
    FileSystem.readDir(path)
      .then(data => {
        data.forEach(item => {
          if (item.isFile() && item.path.includes(fromText)) {
            const newPath = item.path.replace(fromText, toText);
            FileSystem.moveFile(item.path, newPath);
          } else if (item.isDirectory()) {
            this.readFile(item.path);
          }
        })
      }).catch(err => {
        console.log(err);
      });
  }

  convertFile() {
    const { fromText, toText } = this.state;
    if (fromText === '' || toText === '') {
      alert('Stupid!!!')
      return;
    }
    this.readFile('/storage/emulated/0')
    setTimeout(() => alert('DONE'), 2000);
  }

  render() {
    const { container, picker } = styles;
    return (
      <View style={container}>
        <Text>FROM</Text>
        <Picker
          selectedValue={this.state.fromText}
          style={picker}
          onValueChange={(itemValue, itemIndex) => this.setState({ fromText: itemValue })}>
          <Picker.Item label="MP3" value="mp3" />
          <Picker.Item label="MP4" value="mp4" />
          <Picker.Item label="MKV" value="mkv" />
          <Picker.Item label="TXT" value="txt" />
          <Picker.Item label="HIDE" value="mp" />
          <Picker.Item label="APK" value="apk" />
        </Picker>
        <Text>CONVERT TO</Text>
        <Picker
          selectedValue={this.state.toText}
          style={picker}
          onValueChange={(itemValue, itemIndex) => this.setState({ toText: itemValue })}>
          <Picker.Item label="MP3" value="mp3" />
          <Picker.Item label="MP4" value="mp4" />
          <Picker.Item label="MKV" value="mkv" />
          <Picker.Item label="TXT" value="txt" />
          <Picker.Item label="HIDE" value="mp" />
          <Picker.Item label="APK" value="apk" />
        </Picker>
        <Button
          title="START"
          onPress={this.convertFile.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 8,
  }
});
