import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  SplashScreen,
  MasukAkun,
  DaftarAkun,
  Beranda,
  Profil,
  AlamatKlinik,
  EditProfil,
  ProfilKlinik,
  FormDaftarBerobat,
  BuktiDaftarBerobat,
  InfoAntrian,
  RiwayatBerobat,
  LaporanDataPasien,
  LaporanDataDokter,
  Laporan,
  JadwalDokter,
  FormJadwalDokter,
  DaftarPasienPeriksa,
  LaporanDataBerobat, 
  LaporanDataAkun,
  GetStarted,
  TampilanPenggunaan
} from '../pages/pages';
import {BottomNavigation} from '../components/components';

//Menu yang tedapat di bottom navigation diletakkan di function mainApp
const Tab = createBottomTabNavigator();
const MainApp = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigation {...props} />}>
      <Tab.Screen name="Beranda" component={Beranda} />
      <Tab.Screen name="RiwayatBerobat" component={RiwayatBerobat} />
      <Tab.Screen name="Profil" component={Profil} />
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();
const Router = () => {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      {/* Antrian halaman yang akan diproses */}
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TampilanPenggunaan"
        component={TampilanPenggunaan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DaftarAkun"
        component={DaftarAkun}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MasukAkun"
        component={MasukAkun}
        options={{headerShown: false}}
      />
      {/* Tampilan yang ada di Beranda */}
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfilKlinik"
        component={ProfilKlinik}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AlamatKlinik"
        component={AlamatKlinik}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="JadwalDokter"
        component={JadwalDokter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FormJadwalDokter"
        component={FormJadwalDokter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FormDaftarBerobat"
        component={FormDaftarBerobat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BuktiDaftarBerobat"
        component={BuktiDaftarBerobat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InfoAntrian"
        component={InfoAntrian}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DaftarPasienPeriksa"
        component={DaftarPasienPeriksa}
        options={{headerShown: false}}
      />
  
      {/* Tampilan yang ada di Profil */}
      <Stack.Screen
        name="EditProfil"
        component={EditProfil}
        options={{headerShown: false}}
      />
      {/* Tampilan yang ada di Laporan */}
      <Stack.Screen
        name="Laporan"
        component={Laporan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LaporanDataPasien"
        component={LaporanDataPasien}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LaporanDataDokter"
        component={LaporanDataDokter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LaporanDataBerobat"
        component={LaporanDataBerobat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LaporanDataAkun"
        component={LaporanDataAkun}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
