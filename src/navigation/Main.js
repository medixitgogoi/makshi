import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../main/login/Login';
import Dashboard from '../main/dashboard/Dashboard';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../main/profile/Profile';
import Leave from '../main/leave/Leave';
import AddDoctorsForm from '../main/doctross add/AddDoctorsForm';
import DoctorList from '../main/doctross add/DoctorList';
import Doctor from '../main/doctross add/Doctor';
import Expanses from '../main/expenses/Expanses';

const stack = createStackNavigator();

const StackNavigator = () => {

  return (
    <NavigationContainer>
      <stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <stack.Screen name="Login" component={Login} />
        <stack.Screen name="Dashboard" component={Dashboard} />
        <stack.Screen name="Profile" component={Profile} />
        <stack.Screen name="Leave" component={Leave} />
        <stack.Screen name="AddDoctorsForm" component={AddDoctorsForm} />
        <stack.Screen name="DoctorList" component={DoctorList} />
        <stack.Screen name="Doctor" component={Doctor} />
        <stack.Screen name="Expanses" component={Expanses} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
