import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const LocalizacaoAtual = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    })();
  }, []);

  if (errorMsg) {
    return <Text style={styles.error}>{errorMsg}</Text>;
  }

  if (!location) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Latitude: {location.coords.latitude}</Text>
      <Text style={styles.text}>Longitude: {location.coords.longitude}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    fontSize: 18,
  },
  error: {
    color: 'red',
    fontSize: 16,
    margin: 20,
  },
});

export default LocalizacaoAtual;
