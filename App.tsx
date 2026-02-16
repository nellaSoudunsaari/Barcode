import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import React from 'react';

type ScannedBarcode = {
  type: string;
  data: string;
};

export default function App() {
  const [ permission, requestPermission ] = useCameraPermissions();
  const [ scannedBarcode, setScannedBarcode ] = useState("no barcode scanned");
  const [ scanning, setScanning ] = useState(false);

  useEffect(() => {
    if(!permission) return;
    if (!permission.granted) requestPermission();
  }, [permission, requestPermission]);

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

  const handleBarcodeScanned = (result: ScannedBarcode) => {
    setScannedBarcode(result.data);
    setScanning(false);
  }

  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing='back'
        active={!scanning}
        barcodeScannerSettings={
          {
            barcodeTypes: ['ean13', 'code128', 'code39', 'code93', 'ean8', 'codabar']
          }
        }
        onBarcodeScanned={handleBarcodeScanned}
      />
      <View style={styles.resultContainer}>
        <Text style={styles.barcodeText}>Barcode: {scannedBarcode}</Text>
        <TouchableOpacity 
          style={styles.scanBtn}
          onPress={() => {
            if (scannedBarcode){
              setScannedBarcode("");
            }
            setScanning(true);
          }}
        >
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
