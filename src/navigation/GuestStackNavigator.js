import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../main/login/Login';

const GuestStackNavigator = ({ initialRoute }) => {

  const GuestStack = createNativeStackNavigator();

  return (
    <GuestStack.Navigator
      initialRouteName={{ initialRoute }}
      screenOptions={{
        headerShown: false,
      }}>
      <GuestStack.Screen name="Login" component={Login} />
    </GuestStack.Navigator>
  );
};

export default GuestStackNavigator;