// In App.js in a new project

import React, { useEffect, useReducer, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GuestStackNavigator from './GuestStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';
import SplashScreen from './SplashScreen';
export const AuthContext = React.createContext();
import axios from 'axios';
// axios.defaults.baseURL = 'https://www.webinfoghy.co.in/maakshi/public/api';
axios.defaults.baseURL = 'https://app.makshihealthcare.com/public/api';

const MainStackNavigator = () => {
  // Context API
  const initialState = {
    isLoading: true,
    user: '',
    token: '',
    data: '',
    introScreen: false,
    initialRoute: 'IntroSliderScreen',
    address: [],
    wishListData: [],
    cartData: '',
    pinCodeData: '',
  };

  const loginReducer = (prevState, action) => {
    // console.log(action, 'action');
    // console.log( "prevState",prevState)
    switch (action.type) {
      case 'USER':
        return {
          ...prevState,
          isLoading: false,
          user: action.user,
          token: action.token,
        };
      case 'APP_LOAD':
        return {
          ...prevState,
          isLoading: false,
          data: action.data,
        };

      case 'FETCH_ADDRESS':
        return {
          ...prevState,
          isAddressLoading: false,
          addressData: action.data,
        };

      case 'FETCH_CART':
        return {
          ...prevState,
          isLoading: false,
          cartData: action.data,
        };
      case 'FETCH_WISH_LIST':
        return {
          ...prevState,
          isLoading: false,
          wishListData: action.data,
        };
      case 'FETCH_PIN_LOCATION':
        return {
          ...prevState,
          isLoading: false,
          pinCodeData: action.data,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          user: null,
          token: null,
          cartData: null,
          address: '',
          wishListData: '',
          isLoading: false,
        };
      case 'INTROSCREEN':
        return {
          ...prevState,
          introScreen: action.intro,
        };
      case 'INITIALROUTE':
        return {
          ...prevState,
          initialRoute: action.initialRoute,
        };
      case 'ISLOADING':
        return {
          ...prevState,
          isLoading: action.isLoading,
        };
      default:
        return prevState;
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialState);

  const authContext = React.useMemo(
    () => ({
      fetchUserFromLocalStorage: async () => {
        let user;
        user = null;
        try {
          user = await AsyncStorage.getItem('user');
          const modifiedUser = JSON.parse(user);
          console.log('modifiiedUser', modifiedUser);

          dispatch({
            type: 'USER',
            user: modifiedUser,
            token: modifiedUser.api_token,
          });

        } catch (e) {
          console.log(e);
        }
      },
      fetchIntroFromLocalStorage: async () => {
        let intro = false;
        try {
          intro = await AsyncStorage.getItem('intro');
          if (intro) {
            dispatch({ type: 'INTROSCREEN', intro: false });
            dispatch({ type: 'INITIALROUTE', initialRoute: 'Login' });
          }
        } catch (e) {
          console.log(e);
        }
      },
      signOut: () => {
        AsyncStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
      },
    }),
    [],
  );

  // Context API
  useEffect(() => {
    setTimeout(() => {
      Promise.all([
        authContext.fetchUserFromLocalStorage(),
        authContext.fetchIntroFromLocalStorage(),
      ])
        .then(response => {
          dispatch({ type: 'ISLOADING', isLoading: false });
        })
        .catch(error => {
          dispatch({ type: 'ISLOADING', isLoading: false });
          console.log(error);
        });
      console.log(initialState.token);
    }, 2000);
  }, []);

  {
    setTimeout(() => {
    }, 15000);
  }
  
  if (loginState.isLoading) {
    return <SplashScreen />;
  }

  return (
    <AuthContext.Provider
      value={{
        loginState: loginState,
        dispatch: dispatch,
        authContext: authContext,
      }}>
      <NavigationContainer>
        {loginState.token != null ? (
          <AuthStackNavigator />
        ) : (
          <GuestStackNavigator initialRoute={loginState.initialRoute} />
        )}
      </NavigationContainer>
    </AuthContext.Provider>

    // <AuthContext.Provider
    //   value={{
    //     loginState: loginState,
    //     dispatch: dispatch,
    //     authContext: authContext,
    //   }}>
    //   <NavigationContainer>
    //     {console.log('token', loginState)}
    //     {loginState.token ? (
    //       <AuthStackNavigator />
    //     ) : (
    //       <SplashScreen initialRoute={loginState.initialRoute} />
    //     )}
    //   </NavigationContainer>
    // </AuthContext.Provider>
  );
};
export default MainStackNavigator;
