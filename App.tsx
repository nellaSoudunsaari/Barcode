import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';

export default function App() {
  const [ permission, requestPermission ] = useCameraPermissions();
  const [ scannedBarcode, setScannedBarcode ] = useState("no barcode scanned");
  const [ scanned, setScanned ] = useState(false);

  // handlebarcodescanned
  // result: BarcodeScanned => void {}
  // vaihda use effectiin useeffect () => void {}
  if(!permission){
    return (
      <View>
        <Text>Waiting on camera permissions...</Text>
      </View>
    );
  }
  
  if(!permission.granted){
    return(
      <View style={styles.container}>
        <Text style={styles.message}>App needs permission to show the camera.</Text>
        <Button onPress={requestPermission} title='Grant Permission'/>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing='back'
        active={!scanned}
        barcodeScannerSettings={
          {
            barcodeTypes: ['ean13', 'code128', 'code39', 'code93', 'ean8', 'codabar']
          }
        }
        onBarcodeScanned={
          ({ data }) => {
            setScannedBarcode(data);
          }
        }
      />
      <View style={styles.resultContainer}>
        <Text style={styles.barcodeText}>Barcode: {scannedBarcode}</Text>
        <TouchableOpacity style={styles.scanBtn}>
          <Text style={styles.text}>Scan</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  resultContainer: {
    position: 'absolute',
    bottom: 64,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    paddingHorizontal: 64,
    justifyContent: 'center'
  },
  button: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  barcodeText: {
    fontSize: 18,
    color: 'white'
  },
  scanBtn: {
    backgroundColor: '#1c9630',
    padding: 10,
    alignItems: 'center',
    width: 100,
    borderRadius: 12
  }
});
